import http from "../http-common";

export default class UomService {
    static createUom(data) {
        return http.post("/uom", data);
    }

    static getAllUoms() {
        return http.get("/uoms");
    }

    static getUomById(id) {
        return http.get(`/uom/${id}`)
    }

    static updateUom(id, data) {
        return http.put(`/uom/${id}`, data);
    }

    static deleteUom(id, data) {
        return http.delete(`/uom/${id}`, data);
    }
}
