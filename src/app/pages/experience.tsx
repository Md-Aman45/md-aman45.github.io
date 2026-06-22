import { motion } from "motion/react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Briefcase, Calendar, ExternalLink, CheckCircle2 } from "lucide-react";

export function Experience() {
  const experiences = [
    {
      title: "Full-Stack Developer Intern",
      company: "Tech Startup Inc.",
      location: "Remote",
      period: "Jan 2026 - Present",
      type: "Internship",
      description: "Working on building scalable web applications using modern tech stack.",
      achievements: [
        "Developed and deployed 3 production-ready applications serving 1000+ users",
        "Implemented RESTful APIs with JWT authentication and role-based access control",
        "Integrated third-party services including payment gateways and email notifications",
        "Optimized database queries reducing response time by 40%",
        "Collaborated with design team to create responsive UI components",
      ],
      technologies: ["React", "Node.js", "MongoDB", "Express", "AWS", "Docker"],
    },
    {
      title: "Frontend Developer",
      company: "Innovation Labs",
      location: "Hybrid",
      period: "Jun 2025 - Dec 2025",
      type: "Freelance",
      description: "Created responsive web interfaces and improved user experience.",
      achievements: [
        "Built 5+ landing pages with conversion rate improvement of 25%",
        "Implemented dark mode and accessibility features across all projects",
        "Reduced bundle size by 30% through code splitting and lazy loading",
        "Integrated analytics and tracking for user behavior insights",
      ],
      technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Framer Motion"],
    },
    {
      title: "Open Source Contributor",
      company: "Various Projects",
      location: "Remote",
      period: "2024 - Present",
      type: "Volunteer",
      description: "Contributing to open-source projects and building developer tools.",
      achievements: [
        "Contributed to 10+ open-source repositories on GitHub",
        "Fixed bugs and added features to popular React libraries",
        "Created documentation and tutorials for developer community",
        "Participated in hackathons and coding challenges",
      ],
      technologies: ["JavaScript", "Python", "Git", "GitHub Actions"],
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Internship":
        return "bg-emerald-100 text-emerald-700";
      case "Freelance":
        return "bg-cyan-100 text-cyan-700";
      case "Volunteer":
        return "bg-teal-100 text-teal-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
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
          <Badge className="mb-4 bg-emerald-100 text-emerald-700">Experience</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Building{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              production-ready solutions
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Hands-on experience in developing, deploying, and maintaining web applications 
            across different domains and team environments.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-200 via-cyan-200 to-teal-200" />

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title + exp.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className={`relative md:grid md:grid-cols-2 md:gap-8 ${
                  index % 2 === 0 ? "" : "md:grid-flow-dense"
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 ring-4 ring-emerald-50 z-10" />

                {/* Content */}
                <div className={index % 2 === 0 ? "md:col-start-2" : "md:col-start-1"}>
                  <Card className="p-8 bg-white/70 backdrop-blur-sm border-emerald-100 hover:shadow-xl transition-all">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Briefcase className="h-5 w-5 text-emerald-600" />
                          <Badge className={getTypeColor(exp.type)}>{exp.type}</Badge>
                        </div>
                        <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                        <p className="text-emerald-600 font-medium mb-1">{exp.company}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{exp.period}</span>
                          <span className="text-gray-400">•</span>
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-6">{exp.description}</p>

                    {/* Achievements */}
                    <div className="space-y-3 mb-6">
                      {exp.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {achievement}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="border-t border-gray-200 pt-6">
                      <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">
                        Technologies Used
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="bg-gradient-to-r from-emerald-50 to-cyan-50"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Spacer for alternating layout */}
                {index % 2 === 0 ? (
                  <div className="hidden md:block" />
                ) : null}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <Card className="p-12 text-center bg-gradient-to-br from-emerald-500 to-cyan-500 border-0">
            <h2 className="text-3xl font-bold text-white mb-4">
              Want to work together?
            </h2>
            <p className="text-emerald-100 mb-8 text-lg">
              I'm always open to discussing new projects and opportunities.
            </p>
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-50 gap-2"
            >
              View All Projects
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
