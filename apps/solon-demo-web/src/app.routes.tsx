import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { DEMO_ROUTES } from '@solon/core';
import { Skeleton } from '@solon/ui';
import { DemoAuthGuard } from '@shared/guards/DemoAuthGuard';
import { AppLayout } from '@ui/AppLayout';

// Auth screens
const LoginScreen = lazy(() => import('@features/login/screen/login-screen'));
const LeadCaptureScreen = lazy(() => import('@features/lead-capture/screen/lead-capture-screen'));

// Module: Dashboard
const DashboardScreen = lazy(() => import('@features/dashboard/screen/dashboard-screen'));

// Module: Simulator
const SimulatorShell = lazy(() => import('@features/simulator/screen/simulator-shell'));
const SimulatorBaselineScreen = lazy(() => import('@features/simulator/screen/simulator-baseline-screen'));
const SimulatorScenarioScreen = lazy(() => import('@features/simulator/screen/simulator-scenario-screen'));
const SimulatorCopilotScreen = lazy(() => import('@features/simulator/screen/simulator-copilot-screen'));
const SimulatorSavedScreen = lazy(() => import('@features/simulator/screen/simulator-saved-screen'));
const SimulatorCompareScreen = lazy(() => import('@features/simulator/screen/simulator-compare-screen'));

// Module: Voter Intel
const VoterIntelShell = lazy(() => import('@features/voter-intel/screen/voter-intel-shell'));
const VoterIntelMapScreen = lazy(() => import('@features/voter-intel/screen/voter-intel-map-screen'));
const VoterIntelClustersScreen = lazy(() => import('@features/voter-intel/screen/voter-intel-clusters-screen'));
const VoterIntelMessagesScreen = lazy(() => import('@features/voter-intel/screen/voter-intel-messages-screen'));
const VoterIntelIssuesScreen = lazy(() => import('@features/voter-intel/screen/voter-intel-issues-screen'));

// Module: Agents
const AgentsShell = lazy(() => import('@features/agents/screen/agents-shell'));
const AgentsRosterScreen = lazy(() => import('@features/agents/screen/agents-roster-screen'));
const AgentsCoverageScreen = lazy(() => import('@features/agents/screen/agents-coverage-screen'));
const AgentsReadinessScreen = lazy(() => import('@features/agents/screen/agents-readiness-screen'));
const AgentsElectionDayScreen = lazy(() => import('@features/agents/screen/agents-election-day-screen'));

// Module: Finance
const FinanceShell = lazy(() => import('@features/finance/screen/finance-shell'));
const FinanceDashboardScreen = lazy(() => import('@features/finance/screen/finance-dashboard-screen'));
const FinanceExpensesScreen = lazy(() => import('@features/finance/screen/finance-expenses-screen'));
const FinanceDonorsScreen = lazy(() => import('@features/finance/screen/finance-donors-screen'));
const FinanceComplianceScreen = lazy(() => import('@features/finance/screen/finance-compliance-screen'));

// Module: War Room
const WarRoomShell = lazy(() => import('@features/war-room/screen/war-room-shell'));
const WarRoomLiveScreen = lazy(() => import('@features/war-room/screen/war-room-live-screen'));
const WarRoomCopilotScreen = lazy(() => import('@features/war-room/screen/war-room-copilot-screen'));
const WarRoomReconciliationScreen = lazy(() => import('@features/war-room/screen/war-room-reconciliation-screen'));
const WarRoomPublicScreen = lazy(() => import('@features/war-room/screen/war-room-public-screen'));

function PageLoader() {
  return (
    <div className="p-8 flex flex-col gap-3">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public */}
        <Route path={DEMO_ROUTES.LOGIN} element={<LoginScreen />} />
        <Route path={DEMO_ROUTES.LEAD_CAPTURE} element={<LeadCaptureScreen />} />

        {/* Protected — all modules live inside AppLayout */}
        <Route element={<DemoAuthGuard />}>
          <Route element={<AppLayout />}>
            <Route path="/modules" element={<Navigate to={DEMO_ROUTES.DASHBOARD} replace />} />

            {/* Dashboard */}
            <Route path={DEMO_ROUTES.DASHBOARD} element={<DashboardScreen />} />

            {/* Simulator */}
            <Route path={DEMO_ROUTES.SIMULATOR} element={<SimulatorShell />}>
              <Route index element={<Navigate to={DEMO_ROUTES.SIMULATOR_BASELINE} replace />} />
              <Route path={DEMO_ROUTES.SIMULATOR_BASELINE} element={<SimulatorBaselineScreen />} />
              <Route path={DEMO_ROUTES.SIMULATOR_SCENARIO} element={<SimulatorScenarioScreen />} />
              <Route path={DEMO_ROUTES.SIMULATOR_COPILOT} element={<SimulatorCopilotScreen />} />
              <Route path={DEMO_ROUTES.SIMULATOR_SAVED} element={<SimulatorSavedScreen />} />
              <Route path={DEMO_ROUTES.SIMULATOR_COMPARE} element={<SimulatorCompareScreen />} />
            </Route>

            {/* Voter Intel */}
            <Route path={DEMO_ROUTES.VOTER_INTEL} element={<VoterIntelShell />}>
              <Route index element={<Navigate to={DEMO_ROUTES.VOTER_INTEL_MAP} replace />} />
              <Route path={DEMO_ROUTES.VOTER_INTEL_MAP} element={<VoterIntelMapScreen />} />
              <Route path={DEMO_ROUTES.VOTER_INTEL_CLUSTERS} element={<VoterIntelClustersScreen />} />
              <Route path={DEMO_ROUTES.VOTER_INTEL_MESSAGES} element={<VoterIntelMessagesScreen />} />
              <Route path={DEMO_ROUTES.VOTER_INTEL_ISSUES} element={<VoterIntelIssuesScreen />} />
            </Route>

            {/* Agents */}
            <Route path={DEMO_ROUTES.AGENTS} element={<AgentsShell />}>
              <Route index element={<Navigate to={DEMO_ROUTES.AGENTS_ROSTER} replace />} />
              <Route path={DEMO_ROUTES.AGENTS_ROSTER} element={<AgentsRosterScreen />} />
              <Route path={DEMO_ROUTES.AGENTS_COVERAGE} element={<AgentsCoverageScreen />} />
              <Route path={DEMO_ROUTES.AGENTS_READINESS} element={<AgentsReadinessScreen />} />
              <Route path={DEMO_ROUTES.AGENTS_ELECTION_DAY} element={<AgentsElectionDayScreen />} />
            </Route>

            {/* Finance */}
            <Route path={DEMO_ROUTES.FINANCE} element={<FinanceShell />}>
              <Route index element={<Navigate to={DEMO_ROUTES.FINANCE_DASHBOARD} replace />} />
              <Route path={DEMO_ROUTES.FINANCE_DASHBOARD} element={<FinanceDashboardScreen />} />
              <Route path={DEMO_ROUTES.FINANCE_EXPENSES} element={<FinanceExpensesScreen />} />
              <Route path={DEMO_ROUTES.FINANCE_DONORS} element={<FinanceDonorsScreen />} />
              <Route path={DEMO_ROUTES.FINANCE_COMPLIANCE} element={<FinanceComplianceScreen />} />
            </Route>

            {/* War Room */}
            <Route path={DEMO_ROUTES.WAR_ROOM} element={<WarRoomShell />}>
              <Route index element={<Navigate to={DEMO_ROUTES.WAR_ROOM_LIVE} replace />} />
              <Route path={DEMO_ROUTES.WAR_ROOM_LIVE} element={<WarRoomLiveScreen />} />
              <Route path={DEMO_ROUTES.WAR_ROOM_COPILOT} element={<WarRoomCopilotScreen />} />
              <Route path={DEMO_ROUTES.WAR_ROOM_RECONCILIATION} element={<WarRoomReconciliationScreen />} />
              <Route path={DEMO_ROUTES.WAR_ROOM_PUBLIC} element={<WarRoomPublicScreen />} />
            </Route>
          </Route>
        </Route>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to={DEMO_ROUTES.LOGIN} replace />} />
        <Route path="*" element={<Navigate to={DEMO_ROUTES.LOGIN} replace />} />
      </Routes>
    </Suspense>
  );
}
