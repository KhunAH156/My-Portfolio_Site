import { Code2, Rocket, Users, GraduationCap } from "lucide-react";
import profileImage from "https://bsegbckgpblybpueonse.supabase.co/storage/v1/object/public/KhunPortfolio/Khun.jpeg";

export function About() {
  const highlights = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and well-documented code is my priority.",
    },
    {
      icon: Rocket,
      title: "Fast Performance",
      description: "Optimizing applications for speed and efficiency across all devices.",
    },
    {
      icon: Users,
      title: "User-Focused",
      description: "Creating intuitive experiences that users love and businesses value.",
    },
  ];

  return (
    <section id="about" className="py-12 md:py-20 px-4 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-white mb-4 text-3xl md:text-4xl">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-8 md:mb-16">
          <div className="space-y-4 md:space-y-6">
            <p className="text-white/80 text-xs md:text-base lg:text-lg">
              I'm a Computer Engineering student at Singapore Polytechnic with a passion for systems engineering. 
              My internship at SP Group's Network Management System team gave me hands-on experience with IT infrastructure, 
              automation, and supporting mission-critical smart metering operations.
            </p>
            <p className="text-white/80 text-xs md:text-base lg:text-lg">
              I specialize in system optimization, SQL scripting, automation workflows, and cloud technologies. 
              Whether it's troubleshooting network systems or streamlining operational processes, I'm driven to 
              build reliable and efficient infrastructure solutions.
            </p>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-3 md:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
              {/* Stats */}
              <div className="flex-1 space-y-2 md:space-y-4 w-full">
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-blue-400"></div>
                  <div>
                    <p className="text-white/60 text-xs md:text-sm">Education</p>
                    <p className="text-white text-xs md:text-base">Computer Engineering</p>
                    <p className="text-white/80 text-[10px] md:text-sm">Singapore Polytechnic</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-cyan-400"></div>
                  <div>
                    <p className="text-white/60 text-xs md:text-sm">Experience</p>
                    <p className="text-white text-xs md:text-base">1+ Year</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-blue-400"></div>
                  <div>
                    <p className="text-white/60 text-xs md:text-sm">Projects Completed</p>
                    <p className="text-white text-xs md:text-base">15+</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-cyan-400"></div>
                  <div>
                    <p className="text-white/60 text-xs md:text-sm">Technologies Mastered</p>
                    <p className="text-white text-xs md:text-base">10+</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-4">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-blue-400"></div>
                  <div>
                    <p className="text-white/60 text-xs md:text-sm">Coffee Consumed</p>
                    <p className="text-white text-xs md:text-base">∞</p>
                  </div>
                </div>
              </div>

              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="relative w-40 h-40 md:w-64 md:h-64 rounded-xl overflow-hidden border-4 border-white/20 shadow-xl">
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3 md:gap-8">
          {highlights.map((highlight) => (
            <div
              key={highlight.title}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-3 md:p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-2 md:mb-4">
                <highlight.icon className="text-white" size={16} />
              </div>
              <h3 className="text-white mb-1.5 md:mb-2 text-sm md:text-lg">{highlight.title}</h3>
              <p className="text-white/70 text-xs md:text-base">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}