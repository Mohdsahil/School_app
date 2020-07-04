import { API } from "../../backend";

export const getAllChapters = (subject, userId, token) => {
  return fetch(`${API}/chaptersubject/${subject}/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
