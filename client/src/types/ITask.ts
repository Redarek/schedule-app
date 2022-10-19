interface Time {
    year: number;
    month: number;
    date: number;
    hours: number;
    minutes: number;
    seconds: number;
    day: number;
    time: number;
}

export interface ITask {
    startTime: Time;
    endTime: Time;
    title: string;
}