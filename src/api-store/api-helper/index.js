import axios from "axios";
import { baseUrl } from "../../configs/config";

const axiosApi = axios.create({
  baseURL: baseUrl,
});

// ** Get function only
export async function get(url) {
  return await axiosApi
    .get(url)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
}
