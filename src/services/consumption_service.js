import http from "../http-common";

export default class ConsumptionService {
    static getDailyConsumptionsByDate(date) { 
        return http.get(`/daily-consumption/date/${date}`);
    }

    static getDailyConsumptions() {
        return http.get(`/daily-consumption`);
    }
}
