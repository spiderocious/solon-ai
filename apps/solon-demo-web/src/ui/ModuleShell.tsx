import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

interface ModuleTab {
  readonly label: string;
  readonly route: string;
}

interface ModuleShellProps {
  readonly title: string;
  readonly crumb?: string;
  readonly tabs?: readonly ModuleTab[];
  readonly headerRight?: React.ReactNode;
}

export function ModuleShell({ title, crumb, tabs, headerRight }: ModuleShellProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Masthead */}
      <div
        className="px-6 md:px-8 pt-5 pb-0 border-b shrink-0"
        style={{ borderColor: 'var(--ink)', background: 'var(--sheet)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            {crumb && (
              <div
                className="font-mono text-[9px] uppercase tracking-[0.14em] mb-0.5"
                style={{ color: 'var(--ink-4)' }}
              >
                {crumb}
              </div>
            )}
            <h1 className="font-serif font-semibold text-[22px] leading-tight" style={{ color: 'var(--ink)' }}>
              {title}
            </h1>
          </div>
          {headerRight && <div className="flex items-center gap-2">{headerRight}</div>}
        </div>

        {tabs && tabs.length > 0 && (
          <div className="flex items-end gap-0 -mb-px overflow-x-auto">
            {tabs.map((tab) => (
              <NavLink
                key={tab.route}
                to={tab.route}
                end
                className="px-4 py-2 font-mono text-[10px] uppercase tracking-[0.1em] border-b-2 whitespace-nowrap transition-none"
                style={({ isActive }) =>
                  isActive
                    ? { borderColor: 'var(--ink)', color: 'var(--ink)' }
                    : { borderColor: 'transparent', color: 'var(--ink-4)' }
                }
              >
                {tab.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
