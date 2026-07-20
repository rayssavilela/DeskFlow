const permissoesCadastro = {
    ADMIN: ["ADMIN", "TECNICO", "SOLICITANTE"],
    TECNICO: ["SOLICITANTE"],
    SOLICITANTE: []
};

function podeCadastrarUsuario(req, res, next) {

    const perfilLogado = req.user.perfil;
    const perfilNovo = req.body.perfil;

    if (permissoesCadastro[perfilLogado]?.includes(perfilNovo)) {
        return next();
    }

    return res.status(403).json({
        erro: "Você não possui permissão para cadastrar esse perfil."
    });
}

module.exports = {
    podeCadastrarUsuario
};