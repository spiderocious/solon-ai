import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { DEMO_ROUTES } from '@solon/core';
import { useDemoSession } from '@shared/hooks/use-demo-session';

export function DemoAuthGuard() {
  const { isAuthenticated } = useDemoSession();
  const location = useLocation();
  if (!isAuthenticated) {
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`${DEMO_ROUTES.LOGIN}?next=${next}`} replace />;
  }
  return <Outlet />;
}
