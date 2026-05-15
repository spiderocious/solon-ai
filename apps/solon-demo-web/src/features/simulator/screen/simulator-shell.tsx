import { ModuleShell } from '@ui/ModuleShell';
import { DEMO_ROUTES } from '@solon/core';

const TABS = [
  { label: 'Baseline', route: DEMO_ROUTES.SIMULATOR_BASELINE },
  { label: 'Scenario builder', route: DEMO_ROUTES.SIMULATOR_SCENARIO },
  { label: 'NL Copilot', route: DEMO_ROUTES.SIMULATOR_COPILOT },
  { label: 'Saved scenarios', route: DEMO_ROUTES.SIMULATOR_SAVED },
  { label: 'Compare', route: DEMO_ROUTES.SIMULATOR_COMPARE },
];

export default function SimulatorShell() {
  return <ModuleShell title="Simulator" crumb="SIMULATOR / ANAMBRA CENTRAL / SENATE / 2027" tabs={TABS} />;
}
