import http from "../http-common";

class ReservationService {
  create(data) {
    return http.post("/reservation", data);
  }
}

export default new ReservationService();
