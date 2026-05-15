import { Navigate, Route, Routes } from 'react-router-dom';
import { getAdminToken } from '@shared/admin-client';
import { LoginScreen } from '@features/auth/login-screen';
import { AdminLayout } from '@ui/AdminLayout';
import { StatsScreen } from '@features/dashboard/stats-screen';
import { SessionsScreen } from '@features/sessions/sessions-screen';
import { FeedbackScreen } from '@features/feedback/feedback-screen';
import { MockDataScreen } from '@features/mock-data/mock-data-screen';

function RequireAuth({ children }: { children: React.ReactNode }) {
  if (!getAdminToken()) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/admin/login"
        element={
          <LoginScreen onSuccess={() => { window.location.href = '/admin/stats'; }} />
        }
      />

      <Route
        element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route path="/admin/stats" element={<StatsScreen />} />
        <Route path="/admin/sessions" element={<SessionsScreen />} />
        <Route path="/admin/feedback" element={<FeedbackScreen />} />
        <Route path="/admin/mock-data" element={<MockDataScreen />} />
        <Route path="/admin" element={<Navigate to="/admin/stats" replace />} />
      </Route>

      <Route path="/" element={<Navigate to="/admin/login" replace />} />
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}
