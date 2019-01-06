import { dateFormats, getDateTimeFormat } from 'common/date';

export const SET_SETTING = 'app/settings/SET_SETTING';

export const initialState = {
  dateFormat: dateFormats[0],
  dateTimeFormat: 'ddd MMM DD, YYYY h:mm a',
  use24HrClock: false,
};

export function setDateTimeFormat(state) {
  state.dateTimeFormat = getDateTimeFormat(
    state.dateFormat,
    state.use24HrClock,
  );
}

export default function settings(state = initialState, action) {
  switch (action.type) {
    case SET_SETTING: {
      const newState = {
        ...state,
        [action.name]: action.value,
      };
      setDateTimeFormat(newState);
      return newState;
    }

    default:
      return state;
  }
}

// Action Creators

export const setSetting = (name, value) => ({ type: SET_SETTING, name, value });
