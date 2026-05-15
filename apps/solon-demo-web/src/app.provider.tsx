import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ModalHost, ToastHost } from '@solon/ui';
import { DemoSessionProvider } from '@shared/providers/demo-session-provider';

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 30_000, retry: 1 },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <DemoSessionProvider>
          {children}
          <ModalHost />
          <ToastHost />
        </DemoSessionProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
