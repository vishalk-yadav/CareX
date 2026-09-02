import { useContext } from 'react';
import { CareXContext } from './careXContextDef';
import type { CareXContextType } from './careXContextDef';

export const useCareX = (): CareXContextType => {
  const context = useContext(CareXContext);
  if (!context) {
    throw new Error('useCareX must be used within a CareXProvider');
  }
  return context;
};
