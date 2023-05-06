import { triggerHomeToastByAction } from './homeSagas';
import {
  disconnectWalletConnection,
  fetchWalletConnections,
  fetchTips,
  fetchMarketCards,
  triggerDashboardToastByAction,
} from './dashboardSagas';
import rootAction from '@/actions';
import { takeLatest } from 'redux-saga/effects';

function* rootSaga() {
  //home page sagas
  yield takeLatest(rootAction.homeActions.triggerToast, triggerHomeToastByAction);
  //dashboard page sagas
  yield takeLatest(rootAction.dashboardActions.fetchWalletConnections.request, fetchWalletConnections);
  yield takeLatest(rootAction.dashboardActions.disconnectWalletConnection.request, disconnectWalletConnection);
  yield takeLatest(rootAction.dashboardActions.fetchTips.request, fetchTips);
  yield takeLatest(rootAction.dashboardActions.fetchMarketCards.request, fetchMarketCards);
  yield takeLatest(rootAction.dashboardActions.triggerToast, triggerDashboardToastByAction);
}

export default rootSaga;
