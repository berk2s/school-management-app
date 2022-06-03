import {MetadataState, SAVE_METADATA} from '../types';

const initialState: MetadataState = {
  imageUrl: '',
};

export function metadataReducer(
  state: MetadataState = initialState,
  action: any,
) {
  switch (action.type) {
    case SAVE_METADATA:
      return {
        ...state,
        imageUrl: action.payload.imageUrl,
      };
    default:
      return state;
  }
}
