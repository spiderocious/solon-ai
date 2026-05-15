import { LivePulse } from '@solon/ui';
import { ModuleShell } from '@ui/ModuleShell';
import { DEMO_ROUTES } from '@solon/core';

const TABS = [
  { label: 'Live dashboard', route: DEMO_ROUTES.WAR_ROOM_LIVE },
  { label: 'AI Copilot', route: DEMO_ROUTES.WAR_ROOM_COPILOT },
  { label: 'Reconciliation', route: DEMO_ROUTES.WAR_ROOM_RECONCILIATION },
  { label: 'Public view', route: DEMO_ROUTES.WAR_ROOM_PUBLIC },
];

export default function WarRoomShell() {
  return (
    <ModuleShell
      title="War Room"
      crumb="ELECTION DAY · 20 FEB 2027 · ANAMBRA CENTRAL"
      tabs={TABS}
      headerRight={<LivePulse variant="orange" />}
    />
  );
}
