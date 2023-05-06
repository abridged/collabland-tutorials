import { ActionType, StateType } from 'typesafe-actions';

import rootAction from '@/actions';
import rootReducer from '@/reducers';

export type IRootAction = ActionType<typeof rootAction>;
export type IRootState = StateType<typeof rootReducer>;
export type IServices = typeof import('@/apis').default;

export interface IToast {
  showToast: boolean;
  toastSucceed: boolean;
  toastMessage: string;
}
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}
