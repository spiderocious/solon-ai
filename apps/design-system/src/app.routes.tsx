import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { ROUTES } from '@shared/routes.js';
import { Shell } from '@features/shell/shell.js';

const PaletteScreen     = lazy(() => import('@features/palette/palette-screen.js').then((m) => ({ default: m.PaletteScreen })));
const TypeScreen        = lazy(() => import('@features/type/type-screen.js').then((m) => ({ default: m.TypeScreen })));
const GeometryScreen    = lazy(() => import('@features/geometry/geometry-screen.js').then((m) => ({ default: m.GeometryScreen })));
const MotionScreen      = lazy(() => import('@features/motion/motion-screen.js').then((m) => ({ default: m.MotionScreen })));
const IconsScreen       = lazy(() => import('@features/icons/icons-screen.js').then((m) => ({ default: m.IconsScreen })));
const ButtonsScreen     = lazy(() => import('@features/buttons/buttons-screen.js').then((m) => ({ default: m.ButtonsScreen })));
const InputsScreen      = lazy(() => import('@features/inputs/inputs-screen.js').then((m) => ({ default: m.InputsScreen })));
const SelectionScreen   = lazy(() => import('@features/selection/selection-screen.js').then((m) => ({ default: m.SelectionScreen })));
const DatetimeScreen    = lazy(() => import('@features/datetime/datetime-screen.js').then((m) => ({ default: m.DatetimeScreen })));
const SpecializedScreen = lazy(() => import('@features/specialized/specialized-screen.js').then((m) => ({ default: m.SpecializedScreen })));
const TablesScreen      = lazy(() => import('@features/tables/tables-screen.js').then((m) => ({ default: m.TablesScreen })));
const PulistScreen      = lazy(() => import('@features/pulist/pulist-screen.js').then((m) => ({ default: m.PulistScreen })));
const ChartsScreen      = lazy(() => import('@features/charts/charts-screen.js').then((m) => ({ default: m.ChartsScreen })));
const ProgressScreen    = lazy(() => import('@features/progress/progress-screen.js').then((m) => ({ default: m.ProgressScreen })));
const SkeletonsScreen   = lazy(() => import('@features/skeletons/skeletons-screen.js').then((m) => ({ default: m.SkeletonsScreen })));
const AvatarsScreen     = lazy(() => import('@features/avatars/avatars-screen.js').then((m) => ({ default: m.AvatarsScreen })));
const CardsScreen       = lazy(() => import('@features/cards/cards-screen.js').then((m) => ({ default: m.CardsScreen })));
const TooltipsScreen    = lazy(() => import('@features/tooltips/tooltips-screen.js').then((m) => ({ default: m.TooltipsScreen })));
const NavigationScreen  = lazy(() => import('@features/navigation/navigation-screen.js').then((m) => ({ default: m.NavigationScreen })));
const SimulatorScreen   = lazy(() => import('@features/simulator/simulator-screen.js').then((m) => ({ default: m.SimulatorScreen })));
const MapScreen         = lazy(() => import('@features/map/map-screen.js').then((m) => ({ default: m.MapScreen })));
const WarroomScreen     = lazy(() => import('@features/warroom/warroom-screen.js').then((m) => ({ default: m.WarroomScreen })));
const FinanceScreen     = lazy(() => import('@features/finance/finance-screen.js').then((m) => ({ default: m.FinanceScreen })));
const ModalsScreen      = lazy(() => import('@features/modals/modals-screen.js').then((m) => ({ default: m.ModalsScreen })));
const FeedbackScreen    = lazy(() => import('@features/feedback/feedback-screen.js').then((m) => ({ default: m.FeedbackScreen })));
const CitizenScreen     = lazy(() => import('@features/citizen/citizen-screen.js').then((m) => ({ default: m.CitizenScreen })));
const ExportScreen      = lazy(() => import('@features/export/export-screen.js').then((m) => ({ default: m.ExportScreen })));
const DrawerScreen      = lazy(() => import('@features/drawer/drawer-screen.js').then((m) => ({ default: m.DrawerScreen })));

function Lazy({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="p-8 font-mono text-[11px]" style={{ color: 'var(--ink-4)' }}>
          Loading…
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export function AppRoutes() {
  return (
    <Shell>
      <Routes>
        <Route path="/" element={<Navigate to={ROUTES.PALETTE} replace />} />
        <Route path={ROUTES.PALETTE}       element={<Lazy><PaletteScreen /></Lazy>} />
        <Route path={ROUTES.TYPE}          element={<Lazy><TypeScreen /></Lazy>} />
        <Route path={ROUTES.GEOMETRY}      element={<Lazy><GeometryScreen /></Lazy>} />
        <Route path={ROUTES.MOTION}        element={<Lazy><MotionScreen /></Lazy>} />
        <Route path={ROUTES.ICONS}         element={<Lazy><IconsScreen /></Lazy>} />
        <Route path={ROUTES.BUTTONS}       element={<Lazy><ButtonsScreen /></Lazy>} />
        <Route path={ROUTES.INPUTS}        element={<Lazy><InputsScreen /></Lazy>} />
        <Route path={ROUTES.SELECTION}     element={<Lazy><SelectionScreen /></Lazy>} />
        <Route path={ROUTES.DATETIME}      element={<Lazy><DatetimeScreen /></Lazy>} />
        <Route path={ROUTES.SPECIALIZED}   element={<Lazy><SpecializedScreen /></Lazy>} />
        <Route path={ROUTES.TABLES}        element={<Lazy><TablesScreen /></Lazy>} />
        <Route path={ROUTES.PULIST}        element={<Lazy><PulistScreen /></Lazy>} />
        <Route path={ROUTES.CHARTS}        element={<Lazy><ChartsScreen /></Lazy>} />
        <Route path={ROUTES.PROGRESS}      element={<Lazy><ProgressScreen /></Lazy>} />
        <Route path={ROUTES.SKELETONS}     element={<Lazy><SkeletonsScreen /></Lazy>} />
        <Route path={ROUTES.AVATARS_PILLS} element={<Lazy><AvatarsScreen /></Lazy>} />
        <Route path={ROUTES.CARDS}         element={<Lazy><CardsScreen /></Lazy>} />
        <Route path={ROUTES.TOOLTIPS}      element={<Lazy><TooltipsScreen /></Lazy>} />
        <Route path={ROUTES.NAVIGATION}    element={<Lazy><NavigationScreen /></Lazy>} />
        <Route path={ROUTES.SIMULATOR}     element={<Lazy><SimulatorScreen /></Lazy>} />
        <Route path={ROUTES.MAP}           element={<Lazy><MapScreen /></Lazy>} />
        <Route path={ROUTES.WARROOM}       element={<Lazy><WarroomScreen /></Lazy>} />
        <Route path={ROUTES.FINANCE}       element={<Lazy><FinanceScreen /></Lazy>} />
        <Route path={ROUTES.MODALS}        element={<Lazy><ModalsScreen /></Lazy>} />
        <Route path={ROUTES.FEEDBACK}      element={<Lazy><FeedbackScreen /></Lazy>} />
        <Route path={ROUTES.CITIZEN}       element={<Lazy><CitizenScreen /></Lazy>} />
        <Route path={ROUTES.EXPORT}        element={<Lazy><ExportScreen /></Lazy>} />
        <Route path={ROUTES.DRAWER}        element={<Lazy><DrawerScreen /></Lazy>} />
      </Routes>
    </Shell>
  );
}
