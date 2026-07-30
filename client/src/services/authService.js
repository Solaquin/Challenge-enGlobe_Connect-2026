import api from "../api/axios";

const AuthService = {

    async login(credentials) {

        const response = await api.post("/auth/login", credentials);

        return response.data;
    },

    async register(userData) {

        const response = await api.post("/auth/register", userData);

        return response.data;
    }

};

export default AuthService;