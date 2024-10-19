import { SET_USER_PROFILE } from '../constants/actionTypes';

const initialState = {
  userProfile: {user:'Deepak Vyas'},
};

const userProfileReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };    
    default:
      return state;
  }
};

export default userProfileReducer;
