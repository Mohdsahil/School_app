import { API } from "../../backend";

export const createChapter = (
  { name, description, cls, streme, subject },
  userId,
  token
) => {
  return fetch(`${API}/chapter/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, description, cls, streme, subject }),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getAllChapters = (userId, token) => {
  return fetch(`${API}/chapter/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
  //
};

export const createLecture = (lecture, userId, token) => {
  return fetch(`${API}/lecture/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",

      Authorization: `Bearer ${token}`,
    },
    body: lecture,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
  //
};

export const getLectureByChapterId = (chapterId, userId, token) => {
  return fetch(`${API}/lectures/${chapterId}/${userId}`, {
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

export const getPdf = (lectureId) => {
  return fetch(`${API}/lecture/pdf/${lectureId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getVideo = (lectureId) => {
  return fetch(`${API}/lecture/video/${lectureId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
