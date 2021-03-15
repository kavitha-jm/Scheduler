import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class SaveContent_Service
{
    saveData(contents)
    {
        return axios
        .post(API_URL + "save", {
          contents
          
        })
        .then(response => {
          return response.data;
        });
    }
}
export default new SaveContent_Service();