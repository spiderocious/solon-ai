import { BrowserRouter } from 'react-router-dom';

import { ModalHost, ToastHost } from '@solon/ui';
import { AppRoutes } from './app.routes.js';

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <ModalHost />
      <ToastHost />
    </BrowserRouter>
  );
}
