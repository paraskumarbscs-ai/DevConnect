import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client.js";

export default function CreateProjectPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", techStack: "", repositoryUrl: "", demoUrl: "", status: "planning" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setError("");
    try {
      const payload = { ...form, techStack: form.techStack.split(",").map(x => x.trim()).filter(Boolean) };
      const { data } = await api.post("/projects", payload);
      navigate(`/projects/${data.project._id}`);
    } catch (err) { setError(err.response?.data?.message || "Could not create project"); }
    finally { setBusy(false); }
  };
  const input = "w-full rounded-xl border border-line bg-ink px-4 py-3 text-sm outline-none focus:border-accent";
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold">Publish a project</h1><p className="mb-6 mt-2 text-sm text-slate-400">Tell the community what you're building and who you need.</p>
      <form onSubmit={submit} className="space-y-4 rounded-2xl border border-line bg-panel p-6">
        <label className="block text-sm">Project title<input className={`${input} mt-2`} name="title" value={form.title} onChange={update} minLength="3" maxLength="100" required placeholder="e.g. Open-source learning platform"/></label>
        <label className="block text-sm">Description<textarea className={`${input} mt-2 min-h-32`} name="description" value={form.description} onChange={update} minLength="10" maxLength="2000" required placeholder="What problem does it solve? What help do you need?"/></label>
        <label className="block text-sm">Tech stack<input className={`${input} mt-2`} name="techStack" value={form.techStack} onChange={update} placeholder="React, Node.js, MongoDB"/></label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm">Repository URL<input className={`${input} mt-2`} name="repositoryUrl" type="url" value={form.repositoryUrl} onChange={update} placeholder="https://github.com/..."/></label>
          <label className="block text-sm">Demo URL<input className={`${input} mt-2`} name="demoUrl" type="url" value={form.demoUrl} onChange={update} placeholder="https://..."/></label>
        </div>
        <label className="block text-sm">Status<select className={`${input} mt-2`} name="status" value={form.status} onChange={update}><option value="planning">Planning</option><option value="in-progress">In progress</option><option value="completed">Completed</option></select></label>
        {error && <p className="text-sm text-red-300">{error}</p>}
        <button disabled={busy} className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-ink disabled:opacity-50">{busy ? "Publishing..." : "Publish project"}</button>
      </form>
    </div>
  );
}
