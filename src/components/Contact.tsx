import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { contactAPI } from "../utils/api";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await contactAPI.submit(formData);
      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-12 md:py-20 px-4 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-white mb-4 text-2xl md:text-3xl lg:text-4xl">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto"></div>
          <p className="text-white/70 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Have a project in mind or want to discuss opportunities? Feel free to reach out!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12">
          <div className="space-y-4 md:space-y-8">
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-3 md:p-6">
              <h3 className="text-white mb-3 md:mb-6 text-base md:text-xl">Contact Information</h3>
              
              <div className="space-y-2.5 md:space-y-4">
                <div className="flex items-start gap-2.5 md:gap-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <Mail size={14} className="text-white md:w-5 md:h-5" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs md:text-sm">Email</p>
                    <p className="text-white text-xs md:text-base">khunaunghein156@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 md:gap-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <Phone size={14} className="text-white md:w-5 md:h-5" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs md:text-sm">Phone</p>
                    <p className="text-white text-xs md:text-base">+65 9655 2808</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 md:gap-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <MapPin size={14} className="text-white md:w-5 md:h-5" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs md:text-sm">Location</p>
                    <p className="text-white text-xs md:text-base">Singapore</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-3 md:p-6">
              <h3 className="text-white mb-2.5 md:mb-4 text-base md:text-xl">Let's Work Together</h3>
              <p className="text-white/70 text-xs md:text-base">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part 
                of your vision. Whether you're looking for a developer to join your team or 
                need someone to bring your project to life, let's connect!
              </p>
            </div>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-3 md:p-6">
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-6">
              <div>
                <label htmlFor="name" className="block text-white/90 mb-1.5 md:mb-2 text-xs md:text-base">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 text-xs md:text-base h-9 md:h-10"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white/90 mb-1.5 md:mb-2 text-xs md:text-base">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 text-xs md:text-base h-9 md:h-10"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-white/90 mb-1.5 md:mb-2 text-xs md:text-base">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 text-xs md:text-base h-9 md:h-10"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white/90 mb-1.5 md:mb-2 text-xs md:text-base">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400 min-h-[100px] md:min-h-[150px] text-xs md:text-base"
                  placeholder="Tell me about your project..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-xs md:text-base h-9 md:h-11"
                size="lg"
                disabled={isSubmitting}
              >
                <Send size={14} className="mr-1.5 md:mr-2 md:w-4 md:h-4" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}