const authService = require("../services/authService");

class AuthController {

    async login(req, res) {

        try {
            //Organiza o json
            const { login, senha } = req.body;

            // Validação simples
            if (!login || !senha) {

                return res.status(400).json({
                    erro: "Login e senha são obrigatórios."
                });

            }

            const resultado = await authService.login(login, senha);

            return res.status(200).json(resultado);

        } catch (erro) {

            return res.status(401).json({
                erro: erro.message
            });

        }

    }

}

module.exports = new AuthController();