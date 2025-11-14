import { ExternalLink, Github } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState, useRef } from "react";
import { projectsAPI, initDefaults } from "../utils/api";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
  demo: string;
  order: number;
}

function TechBadges({ tech }: { tech: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const updateMaxScroll = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = contentRef.current.scrollWidth;
        const scroll = Math.max(0, contentWidth - containerWidth);
        setMaxScroll(scroll);
      }
    };

    updateMaxScroll();
    window.addEventListener('resize', updateMaxScroll);
    return () => window.removeEventListener('resize', updateMaxScroll);
  }, [tech]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={containerRef}
      className="overflow-x-auto mb-4 cursor-grab active:cursor-grabbing select-none scrollbar-hide"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{
        scrollBehavior: isDragging ? 'auto' : 'smooth'
      }}
    >
      <div
        ref={contentRef}
        className="flex gap-2 pb-2"
        style={{
          animation: isPaused || maxScroll === 0 ? 'none' : `bounce-horizontal 8s ease-in-out infinite`,
          '--max-scroll': `-${maxScroll}px`
        } as React.CSSProperties}
      >
        {tech.map((techItem, index) => (
          <span
            key={`${techItem}-${index}`}
            className="px-3 py-1 text-sm bg-white/10 text-white/90 rounded-full border border-white/20 whitespace-nowrap flex-shrink-0"
          >
            {techItem}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      // Initialize defaults if needed
      await initDefaults();
      
      // Fetch projects
      const response = await projectsAPI.getAll();
      setProjects(response.projects || []);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <p className="text-white/70">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-12 md:py-20 px-4 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-white mb-4 text-2xl md:text-3xl lg:text-4xl">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto"></div>
          <p className="text-white/70 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Here are some of my recent projects that showcase my skills and experience in full-stack development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {projects.slice(0, 3).map((project) => (
            <div
              key={project.id}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
            >
              <div className="relative overflow-hidden h-28 md:h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              
              <div className="p-3 md:p-6">
                <h3 className="text-white mb-1.5 md:mb-2 text-base md:text-xl">{project.title}</h3>
                <p className="text-white/70 mb-2.5 md:mb-4 text-xs md:text-base line-clamp-2 md:line-clamp-none">{project.description}</p>
                
                <TechBadges tech={project.tech} />

                <div className="flex gap-2 md:gap-3">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white flex-1 text-xs md:text-sm h-8 md:h-9"
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github size={12} className="mr-1 md:mr-2 md:w-4 md:h-4" />
                      Code
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white flex-1 text-xs md:text-sm h-8 md:h-9"
                  >
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={12} className="mr-1 md:mr-2 md:w-4 md:h-4" />
                      Demo
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}