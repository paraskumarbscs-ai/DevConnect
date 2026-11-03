import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/client.js";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    api.get(`/projects/${id}`).then(({ data }) => setProject(data.project))
      .catch((err) => setError(err.response?.data?.message || "Project not found"));
  }, [id]);
  if (error) return <p className="text-red-300">{error}</p>;
  if (!project) return <p className="text-slate-400">Loading project...</p>;
  return <article className="rounded-2xl border border-line bg-panel p-7">
    <Link to="/" className="text-sm text-indigo-300 hover:underline">← Back to discover</Link>
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3"><span className="rounded-full bg-indigo-400/10 px-3 py-1 text-xs text-indigo-200">{project.status}</span><span className="text-sm text-slate-400">Created by {project.owner?.name}</span></div>
    <h1 className="mt-4 text-3xl font-bold">{project.title}</h1>
    <p className="mt-4 whitespace-pre-wrap leading-7 text-slate-300">{project.description}</p>
    <div className="mt-6 flex flex-wrap gap-2">{project.techStack?.map(t => <span key={t} className="rounded-md border border-line px-3 py-2 text-sm">{t}</span>)}</div>
    <div className="mt-8 flex flex-wrap gap-3">{project.repositoryUrl && <a className="rounded-xl border border-line px-4 py-3 text-sm hover:bg-white/5" href={project.repositoryUrl} target="_blank" rel="noreferrer">View repository ↗</a>}{project.demoUrl && <a className="rounded-xl border border-line px-4 py-3 text-sm hover:bg-white/5" href={project.demoUrl} target="_blank" rel="noreferrer">Live demo ↗</a>}</div>
    <div className="mt-8 border-t border-line pt-5"><h2 className="font-semibold">Collaborators ({project.collaborators?.length || 0})</h2><p className="mt-2 text-sm text-slate-400">{project.collaborators?.map(c => c.name).join(", ") || "No collaborators yet."}</p></div>
  </article>;
}
