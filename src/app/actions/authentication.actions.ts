import { createAction, props } from '@ngrx/store';

export const signUp = createAction(
    '[Sign Up Page] Sign Up',
    props<{ firstName: string; lastName: string; emailAddress: string; password: string; captchaResponse: string }>()
  );

export const signUpSuccess = createAction(
'[Sign Up Page] Sign Up Success'
);

export const signUpFailure = createAction(
    '[Sign Up Page] Sign Up Failure',
    props<{error: any}>()
);

export const signIn = createAction(
    '[Sign In] Sign In',
    props<{email: string, password: string}>()
)

export const signInSuccess = createAction(
    '[Sign In] Sign In Success',
    props<{token: string}>()
)

export const signInInvalid = createAction(
    '[Sign In] Sign In Invalid'
)

export const signInFailure = createAction(
    '[Sign In] Sign In Failure',
    props<{error: any}>()
)

export const signOut = createAction(
    '[Sign In] Sign Out'
)

export const setAuthToken = createAction(
    '[Sign In] Set Token',
    props<{token: string}>()
)
