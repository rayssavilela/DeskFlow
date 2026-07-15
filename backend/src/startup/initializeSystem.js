const bcrypt = require("bcrypt");
const UsuarioRepository = require("../repositories/UsuarioRepository");

async function initializeSystem() {

    try {

        console.log("=================================");
        console.log("Inicializando o sistema...");
        console.log("=================================");

        //-----------------------------------------------------
        // Verifica se o usuário Master já existe
        //-----------------------------------------------------

        const master = await UsuarioRepository.buscarMaster();

        if (master) {

            console.log("✔ Usuário Master já cadastrado.");
            return;

        }

        //-----------------------------------------------------
        // Valida as variáveis do .env
        //-----------------------------------------------------

        const requiredVars = [
            "MASTER_NAME",
            "MASTER_EMAIL",
            "MASTER_LOGIN",
            "MASTER_PASSWORD"
        ];

        for (const variable of requiredVars) {

            if (!process.env[variable]) {

                throw new Error(
                    `A variável de ambiente ${variable} não foi configurada.`
                );

            }

        }

        //-----------------------------------------------------
        // Busca o perfil ADMIN
        //-----------------------------------------------------

        const perfilAdmin = await UsuarioRepository.buscarPerfilPorNome("ADMIN");

        if (!perfilAdmin) {

            throw new Error("Perfil ADMIN não encontrado no banco.");

        }

        //-----------------------------------------------------
        // Criptografa a senha
        //-----------------------------------------------------

        const senhaHash = await bcrypt.hash(
            process.env.MASTER_PASSWORD,
            10
        );

        //-----------------------------------------------------
        // Monta o objeto do usuário
        //-----------------------------------------------------

        const usuarioMaster = {

            nome: process.env.MASTER_NAME,

            email: process.env.MASTER_EMAIL,

            login: process.env.MASTER_LOGIN,

            senha: senhaHash,

            idPerfil: perfilAdmin.ID,

            data: new Date(),

            ativo: "S"

        };

        //-----------------------------------------------------
        // Salva no banco
        //-----------------------------------------------------

        await UsuarioRepository.criarMaster(usuarioMaster);

        console.log("=================================");
        console.log("✔ Usuário Master criado com sucesso!");
        console.log(`Login: ${process.env.MASTER_LOGIN}`);
        console.log("=================================");

    } catch (error) {

        console.error("=================================");
        console.error("Erro ao inicializar o sistema");
        console.error(error.message);
        console.error("=================================");

        throw error;

    }

}

module.exports = initializeSystem;