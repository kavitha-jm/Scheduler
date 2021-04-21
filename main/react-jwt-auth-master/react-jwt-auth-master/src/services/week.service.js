import http from "../http-common";
import axios from "axios";
import authHeader from './auth-header';

axios.defaults.headers.post['Access-Control-Allow-Origin']='*';
class WeekScheduleService {
    create(dp) {
        console.log("service ev",dp)
        return http.post("week", dp);
      }

    update(id, data) {
        return http.put(`week/${id}`, data);
        //return axios.put(API_URL + 'home/id' , { headers: authHeader(),data });
      }

}
export default new WeekScheduleService();