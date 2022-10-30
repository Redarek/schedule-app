export interface ITask {
    employee: string;
    spec: string;
    title: string;
    text: string;
    firstReward: string;
    secondReward: string;
    penalty: string;
    start: string;
    firstEnd: string;
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
    firstEnd: Date;
    secondEnd: Date;
}
