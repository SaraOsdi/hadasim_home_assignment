import axios from "axios";

export const coronaAllInfo = async () => {
  const response = await axios.get("http://127.0.0.1:3302/api/coronaInfo/");
  return response.data;
};
