import { Authstate } from './index';
import { IUser } from '../../interfaces';


type AuthActionType =
    | { type: '[auth] - Login', payload: IUser }
    | { type: '[auth] - Logout' }

export const authReducer = (state: Authstate, action: AuthActionType): Authstate => {
    switch (action.type) {
        case '[auth] - Login':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            }

        case '[auth] - Logout':
            return {
                ...state,
                isLoggedIn: false,
                user:undefined
            }
        default:
            return state;
    }
}