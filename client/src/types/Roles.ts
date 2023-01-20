export enum Roles {
    ADMIN = 'admin', //Доступ к списку всех сотрудников и их страницам без возможности редактирования
    SUPER_ADMIN = 'super_admin', //Выдача ролей//Может дать super-admin и забрать, но у себя не может
    ADMIN_ROLES = 'admin_roles', //Выдача ролей не может выдать super-admin
    GUEST = 'guest', //Только страница гостя
    USER = 'user', //Только своя странца
    CALENDAR = "calendar", //Доступ к календарю на странице
    TASK_MANAGER = "task_manager" //Может назначать и менять нагрды за задачи
}
