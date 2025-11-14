import { Github, Linkedin, Mail, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/40 border-t border-white/10 py-6 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-4 md:gap-8 mb-4 md:mb-8">
          <div>
            <h3 className="text-white mb-2 md:mb-4 text-sm md:text-base">{"<Khun />"}</h3>
            <p className="text-white/70 text-xs md:text-base">
              Building the future, one line of code at a time.
            </p>
          </div>

          <div>
            <h4 className="text-white mb-2 md:mb-4 text-sm md:text-base">Quick Links</h4>
            <ul className="space-y-1 md:space-y-2">
              <li>
                <a href="#home" className="text-white/70 hover:text-white transition-colors text-xs md:text-base">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-white/70 hover:text-white transition-colors text-xs md:text-base">
                  About
                </a>
              </li>
              <li>
                <a href="#experience" className="text-white/70 hover:text-white transition-colors text-xs md:text-base">
                  Experience
                </a>
              </li>
              <li>
                <a href="#projects" className="text-white/70 hover:text-white transition-colors text-xs md:text-base">
                  Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="text-white/70 hover:text-white transition-colors text-xs md:text-base">
                  Skills
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/70 hover:text-white transition-colors text-xs md:text-base">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-2 md:mb-4 text-sm md:text-base">Connect</h4>
            <div className="flex gap-2 md:gap-4">
              <a
                href="https://github.com/KhunAH156"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <Github size={16} className="md:w-5 md:h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/khunaunghein"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <Linkedin size={16} className="md:w-5 md:h-5" />
              </a>
              <a
                href="mailto:khunaunghein156@gmail.com"
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <Mail size={16} className="md:w-5 md:h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 md:pt-8 text-center">
          <p className="text-white/70 flex items-center justify-center gap-2 text-xs md:text-base">
            © {currentYear} Made with <Heart size={14} className="text-cyan-400 fill-cyan-400 md:w-4 md:h-4" /> by Khun Aung Hein
          </p>
        </div>
      </div>
    </footer>
  );
}