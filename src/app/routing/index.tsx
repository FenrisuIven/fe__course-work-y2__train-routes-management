import {createBrowserRouter, Navigate} from "react-router";
import MainRoot from "../pages/main/root.tsx";
import TrainsPage from "../pages/main/trains.tsx";
import StationPage from "../pages/main/station.tsx";
import RoutesPage from "../pages/main/routes.tsx";
import VoyagesPage from "../pages/main/voyages.tsx";
import SchedulePage from "../pages/main/schedule.tsx";

import FeatRoot from '../pages/apiFeatures/root.tsx';
import LookupTransfers from "../pages/apiFeatures/lookupTransfers.tsx";
import TrainStopsPage from "../pages/main/trainStops.tsx";

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
  }, {
    path: 'voyages',
    Component: VoyagesPage
  }, {
    path: 'schedule',
    Component: SchedulePage
  }, {
    path: 'train-stops',
    Component: TrainStopsPage
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