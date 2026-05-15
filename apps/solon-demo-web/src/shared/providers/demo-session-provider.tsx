import React, { createContext, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { demoClient } from '@shared/api/demo-client';
import { DEMO_EP } from '@shared/api/demo-endpoints';

const STORAGE_KEY = 'solon_demo_session';

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

function loadPersistedState(): DemoSessionState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as DemoSessionState;
  } catch {
    // ignore
  }
  return { sessionId: null, leadId: null, isAuthenticated: false };
}

function persistState(s: DemoSessionState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    // ignore
  }
}

function SessionPinger({ sessionId }: { sessionId: string }) {
  const location = useLocation();
  const lastPath = useRef<string>('');

  useEffect(() => {
    if (location.pathname === lastPath.current) return;
    lastPath.current = location.pathname;
    demoClient
      .post(DEMO_EP.SESSION_PING(sessionId), { page: location.pathname }, sessionId)
      .catch(() => undefined);
  }, [location.pathname, sessionId]);

  return null;
}

export function DemoSessionProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoSessionState>(loadPersistedState);

  const login = useCallback((sessionId: string, leadId: string | null) => {
    const next = { sessionId, leadId, isAuthenticated: true };
    persistState(next);
    setState(next);
  }, []);

  const logout = useCallback(() => {
    const next = { sessionId: null, leadId: null, isAuthenticated: false };
    persistState(next);
    setState(next);
  }, []);

  const setLeadId = useCallback((leadId: string) => {
    setState((prev) => {
      const next = { ...prev, leadId };
      persistState(next);
      return next;
    });
  }, []);

  return (
    <DemoSessionContext.Provider value={{ ...state, login, logout, setLeadId }}>
      {state.sessionId && state.isAuthenticated && (
        <SessionPinger sessionId={state.sessionId} />
      )}
      {children}
    </DemoSessionContext.Provider>
  );
}
