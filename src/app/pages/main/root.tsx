import {Outlet} from "react-router";
import {Header} from "../../../features/header/Header.tsx";

import './styles/root.css'

const Root = () => {
  return <>
    <Header />
    <div className="header__outlet-container">
      <Outlet />
    </div>
  </>
}

export default Root;