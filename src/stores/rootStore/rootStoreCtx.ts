import {createContext} from "react";
import {RootStore} from "./rootStore.ts";

const RootStoreCtx = createContext<RootStore | null>(null);

export default RootStoreCtx;