import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client.js";
import ProjectCard from "../components/ProjectCard.jsx";

export default function MyProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    api.get("/projects").then(({ data }) => setProjects(data.projects))
      .catch((err) => setError(err.response?.data?.message || "Unable to load projects"));
  }, []);
  return <div><div className="mb-6 flex items-center justify-between"><div><h1 className="text-2xl font-bold">My workspace</h1><p className="mt-2 text-sm text-slate-400">Projects currently listed on DevConnect.</p></div><Link to="/projects/new" className="rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-ink">New project</Link></div>{error && <p className="text-red-300">{error}</p>}<div className="grid gap-4 lg:grid-cols-2">{projects.map(p => <ProjectCard key={p._id} project={p}/>)}</div></div>;
}
