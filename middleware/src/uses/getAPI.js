import axios from "axios";

export async function getHRData(api) {
  try {
    const response = await axios.get(api);
    return response.data;
  } catch (error) {
    console.error("Error fetching HR data:", error);
    throw error;
  }
}

export async function getSIPData(api) {
  try {
    const response = await axios.get(api);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching SIP data:", error);
    throw error;
  }
}
