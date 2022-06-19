import instance from "../configs/apiConfig";

export const addUser = (body) => {
  return instance.post("/addUser", body);
};

export const getUser = (id) => {
  return instance.get(`/getUser?id=${id}`);
};

export const addScore = (body) => {
  return instance.post("/addScore", body);
};

export const getHistory = (id) => {
  return instance.get(`/getHistory?id=${id}`);
};

export const getLeaderboard = () => {
  return instance.get("/getLeaderboard");
};
