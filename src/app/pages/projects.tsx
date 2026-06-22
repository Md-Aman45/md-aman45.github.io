import { motion } from "motion/react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { ExternalLink, Github, Zap, Database, Cloud, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const projects = [
    {
      title: "E-Commerce Platform",
      category: "full-stack",
      description: "A complete e-commerce solution with shopping cart, payment integration, and admin dashboard.",
      longDescription: "Built a comprehensive e-commerce platform with user authentication, product management, cart functionality, and secure payment processing using Stripe API.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe", "Redux"],
      features: [
        "User authentication with JWT",
        "Product catalog with search and filters",
        "Shopping cart and wishlist",
        "Secure payment gateway integration",
        "Admin panel for inventory management",
        "Order tracking and history",
      ],
      metrics: [
        { label: "Users", value: "500+" },
        { label: "Products", value: "1000+" },
        { label: "Uptime", value: "99.9%" },
      ],
      github: "#",
      live: "#",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Task Management App",
      category: "frontend",
      description: "A modern task management application with drag-and-drop, real-time updates, and team collaboration.",
      longDescription: "Collaborative task manager with kanban boards, real-time synchronization, and team features for project management.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS", "DnD Kit"],
      features: [
        "Drag-and-drop kanban boards",
        "Real-time collaboration",
        "Task priority and labels",
        "Team member assignments",
        "Activity timeline",
        "Dark mode support",
      ],
      metrics: [
        { label: "Tasks Created", value: "5000+" },
        { label: "Active Users", value: "200+" },
        { label: "Completion Rate", value: "85%" },
      ],
      github: "#",
      live: "#",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Social Media Dashboard",
      category: "full-stack",
      description: "Analytics dashboard for tracking social media metrics across multiple platforms.",
      longDescription: "Unified dashboard that aggregates data from various social media APIs to provide comprehensive analytics and insights.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      technologies: ["Next.js", "PostgreSQL", "Prisma", "Chart.js", "OAuth"],
      features: [
        "Multi-platform integration",
        "Real-time analytics",
        "Custom reports and exports",
        "Engagement tracking",
        "Automated posting schedule",
        "Performance insights",
      ],
      metrics: [
        { label: "Platforms", value: "5" },
        { label: "Data Points", value: "1M+" },
        { label: "Reports Generated", value: "300+" },
      ],
      github: "#",
      live: "#",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Weather Forecast App",
      category: "frontend",
      description: "Beautiful weather application with 7-day forecasts, location search, and weather alerts.",
      longDescription: "Weather app providing accurate forecasts with interactive maps, weather alerts, and detailed meteorological data.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      technologies: ["React", "OpenWeather API", "Mapbox", "CSS3"],
      features: [
        "7-day weather forecasts",
        "Hourly predictions",
        "Location-based weather",
        "Interactive weather maps",
        "Severe weather alerts",
        "Beautiful animations",
      ],
      metrics: [
        { label: "API Calls", value: "10K+/day" },
        { label: "Cities", value: "50K+" },
        { label: "Accuracy", value: "95%" },
      ],
      github: "#",
      live: "#",
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Blog CMS",
      category: "backend",
      description: "Content management system for blogs with rich text editor and media management.",
      longDescription: "Full-featured CMS with markdown support, SEO optimization, and multi-author capabilities for managing blog content.",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      technologies: ["Node.js", "Express", "MongoDB", "AWS S3", "JWT"],
      features: [
        "Rich text editor",
        "Media upload and management",
        "SEO optimization tools",
        "Multi-author support",
        "Draft and publish workflow",
        "Analytics integration",
      ],
      metrics: [
        { label: "Posts", value: "1000+" },
        { label: "Authors", value: "50+" },
        { label: "Monthly Visitors", value: "10K+" },
      ],
      github: "#",
      live: "#",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Chat Application",
      category: "full-stack",
      description: "Real-time chat application with private messaging, group chats, and file sharing.",
      longDescription: "WebSocket-based chat platform with end-to-end encryption, multimedia support, and voice messaging capabilities.",
      image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      technologies: ["React", "Socket.io", "Node.js", "Redis", "MongoDB"],
      features: [
        "Real-time messaging",
        "Group chat rooms",
        "File and image sharing",
        "Voice messages",
        "Online status indicators",
        "Message encryption",
      ],
      metrics: [
        { label: "Messages", value: "100K+" },
        { label: "Active Users", value: "1K+" },
        { label: "Response Time", value: "<50ms" },
      ],
      github: "#",
      live: "#",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const categories = [
    { value: "all", label: "All Projects" },
    { value: "full-stack", label: "Full-Stack" },
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-emerald-100 text-emerald-700">Projects</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Featured{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Work & Projects
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A showcase of production-ready applications built with modern technologies 
            and best practices.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 bg-white/70 backdrop-blur-sm">
              {categories.map((cat) => (
                <TabsTrigger key={cat.value} value={cat.value}>
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="group"
            >
              <Card className="overflow-hidden bg-white/70 backdrop-blur-sm border-emerald-100 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                {/* Project Image */}
                <div className="relative overflow-hidden h-64 bg-gradient-to-br from-gray-100 to-gray-200">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Floating badges */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <Badge
                      variant="outline"
                      className={`bg-gradient-to-r ${project.color} text-white border-0`}
                    >
                      {project.category}
                    </Badge>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Features */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
                      Key Features
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {project.features.slice(0, 4).map((feature) => (
                        <div key={feature} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-600 leading-tight">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-lg">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="text-center">
                        <div className="font-bold text-emerald-600">{metric.value}</div>
                        <div className="text-xs text-gray-600">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="mt-auto">
                    <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6">
                    <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600 gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2">
                      <Github className="h-4 w-4" />
                      Code
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <Card className="p-12 bg-gradient-to-br from-emerald-500 to-cyan-500 border-0">
            <div className="grid md:grid-cols-3 gap-8 text-center text-white">
              <div>
                <Zap className="h-10 w-10 mx-auto mb-3" />
                <div className="text-4xl font-bold mb-2">12+</div>
                <div className="text-emerald-100">Projects Completed</div>
              </div>
              <div>
                <Database className="h-10 w-10 mx-auto mb-3" />
                <div className="text-4xl font-bold mb-2">5000+</div>
                <div className="text-emerald-100">Lines of Code</div>
              </div>
              <div>
                <Cloud className="h-10 w-10 mx-auto mb-3" />
                <div className="text-4xl font-bold mb-2">99%</div>
                <div className="text-emerald-100">Uptime Average</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
