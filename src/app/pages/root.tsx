import { Outlet } from "react-router";
import { Header } from "../../features/header/Header.tsx";

const Root = () => {
    return <>
        <Header />
        <Outlet />
    </>
}

export default Root;