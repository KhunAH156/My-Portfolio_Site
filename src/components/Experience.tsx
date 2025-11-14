import { Briefcase, Calendar, MapPin } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-white mb-4 text-2xl md:text-3xl lg:text-4xl">Experience</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 md:p-8 hover:bg-white/10 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div className="mb-3 md:mb-0">
                <h3 className="text-white text-lg md:text-2xl mb-2">Intern — Network Management System (NMS), Application Support</h3>
                <div className="flex items-center gap-2 text-blue-400 mb-2">
                  <Briefcase size={18} />
                  <span className="text-base md:text-lg">SP Group</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 text-white/60 text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>Singapore (On-site)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white/70 bg-white/5 px-3 py-1.5 rounded-lg w-fit text-sm md:text-base">
                <Calendar size={16} />
                <span>Internship</span>
              </div>
            </div>

            <p className="text-white/80 text-sm md:text-base mb-4 md:mb-6">
              Supported the Network Management System (NMS) team for Singapore's smart metering operations. Worked closely with field technicians, engineers, and end users to investigate system issues, gather requirements, and contribute to enhancements. Assisted with reporting automation, UAT verification, and early cloud-migration efforts by improving SQL logic and operational workflows.
            </p>

            <div className="mb-4">
              <h4 className="text-white text-base md:text-lg mb-3">Key Skills & Responsibilities:</h4>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                <p className="text-white/80 text-sm md:text-base">
                  Requirement gathering with technicians and end users to understand NMS and smart meter issues
                </p>
              </div>

              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                <p className="text-white/80 text-sm md:text-base">
                  SQL scripting with Oracle SQL Developer for operational and performance reporting
                </p>
              </div>

              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                <p className="text-white/80 text-sm md:text-base">
                  Automation of recurring reports using Linux shell scripting to streamline workflows
                </p>
              </div>

              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                <p className="text-white/80 text-sm md:text-base">
                  Designing and executing automated, reusable UAT test cases using Tosca
                </p>
              </div>

              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                <p className="text-white/80 text-sm md:text-base">
                  Extracting and refactoring SQL logic from legacy XML-based reports for cloud migration
                </p>
              </div>

              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                <p className="text-white/80 text-sm md:text-base">
                  Supporting system upgrades, troubleshooting issues, and collaborating with cross-functional teams
                </p>
              </div>
            </div>

            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs md:text-sm">Oracle SQL</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs md:text-sm">Linux Shell Scripting</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs md:text-sm">Tosca</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs md:text-sm">UAT Testing</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs md:text-sm">Cloud Migration</span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs md:text-sm">Smart Metering</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}