import { Page, AuthorizationStatus } from '../../const.ts';
import { Routes, Route } from 'react-router-dom';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import Page404 from '../../pages/page404/page404';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import LoginLayout from '../layout/login-layout';
import MainLayout from '../layout/main-layout.tsx';
import { useAppSelector } from '../../hooks/state.tsx';
import LoadingScreen from '../loading-screen/loading-screen.tsx';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
// import { getToken } from '../../services/token.ts';
// import { useEffect } from 'react';
// import { checkAuthAction } from '../../store/api-actions.ts';

export default function App() {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  // const token = getToken();

  // useEffect (() => {
  //   if (token) {
  //     checkAuthAction();
  //   }
  // }, [token]);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={Page.Main} element={<MainLayout />}>
          <Route index element={<Main />} />
        </Route>
        <Route path={Page.Main} element={<Layout />}>
          <Route path={Page.Favorites} element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <Favorites />
            </PrivateRoute>
          }
          />
          <Route path={`${Page.Offer}/:id`} element={<Offer isAuth={isAuth} />} />
          <Route path="*" element={<Page404 />} />
        </Route>
        <Route path={Page.Main} element={<LoginLayout />}>
          <Route path={Page.Login} element={<Login />} />
        </Route>
      </Routes>
    </HistoryRouter>
  );
}
