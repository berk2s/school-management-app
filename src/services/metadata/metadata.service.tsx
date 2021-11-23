import {METADATA_URL} from '@env';
import {MetadataResponse} from '.';
import {apiService} from '..';

export const metadataService = {
  getMetadata,
};

async function getMetadata() {
  const metadata: MetadataResponse = await apiService.get(METADATA_URL);
  return metadata;
}
