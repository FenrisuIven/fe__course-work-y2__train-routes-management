import {createBrowserRouter, Navigate} from "react-router";
import Root from "../pages/root.tsx";
import TrainsPage from "../pages/trains.tsx";

const router = createBrowserRouter([
    {
        path:'/',
        Component: Root,
        children: [
            {
                path: '/',
                Component: () => <Navigate to='/trains' replace />
            },
            {
                path: 'trains',
                Component: TrainsPage
            }
        ]
    }
]);

export {router};