import http from "../http-common";

class LoanRequestDataService {
  get(id) {
    return http.get(`/request/loan/${id}`);
  }
  create(data) {
    return http.post("/request/loan", data);
  }
  update(id, data) {
    return http.put(`/request/loan/${id}`, data);
  }
  delete(id) {
    return http.delete(`/request/loan/${id}`);
  }
  getAll() {
    return http.get("/requests/loan");
  }
  getAllByUser(id) {
    return http.get(`/requests/loan/borrower/${id}`);
  }
}

export default new LoanRequestDataService();
