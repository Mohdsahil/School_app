import { API } from "../../backend";

export const createTeacher = (teacher, userId, token) => {
  return fetch(`${API}/newteacher/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: teacher,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getAllTeachers = (userId, token) => {
  return fetch(`${API}/user/teacher/${userId}`, {
    method: "get",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const imageUri = (userId) => {
  return `${API}/user/photo/${userId}`;
};

export const createStudent = (student, userId, token) => {
  return fetch(`${API}/newstudent/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: student,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getAllStudens = (userId, token) => {
  return fetch(`${API}/user/students/${userId}`, {
    method: "get",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
