export interface State {
    // Интерфейс состояния
    auth: boolean
    applications: IApplication[]
    loading: boolean
    error: null | string
}

export interface IApplication {
    // Интерфейс заявки в очереди
    id: string
    levelSymptoms: string
    date: string
    name: string
    time: string
    phone: string
    email: string
    complaintsArray: string[]
    dateApplicationCreate: number
}

export interface IApplicationArchive extends IApplication {
    // Интерфейс заявки в архиве
    action: string
}

export enum StateActionTypes { // Перечисление action.type
    IS_AUTH = 'IS_AUTH',
    FETCH_APPLICATIONS = 'FETCH_APPLICATIONS',
    FETCH_APPLICATIONS_SUCCESS = 'FETCH_APPLICATIONS_SUCCESS',
    FETCH_APPLICATIONS_ERROR = 'FETCH_APPLICATIONS_ERROR',
    DELETE_APPLICATION = 'DELETE_APPLICATION'
}
interface isAuth {
    type: StateActionTypes.IS_AUTH
    payload: boolean
}
interface FetchApplicationsAction {
    type: StateActionTypes.FETCH_APPLICATIONS
}
interface FetchApplicationsSuccessAction {
    type: StateActionTypes.FETCH_APPLICATIONS_SUCCESS
    payload: IApplication[]
}
interface FetchApplicationsErrorAction {
    type: StateActionTypes.FETCH_APPLICATIONS_ERROR
    payload: string
}
interface DeleteApplicationAction {
    type: StateActionTypes.DELETE_APPLICATION
    payload: string
}

export type StateAction = //объединение интерфейсов экшенов

        | isAuth
        | FetchApplicationsAction
        | FetchApplicationsSuccessAction
        | FetchApplicationsErrorAction
        | DeleteApplicationAction
