import instance from "../configs/apiConfig";

export const addUser = (body) => {
  return instance.post("/addUser", body);
};

export const getUser = (id) => {
  return instance.get(`/getUser?id=${id}`);
};
