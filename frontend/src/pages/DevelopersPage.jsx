import { useEffect, useState } from "react";
import { Search, Github, MapPin } from "lucide-react";
import api from "../api/client.js";

export default function DevelopersPage() {
  const [q, setQ] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const search = async (query = "") => {
    try { const { data } = await api.get("/users/search", { params: { q: query } }); setUsers(data.users); setError(""); }
    catch (err) { setError(err.response?.data?.message || "Unable to search developers"); }
  };
  useEffect(() => { search(); }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold">Find developers</h1>
      <p className="mb-6 mt-2 text-sm text-slate-400">Search by name or skill and find your next teammate.</p>
      <form onSubmit={(e) => { e.preventDefault(); search(q); }} className="mb-6 flex gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-line bg-panel px-3"><Search size={18} className="text-slate-400"/><input className="w-full bg-transparent py-3 text-sm outline-none" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try React, Python, designer..."/></div>
        <button className="rounded-xl bg-accent px-5 text-sm font-semibold text-ink">Search</button>
      </form>
      {error && <p className="text-red-300">{error}</p>}
      <div className="grid gap-4 md:grid-cols-2">
        {users.map((u) => <article key={u._id} className="rounded-2xl border border-line bg-panel p-5">
          <div className="flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-full bg-indigo-400/15 text-lg font-bold text-indigo-200">{u.name?.[0]?.toUpperCase()}</div><div><h2 className="font-semibold">{u.name}</h2>{u.location && <p className="flex items-center gap-1 text-xs text-slate-400"><MapPin size={12}/>{u.location}</p>}</div></div>
          <p className="my-4 line-clamp-3 text-sm text-slate-400">{u.bio || "Developer on DevConnect."}</p>
          <div className="flex flex-wrap gap-2">{(u.skills || []).map(s => <span key={s} className="rounded-md border border-line px-2 py-1 text-xs">{s}</span>)}</div>
          {u.github && <a className="mt-4 inline-flex items-center gap-2 text-sm text-indigo-300 hover:underline" href={u.github} target="_blank" rel="noreferrer"><Github size={15}/> GitHub profile</a>}
        </article>)}
      </div>
    </div>
  );
}
