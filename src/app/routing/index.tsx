import {createBrowserRouter, Navigate} from "react-router";
import Root from "../pages/root.tsx";
import TrainsPage from "../pages/trains.tsx";
import StationPage from "../pages/station.tsx";
import RoutesPage from "../pages/routes.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [{
      path: '/',
      Component: () => <Navigate to='/trains' replace />
    }, {
      path: 'trains',
      Component: TrainsPage
    }, {
      path: 'stations',
      Component: StationPage
    }, {
      path: 'routes',
      Component: RoutesPage
    }
    ]
  }
]);

export {router};