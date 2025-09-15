import { apiRequest } from "./api";

export function getStudents(token) {
  return apiRequest("/api/students", "GET", null, token);
}

export function addStudent(student, token) {
  return apiRequest("/api/students", "POST", student, token);
}

export function updateStudent(id, student, token) {
  return apiRequest(`/api/students/${id}`, "PUT", student, token);
}

export function deleteStudent(id, token) {
  return apiRequest(`/api/students/${id}`, "DELETE", null, token);
}
