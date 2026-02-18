import { createClient } from "pexels";

const apiKey = import.meta.env.VITE_API_KEY;

if (!apiKey) {
  throw new Error("VITE_API_KEY missing in .env");
}

const client = createClient(apiKey);
export default client;
