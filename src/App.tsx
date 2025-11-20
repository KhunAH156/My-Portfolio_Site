import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";
import { ChatBot } from "./components/ChatBot";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
      <Toaster />
    </div>
  );
}