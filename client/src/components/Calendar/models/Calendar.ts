import {Month} from "./Month";
import {ITasks} from "../../../types/ITasks";
import {Week} from "./Week";

export enum CalendarModes {
    MONTH = "Месяц",
    WEEK = "Неделя",
}

export enum Months {
    JANUARY = 'Январь',
    FEBRUARY = 'Февраль',
    MARCH = 'Март',
    APRIL = 'Апрель',
    MAY = 'Май',
    JUNE = 'Июнь',
    JULY = 'Июль',
    AUGUST = 'Август',
    SEPTEMBER = 'Сентябрь',
    OCTOBER = 'Октябрь',
    NOVEMBER = 'Ноябрь',
    DECEMBER = 'Декабрь'
}

export enum WeekDaysFull {
    SUNDAY = "Воскресенье",
    MONDAY = "Понедельник",
    TUESDAY = "Вторник",
    WEDNESDAY = "Среда",
    THURSDAY = "Четверг",
    FRIDAY = "Пятница",
    SATURDAY = "Суббота",
}

export enum WeekDays {
    SU = "ВС",
    MON = "ПН",
    TU = "ВТ",
    WE = "СР",
    TH = "ЧТ",
    FR = "ПТ",
    SA = "СБ",
}

export interface IDay {
    date: Date,
    weekStart: Date,
    weekEnd: Date,
    tasks: ITasks[],
}

export class Calendar {
    private mode: CalendarModes;
    protected firstDay: WeekDays.MON | WeekDays.SU
    private indexOfFirstDay: 0 | 1
    protected month: Month;
    protected week: Week;


    constructor(mode: CalendarModes, firstDay: WeekDays.MON | WeekDays.SU, tasks: ITasks[]) {
        this.mode = mode;
        // this.modeIndex = 0;
        this.firstDay = firstDay;
        firstDay === WeekDays.MON ? this.indexOfFirstDay = 1 : this.indexOfFirstDay = 0;
        this.month = new Month(this.firstDay, tasks);
        this.week = new Week(this.firstDay, tasks)
    }

    public getFirstDay(): WeekDays.MON | WeekDays.SU {
        return this.firstDay
    }

    public getWeekDays() {
        if (this.firstDay === WeekDays.MON) {
            let sunday = Object.values(WeekDays).slice(0, 1)
            let otherDays = Object.values(WeekDays).slice(1)
            return [...otherDays, ...sunday]
        } else return Object.values(WeekDays)
    }

    public getMonth(): Month {
        return this.month
    }

    public getWeek(): Week {
        return this.week
    }
}


