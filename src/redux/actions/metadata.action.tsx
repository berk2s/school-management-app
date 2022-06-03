import {MetadataResponse, metadataService} from '../../services';
import {SAVE_METADATA} from '../types';

export function fetchMetadatas() {
  return (dispatch: any) => {
    return metadataService
      .getMetadata()
      .then((metadata: MetadataResponse) => {
        return dispatch({
          type: SAVE_METADATA,
          payload: {
            imageUrl: metadata.imageUrl,
          },
        });
      })
      .catch(err => {});
  };
}
