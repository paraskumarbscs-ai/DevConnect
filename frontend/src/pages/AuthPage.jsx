import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Code2 } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function AuthPage({ mode }) {
  const isRegister = mode === "register";
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault(); setError(""); setBusy(true);
    try {
      if (isRegister) await register(form);
      else await login({ email: form.email, password: form.password });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally { setBusy(false); }
  };

  const field = "w-full rounded-xl border border-line bg-ink px-4 py-3 text-sm outline-none focus:border-accent";
  return (
    <div className="flex min-h-screen items-center justify-center px-5 py-10">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-line bg-panel p-8 shadow-2xl">
        <div className="mb-6 flex items-center gap-3"><span className="rounded-xl bg-accent p-3 text-ink"><Code2/></span><span className="text-2xl font-bold">DevConnect</span></div>
        <h1 className="text-2xl font-bold">{isRegister ? "Create your account" : "Welcome back"}</h1>
        <p className="mb-6 mt-2 text-sm text-slate-400">{isRegister ? "Meet developers and build something great." : "Sign in to continue collaborating."}</p>
        {isRegister && <input className={`${field} mb-3`} name="name" placeholder="Full name" value={form.name} onChange={change} minLength="2" required/>}
        <input className={`${field} mb-3`} name="email" type="email" placeholder="Email address" value={form.email} onChange={change} required/>
        <input className={`${field} mb-4`} name="password" type="password" placeholder="Password (8+ characters)" value={form.password} onChange={change} minLength="8" required/>
        {error && <p className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
        <button disabled={busy} className="w-full rounded-xl bg-accent py-3 font-semibold text-ink disabled:opacity-50">{busy ? "Please wait..." : isRegister ? "Create account" : "Sign in"}</button>
        <p className="mt-6 text-center text-sm text-slate-400">{isRegister ? "Already have an account?" : "New to DevConnect?"} <Link className="text-indigo-300 hover:underline" to={isRegister ? "/login" : "/register"}>{isRegister ? "Sign in" : "Create account"}</Link></p>
      </form>
    </div>
  );
}
