export interface INavbarObject {
    type: 'list' | 'item'
    title: string;
    items: INavbarObject[]
    link: null | string
    isActive: boolean;
}
