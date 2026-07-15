const express = require("express");
require("dotenv").config();

const initializeSystem = require("./src/startup/initializeSystem");

const app = express();

app.use(express.json());

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