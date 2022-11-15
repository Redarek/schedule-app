export interface IBonus {
    _id: string;
    amount: number;
    createdAt: string;
    task: string;
    updated: string;
    user: string;
}

export interface IBonuses {
    week: number;
    all: number
}
