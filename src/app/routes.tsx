import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { About } from "./pages/about";
import { Experience } from "./pages/experience";
import { Projects } from "./pages/projects";
import { Skills } from "./pages/skills";
import { Contact } from "./pages/contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "experience", Component: Experience },
      { path: "projects", Component: Projects },
      { path: "skills", Component: Skills },
      { path: "contact", Component: Contact },
    ],
  },
]);
