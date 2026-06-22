import { motion } from "motion/react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Code, Database, Cloud, Wrench, GitBranch, Palette } from "lucide-react";

export function Skills() {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "React / Next.js", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "HTML & CSS", level: 95 },
        { name: "Tailwind CSS", level: 90 },
        { name: "JavaScript (ES6+)", level: 90 },
        { name: "Redux / State Management", level: 80 },
      ],
    },
    {
      title: "Backend Development",
      icon: Database,
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "Node.js / Express", level: 85 },
        { name: "Python / Django", level: 75 },
        { name: "REST APIs", level: 90 },
        { name: "GraphQL", level: 70 },
        { name: "Authentication (JWT, OAuth)", level: 85 },
        { name: "Microservices", level: 75 },
      ],
    },
    {
      title: "Database & Storage",
      icon: Database,
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "MongoDB", level: 85 },
        { name: "PostgreSQL", level: 80 },
        { name: "MySQL", level: 75 },
        { name: "Redis", level: 70 },
        { name: "Firebase", level: 80 },
        { name: "Prisma ORM", level: 75 },
      ],
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      color: "from-orange-500 to-red-500",
      skills: [
        { name: "AWS (EC2, S3, Lambda)", level: 80 },
        { name: "Docker", level: 85 },
        { name: "GitHub Actions CI/CD", level: 80 },
        { name: "Nginx", level: 75 },
        { name: "Vercel / Netlify", level: 90 },
        { name: "Linux Server Management", level: 75 },
      ],
    },
    {
      title: "Tools & Frameworks",
      icon: Wrench,
      color: "from-indigo-500 to-purple-500",
      skills: [
        { name: "Git / GitHub", level: 95 },
        { name: "VS Code", level: 95 },
        { name: "Postman / API Testing", level: 90 },
        { name: "Webpack / Vite", level: 80 },
        { name: "Jest / Testing", level: 75 },
        { name: "Figma / Design Tools", level: 70 },
      ],
    },
    {
      title: "Other Skills",
      icon: Palette,
      color: "from-teal-500 to-cyan-500",
      skills: [
        { name: "Data Structures & Algorithms", level: 85 },
        { name: "System Design", level: 75 },
        { name: "Agile / Scrum", level: 80 },
        { name: "Technical Writing", level: 85 },
        { name: "Problem Solving", level: 90 },
        { name: "Team Collaboration", level: 90 },
      ],
    },
  ];

  const codingPlatforms = [
    {
      platform: "LeetCode",
      solved: "500+",
      rating: "1800+",
      badge: "Knight",
      color: "bg-orange-500",
    },
    {
      platform: "CodeForces",
      solved: "300+",
      rating: "1400+",
      badge: "Specialist",
      color: "bg-cyan-500",
    },
    {
      platform: "GeeksforGeeks",
      solved: "400+",
      rating: "2000+",
      badge: "5★",
      color: "bg-green-500",
    },
    {
      platform: "HackerRank",
      solved: "200+",
      rating: "Gold",
      badge: "5★",
      color: "bg-emerald-500",
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
          <Badge className="mb-4 bg-emerald-100 text-emerald-700">Skills & Expertise</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Tech Stack &{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Proficiencies
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical skills, tools, and coding achievements 
            across various platforms.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="p-6 bg-white/70 backdrop-blur-sm border-emerald-100 hover:shadow-lg transition-shadow h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 * skillIndex }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-sm text-emerald-600 font-semibold">
                            {skill.level}%
                          </span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Coding Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Coding Platforms</h2>
            <p className="text-gray-600">
              Active problem solver across multiple competitive programming platforms
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {codingPlatforms.map((platform, index) => (
              <motion.div
                key={platform.platform}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="p-6 text-center bg-white/70 backdrop-blur-sm border-emerald-100 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className={`w-16 h-16 rounded-full ${platform.color} mx-auto mb-4 flex items-center justify-center`}>
                    <Code className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{platform.platform}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Problems Solved</span>
                      <span className="font-semibold text-emerald-600">
                        {platform.solved}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Rating</span>
                      <span className="font-semibold text-emerald-600">
                        {platform.rating}
                      </span>
                    </div>
                    <Badge className={`${platform.color} text-white mt-2`}>
                      {platform.badge}
                    </Badge>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications or Additional Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <Card className="p-12 bg-gradient-to-br from-emerald-500 to-cyan-500 border-0 text-center">
            <GitBranch className="h-12 w-12 mx-auto mb-4 text-white" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Always Learning, Always Growing
            </h2>
            <p className="text-emerald-100 text-lg mb-6 max-w-2xl mx-auto">
              Technology evolves rapidly, and so do I. Constantly exploring new frameworks, 
              tools, and best practices to stay ahead in the field.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                Continuous Learning
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                Open Source Contributor
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                Community Active
              </Badge>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
