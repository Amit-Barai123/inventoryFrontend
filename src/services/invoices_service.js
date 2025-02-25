import http from "../http-common";

export default class InvoiceService {
    static createInvoice(data) {
        return http.post("/invoice", data); 
    }

    static getAllInvoices() {
        return http.get("/invoices");
    }

    static getAllInvoiceWithPagenation(data) {
        return http.post(`/invoices-list`,data);
    }

    static getInvoiceById(id) {
        return http.get(`/invoice/${id}`)
    }

    static updateInvoice(id, data) {
        return http.put(`/invoice/${id}`, data); 
    }

    static deleteInvoice(id) {
        return http.delete(`/invoice/${id}`); 
    }
}
