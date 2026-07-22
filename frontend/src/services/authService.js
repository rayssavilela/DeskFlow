import api from "./api";

const login = async (login, senha) => {

    const response = await api.post("/auth/login", {
        login,
        senha
    });

    return response.data;
};

export default {
    login
};