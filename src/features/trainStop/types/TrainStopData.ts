export type TrainStopData = {
  id: number,
  name: string,
  stationID: number,
  stationName: string,
  stationCity: string,
  stationRegion: string,
  stationStreet: string,
  stopPosition: number[]
};

export type TrainStop = {
  id: number,
  name: string,
  stationID: number,
}