import { createAction, props } from '@ngrx/store';
import { Follower } from '../models/follower.interface';

export const searchUsers = createAction(
    '[Connections] Search Users',
    props<{ userIdentitiferPrefix: string }>()
);

export const searchUsersResponse = createAction(
    '[Connections] Search Users Response',
    props<{ userOptions: Follower[] }>()
)