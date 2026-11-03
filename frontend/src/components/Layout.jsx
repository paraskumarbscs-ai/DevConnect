import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Code2, Compass, FolderKanban, LogOut, PlusCircle, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const links = [
  { to: "/", label: "Discover", icon: Compass },
  { to: "/projects/new", label: "Create project", icon: PlusCircle },
  { to: "/developers", label: "Developers", icon: Users },
  { to: "/my-projects", label: "My projects", icon: FolderKanban }
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-line bg-ink/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-xl font-bold">
            <span className="rounded-xl bg-accent p-2 text-ink"><Code2 size={20}/></span>
            DevConnect
          </button>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden text-slate-300 sm:block">{user?.name}</span>
            <button onClick={() => { logout(); navigate("/login"); }} className="flex items-center gap-2 rounded-lg border border-line px-3 py-2 hover:bg-panel">
              <LogOut size={16}/> Sign out
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-7 md:grid-cols-[220px_1fr]">
        <aside className="h-fit rounded-2xl border border-line bg-panel p-3">
          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-widest text-slate-500">Workspace</p>
          <nav className="space-y-1">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} end={to === "/"} className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm ${isActive ? "bg-accent/15 text-indigo-200" : "text-slate-300 hover:bg-white/5"}`
              }><Icon size={17}/>{label}</NavLink>
            ))}
          </nav>
        </aside>
        <main className="min-w-0"><Outlet /></main>
      </div>
    </div>
  );
}
