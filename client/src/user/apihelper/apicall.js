import { API } from "../../backend";

export const getPhoto = (userId) => {
  return `${API}/user/photo/${userId}`;
};
