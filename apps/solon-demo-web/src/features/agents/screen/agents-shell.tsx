import { ModuleShell } from '@ui/ModuleShell';
import { DEMO_ROUTES } from '@solon/core';

const TABS = [
  { label: 'Roster', route: DEMO_ROUTES.AGENTS_ROSTER },
  { label: 'Coverage map', route: DEMO_ROUTES.AGENTS_COVERAGE },
  { label: 'Readiness', route: DEMO_ROUTES.AGENTS_READINESS },
  { label: 'Election day', route: DEMO_ROUTES.AGENTS_ELECTION_DAY },
];

export default function AgentsShell() {
  return <ModuleShell title="Agent Network" crumb="AGENTS / ANAMBRA CENTRAL / 2027" tabs={TABS} />;
}
