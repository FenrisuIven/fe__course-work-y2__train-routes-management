import {createBrowserRouter, Navigate} from "react-router";
import MainRoot from "../pages/main/root.tsx";
import TrainsPage from "../pages/main/trains.tsx";
import StationPage from "../pages/main/station.tsx";
import RoutesPage from "../pages/main/routes.tsx";

import FeatRoot from '../pages/apiFeatures/root.tsx';
import LookupTransfers from "../pages/apiFeatures/lookupTransfers.tsx";

const router = createBrowserRouter([{
  path: '/',
  Component: MainRoot,
  children: [{
    path: '/',
    children: [{
      path: '',
      Component: () => <Navigate to="/trains" replace />
    }],
  }, {
    path: 'trains',
    Component: TrainsPage
  }, {
    path: 'stations',
    Component: StationPage
  }, {
    path: 'routes',
    Component: RoutesPage
  }]
}, {
  path: 'api-features',
  Component: FeatRoot,
  children: [{
    path: '',
    Component: () => <Navigate to='lookup-transfers' />
  }, {
    path: 'lookup-transfers',
    Component: LookupTransfers
  }]
}
]);

export {router};