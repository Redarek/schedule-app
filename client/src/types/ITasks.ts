export interface ITask {
    user: string;
    employee: string;
    spec: string;
    timestamp: string;
    title: string;
    text: string;
    complete: boolean;
    firstReward: number;
    secondReward: number;
    penalty: number;
    start: string;
    firstEnd:string;
    secondEnd: string;
}
export interface ITasks {
    user: string;
    employee: string;
    spec: string;
    timestamp: string;
    title: string;
    text: string;
    complete: boolean;
    firstReward: number;
    secondReward: number;
    penalty: number;
    start: Date;
    firstEnd:Date;
    secondEnd: Date;
}
