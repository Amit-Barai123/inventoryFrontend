import http from "../http-common";

export default class VendorService {
    static createVendor(data) {
        return http.post("/vendor", data);
    }

    static getAllVendors() {
        return http.get("/vendors");
    }

    static getAllVendorsWithPagenation(data) {
        return http.post(`/vendors-list`,data);
    }

    static getVendorById(id) {
        return http.get(`/vendor/${id}`)
    }

    static updateVendor(id, data) {
        return http.put(`/vendor/${id}`, data);
    }

    static deleteVendor(id) {
        return http.delete(`/vendor/${id}`);
    }
}
