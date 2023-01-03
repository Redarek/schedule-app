import {Month} from "./Month";
import {ITasks} from "../../../types/ITasks";

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

export class Calendar {
    private mode: CalendarModes;
    private modeIndex: 0 | 1 | 2;
    private firstDay: WeekDays.MON | WeekDays.SU
    private indexOfFirstDay: 0 | 1
    private month: Month;


    constructor(firstDay: WeekDays.MON | WeekDays.SU, tasks: ITasks[]) {
        this.mode = CalendarModes.MONTH;
        this.modeIndex = 0;
        this.firstDay = firstDay;
        firstDay === WeekDays.MON ? this.indexOfFirstDay = 1 : this.indexOfFirstDay = 0;
        this.month = new Month(this.firstDay, tasks);
    }

    public setMode(mode: CalendarModes) {
        this.mode = mode
        switch (mode) {
            case CalendarModes.MONTH:
                this.modeIndex = 0;
                break;
            case CalendarModes.WEEK:
                this.modeIndex = 1;
                break;
        }
    }

    public getMode(): CalendarModes {
        return this.mode;
    }

    public getModeIndex(): number {
        return this.modeIndex;
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
}


