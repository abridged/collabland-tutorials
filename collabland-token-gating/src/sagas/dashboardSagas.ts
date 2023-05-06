import { AxiosError, AxiosResponse } from 'axios';
import { delay, put } from 'redux-saga/effects';

import apis from '@/apis';
import rootAction from '@/actions';

function* fetchWalletConnections(
  action: ReturnType<typeof rootAction.dashboardActions.fetchWalletConnections.request>
) {
  try {
    const response: AxiosResponse = yield apis.dashboardApis.fetchWalletConnections(action.payload.token);
    yield put(rootAction.dashboardActions.fetchWalletConnections.success(response.data));
  } catch (error) {
    yield put(rootAction.dashboardActions.fetchWalletConnections.failure(error));
    const axiosError = error as AxiosError;
    yield triggerDashboardToast(false, axiosError.message);
  }
}

function* disconnectWalletConnection(
  action: ReturnType<typeof rootAction.dashboardActions.disconnectWalletConnection.request>
) {
  try {
    const response: AxiosResponse = yield apis.dashboardApis.disconnectWalletConnection(action.payload);
    yield put(rootAction.dashboardActions.disconnectWalletConnection.success(response.data));
    window.location.reload();
  } catch (error) {
    yield put(rootAction.dashboardActions.disconnectWalletConnection.failure(error));
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      yield triggerDashboardToast(false, 'Session Expired.');
      yield delay(1000);
      localStorage.removeItem('collabLandToken');
      window.location.href = '/';
    } else {
      yield triggerDashboardToast(false, 'Failed to disconnect.');
    }
  }
}

function* fetchTips(action: ReturnType<typeof rootAction.dashboardActions.fetchTips.request>) {
  try {
    const response: AxiosResponse = yield apis.dashboardApis.fetchTips(action.payload.token);
    yield put(rootAction.dashboardActions.fetchTips.success(response.data));
  } catch (error) {
    yield put(rootAction.dashboardActions.fetchTips.failure(error));
    const axiosError = error as AxiosError;
    yield triggerDashboardToast(false, axiosError.message);
  }
}
function* fetchMarketCards(action: ReturnType<typeof rootAction.dashboardActions.fetchMarketCards.request>) {
  try {
    const response: AxiosResponse = yield apis.dashboardApis.fetchMarketCards(action.payload.token);
    yield put(rootAction.dashboardActions.fetchMarketCards.success(response.data));
  } catch (error) {
    yield put(rootAction.dashboardActions.fetchMarketCards.failure(error));
    const axiosError = error as AxiosError;
    yield triggerDashboardToast(false, axiosError.message);
  }
}

function* triggerDashboardToast(isSuccess: boolean, message: string) {
  yield put(
    rootAction.dashboardActions.toastAction({
      showToast: true,
      toastSucceed: isSuccess,
      toastMessage: message,
    })
  );
  yield delay(5000);
  yield put(
    rootAction.dashboardActions.toastAction({
      showToast: false,
      toastSucceed: isSuccess,
      toastMessage: message,
    })
  );
}

function* triggerDashboardToastByAction(action: ReturnType<typeof rootAction.dashboardActions.triggerToast>) {
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

export {
  fetchWalletConnections,
  disconnectWalletConnection,
  fetchTips,
  fetchMarketCards,
  triggerDashboardToastByAction,
};
