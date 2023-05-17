export interface IUsersResults {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

export interface IUsersInfo {
  seed: string;
  results: number;
  page: number;
  version: string;
}

export interface IUsersApi {
  info: IUsersInfo;
  results: IUsersResults[];
}
