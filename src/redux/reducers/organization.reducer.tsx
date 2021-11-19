import {
  CLEAR_ORGANIZATION,
  OrganizationState,
  SET_ORGANIZATION,
} from '../types';

const initialState: OrganizationState = {
  organizationId: null,
};

export function organizationReducer(
  state: OrganizationState = initialState,
  action: any,
) {
  switch (action.type) {
    case SET_ORGANIZATION:
      return {
        ...state,
        organizationId: action.payload,
      };
    case CLEAR_ORGANIZATION:
      return {
        ...state,
        organizationId: null,
      };
    default:
      return state;
  }
}
