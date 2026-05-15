import { Navigate, Route, Routes } from 'react-router-dom';
import { DEMO_ROUTES } from '@solon/core';
import { DemoAuthGuard } from '@shared/guards/DemoAuthGuard';
import { AppLayout } from '@ui/AppLayout';

// Auth screens
import LoginScreen from '@features/login/screen/login-screen';
import LeadCaptureScreen from '@features/lead-capture/screen/lead-capture-screen';

// Module: Dashboard
import DashboardScreen from '@features/dashboard/screen/dashboard-screen';

// Module: Simulator
import SimulatorShell from '@features/simulator/screen/simulator-shell';
import SimulatorBaselineScreen from '@features/simulator/screen/simulator-baseline-screen';
import SimulatorScenarioScreen from '@features/simulator/screen/simulator-scenario-screen';
import SimulatorCopilotScreen from '@features/simulator/screen/simulator-copilot-screen';
import SimulatorSavedScreen from '@features/simulator/screen/simulator-saved-screen';
import SimulatorCompareScreen from '@features/simulator/screen/simulator-compare-screen';

// Module: Voter Intel
import VoterIntelShell from '@features/voter-intel/screen/voter-intel-shell';
import VoterIntelMapScreen from '@features/voter-intel/screen/voter-intel-map-screen';
import VoterIntelClustersScreen from '@features/voter-intel/screen/voter-intel-clusters-screen';
import VoterIntelMessagesScreen from '@features/voter-intel/screen/voter-intel-messages-screen';
import VoterIntelIssuesScreen from '@features/voter-intel/screen/voter-intel-issues-screen';

// Module: Agents
import AgentsShell from '@features/agents/screen/agents-shell';
import AgentsRosterScreen from '@features/agents/screen/agents-roster-screen';
import AgentsCoverageScreen from '@features/agents/screen/agents-coverage-screen';
import AgentsReadinessScreen from '@features/agents/screen/agents-readiness-screen';
import AgentsElectionDayScreen from '@features/agents/screen/agents-election-day-screen';

// Module: Finance
import FinanceShell from '@features/finance/screen/finance-shell';
import FinanceDashboardScreen from '@features/finance/screen/finance-dashboard-screen';
import FinanceExpensesScreen from '@features/finance/screen/finance-expenses-screen';
import FinanceDonorsScreen from '@features/finance/screen/finance-donors-screen';
import FinanceComplianceScreen from '@features/finance/screen/finance-compliance-screen';

// Module: War Room
import WarRoomShell from '@features/war-room/screen/war-room-shell';
import WarRoomLiveScreen from '@features/war-room/screen/war-room-live-screen';
import WarRoomCopilotScreen from '@features/war-room/screen/war-room-copilot-screen';
import WarRoomReconciliationScreen from '@features/war-room/screen/war-room-reconciliation-screen';
import WarRoomPublicScreen from '@features/war-room/screen/war-room-public-screen';

export function AppRoutes() {
  return (
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
  );
}
