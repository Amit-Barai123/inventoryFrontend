import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8080/inventory",
    headers: {
        "Content-type": "application/json",
    },
});

http.interceptors.request.use(config => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData && authData.user.token) {
        config.headers["Authorization"] = `Bearer ${authData.user.token}`;
    }
    return config;
});

export default http;





// import axios from "axios";

// const http = axios.create({
//     baseURL: "https://api.gen8ai.in/inventory",
//     headers: {
//         "Content-type": "application/json",
//     },
// });

// http.interceptors.request.use(config => {
//     const authData = JSON.parse(localStorage.getItem("auth"));
//     if (authData && authData.user.token) {
//         config.headers["Authorization"] = `Bearer ${authData.user.token}`;
//     }
//     return config;
// });

// export default http;


