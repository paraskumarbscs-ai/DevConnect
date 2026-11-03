import { useEffect, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import api from "../api/client.js";
import ProjectCard from "../components/ProjectCard.jsx";

export default function DiscoverPage() {
  const [projects, setProjects] = useState([]);
  const [q, setQ] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = async (query = "") => {
    try {
      const { data } = await api.get("/projects", { params: { q: query } });
      setProjects(data.projects); setError("");
    } catch (err) { setError(err.response?.data?.message || "Could not load projects"); }
  };

  useEffect(() => { load(); }, []);

  const join = async (project) => {
    setNotice("");
    try {
      await api.post("/collaborations", { projectId: project._id, message: "I'd like to contribute to this project." });
      setNotice("Collaboration request sent!");
    } catch (err) { setNotice(err.response?.data?.message || "Could not send request"); }
  };

  return (
    <div>
      <section className="mb-7 overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-indigo-500/20 via-panel to-panel p-7 md:p-10">
        <div className="flex items-center gap-2 text-sm text-indigo-200"><Sparkles size={16}/> Developer community</div>
        <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight md:text-4xl">Build better software, <span className="text-indigo-300">together.</span></h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">Discover interesting projects, meet developers, and find your next collaboration.</p>
        <form onSubmit={(e) => { e.preventDefault(); load(q); }} className="mt-6 flex max-w-xl gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-line bg-ink/80 px-3"><Search size={18} className="text-slate-400"/><input className="w-full bg-transparent py-3 text-sm outline-none" placeholder="Search projects or technologies..." value={q} onChange={(e) => setQ(e.target.value)}/></div>
          <button className="rounded-xl bg-accent px-5 text-sm font-semibold text-ink">Search</button>
        </form>
      </section>
      {notice && <p className="mb-4 rounded-xl border border-line bg-panel p-3 text-sm text-indigo-200">{notice}</p>}
      <div className="mb-4 flex items-end justify-between"><div><h2 className="text-xl font-semibold">Explore projects</h2><p className="mt-1 text-sm text-slate-400">Find a project worth building.</p></div><span className="text-xs text-slate-500">{projects.length} results</span></div>
      {error && <p className="rounded-xl bg-red-500/10 p-4 text-red-300">{error}</p>}
      {projects.length ? <div className="grid gap-4 lg:grid-cols-2">{projects.map((p) => <ProjectCard key={p._id} project={p} onJoin={join}/>)}</div> : !error && <div className="rounded-2xl border border-dashed border-line p-10 text-center text-slate-400">No projects found yet. Be the first to publish one.</div>}
    </div>
  );
}
