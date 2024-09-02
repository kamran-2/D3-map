import axios from "axios";


const get_otherdata = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    return response.data; 
  } catch (error) {
    console.error("API call error:", error); 
    throw error; 
  }
};

export { get_otherdata };
