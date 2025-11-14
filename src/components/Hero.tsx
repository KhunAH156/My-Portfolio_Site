import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-white mb-4 text-5xl md:text-7xl font-bold">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Khun Aung Hein</span>
          </h1>
          <h2 className="text-white/90 mb-6">Aspiring Systems Engineer</h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Passionate about designing, implementing, and maintaining reliable IT infrastructure. 
            Focused on automation, system optimization, and ensuring seamless operations across networks, 
            servers, and cloud platforms.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-12">
          <Button asChild variant="default" size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            <a href="#contact">Get In Touch</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white">
            <a href="#projects">View My Work</a>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-6">
          <a
            href="https://github.com/KhunAH156"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors duration-200"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/khunaunghein"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors duration-200"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:khunaunghein156@gmail.com"
            className="text-white/70 hover:text-white transition-colors duration-200"
          >
            <Mail size={24} />
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="text-white/50" size={32} />
        </div>
      </div>
    </section>
  );
}