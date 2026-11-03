import { Link } from "react-router-dom";
import { ArrowUpRight, Users } from "lucide-react";

export default function ProjectCard({ project, onJoin }) {
  return (
    <article className="flex flex-col rounded-2xl border border-line bg-panel p-5 transition hover:-translate-y-0.5 hover:border-slate-500">
      <div className="mb-3 flex items-start justify-between gap-3">
        <span className="rounded-full bg-indigo-400/10 px-3 py-1 text-xs text-indigo-200">{project.status}</span>
        <span className="flex items-center gap-1 text-xs text-slate-400"><Users size={14}/>{project.collaborators?.length || 0}</span>
      </div>
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-slate-400">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {(project.techStack || []).slice(0, 5).map((tech) => <span key={tech} className="rounded-md border border-line px-2 py-1 text-xs text-slate-300">{tech}</span>)}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <span className="text-xs text-slate-400">By {project.owner?.name || "Developer"}</span>
        <div className="flex gap-2">
          {onJoin && <button onClick={() => onJoin(project)} className="rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-ink hover:opacity-90">Request to join</button>}
          <Link to={`/projects/${project._id}`} className="rounded-lg border border-line p-2 hover:bg-white/5"><ArrowUpRight size={16}/></Link>
        </div>
      </div>
    </article>
  );
}
