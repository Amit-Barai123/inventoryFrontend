import http from "../http-common";

export default class AuthenticationService {
    static login(data) {
        return http.post("/login", data);
    }

    static logout() { 
        localStorage.removeItem("auth");
    }

    static register(data) {
        return http.post("/signup", data);
    }

    static getCurrentUser() {
        return JSON.parse(localStorage.getItem('auth'));
    }

    static getAllUsers() {
        return http.get("/users");
    }

    static getAllRoles() {
        return http.get("/roles");
    }

    static updateUser(id, data) {
        return http.put(`/user/${id}`, data);
    }

    static deleteUser(id) {
        return http.delete(`/user/${id}`);
    }
}
