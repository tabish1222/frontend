// src/services/students.js
import { apiRequest } from "./api";

export function getStudents() {
  return apiRequest("/api/students", "GET");
}

export function addStudent(student) {
  return apiRequest("/api/students", "POST", student);
}
