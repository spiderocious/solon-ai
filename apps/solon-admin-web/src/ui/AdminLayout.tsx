import { NavLink, Outlet } from 'react-router-dom';
import { clearAdminToken } from '@shared/admin-client';

const NAV_ITEMS = [
  { to: '/admin/stats', label: 'Dashboard' },
  { to: '/admin/sessions', label: 'Sessions' },
  { to: '/admin/feedback', label: 'Feedback' },
  { to: '/admin/mock-data', label: 'Mock data' },
];

export function AdminLayout() {
  function handleLogout() {
    clearAdminToken();
    window.location.href = '/admin/login';
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--paper-2)' }}>
      {/* Sidebar */}
      <div
        className="w-52 shrink-0 flex flex-col border-r"
        style={{ background: 'var(--sheet)', borderColor: 'var(--hair)' }}
      >
        <div className="px-5 py-5 border-b" style={{ borderColor: 'var(--hair)' }}>
          <div className="font-serif font-bold text-[20px]" style={{ color: 'var(--ink)' }}>
            Solon<span style={{ color: 'var(--orange)' }}>.</span>
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.12em] mt-0.5" style={{ color: 'var(--ink-4)' }}>
            Admin
          </div>
        </div>

        <nav className="flex-1 py-2">
          {NAV_ITEMS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center px-5 py-2.5 font-sans text-[13px] transition-colors ${isActive ? 'font-medium' : ''}`
              }
              style={({ isActive }) => ({
                background: isActive ? 'var(--ink)' : 'transparent',
                color: isActive ? 'var(--paper)' : 'var(--ink-2)',
              })}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-5 py-4 border-t" style={{ borderColor: 'var(--hair)' }}>
          <button
            onClick={handleLogout}
            className="font-mono text-[10px] uppercase tracking-[0.08em]"
            style={{ color: 'var(--ink-4)' }}
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
