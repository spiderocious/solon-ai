import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { DEMO_ROUTES } from '@solon/core';
import { LivePulse } from '@solon/ui';
import {
  IconHome,
  IconChart,
  IconUsers,
  IconMoney,
  IconShield,
  IconLogout,
  IconMap,
  IconMenu,
  IconX,
} from '@icons';
import { SolonLogo } from './SolonLogo';
import { DemoModePill } from './DemoModePill';
import { useDemoSession } from '@shared/hooks/use-demo-session';

interface NavItem {
  readonly label: string;
  readonly route: string;
  readonly Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  readonly badge?: string;
  readonly live?: boolean;
}

interface NavGroup {
  readonly label: string;
  readonly items: readonly NavItem[];
}

const NAV_GROUPS: readonly NavGroup[] = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', route: DEMO_ROUTES.DASHBOARD, Icon: IconHome },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { label: 'Simulator', route: DEMO_ROUTES.SIMULATOR, Icon: IconChart },
      { label: 'Voter Intel', route: DEMO_ROUTES.VOTER_INTEL, Icon: IconMap },
    ],
  },
  {
    label: 'Operations',
    items: [
      { label: 'Agents', route: DEMO_ROUTES.AGENTS, Icon: IconUsers, badge: '412' },
      { label: 'Finance', route: DEMO_ROUTES.FINANCE, Icon: IconMoney },
    ],
  },
  {
    label: 'War Room',
    items: [
      { label: 'Live', route: DEMO_ROUTES.WAR_ROOM, Icon: IconShield, live: true },
    ],
  },
];

interface SidebarNavProps {
  readonly onClose?: () => void;
}

function NavContent({ onClose }: SidebarNavProps) {
  const { logout } = useDemoSession();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate(DEMO_ROUTES.LOGIN);
  }

  return (
    <div className="flex flex-col h-full py-3">
      {/* Brand row */}
      <div className="flex items-center justify-between px-4 py-2 mb-1">
        <SolonLogo size="md" />
        <div className="flex items-center gap-2">
          <DemoModePill />
          {onClose && (
            <button onClick={onClose} className="p-1" style={{ color: 'var(--ink-4)' }}>
              <IconX size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto mt-2">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-1">
            <div
              className="font-mono text-[9px] uppercase tracking-widest px-4 py-1.5"
              style={{ color: 'var(--ink-4)' }}
            >
              {group.label}
            </div>
            {group.items.map(({ label, route, Icon, badge, live }) => (
              <NavLink
                key={route}
                to={route}
                onClick={onClose}
                className="flex items-center gap-2 px-4 py-2 font-sans text-[13px] transition-none"
                style={({ isActive }) =>
                  isActive
                    ? { background: 'var(--ink)', color: 'var(--paper)' }
                    : { color: 'var(--ink-2)' }
                }
              >
                <Icon size={15} strokeWidth={1.4} />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span
                    className="font-mono text-[10px] px-1.5 rounded"
                    style={{ background: 'var(--paper-2)', color: 'var(--ink-4)' }}
                  >
                    {badge}
                  </span>
                )}
                {live && <LivePulse variant="orange" />}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 pt-2 border-t" style={{ borderColor: 'var(--hair)' }}>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full py-2 font-sans text-[13px]"
          style={{ color: 'var(--ink-4)' }}
        >
          <IconLogout size={15} strokeWidth={1.4} />
          Exit demo
        </button>
      </div>
    </div>
  );
}

export function SidebarNav() {
  return (
    <aside
      className="hidden md:flex flex-col h-full w-[220px] shrink-0 border-r"
      style={{ borderColor: 'var(--hair)', background: 'var(--sheet)' }}
    >
      <NavContent />
    </aside>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile topbar */}
      <div
        className="md:hidden flex items-center px-4 h-12 border-b shrink-0"
        style={{ background: 'var(--sheet)', borderColor: 'var(--hair)' }}
      >
        <button onClick={() => setOpen(true)} style={{ color: 'var(--ink-2)' }}>
          <IconMenu size={20} />
        </button>
        <div className="flex-1 flex justify-center">
          <SolonLogo size="sm" />
        </div>
        <DemoModePill />
      </div>

      {/* Drawer overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(26,23,20,0.4)' }}
            onClick={() => setOpen(false)}
          />
          <div
            className="relative w-[260px] h-full border-r"
            style={{ background: 'var(--sheet)', borderColor: 'var(--hair)' }}
          >
            <NavContent onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
