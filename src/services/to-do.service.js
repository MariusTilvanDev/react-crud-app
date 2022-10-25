import http from "../http-common";
import { map } from 'rxjs/operators';

class ToDoDataService {
  getAll() {
    return http.get("/todos");
  }

  get(id) {
    return http.get(`/todos/${id}`);
  }

  create(data) {
    return http.post("/todos", data);
  }

  update(id, data) {
    return http.put(`/todos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/todos/${id}`);
  }
}

export default new ToDoDataService();