import {makeAutoObservable} from 'mobx';

class SearchDataStore {
  searchValue: string;
  displaySearchEnv: string;
  searchByOptions: string[];

  constructor() {
    makeAutoObservable(this);
  }

  setSearchValue = (value: string) => this.searchValue = value;
  setDisplaySearchEnv = (value: string) => this.displaySearchEnv = value;
  setSearchByOptions = (value: string[]) => this.searchByOptions = value;
}

export {SearchDataStore}