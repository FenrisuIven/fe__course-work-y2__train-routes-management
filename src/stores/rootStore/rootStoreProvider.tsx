import RootStoreCtx from "./rootStoreCtx.ts";
import rootStore from "./rootStore.ts";
import {PropsWithChildren} from "react";

const RootStoreProvider = ({children}: PropsWithChildren) => {
  return <RootStoreCtx.Provider value={rootStore}>{children}</RootStoreCtx.Provider>
}

export {RootStoreProvider}

// const rootStoreCtx = useNullableContext(RootStoreCtx);
// const SearchDataStore = rootStoreCtx.SearchDataStore;