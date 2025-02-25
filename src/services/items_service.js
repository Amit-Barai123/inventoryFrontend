import http from "../http-common";

export default class ItemService {
    static createItem(data) {
        return http.post("/item", data);
    }

    static getAllItems() {
        return http.get("/items");
    }

    static getItemById(id) {
        return http.get(`/item/${id}`)
    }

    static updateItem(id, data) {
        return http.put(`/item/${id}`, data);
    }

    static deleteItem(id, data) {
        return http.delete(`/item/${id}`, data);
    }

    static importFromCSV(data) {
        return http.post('/importcsv', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

}
