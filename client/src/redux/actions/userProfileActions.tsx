import { SET_USER_PROFILE } from '../constants/actionTypes';

export const setUserProfile = (user:any) => ({
  type: SET_USER_PROFILE,
  payload: user,
});
