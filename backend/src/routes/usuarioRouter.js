const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { podeCadastrarUsuario } = require("../middlewares/authorizationMiddleware");

const usuarioController = require("../controllers/usuarioController");

router.post(
    "/",
    authMiddleware,
    podeCadastrarUsuario,
    (req, res) => usuarioController.criar(req, res)
);

module.exports = router;