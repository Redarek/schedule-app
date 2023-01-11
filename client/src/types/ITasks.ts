export interface ITask {
    _id: string;
    employee: string;
    spec: string;
    title: string;
    text: string;
    firstReward: number;
    secondReward: number;
    penalty: number;
    start: number;
    firstEnd: number;
    secondEnd: number;
}


export interface ITasks {
    _id: string
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
    firstEnd: Date;
    secondEnd: Date;
}
