import { type ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { NAV_GROUPS, NAV_ITEMS } from '@shared/nav-items.js';

export function Shell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  return (
    <div className="flex h-full" style={{ background: 'var(--paper)' }}>
      <nav
        className="flex flex-col w-[220px] shrink-0 border-r overflow-y-auto"
        style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}
      >
        <div
          className="px-5 py-4 border-b"
          style={{ borderColor: 'var(--hair)' }}
        >
          <span
            className="font-serif font-semibold text-[18px]"
            style={{ color: 'var(--forest-600)', letterSpacing: 'var(--track-display)' }}
          >
            Solon DS
          </span>
        </div>

        <div className="flex-1 py-3">
          {NAV_GROUPS.map((group) => {
            const items = NAV_ITEMS.filter((i) => i.group === group);
            if (items.length === 0) return null;
            return (
              <div key={group} className="mb-4">
                <div
                  className="px-5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]"
                  style={{ color: 'var(--ink-4)' }}
                >
                  {group}
                </div>
                {items.map((item) => (
                  <NavLink
                    key={item.route}
                    to={item.route}
                    className={[
                      'block px-5 py-[6px] text-[13px] transition-colors',
                      pathname === item.route
                        ? 'font-medium'
                        : '',
                    ].join(' ')}
                    style={({ isActive }) => ({
                      color: isActive ? 'var(--forest-600)' : 'var(--ink-2)',
                      background: isActive ? 'var(--forest-50)' : 'transparent',
                    })}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            );
          })}
        </div>
      </nav>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1180px] mx-auto px-14 py-14">
          {children}
        </div>
      </main>
    </div>
  );
}
