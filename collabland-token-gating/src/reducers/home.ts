import { ActionType, createReducer, getType } from 'typesafe-actions';
import { IHomeState } from '@/types/HomeTypes';

import produce from 'immer';
import rootAction from '@/actions';

export type IHomeActions = ActionType<typeof rootAction.homeActions>;
export const defaultHomeState: IHomeState = {
  isLoading: false,
  hasError: false,
  showToast: false,
  toastSucceed: false,
  toastMessage: '',
};

const home = createReducer<IHomeState, IHomeActions>(defaultHomeState)
  .handleType(getType(rootAction.homeActions.triggerHomeLoading), (state, action) =>
    produce(state, (draft) => {
      draft.isLoading = action.payload.isLoading;
    })
  )
  .handleType(getType(rootAction.homeActions.toastAction), (state, action) =>
    produce(state, (draft) => {
      draft.showToast = action.payload.showToast;
      draft.toastSucceed = action.payload.toastSucceed;
      draft.toastMessage = action.payload.toastMessage;
    })
  );

export default home;
