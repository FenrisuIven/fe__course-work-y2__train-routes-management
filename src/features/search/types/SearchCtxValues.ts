export type SearchCtxValues = {
  searchValue: string,
  displaySearchEnv: string,
  searchByOptions: string[],
  setSearchValue(searchValue: string): void,
  setDisplaySearchEnv(displaySearchEnv: string): void,
  setSearchByOptions(searchByOptions: string[]): void,
};