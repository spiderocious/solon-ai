import { Outlet } from 'react-router-dom';
import { SidebarNav, MobileNav } from './SidebarNav';
import { FeedbackWidget } from './FeedbackWidget';

export function AppLayout() {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden" style={{ background: 'var(--paper-2)' }}>
      <SidebarNav />
      <div className="flex flex-col flex-1 min-h-0">
        <MobileNav />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <FeedbackWidget />
    </div>
  );
}
