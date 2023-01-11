import {ITasks} from "../../../types/ITasks";
import {IDay, Months, WeekDays} from "./CalendarTypes";

export class Week {
    private dayMarker: number;
    private days: IDay[];
    private tasks: ITasks[];
    firstDay: WeekDays.MON | WeekDays.SU;

    constructor(firstDay: WeekDays.SU | WeekDays.MON, tasks: ITasks[]) {
        this.firstDay = firstDay;
        this.days = []
        this.tasks = tasks
        this.dayMarker = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()
        // let firstDate = new Date().getTime();

        this.fillWeek()
        this.addTasks()
    }

    private fillWeek() {
        this.days = []
        let numOfCurrentDay = new Date(this.dayMarker).getDay()
        if (this.firstDay === WeekDays.MON) {
            if (numOfCurrentDay === 0) numOfCurrentDay = 7
            this.dayMarker = new Date(this.dayMarker - 86400000 * (numOfCurrentDay - 1)).getTime()
        } else if (this.firstDay === WeekDays.SU) {
            this.dayMarker = new Date(this.dayMarker - 86400000 * (numOfCurrentDay - 0)).getTime()
        }
        for (let i = 0; i < 7; i++) {
            this.days.push({
                    date: new Date(this.dayMarker + i * 86400000),
                    weekStart: new Date(this.dayMarker),
                    weekEnd: new Date(this.dayMarker + 6 * 86400000),
                    tasks: []
                }
            )
        }
    }

    private addTasks() {
        for (let i = 0; i < this.tasks.length; i++) {
            for (let j = 0; j < this.days.length; j++) {
                if (this.tasks[i].firstEnd.getTime() - this.days[j].date.getTime() > 0
                    && this.days[j].date.getTime() >= this.tasks[i].start.getTime() - 86400000) {
                    if (!this.days[j].tasks.includes(this.tasks[i]))
                        this.days[j].tasks.push(this.tasks[i])
                }
            }
        }
    }

    public nextWeek() {
        this.dayMarker = this.dayMarker + 86400000 * 7
        this.fillWeek()
        this.addTasks()
    }

    public previousWeek() {
        this.dayMarker = this.dayMarker - 86400000 * 7
        this.fillWeek()
        this.addTasks()
    }

    public getDays(): IDay[] {
        return this.days
    }

    public currentWeek() {
        this.dayMarker = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()
        this.fillWeek()
        this.addTasks()
    }

    public getIndexOfFirstDay(): 0 | 1 {
        return this.firstDay === WeekDays.MON ? 1 : 0
    }

    public getCurrentDate() {
        if (this.days[0].date.getMonth() === this.days[6].date.getMonth())
            return `${Object.values(Months)[this.days[0].date.getMonth()]} ${this.days[0].date.getFullYear()}`
        else if (this.days[0].date.getFullYear() === this.days[6].date.getFullYear())
            return `${Object.values(Months)[this.days[0].date.getMonth()]} - ${Object.values(Months)[this.days[6].date.getMonth()]} ${this.days[0].date.getFullYear()}`
        else
            return `${Object.values(Months)[this.days[0].date.getMonth()]} ${this.days[0].date.getFullYear()} - ${Object.values(Months)[this.days[6].date.getMonth()]} ${this.days[6].date.getFullYear()}`
    }

}
