import { Action, createReducer, on } from '@ngrx/store';
import * as ConnectionActions from '../actions/linker.actions';
import { Follower } from '../models/follower.interface';

export interface State {
    searchOptions: Follower[];
}

export const initialState: State = {
    searchOptions: []
};

const connectionsReducer = createReducer(
    initialState,
    on(ConnectionActions.searchUsersResponse, (state, {userOptions}) => ({...state, searchOptions: userOptions})),
)

export function reducer(state: State | undefined, action: Action) {
    return connectionsReducer(state, action);
}

export const selectSearchOptions = (state: any) => state.connections.searchOptions;