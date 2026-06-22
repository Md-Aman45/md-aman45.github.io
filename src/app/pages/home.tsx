import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import { ArrowRight, Github, Linkedin, Mail, Code, Database, Cloud } from "lucide-react";
import { Link } from "react-router";

export function Home() {
  const stats = [
    { value: "5+", label: "Projects Deployed", icon: Code },
    { value: "500+", label: "DSA Problems", icon: Database },
    { value: "8.5", label: "CGPA", icon: Cloud },
    { value: "90%", label: "Coding Score", icon: Code },
  ];

  const techStack = [
    "React", "Node.js", "Python", "Java", "TypeScript", 
    "MongoDB", "PostgreSQL", "AWS", "Docker", "Git"
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                Available for Opportunities
              </Badge>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                MD Aman
              </h1>
              
              <h2 className="text-2xl sm:text-3xl mb-6 text-gray-700">
                Full-Stack Developer & Problem Solver
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Passionate about building scalable web applications with modern technologies. 
                Specialized in MERN stack, cloud deployment, and creating seamless user experiences.
              </p>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {techStack.slice(0, 6).map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Badge variant="outline" className="bg-white/50 backdrop-blur-sm">
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link to="/projects">
                  <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 gap-2">
                    View Projects
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline">
                    Get in Touch
                  </Button>
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-8">
                <Button size="icon" variant="ghost" className="hover:bg-emerald-100">
                  <Github className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="hover:bg-emerald-100">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost" className="hover:bg-emerald-100">
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>

            {/* Right Content - 3D Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full h-[500px] flex items-center justify-center">
                {/* Floating elements */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl shadow-2xl transform rotate-12"
                />
                
                <motion.div
                  animate={{
                    y: [0, 20, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-3xl shadow-2xl transform -rotate-12"
                />
                
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 10, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-teal-400 to-teal-600 rounded-3xl shadow-2xl"
                />

                {/* Orbiting ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 border-4 border-emerald-200/30 rounded-full"
                  style={{ width: "400px", height: "400px", margin: "auto" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-shadow bg-white/70 backdrop-blur-sm border-emerald-100">
                    <Icon className="h-8 w-8 mx-auto mb-3 text-emerald-600" />
                    <div className="text-3xl font-bold mb-2 text-emerald-600">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Highlights */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What I Do</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Focused on delivering high-quality solutions across the full development stack
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Frontend Development",
                description: "Building responsive and interactive user interfaces with React, TypeScript, and modern CSS frameworks.",
                icon: Code,
              },
              {
                title: "Backend Engineering",
                description: "Developing robust APIs and server-side logic with Node.js, Express, and database management.",
                icon: Database,
              },
              {
                title: "Cloud & DevOps",
                description: "Deploying and managing applications on AWS, implementing CI/CD pipelines, and containerization.",
                icon: Cloud,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="p-8 h-full hover:shadow-lg transition-all hover:-translate-y-1 bg-white/70 backdrop-blur-sm border-emerald-100">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
