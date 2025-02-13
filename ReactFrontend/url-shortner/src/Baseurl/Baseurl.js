import axios from "axios";

const base_url = import.meta.env.VITE_API_URL; // Assign outside

export const api = axios.create({
  baseURL: base_url, // Use baseURL property
});
