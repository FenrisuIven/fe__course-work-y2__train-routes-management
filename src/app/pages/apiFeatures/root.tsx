import {Outlet} from "react-router";
import SimpleHeader from "../../../features/simpleHeader/SimpleHeader.tsx";

import './styles/root.css'

const Root = () => {
  return <>
    <SimpleHeader />
    <div className="header__outlet-container">
      <Outlet />
    </div>
  </>
}

export default Root;