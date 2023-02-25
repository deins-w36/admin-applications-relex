import { StateActionTypes, IApplication } from '../../types'

export const authChange = (auth: boolean) => {
    return {
        type: StateActionTypes.IS_AUTH,
        payload: auth
    }
}
export const ApplicationsFetching = () => {
    return {
        type: StateActionTypes.FETCH_APPLICATIONS
    }
}
export const ApplicationsFetchingSuccess = (data: IApplication[]) => {
    return {
        type: StateActionTypes.FETCH_APPLICATIONS_SUCCESS,
        payload: data
    }
}
export const ApplicationsFetchingErorr = (error: string) => {
    return {
        type: StateActionTypes.FETCH_APPLICATIONS_ERROR,
        payload: error
    }
}
export const DeleteApplication = (id: string) => {
    return {
        type: StateActionTypes.DELETE_APPLICATION,
        payload: id
    }
}
