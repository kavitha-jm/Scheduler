import http from "../http-common";
import axios from "axios";
import authHeader from './auth-header';

//const API_URL = 'http://localhost:8080/api/auth/';
axios.defaults.headers.post['Access-Control-Allow-Origin']='*';
class TutorialDataService {
  getAll() {
    return http.get("home");
    /*return axios.get(API_URL + 'home' , { headers: authHeader() })
    .then(response => {    
    console.log(response.data);
    return response.data;
    });*/
  }

  get(id) {
    return http.get(`home/${id}`);
    /*return axios.get(API_URL + 'home/id' , { headers: authHeader() })
    .then(response => {    
      return response.data;
    });*/
  }

  create(data) {
    return http.post("home", data,{ headers: authHeader() });
    //return axios.post(API_URL + 'home' , { headers: authHeader(),data });
  }

  update(id, data) {
    return http.put(`home/${id}`, data);
    //return axios.put(API_URL + 'home/id' , { headers: authHeader(),data });
  }

  delete(id) {
    return http.delete(`home/${id}`);
  }

  deleteAll() {
    return http.delete(`home`);
  }

  findByTitle(title) {
    return http.get(`home?title=${title}`);
    //return axios.get(API_URL + 'home?title=${title}' , { headers: authHeader() });
  }
  
}

export default new TutorialDataService();