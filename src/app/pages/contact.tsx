import { motion } from "motion/react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Send,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "mdaman@example.com",
      link: "mailto:mdaman@example.com",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 XXXXX XXXXX",
      link: "tel:+91XXXXXXXXXX",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "India",
      link: "#",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      username: "@mdaman",
      link: "https://github.com",
      color: "hover:bg-gray-900 hover:text-white",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      username: "MD Aman",
      link: "https://linkedin.com",
      color: "hover:bg-blue-600 hover:text-white",
    },
    {
      icon: Twitter,
      label: "Twitter",
      username: "@mdaman",
      link: "https://twitter.com",
      color: "hover:bg-sky-500 hover:text-white",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-emerald-100 text-emerald-700">Get in Touch</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Let's{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Work Together
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have a project in mind or want to collaborate? I'm always open to discussing 
            new opportunities, innovative ideas, and ways to create impactful solutions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-8 bg-white/70 backdrop-blur-sm border-emerald-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Send a Message</h2>
                  <p className="text-sm text-gray-600">I'll respond within 24 hours</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Project Discussion"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project or idea..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-white resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>

                <p className="text-xs text-center text-gray-500">
                  Your information is safe and will never be shared.
                </p>
              </form>
            </Card>
          </motion.div>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.a
                      key={info.label}
                      href={info.link}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Card className="p-6 bg-white/70 backdrop-blur-sm border-emerald-100 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${info.color} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">{info.label}</p>
                            <p className="font-semibold">{info.value}</p>
                          </div>
                        </div>
                      </Card>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6">Connect on Social</h2>
              <div className="space-y-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Card className={`p-4 bg-white/70 backdrop-blur-sm border-emerald-100 hover:shadow-lg transition-all ${social.color} cursor-pointer group`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Icon className="h-6 w-6 text-gray-700 group-hover:text-inherit transition-colors" />
                            <div>
                              <p className="font-semibold group-hover:text-inherit transition-colors">
                                {social.label}
                              </p>
                              <p className="text-sm text-gray-600 group-hover:text-inherit transition-colors">
                                {social.username}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline" className="group-hover:border-current">
                            Follow
                          </Badge>
                        </div>
                      </Card>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Availability Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-8 bg-gradient-to-br from-emerald-500 to-cyan-500 border-0 text-white">
                <h3 className="text-xl font-bold mb-3">Current Availability</h3>
                <p className="text-emerald-100 mb-6">
                  I'm currently available for freelance projects and full-time opportunities. 
                  Let's create something amazing together!
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm font-medium">Available for work</span>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* FAQ or Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <Card className="p-12 bg-white/70 backdrop-blur-sm border-emerald-100">
            <h2 className="text-2xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2">What's your typical response time?</h3>
                <p className="text-gray-600 text-sm">
                  I usually respond to emails and messages within 24 hours during weekdays.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Do you work on freelance projects?</h3>
                <p className="text-gray-600 text-sm">
                  Yes! I'm open to freelance work, especially interesting and challenging projects.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What's your preferred tech stack?</h3>
                <p className="text-gray-600 text-sm">
                  I specialize in MERN stack but I'm flexible and can adapt to project requirements.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can we schedule a call?</h3>
                <p className="text-gray-600 text-sm">
                  Absolutely! Send me a message and we can arrange a convenient time to discuss.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
