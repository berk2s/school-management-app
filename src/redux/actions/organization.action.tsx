import {
  CLEAR_ORGANIZATION,
  SET_ORGANIZATION,
} from '../types/organization.types';

export function setOrganization(_organizationId: number) {
  return (dispatch: any, getState: any) => {
    const {organizationId} = getState().organization;

    if (!organizationId || organizationId !== _organizationId) {
      dispatch({
        type: SET_ORGANIZATION,
        payload: _organizationId,
      });
    }
  };
}

export function clearOrganization() {
  return {
    type: CLEAR_ORGANIZATION,
  };
}
