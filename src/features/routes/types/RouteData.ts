import {TrainStop} from "../../trainStop/types/TrainStopData.ts";

export type Route = {
  id: number;
  name: string;
  stops: TrainStop[]
};