import {scopesData} from './scope.data';
import {RequestMethod} from './scope.types';

export const scopeService = {
  isExcluded,
  findPermission,
  isEndpointRegistered,
};

function isExcluded(url: string): boolean {
  const filteredData = scopesData.filter(i => url.startsWith(i.parentUrl));

  if (filteredData.length > 0) {
    return filteredData[0].isExcluded;
  } else {
    return true;
  }
}

function findPermission(url: string, method: RequestMethod): string[] {
  const filteredData = scopesData.filter(i => url.startsWith(i.parentUrl));

  if (filteredData.length > 0) {
    const parent = filteredData[0];

    const child = parent.childs.filter(data => {
      if (data.method !== method) {
        return false;
      }

      const cleanUrl = url.split(parent.parentUrl)[1];

      if (data.url.split('/').length !== cleanUrl.split('/').length) {
        return false;
      }

      const splitedChildUrl = data.url.split('/').filter(Boolean);
      const splitedCleanUrl = cleanUrl.split('/').filter(Boolean);

      for (let i = 0; i < splitedChildUrl.length; i++) {
        if (splitedChildUrl[i] !== splitedCleanUrl[i]) {
          if (!splitedChildUrl[i].startsWith('{')) {
            return false;
          } else {
            return true;
          }
        }
      }
    });

    if (child.length > 0) {
      return child[0].scopes;
    } else {
      return [];
    }
  } else {
    return [];
  }
}

function isEndpointRegistered(url: string): boolean {
  return scopesData.filter(i => url.startsWith(i.parentUrl)).length > 0;
}
