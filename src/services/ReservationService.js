import http from "../http-common";

class ReservationService {
  create(data) {
    const header =  { 'Authorization': `Basic ${token}` }
    
    return http.post("/reservation", data);
  }
}

export default new ReservationService();
