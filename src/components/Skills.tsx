export function Skills() {
  const skillCategories = [
    {
      category: "Frontend",
      skills: [
        { name: "React", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Tailwind CSS", level: 92 },
        { name: "HTML/CSS", level: 98 },
      ],
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Python", level: 85 },
        { name: "Java", level: 82 },
        { name: "REST APIs", level: 93 },
      ],
    },
    {
      category: "DevOps & Tools",
      skills: [
        { name: "Git", level: 95 },
        { name: "Docker", level: 83 },
        { name: "AWS", level: 80 },
        { name: "CI/CD", level: 85 },
        { name: "Linux", level: 88 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-white mb-4 text-2xl md:text-3xl lg:text-4xl">Skills & Technologies</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto"></div>
          <p className="text-white/70 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            A comprehensive overview of my technical skills and proficiency levels across various technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.category}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-3 md:p-6 hover:bg-white/10 transition-all duration-300"
            >
              <h3 className="text-white mb-3 md:mb-6 text-center text-base md:text-xl">{category.category}</h3>
              
              <div className="space-y-2.5 md:space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1 md:mb-2">
                      <span className="text-white/90 text-xs md:text-base">{skill.name}</span>
                      <span className="text-white/60 text-xs md:text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 md:h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 md:mt-12 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-3 md:p-8">
          <h3 className="text-white mb-3 md:mb-6 text-center text-base md:text-xl">Additional Expertise</h3>
          <div className="flex flex-wrap justify-center gap-1.5 md:gap-3">
            {[
              "Agile/Scrum",
              "Responsive Design",
              "WebSockets",
              "System Monitoring",
              "Network Troubleshooting",
              "SQL Scripting",
              "Technical Documentation",
            ].map((skill) => (
              <span
                key={skill}
                className="px-2.5 md:px-4 py-1 md:py-2 bg-white/10 text-white/90 rounded-full border border-white/20 hover:bg-white/20 transition-colors duration-200 text-xs md:text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}