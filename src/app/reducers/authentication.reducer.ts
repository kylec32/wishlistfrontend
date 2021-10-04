import { Action, createReducer, on } from '@ngrx/store';
import * as AuthenticationEffects from '../actions/authentication.actions';

export interface State {
    token: string;
}

export const initialState: State = {
    token: ""
};

const authenticationReducer = createReducer(
    initialState,
    on(AuthenticationEffects.signInSuccess, (state, {token}) => ({...state, token: token})),
    on(AuthenticationEffects.signOut, state => ({...state, token: ''})),
    on(AuthenticationEffects.setAuthToken, (state, {token}) => ({...state, token: token}))
)

export function reducer(state: State | undefined, action: Action) {
    return authenticationReducer(state, action);
}

export const selectToken = (state: any) => state.authentication.token;
