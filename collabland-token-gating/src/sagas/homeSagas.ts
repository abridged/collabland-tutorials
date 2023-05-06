import { delay, put } from 'redux-saga/effects';
import rootAction from '@/actions';

function* triggerHomeToastByAction(action: ReturnType<typeof rootAction.homeActions.triggerToast>) {
  yield put(
    rootAction.homeActions.toastAction({
      showToast: true,
      toastSucceed: action.payload.isSuccess,
      toastMessage: action.payload.message,
    })
  );
  yield delay(5000);
  yield put(
    rootAction.homeActions.toastAction({
      showToast: false,
      toastSucceed: action.payload.isSuccess,
      toastMessage: action.payload.message,
    })
  );
}

export { triggerHomeToastByAction };
