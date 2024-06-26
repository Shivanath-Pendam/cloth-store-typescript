
import { USER_ACTION_TYPE } from './user.types';
import { UnknownAction } from 'redux';
import {
  signInFailed,
  signUpFailed,
  signOutFailed,
  signOutSuccess,
  signInSuccess
} from './user.action';
import { UserData } from '../../utils/firebase/firebase.utils';

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIALVALUE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
}

export const userReducer = (
  state = INITIALVALUE,
  action: UnknownAction
) => {

  if (signInSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload
    };
  }

  if (signOutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null
    };
  }

  if (signInFailed.match(action) || signOutFailed.match(action) || signUpFailed.match(action)) {
    return {
      ...state,
      error: action.payload,
    };
  }

  return state;
};
