import {
  ADD_SCOPES,
  ADD_SCOPE,
  CLEAR_ALL_SCOPES,
  REMOVE_SCOPE,
  ScopeState,
} from '../types';

const initialState: ScopeState = {
  actualScopes: ['profile:manage'],
};

export function scopeReducer(state: ScopeState = initialState, action: any) {
  switch (action.type) {
    case ADD_SCOPES:
      return {
        ...state,
        actualScopes: [...state.actualScopes, action.payload],
      };
    case ADD_SCOPE:
      return {
        ...state,
        actualScopes: [...state.actualScopes, action.payload],
      };
    case REMOVE_SCOPE:
      return {
        ...state,
        actualScopes: state.actualScopes.filter(i => i !== action.payload),
      };
    case CLEAR_ALL_SCOPES:
      return {
        ...state,
        actualScopes: [],
      };
    default:
      return state;
  }
}
