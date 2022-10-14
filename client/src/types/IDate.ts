import {ITask} from "./ITask";

export interface IDate {
  day: number;
  date: Date;
  dayTasks: ITask[]
}
