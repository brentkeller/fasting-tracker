export const SET_SETTING = 'app/settings/SET_SETTING';

export const initialState = {
  use24HrClock: false,
};

export default function settings(state = initialState, action) {
  switch (action.type) {
    case SET_SETTING: {
      return {
        ...state,
        [action.name]: action.value,
      };
    }

    default:
      return state;
  }
}

// Action Creators

export const setSetting = (name, value) => ({ type: SET_SETTING, name, value });
