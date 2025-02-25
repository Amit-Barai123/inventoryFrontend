import http from "../http-common";

export default class InventoryService {
    static createInventory(data) {
        return http.post("/inventory", data); 
    }

    static getAllInventory() {
        return http.get("/inventory"); 
    }

    static getAllInvoiceWithPagenation(data) {
        return http.post(`/inventory-list`,data);
    }

    static getInventoryById(id) {
        return http.get(`/inventory/${id}`)
    }

    static updateInventory(id, data) {
        return http.put(`/inventory/${id}`, data);
    }

    static deleteInventory(id) {
        return http.delete(`/inventory/${id}`);
    }
}
