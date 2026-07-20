const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UsuarioRepository = require("../repositories/UsuarioRepository");

class AuthService {

    async login(login, senha) {

        // Busca o usuário no banco
        const usuario = await UsuarioRepository.buscarPorLogin(login);

        if (!usuario) {
            throw new Error("Login ou senha inválidos.");
        }

        // Compara a senha informada com a senha criptografada
        const senhaValida = await bcrypt.compare(
            senha,
            usuario.SENHA
        );

        if (!senhaValida) {
            throw new Error("Login ou senha inválidos.");
        }
        
        // Gera o token JWT
        const token = jwt.sign(
            {
                id: usuario.ID,
                nome: usuario.NOME,
                perfil: usuario.PERFIL
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        return {
            usuario: {
                id: usuario.ID,
                nome: usuario.NOME,
                perfil: usuario.PERFIL
            },
            token
        };

    }

}

module.exports = new AuthService();