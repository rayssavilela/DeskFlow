const oracledb = require("oracledb");
const db = require("../config/database");

class UsuarioRepository {

    async buscarMaster() {

        const connection = await db.getConnection();

        try {

            const result = await connection.execute(
                `
                SELECT U.ID,
                       U.NOME,
                       U.LOGIN
                FROM USUARIO U
                INNER JOIN PERFIL P
                    ON P.ID = U.ID_PERFIL
                WHERE U.LOGIN = :login
                  AND P.NOME = 'ADMIN'
                `,
                {
                    login: "admin"
                },
                {
                    outFormat: oracledb.OUT_FORMAT_OBJECT
                }
            );

            if (result.rows.length === 0) {
                return null;
            }

            return result.rows[0];

        } finally {

            await connection.close();

        }

    }

    async buscarPerfilPorNome(nomePerfil) {

        const connection = await db.getConnection();

        try {

            const result = await connection.execute(
                `
                SELECT ID,
                       NOME
                FROM PERFIL
                WHERE NOME = :nome
                `,
                {
                    nome: nomePerfil
                },
                {
                    outFormat: oracledb.OUT_FORMAT_OBJECT
                }
            );

            if (result.rows.length === 0) {

                return null;

            }

            return result.rows[0];

        } finally {

            await connection.close();

        }

    }

    async criarMaster(usuario) {

        const connection = await db.getConnection();

        try {

            await connection.execute(

                `
                INSERT INTO USUARIO
                (
                    NOME,
                    EMAIL,
                    LOGIN,
                    SENHA,
                    ID_PERFIL,
                    ATIVO,
                    DATA_CADASTRO
                )
                VALUES
                (
                    :nome,
                    :email,
                    :login,
                    :senha,
                    :perfil,
                    :ativo,
                    :data
                )
                `,
                {
                    nome: usuario.nome,
                    email: usuario.email,
                    login: usuario.login,
                    senha: usuario.senha,
                    perfil: usuario.idPerfil,
                    ativo: usuario.ativo,
                    data: usuario.data
                },
                {
                    autoCommit: true
                }

            );

        } finally {

            await connection.close();

        }

    }

    async buscarPorLogin(login) {

        const connection = await db.getConnection();

        try {

            const result = await connection.execute(
                `
                SELECT
                    U.ID,
                    U.NOME,
                    U.LOGIN,
                    U.SENHA,
                    P.NOME AS PERFIL
                FROM USUARIO U
                INNER JOIN PERFIL P
                    ON P.ID = U.ID_PERFIL
                WHERE U.LOGIN = :login
                AND U.ATIVO = 'S'
                `,
                { login },
                {
                    outFormat: oracledb.OUT_FORMAT_OBJECT
                }
            );

            if (result.rows.length === 0) {
                return null;
            }

            return result.rows[0];

        } finally {

            await connection.close();

        }

    }
}

module.exports = new UsuarioRepository();