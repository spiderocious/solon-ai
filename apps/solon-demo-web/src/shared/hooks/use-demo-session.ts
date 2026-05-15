import { useContext } from 'react';
import { DemoSessionContext } from '../providers/demo-session-provider';

export function useDemoSession() {
  return useContext(DemoSessionContext);
}
