# 🚀 DeskFlow

Sistema de Help Desk desenvolvido para estudo e portfólio utilizando **React.js**, **Node.js (Express)** e **Oracle Database**.

O objetivo do projeto é simular um ambiente corporativo de Service Desk, permitindo o gerenciamento completo de chamados técnicos, autenticação de usuários e controle de permissões.

---

## 📖 Sobre o projeto

O DeskFlow foi criado para consolidar conhecimentos em desenvolvimento Full Stack, arquitetura de software e banco de dados Oracle.

Além das funcionalidades básicas de um Help Desk, o projeto busca aplicar boas práticas de desenvolvimento utilizadas em sistemas corporativos.

---

## 🛠️ Tecnologias

### Front-end

- React.js
- React Router
- Axios
- CSS

### Back-end

- Node.js
- Express
- JWT
- Bcrypt
- OracleDB Driver

### Banco de Dados

- Oracle Database XE
- SQL
- PL/SQL
- Procedures
- Triggers
- Views

---

## 📂 Estrutura do Projeto

```text
DeskFlow/

backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   └── server.js
│
├── .env
├── package.json
└── .gitignore

frontend/
```

---

## ✨ Funcionalidades

- Login com autenticação JWT
- Controle de acesso por perfil
- Cadastro de usuários
- Abertura de chamados
- Acompanhamento de chamados
- Atribuição de técnicos
- Histórico de movimentações
- Dashboard com indicadores
- Relatórios
- Upload de anexos *(em desenvolvimento)*

---

## 👥 Perfis de Usuário

- 👨‍💼 Administrador
- 👨‍🔧 Técnico
- 👤 Solicitante

Cada perfil possui permissões específicas dentro do sistema.

---

## 🏗️ Arquitetura

```text
React

↓

Express

↓

Controllers

↓

Services

↓

Repositories

↓

Oracle Database
```

---

## 📌 Status do Projeto

🚧 Em desenvolvimento

Atualmente o projeto está sendo desenvolvido por etapas.

### Roadmap

- [x] Estrutura inicial do projeto
- [x] Configuração do Node.js
- [x] Configuração do Express
- [x] Conexão com Oracle
- [ ] CRUD de Usuários
- [ ] Autenticação JWT
- [ ] CRUD de Chamados
- [ ] Dashboard
- [ ] Upload de arquivos
- [ ] Relatórios
- [ ] Deploy

---

## 🔮 Funcionalidades Futuras

- IA para classificação automática de chamados.
- Sugestão de soluções com inteligência artificial.
- Chat em tempo real entre técnico e solicitante.
- Dashboard analítico com métricas de SLA.
- Notificações por e-mail.
- Histórico completo de auditoria.

---

## 🎯 Objetivo

Este projeto foi desenvolvido para aprimorar conhecimentos em:

- Desenvolvimento Full Stack
- Node.js
- React.js
- Oracle Database
- APIs REST
- Arquitetura em Camadas
- Segurança com JWT
- Boas práticas de desenvolvimento

---

## 📄 Licença

Projeto desenvolvido para fins de estudo e portfólio, feitos pela desenvolvedora Rayssa Vilela.
