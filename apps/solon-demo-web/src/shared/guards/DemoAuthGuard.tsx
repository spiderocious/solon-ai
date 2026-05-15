import { Navigate, Outlet } from 'react-router-dom';
import { DEMO_ROUTES } from '@solon/core';
import { useDemoSession } from '@shared/hooks/use-demo-session';

export function DemoAuthGuard() {
  const { isAuthenticated } = useDemoSession();
  if (!isAuthenticated) return <Navigate to={DEMO_ROUTES.LOGIN} replace />;
  return <Outlet />;
}
