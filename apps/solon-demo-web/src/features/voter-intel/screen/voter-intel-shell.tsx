import { ModuleShell } from '@ui/ModuleShell';
import { DEMO_ROUTES } from '@solon/core';

const TABS = [
  { label: 'Constituency map', route: DEMO_ROUTES.VOTER_INTEL_MAP },
  { label: 'Voter clusters', route: DEMO_ROUTES.VOTER_INTEL_CLUSTERS },
  { label: 'Message generator', route: DEMO_ROUTES.VOTER_INTEL_MESSAGES },
  { label: 'Issue monitor', route: DEMO_ROUTES.VOTER_INTEL_ISSUES },
];

export default function VoterIntelShell() {
  return <ModuleShell title="Voter Intelligence" crumb="VOTER INTEL / ANAMBRA CENTRAL / 2027" tabs={TABS} />;
}
