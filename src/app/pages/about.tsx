import { motion } from "motion/react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { GraduationCap, Award, Target, Heart } from "lucide-react";

export function About() {
  const education = [
    {
      degree: "B.Tech - Computer Science & Engineering",
      institution: "ABC College of Engineering",
      location: "City, State",
      period: "2023 - 2027",
      cgpa: "8.5 / 10",
      icon: GraduationCap,
    },
    {
      degree: "Class XII - Science",
      institution: "XYZ Higher Secondary School",
      location: "City, State",
      period: "2021 - 2023",
      cgpa: "90%",
      icon: Award,
    },
  ];

  const interests = [
    "Problem Solving",
    "Open Source",
    "Web Development",
    "Cloud Computing",
    "System Design",
    "Machine Learning",
  ];

  const strengths = [
    {
      title: "Full-Stack Development",
      description: "Proficient in both frontend and backend technologies, creating end-to-end solutions.",
      icon: Target,
    },
    {
      title: "Problem Solving",
      description: "Strong algorithmic thinking with 500+ problems solved on competitive platforms.",
      icon: Award,
    },
    {
      title: "Quick Learner",
      description: "Adaptable to new technologies and frameworks, constantly expanding skill set.",
      icon: Heart,
    },
  ];

  return (
    <div className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-emerald-100 text-emerald-700">About Me</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            A passionate developer with a{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              product-focused mindset
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            I'm a Computer Science student with a keen interest in building scalable web applications. 
            My journey in software development is driven by curiosity and a desire to create solutions 
            that make a real impact.
          </p>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8">Education</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, index) => {
              const Icon = edu.icon;
              return (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="p-6 h-full bg-white/70 backdrop-blur-sm border-emerald-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{edu.degree}</h3>
                        <p className="text-emerald-600 font-medium mb-1">{edu.institution}</p>
                        <p className="text-sm text-gray-600 mb-2">{edu.location}</p>
                        <div className="flex items-center justify-between mt-3">
                          <Badge variant="outline" className="text-xs">
                            {edu.period}
                          </Badge>
                          <span className="text-sm font-semibold text-emerald-600">
                            {edu.cgpa}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Strengths Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8">Key Strengths</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {strengths.map((strength, index) => {
              const Icon = strength.icon;
              return (
                <motion.div
                  key={strength.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="p-6 h-full bg-white/70 backdrop-blur-sm border-emerald-100 hover:shadow-lg transition-all hover:-translate-y-1">
                    <Icon className="h-8 w-8 text-emerald-600 mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{strength.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {strength.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Interests Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8">Interests & Focus Areas</h2>
          <Card className="p-8 bg-white/70 backdrop-blur-sm border-emerald-100">
            <div className="flex flex-wrap gap-3">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * index }}
                >
                  <Badge
                    variant="outline"
                    className="text-base px-4 py-2 bg-gradient-to-r from-emerald-50 to-cyan-50 hover:from-emerald-100 hover:to-cyan-100 transition-colors cursor-default"
                  >
                    {interest}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <Card className="p-12 text-center bg-gradient-to-br from-emerald-500 to-cyan-500 border-0">
            <blockquote className="text-2xl sm:text-3xl font-medium text-white mb-4">
              "Code is like humor. When you have to explain it, it's bad."
            </blockquote>
            <p className="text-emerald-100">— Cory House</p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
