import { useEffect, useState } from "react";
import api from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ name: "", bio: "", location: "", skills: "", github: "", portfolio: "" });
  const [notice, setNotice] = useState("");
  useEffect(() => {
    if (user) setForm({ name: user.name || "", bio: user.bio || "", location: user.location || "", skills: (user.skills || []).join(", "), github: user.github || "", portfolio: user.portfolio || "" });
  }, [user]);
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async e => {
    e.preventDefault(); setNotice("");
    try {
      const payload = { ...form, skills: form.skills.split(",").map(x => x.trim()).filter(Boolean) };
      const { data } = await api.patch("/users/me", payload);
      setUser(data.user); setNotice("Profile updated successfully.");
    } catch (err) { setNotice(err.response?.data?.message || "Could not update profile"); }
  };
  const input = "w-full rounded-xl border border-line bg-ink px-4 py-3 text-sm outline-none focus:border-accent";
  return <div className="mx-auto max-w-2xl"><h1 className="text-2xl font-bold">Your developer profile</h1><p className="mb-6 mt-2 text-sm text-slate-400">Help other developers understand what you build.</p><form onSubmit={submit} className="space-y-4 rounded-2xl border border-line bg-panel p-6">
    {[
      ["name","Name"],["location","Location"],["skills","Skills (comma separated)"],["github","GitHub URL"],["portfolio","Portfolio URL"]
    ].map(([name,label]) => <label key={name} className="block text-sm">{label}<input className={`${input} mt-2`} name={name} value={form[name]} onChange={change}/></label>)}
    <label className="block text-sm">Bio<textarea className={`${input} mt-2 min-h-28`} name="bio" value={form.bio} onChange={change} maxLength="500"/></label>
    {notice && <p className="text-sm text-indigo-200">{notice}</p>}<button className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-ink">Save profile</button>
  </form></div>;
}
