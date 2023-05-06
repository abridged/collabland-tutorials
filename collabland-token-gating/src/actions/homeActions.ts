import { createAction } from 'typesafe-actions';
import { IToast } from '@/types/GlobalTypes';

export const homeActions = {
  toastAction: createAction('SHOW_TOAST')<IToast>(),
  triggerToast: createAction('TRIGGER_HOME_TOAST')<{ isSuccess: boolean; message: string }>(),
  triggerHomeLoading: createAction('TRIGGER_HOME_LOADING')<{ isLoading: boolean }>(),
};
