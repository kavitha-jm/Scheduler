import http from "../http-common";
import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/auth/";

class SaveContent_Service
{
    saveData(contents)
    {
      console.log("contents in serv",contents)
      return http.post("save", {content:contents},{ headers: authHeader() });
        /*return axios
        .post(API_URL + "save", {
          contents
          
        })
        .then(response => {
          return response.data;
        });*/
    }
}
export default new SaveContent_Service();