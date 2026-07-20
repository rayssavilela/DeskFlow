const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {

    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({
            erro: "Token não informado."
        });
    }

    try {

        const usuario = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            id: usuario.id,
            nome: usuario.nome,
            perfil: usuario.perfil
        };

        next();

    
    } catch (erro) {

        return res.status(401).json({
            erro: "Token inválido."
        });

    }

}

module.exports = authMiddleware;