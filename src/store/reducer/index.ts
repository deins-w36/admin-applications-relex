import { State, StateActionTypes, StateAction } from '../../types'

let isAuth = false //Если в локал сроредже есть item auth, то при обновлении страниц ставится true
if (localStorage.getItem('auth')) {
    isAuth = true
}

const initState: State = {
    auth: isAuth,
    applications: [],
    loading: false,
    error: null
}

export const reducer = (state: State = initState, action: StateAction): State => {
    switch (action.type) {
        case StateActionTypes.IS_AUTH:
            return {
                ...state,
                auth: action.payload
            }
        case StateActionTypes.FETCH_APPLICATIONS:
            return {
                ...state,
                loading: true
            }
        case StateActionTypes.FETCH_APPLICATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                applications: action.payload
            }
        case StateActionTypes.FETCH_APPLICATIONS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case StateActionTypes.DELETE_APPLICATION:
            return {
                ...state,
                applications: state.applications.filter((item) => item.id !== action.payload)
            }

        default:
            return state
    }
}

export type RootState = ReturnType<typeof reducer>
