const express = require("express");
require("dotenv").config();
const cors = require("cors");

const initializeSystem = require("./src/startup/initializeSystem");

const authRouter = require("./src/routes/authRouter");
const usuarioRouter = require("./src/routes/usuarioRouter");

const app = express();

// Middlewares
app.use(express.json());

// Rotas
app.use("/api/auth", authRouter);
app.use("/usuarios", usuarioRouter);

//Frontend
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

const PORT = process.env.PORT || 3000;

// Inicializa o servidor
async function startServer() {

    try {

        // Inicializa o sistema
        await initializeSystem();

        // Inicia o servidor
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });

    } catch (error) {

        console.error("Erro ao iniciar o servidor:");
        console.error(error);

        process.exit(1);

    }

}

startServer();