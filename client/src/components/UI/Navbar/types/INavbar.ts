export interface INavbarObject {
    type: 'list' | 'item' | 'list&item'
    title: string;
    items: INavbarObject[]
    link: null | string
}
