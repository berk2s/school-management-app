export interface ActionScopes {
  parentUrl: string;
  childs: {
    method: RequestMethod;
    url: string;
    scopes: string[];
  }[];
  isExcluded: boolean;
}

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
