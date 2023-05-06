import { BrowserRouter, Route, Routes } from 'react-router-dom';

import DashboardPage from './containers/DashboardPage';
import GlobalStyles from './globalStyle';
import HomePage from './containers/HomePage';
import NotfoundPage from './containers/NotFoundPage';
import { Provider } from 'react-redux';
import React from 'react';
import RequireAuth from './components/RequireAuth';
import configureStore from './stores/configureStore';
import { interceptorResponse } from '@/utils/axiosHelper';

const store = configureStore();
interceptorResponse();

const App: React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotfoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
