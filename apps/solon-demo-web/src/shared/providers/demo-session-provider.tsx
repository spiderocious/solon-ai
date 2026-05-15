import React, { createContext, useCallback, useState } from 'react';

export interface DemoSessionState {
  sessionId: string | null;
  leadId: string | null;
  isAuthenticated: boolean;
}

export interface DemoSessionActions {
  login: (sessionId: string, leadId: string | null) => void;
  logout: () => void;
  setLeadId: (leadId: string) => void;
}

export const DemoSessionContext = createContext<DemoSessionState & DemoSessionActions>({
  sessionId: null,
  leadId: null,
  isAuthenticated: false,
  login: () => undefined,
  logout: () => undefined,
  setLeadId: () => undefined,
});

export function DemoSessionProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoSessionState>({
    sessionId: null,
    leadId: null,
    isAuthenticated: false,
  });

  const login = useCallback((sessionId: string, leadId: string | null) => {
    setState({ sessionId, leadId, isAuthenticated: true });
  }, []);

  const logout = useCallback(() => {
    setState({ sessionId: null, leadId: null, isAuthenticated: false });
  }, []);

  const setLeadId = useCallback((leadId: string) => {
    setState((prev) => ({ ...prev, leadId }));
  }, []);

  return (
    <DemoSessionContext.Provider value={{ ...state, login, logout, setLeadId }}>
      {children}
    </DemoSessionContext.Provider>
  );
}
