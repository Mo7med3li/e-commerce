import axios from "axios";

export async function getBrands() {
  const options = {
    url: "https://ecommerce.routemisr.com/api/v1/brands",
    method: "GET",
  };
  return axios.request(options);
}
