import http from "../http-common";

class LoanRequestDataService {
  get(id, token) {
    const header =  { 'Authorization': `Basic ${token}` }
    return http.get(`/request/loan/${id}`, { headers: header });
  }
  create(data, token) {
    const header =  { 'Authorization': `Basic ${token}` }
    return http.post("/request/loan", data, { headers: header });
  }
  update(id, data, token) {
    const header =  { 'Authorization': `Basic ${token}` }
    return http.put(`/request/loan/${id}`, data, { headers: header });
  }
  delete(id, token) {
    const header =  { 'Authorization': `Basic ${token}` }
    return http.delete(`/request/loan/${id}`, { headers: header });
  }
  getAll(token) {
    const header =  { 'Authorization': `Basic ${token}` }
    return http.get("/requests/loan", { headers: header });
  }
  getAllByUser(id, token) {
    const header =  { 'Authorization': `Basic ${token}` }
    return http.get(`/requests/loan/borrower/${id}`, { headers: header });
  }
  getAllByStatus(status, token) {
    const header =  { 'Authorization': `Basic ${token}` }
    return http.get(`/requests/loan/status/${status}`, { headers: header });
  }
}

export default new LoanRequestDataService();
