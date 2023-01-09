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

export interface IDay {
    date: Date,
    weekStart: Date,
    weekEnd: Date,
    tasks: ITasks[],
}
