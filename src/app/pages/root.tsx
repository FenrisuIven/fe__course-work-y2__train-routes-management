import {useState} from "react";
import {Outlet} from "react-router";
import {Header} from "../../features/header/Header.tsx";

import './styles/root.css'
import SearchContext from "../../features/search/context/SearchContext.ts";

const Root = () => {
  const [searchValue, setSearchValue] = useState("");
  const [displaySearchEnv, setDisplaySearchEnv] = useState("");
  const [searchByOptions, setSearchByOptions] = useState<string[]>([]);

  return <>
    <SearchContext.Provider value={{
      searchValue,
      displaySearchEnv,
      searchByOptions,
      setSearchValue,
      setDisplaySearchEnv,
      setSearchByOptions
    }}>
      <Header />
      <div className="header__outlet-container">
        <Outlet />
      </div>
    </SearchContext.Provider>
  </>
}

export default Root;