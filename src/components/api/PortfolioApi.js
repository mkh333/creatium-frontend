import axios from "./axios";

export const getPortfolio = () => axios.get("/portfolio");
export const createPortfolio = (data) => axios.post("/portfolio", data);
export const updatePortfolio = (id, data) => axios.patch(`/portfolio/${id}`, data);
