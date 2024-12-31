import { get } from "../api-helper";

export const getUserListAPI = (limit, currentPage) => {
  return get(`/users?limit=${limit}&skip=${currentPage}`);
};
