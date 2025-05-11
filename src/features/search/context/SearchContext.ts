import {createContext} from "react";
import {SearchCtxValues} from "../types/SearchCtxValues.ts";

const SearchContext = createContext<SearchCtxValues | null>(null);

export default SearchContext;