import {IDay, Months, WeekDays} from "./Calendar";
import {ITasks} from "../../../types/ITasks";


export class Month {
    private currentMonth: number;
    private currentYear: number;
    private daysInMonth: IDay[];
    private firstDayInMonth: Date;
    private lastDayInMonth: Date;
    private lastDayOfPreviousMonth: Date;
    private tasks: ITasks[];

    private firstDay: WeekDays.MON | WeekDays.SU;
    private indexOfFirstDay: 0 | 1

    constructor(location: WeekDays.MON | WeekDays.SU, tasks: ITasks[]) {
        this.firstDay = location
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        this.firstDayInMonth = new Date(this.currentYear, this.currentMonth, 1)
        this.lastDayInMonth = new Date(this.currentYear, this.currentMonth + 1, 0)
        this.lastDayOfPreviousMonth = new Date(this.currentYear, this.currentMonth, 0)
        this.tasks = []
        if (tasks) this.tasks = tasks
        this.indexOfFirstDay = location === WeekDays.MON ? 1 : 0
        this.daysInMonth = [];
        this.setDaysInMonth();
    }

    private setDaysInMonth() {
        this.daysInMonth = []
        this.daysInPreviousMonth()
        this.daysInCurrentMonth()
        this.daysInNextMonth()
        this.addWeeks()

        this.addTasks()
    }

    private addTasks() {
        for (let i = 0; i < this.tasks.length; i++) {
            for (let j = 0; j < this.daysInMonth.length; j++) {
                // if (
                //     this.tasks[i].start.getTime() - this.daysInMonth[j].date.getTime() > 0
                //     && this.tasks[i].start.getTime() - this.daysInMonth[j].date.getTime() < 86400000
                // ) {
                //     for (let k = j; k < this.daysInMonth.length; k++) {
                //         if (
                //             this.tasks[i].firstEnd.getTime() - this.daysInMonth[k].date.getTime() > 0
                //         ) {
                //             this.daysInMonth[k].tasks.push(this.tasks[i])
                //         }
                //     }
                // }

                if (this.tasks[i].firstEnd.getTime() - this.daysInMonth[j].date.getTime() > 0
                    && this.daysInMonth[j].date.getTime() >= this.tasks[i].start.getTime() - 86400000) {
                    if (!this.daysInMonth[j].tasks.includes(this.tasks[i]))
                        this.daysInMonth[j].tasks.push(this.tasks[i])
                }
            }
        }
    }

    private addWeeks() {
        for (let i = 0; i < this.daysInMonth.length; i++) {
            if (i < 7 && i >= 0) {
                this.daysInMonth[i] = {
                    ...this.daysInMonth[i],
                    weekStart: this.daysInMonth[0].date,
                    weekEnd: this.daysInMonth[6].date,
                }

            }
            if (i < 14 && i >= 7) {
                this.daysInMonth[i] = {
                    ...this.daysInMonth[i],
                    weekStart: this.daysInMonth[7].date,
                    weekEnd: this.daysInMonth[14].date,
                }

            }
            if (i < 21 && i >= 14) {
                this.daysInMonth[i] = {
                    ...this.daysInMonth[i],
                    weekStart: this.daysInMonth[14].date,
                    weekEnd: this.daysInMonth[21].date,
                }

            }
            if (i < 28 && i >= 21) {
                this.daysInMonth[i] = {
                    ...this.daysInMonth[i],
                    weekStart: this.daysInMonth[21].date,
                    weekEnd: this.daysInMonth[28].date,
                }

            }
            if (i < 35 && i >= 28) {
                this.daysInMonth[i] = {
                    ...this.daysInMonth[i],
                    weekStart: this.daysInMonth[28].date,
                    weekEnd: new Date(this.daysInMonth[34].date.getTime() + 86400000),
                }

            }
            if (this.daysInMonth.length > 35) {
                if (i < 42 && i >= 35) {
                    this.daysInMonth[i] = {
                        ...this.daysInMonth[i],
                        weekStart: this.daysInMonth[35].date,
                        weekEnd: new Date(this.daysInMonth[41].date.getTime() + 86400000),
                    }
                }
            }
        }
    }

    private daysInPreviousMonth() {
        let numberOfFirstDayInMonth = this.firstDayInMonth.getDay()
        if (this.indexOfFirstDay === 1 && numberOfFirstDayInMonth === 0) numberOfFirstDayInMonth = 7
        if (numberOfFirstDayInMonth !== this.indexOfFirstDay) {
            for (let i = 0; i < numberOfFirstDayInMonth - this.indexOfFirstDay; i++) {
                this.daysInMonth.push({
                    date: new Date(this.currentYear, this.currentMonth - 1, this.lastDayOfPreviousMonth.getDate() - i),
                    weekStart: new Date(),
                    weekEnd: new Date(),
                    tasks: [],
                })
            }
        }
        this.daysInMonth.reverse()
    }

    private daysInCurrentMonth() {
        for (let i = 0; i < this.lastDayInMonth.getDate(); i++) {
            this.daysInMonth.push({
                date: new Date(this.currentYear, this.currentMonth, i + 1),
                weekStart: new Date(),
                weekEnd: new Date(),
                tasks: [],
            })
        }
    }

    private daysInNextMonth() {
        let numberOfLastDayInMonth = this.lastDayInMonth.getDay()
        if (numberOfLastDayInMonth !== this.indexOfFirstDay + 6) {
            for (let i = 0; i < 6 - numberOfLastDayInMonth + this.indexOfFirstDay; i++) {
                this.daysInMonth.push({
                    date: new Date(this.currentYear, this.currentMonth + 1, i + 1),
                    weekStart: new Date(),
                    weekEnd: new Date(),
                    tasks: [],
                })
            }
        }
    }

    private setFirstAndLastDays() {
        this.firstDayInMonth = new Date(this.currentYear, this.currentMonth, 1)
        this.lastDayInMonth = new Date(this.currentYear, this.currentMonth + 1, 0)
        this.lastDayOfPreviousMonth = new Date(this.currentYear, this.currentMonth, 0)
    }

    public nextMonth() {
        if (this.currentMonth === 11) {
            this.currentMonth = 0;
            this.currentYear += 1;
        } else {
            this.currentMonth += 1;
        }
        this.setFirstAndLastDays()
        this.setDaysInMonth()
    }

    public previousMonth() {
        if (this.currentMonth === 0) {
            this.currentMonth = 11;
            this.currentYear -= 1;
        } else {
            this.currentMonth -= 1;
        }
        this.setFirstAndLastDays()
        this.setDaysInMonth()
    }

    public getDaysInMonth() {
        return this.daysInMonth
    }

    public getMonthName() {
        return `${Object.values(Months)[this.currentMonth]} ${this.currentYear}`
    }

    public setCurrentMonth() {
        this.currentYear = new Date().getFullYear();
        this.currentMonth = new Date().getMonth()

        this.setFirstAndLastDays()
        this.setDaysInMonth();
    }

    public getIndexOfFirstDay(): 0 | 1 {
        return this.indexOfFirstDay
    }

}
