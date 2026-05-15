import { ModuleShell } from '@ui/ModuleShell';
import { DEMO_ROUTES } from '@solon/core';

const TABS = [
  { label: 'Overview', route: DEMO_ROUTES.FINANCE_DASHBOARD },
  { label: 'Expenses', route: DEMO_ROUTES.FINANCE_EXPENSES },
  { label: 'Donors', route: DEMO_ROUTES.FINANCE_DONORS },
  { label: 'Compliance', route: DEMO_ROUTES.FINANCE_COMPLIANCE },
];

export default function FinanceShell() {
  return (
    <ModuleShell
      title="Finance"
      crumb="FINANCE / ANAMBRA CENTRAL / 2027"
      tabs={TABS}
    />
  );
}
