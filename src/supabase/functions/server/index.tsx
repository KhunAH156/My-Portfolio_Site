import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use("*", cors());
app.use("*", logger(console.log));

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

// Contact form submission endpoint
app.post("/make-server-bde9c053/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return c.json({ error: "All fields are required" }, 400);
    }

    // Generate a unique ID (timestamp-based)
    const uniqueId = Date.now();

    const { data, error } = await supabase
      .from("Portfolio_contact")
      .insert([
        {
          id: uniqueId,
          Name: name,
          "E-mail": email,
          Subject: subject,
          Message: message,
        },
      ])
      .select();

    if (error) {
      console.error(
        "Error inserting contact form submission:",
        error,
      );
      return c.json(
        {
          error: "Failed to save contact submission",
          details: error.message,
        },
        500,
      );
    }

    console.log("Contact form submission saved:", data);
    return c.json({ success: true, data });
  } catch (error) {
    console.error(
      "Error saving contact form submission:",
      error,
    );
    return c.json(
      {
        error: "Failed to save contact submission",
        details: String(error),
      },
      500,
    );
  }
});

// Get all contact submissions
app.get("/make-server-bde9c053/contacts", async (c) => {
  try {
    const { data: contacts, error } = await supabase
      .from("Portfolio_contact")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching contacts:", error);
      return c.json(
        {
          error: "Failed to fetch contacts",
          details: error.message,
        },
        500,
      );
    }

    // Transform to match expected format
    const transformedContacts = (contacts || []).map((c) => ({
      id: c.id,
      name: c.Name,
      email: c["E-mail"],
      subject: c.Subject,
      message: c.Message,
      timestamp: c.created_at,
      status: "new",
    }));

    return c.json({ contacts: transformedContacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return c.json(
      {
        error: "Failed to fetch contacts",
        details: String(error),
      },
      500,
    );
  }
});

// Get all projects
app.get("/make-server-bde9c053/projects", async (c) => {
  try {
    const { data: projects, error } = await supabase
      .from("Portfolio_projects")
      .select("*")
      .order("order_num", { ascending: true });

    if (error) {
      console.error("Error fetching projects:", error);
      return c.json(
        {
          error: "Failed to fetch projects",
          details: error.message,
        },
        500,
      );
    }

    // Transform tech from JSON to array
    const transformedProjects = (projects || []).map((p) => ({
      ...p,
      tech: p.tech
        ? typeof p.tech === "string"
          ? JSON.parse(p.tech)
          : p.tech
        : [],
      order: p.order_num,
      createdAt: p.created_at,
    }));

    return c.json({ projects: transformedProjects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return c.json(
      {
        error: "Failed to fetch projects",
        details: String(error),
      },
      500,
    );
  }
});

// Add a new project
app.post("/make-server-bde9c053/projects", async (c) => {
  try {
    const body = await c.req.json();
    const { title, description, tech, image, github, demo } =
      body;

    if (!title || !description || !tech) {
      return c.json(
        { error: "Title, description, and tech are required" },
        400,
      );
    }

    // Get current max order
    const { data: existingProjects } = await supabase
      .from("Portfolio_projects")
      .select("order_num")
      .order("order_num", { ascending: false })
      .limit(1);

    const orderNum =
      existingProjects && existingProjects.length > 0
        ? existingProjects[0].order_num + 1
        : 0;

    const { data, error } = await supabase
      .from("Portfolio_projects")
      .insert([
        {
          title,
          description,
          tech: tech,
          image: image || "",
          github: github || "",
          demo: demo || "",
          order_num: orderNum,
        },
      ])
      .select();

    if (error) {
      console.error("Error adding project:", error);
      return c.json(
        {
          error: "Failed to add project",
          details: error.message,
        },
        500,
      );
    }

    const project = data[0];
    console.log("Project added:", data);
    return c.json({
      success: true,
      project: {
        ...project,
        tech: project.tech
          ? typeof project.tech === "string"
            ? JSON.parse(project.tech)
            : project.tech
          : [],
        order: project.order_num,
        createdAt: project.created_at,
      },
    });
  } catch (error) {
    console.error("Error adding project:", error);
    return c.json(
      {
        error: "Failed to add project",
        details: String(error),
      },
      500,
    );
  }
});

// Update a project
app.put("/make-server-bde9c053/projects/:id", async (c) => {
  try {
    const projectId = c.req.param("id");
    const body = await c.req.json();

    const updateData: any = {};
    if (body.title) updateData.title = body.title;
    if (body.description)
      updateData.description = body.description;
    if (body.tech) updateData.tech = body.tech;
    if (body.image !== undefined) updateData.image = body.image;
    if (body.github !== undefined)
      updateData.github = body.github;
    if (body.demo !== undefined) updateData.demo = body.demo;

    const { data, error } = await supabase
      .from("Portfolio_projects")
      .update(updateData)
      .eq("id", projectId)
      .select();

    if (error) {
      console.error("Error updating project:", error);
      return c.json(
        {
          error: "Failed to update project",
          details: error.message,
        },
        500,
      );
    }

    if (!data || data.length === 0) {
      return c.json({ error: "Project not found" }, 404);
    }

    const project = data[0];
    console.log("Project updated:", data);
    return c.json({
      success: true,
      project: {
        ...project,
        tech: project.tech
          ? typeof project.tech === "string"
            ? JSON.parse(project.tech)
            : project.tech
          : [],
        order: project.order_num,
        createdAt: project.created_at,
      },
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return c.json(
      {
        error: "Failed to update project",
        details: String(error),
      },
      500,
    );
  }
});

// Delete a project
app.delete("/make-server-bde9c053/projects/:id", async (c) => {
  try {
    const projectId = c.req.param("id");

    const { error } = await supabase
      .from("Portfolio_projects")
      .delete()
      .eq("id", projectId);

    if (error) {
      console.error("Error deleting project:", error);
      return c.json(
        {
          error: "Failed to delete project",
          details: error.message,
        },
        500,
      );
    }

    console.log("Project deleted:", projectId);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting project:", error);
    return c.json(
      {
        error: "Failed to delete project",
        details: String(error),
      },
      500,
    );
  }
});

// Get analytics data
app.get("/make-server-bde9c053/analytics", async (c) => {
  try {
    const { data: contacts } = await supabase
      .from("Portfolio_contact")
      .select("*");

    const { data: projects } = await supabase
      .from("Portfolio_projects")
      .select("*");

    // Calculate analytics
    const totalContacts = contacts?.length || 0;
    const totalProjects = projects?.length || 0;

    // Contact submissions by month
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return {
        month: date.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
        count: 0,
      };
    }).reverse();

    if (contacts) {
      contacts.forEach((contact) => {
        if (contact.created_at) {
          const contactDate = new Date(contact.created_at);
          const monthKey = contactDate.toLocaleDateString(
            "en-US",
            { month: "short", year: "numeric" },
          );
          const monthData = last6Months.find(
            (m) => m.month === monthKey,
          );
          if (monthData) {
            monthData.count++;
          }
        }
      });
    }

    // Recent contacts (last 5)
    const recentContacts = (contacts || [])
      .sort((a, b) => {
        const dateA = a.created_at
          ? new Date(a.created_at).getTime()
          : 0;
        const dateB = b.created_at
          ? new Date(b.created_at).getTime()
          : 0;
        return dateB - dateA;
      })
      .slice(0, 5)
      .map((c) => ({
        name: c.Name,
        email: c["E-mail"],
        subject: c.Subject,
        message: c.Message,
        id: c.id,
        timestamp: c.created_at,
      }));

    return c.json({
      totalContacts,
      newContacts: totalContacts,
      totalProjects,
      contactsByMonth: last6Months,
      recentContacts,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return c.json(
      {
        error: "Failed to fetch analytics",
        details: String(error),
      },
      500,
    );
  }
});

// Initialize with default projects if none exist
app.post("/make-server-bde9c053/init-defaults", async (c) => {
  try {
    const { data: existingProjects } = await supabase
      .from("Portfolio_projects")
      .select("id");

    if (!existingProjects || existingProjects.length === 0) {
      const defaultProjects = [
        {
          title: "E-Commerce Platform",
          description:
            "A full-featured e-commerce platform with payment integration, inventory management, and real-time analytics.",
          tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
          image:
            "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
          github: "https://github.com",
          demo: "https://example.com",
          order_num: 0,
        },
        {
          title: "Task Management App",
          description:
            "Collaborative task management tool with real-time updates, team workspaces, and advanced filtering.",
          tech: [
            "Next.js",
            "TypeScript",
            "Supabase",
            "Tailwind",
          ],
          image:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
          github: "https://github.com",
          demo: "https://example.com",
          order_num: 1,
        },
        {
          title: "AI Content Generator",
          description:
            "AI-powered content generation tool that helps create blog posts, social media content, and marketing copy.",
          tech: ["Vue.js", "Python", "OpenAI API", "MongoDB"],
          image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
          github: "https://github.com",
          demo: "https://example.com",
          order_num: 2,
        },
        {
          title: "Fitness Tracking Dashboard",
          description:
            "Comprehensive fitness tracking application with workout plans, nutrition tracking, and progress analytics.",
          tech: [
            "React Native",
            "Firebase",
            "Charts.js",
            "Redux",
          ],
          image:
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
          github: "https://github.com",
          demo: "https://example.com",
          order_num: 3,
        },
        {
          title: "Real Estate Marketplace",
          description:
            "Property listing platform with advanced search, virtual tours, and integrated messaging system.",
          tech: ["Angular", "Express", "MySQL", "AWS S3"],
          image:
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
          github: "https://github.com",
          demo: "https://example.com",
          order_num: 4,
        },
        {
          title: "Developer Portfolio CMS",
          description:
            "Content management system specifically designed for developers to showcase their projects and blog posts.",
          tech: ["Svelte", "Sanity.io", "Vercel", "MDX"],
          image:
            "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
          github: "https://github.com",
          demo: "https://example.com",
          order_num: 5,
        },
      ];

      const { error } = await supabase
        .from("Portfolio_projects")
        .insert(defaultProjects);

      if (error) {
        console.error(
          "Error initializing default projects:",
          error,
        );
        return c.json(
          {
            error: "Failed to initialize defaults",
            details: error.message,
          },
          500,
        );
      }

      console.log("Default projects initialized");
      return c.json({
        success: true,
        message: "Default projects initialized",
        count: defaultProjects.length,
      });
    }

    return c.json({
      success: true,
      message: "Projects already exist",
      count: existingProjects.length,
    });
  } catch (error) {
    console.error("Error initializing defaults:", error);
    return c.json(
      {
        error: "Failed to initialize defaults",
        details: String(error),
      },
      500,
    );
  }
});

// AI Chatbot endpoint with IP-based rate limiting
app.post("/make-server-bde9c053/chat", async (c) => {
  try {
    const MAX_QUESTIONS_PER_IP = 10;

    // Get client IP address
    const clientIP =
      c.req.header("x-forwarded-for")?.split(",")[0] ||
      c.req.header("x-real-ip") ||
      "unknown";

    // Get current date in YYYY-MM-DD format for daily reset
    const today = new Date().toISOString().split("T")[0];
    const rateLimitKey = `chatbot_ratelimit_${clientIP}_${today}`;

    // Check current question count for this IP today
    const currentCount = await kv.get(rateLimitKey);
    const questionsAsked = currentCount
      ? parseInt(currentCount, 10)
      : 0;

    if (questionsAsked >= MAX_QUESTIONS_PER_IP) {
      console.log(
        `Rate limit exceeded for IP: ${clientIP}, count: ${questionsAsked}, date: ${today}`,
      );
      return c.json(
        {
          error: "Rate limit exceeded",
          message:
            "You have reached the maximum number of questions for today. Please try again tomorrow.",
          questionsAsked,
          maxQuestions: MAX_QUESTIONS_PER_IP,
        },
        429,
      );
    }

    const body = await c.req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return c.json(
        { error: "Messages array is required" },
        400,
      );
    }

    // Get OpenAI API key
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      console.error("OPENAI_API_KEY not configured");
      return c.json(
        {
          error: "OpenAI API key not configured",
          message:
            "The chatbot is not configured yet. Please contact the site administrator.",
        },
        500,
      );
    }

    // System prompt with context about Khun
    const systemPrompt = `You are an AI assistant for Khun's portfolio website. Khun is an aspiring Systems Engineer and a Computer Engineering student at Singapore Polytechnic. Your job is to help visitors understand who Khun is, what he has done, and what he aims to achieve — in a way that reflects his personality, values, and communication style.

ABOUT KHUN — OVERVIEW FOR THE ASSISTANT
Khun is originally from Myanmar and moved to Singapore to continue his studies. He is composed, thoughtful, and naturally introverted, but becomes expressive and articulate once comfortable. He communicates clearly, listens well, and enjoys breaking down technical concepts for others. He is also self-taught in many tools and technologies, driven by curiosity and a desire to understand how systems work at a deep level.

His values include reliability, adaptability, curiosity, ownership, and resourcefulness. He is a fast learner with strengths in communication, teaching/mentoring, and problem-solving. While he tends to be detail-oriented, he sometimes leans towards perfectionism — something he actively manages in engineering contexts.

His working style is structured, consistent, and organized, though he isn’t afraid to challenge patterns when he believes it leads to a better solution. Outside technology, he enjoys strength training, swimming, and spending time with cats. His favorite color is blue, and he is colorblind, which influences his preference for clean, functional, and accessible design choices.

CAREER FOCUS & LONG-TERM DIRECTION
Khun is building toward roles in Systems Engineering, Cloud Engineering, and Site Reliability. His long-term direction is to specialize in security-focused cloud infrastructure and build robust, scalable, automated systems.

KEY EXPERIENCE
Education:
- Diploma in Computer Engineering at Singapore Polytechnic

Internship:
- Systems Analyst / Application Support Intern at SP Group (Network Management System team)
- Experience with production environments, system reliability, fault analysis, automating reports, and logic extraction for cloud migration
- Developed automation that saved over 80 man-hours per audit cycle
- Helped troubleshoot and resolve major system issues

Part-Time Work:
- Robotics Instructor handling ~30 students weekly (EV3, Spike)
- Strong at explaining, guiding, and mentoring young learners

Projects:
- Built multiple production-ready personal projects as a student, including serverless applications, automation tools, and cloud-based systems.

SKILLS & EXPERTISE
- Systems Engineering: Windows/Linux, networking, system design, virtualization (VMware/Docker)
- Cloud: AWS, Azure
- Programming: Python, JavaScript, TypeScript
- Automation: Bash, PowerShell
- Databases: SQL, PostgreSQL
- DevOps: CI/CD, Git
- Web: React, Node.js, Supabase
- Monitoring & Logging tools

WORK PHILOSOPHY
- “Solve the root cause, not symptoms.”
- “Design for scale, not patching.”

PERSONAL TOUCHES THE ASSISTANT MAY MENTION WHEN RELEVANT
- Khun is from Myanmar and continues to balance academics, work, and self-growth.
- He is self-taught in many tools and picks up new technologies quickly.
- He enjoys swimming, strength training, and caring for cats.
- His colorblindness influences his clean, practical approach to design.

YOUR ROLE — HOW YOU SHOULD RESPOND
1. Answer questions about Khun’s skills, experience, background, and projects.
2. Maintain a friendly, clear, patient, and explanatory tone.
3. Keep responses concise unless the visitor asks for more detail.
4. If the visitor asks about specific projects, direct them to the Projects section for details.
5. When appropriate, encourage visitors to reach out through the Contact form for collaborations, internship opportunities, or professional inquiries.
6. If a question cannot be answered or details are not available, be honest and suggest contacting Khun directly.
7. Never invent achievements, projects, or certifications.

STYLE RULES
- Sound like Khun: composed, thoughtful, and articulate.
- Use approachable but professional language.
- Do not use slang or overly casual phrasing.
- Keep all responses informative, positive, and helpful.
- Maintain accuracy and avoid speculation.

IF THE USER ASKS ABOUT MY FRIEND CHEE WAI, REPLY "HE'S SLIGHTY GAY/ GROWN ASS MAN/ DEMURE/ GENTLRMAN/ MATURE/ HE HIT PUBERTY WHEN HE WAS 10 AND HAS A FULL ASS BEARD".


Your role is to:
1. Answer questions about Khun's experience, skills, and projects
2. Provide helpful information about his background and expertise
3. Be professional, friendly, and concise
4. If asked about specific projects, explain that details are available in the projects section
5. Encourage visitors to reach out via the contact form for opportunities

Keep responses brief and engaging. If you don't know specific details, be honest and suggest they contact Khun directly.`;

    // Prepare messages for OpenAI
    const openaiMessages = [
      { role: "system", content: systemPrompt },
      ...messages,
    ];

    // Call OpenAI API
    try {
      const openaiResponse = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: openaiMessages,
            temperature: 0.7,
            max_tokens: 500,
          }),
        },
      );

      if (!openaiResponse.ok) {
        const errorData = await openaiResponse.json();
        console.error("OpenAI API error:", errorData);
        return c.json(
          {
            error: "OpenAI API error",
            message:
              "Failed to get response from AI. Please try again later.",
            details: errorData,
          },
          500,
        );
      }

      const openaiData = await openaiResponse.json();
      const assistantMessage =
        openaiData.choices[0]?.message?.content ||
        "Sorry, I could not generate a response.";

      // Increment question count for this IP
      await kv.set(
        rateLimitKey,
        (questionsAsked + 1).toString(),
      );

      console.log(
        `Chat request from IP: ${clientIP}, count: ${questionsAsked + 1}/${MAX_QUESTIONS_PER_IP}`,
      );

      return c.json({
        message: assistantMessage,
        questionsAsked: questionsAsked + 1,
        maxQuestions: MAX_QUESTIONS_PER_IP,
      });
    } catch (openaiError) {
      console.error("Error calling OpenAI API:", openaiError);
      return c.json(
        {
          error: "Failed to communicate with OpenAI",
          message:
            "The AI service is temporarily unavailable. Please try again later.",
          details: String(openaiError),
        },
        500,
      );
    }
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    return c.json(
      {
        error: "Failed to process chat request",
        details: String(error),
      },
      500,
    );
  }
});

Deno.serve(app.fetch);