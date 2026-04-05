import axios from "./axios";

export const signUp = (data) => axios.post("/sign-up", data);
export const signIn = (data) => axios.post("/sign-in", data);
