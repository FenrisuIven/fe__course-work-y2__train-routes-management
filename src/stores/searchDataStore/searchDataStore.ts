import {makeAutoObservable, action} from 'mobx';

class SearchDataStore {
  searchValue: string = "";
  displaySearchEnv: string = "";
  searchByOptions: string[] = [];
  searchBy: string = ""

  constructor() {
    makeAutoObservable(this);
  }

  setSearchValue = action('setSearchValue', (value: string) => this.searchValue = value)
  setDisplaySearchEnv = action('setDisplaySearchEnv', (value: string) => this.displaySearchEnv = value)
  setSearchByOptions = action('setSearchByOptions', (value: string[]) => this.searchByOptions = value)
  setSearchBy = action('setSearchBy', (value: string) => this.searchBy = value)
}

export {SearchDataStore}