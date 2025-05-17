import {SearchDataStore} from "../searchDataStore";

const rootStore = {
  SearchDataStore: new SearchDataStore(),
}

export type RootStore = typeof rootStore;

export default rootStore