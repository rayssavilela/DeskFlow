const express = require("express");

require("dotenv").config();

const app = express();

app.use(express.json());


const PORT = process.env.PORT || 3000; //Assim, o servidor usa a porta definida no ambiente e, se não existir, utiliza 3000.

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

//console.log(process.env.DB_USER);