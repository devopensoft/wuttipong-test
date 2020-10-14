import http from "../http-common";

const calculateGame24Result = (numbers) => {
  const params = new URLSearchParams();
  numbers.forEach((number) => {
    params.append("number", number);
  });
  return http.get("/game24/calculate", { params });
};

export default {
  calculateGame24Result,
};
