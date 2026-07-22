import { useState } from "react";
import { LogIn, KeyRound, ArrowLeft, Eye, EyeOff } from "lucide-react";

//Chama o arquivo que faz a conexão com o Backend
import AuthService from "../../services/authService";

/**
 * Tela de Login — DeskFlow Helpdesk
 * Mesma linguagem visual do landing (fundo escuro, acento teal,
 * tipografia Syne/Jost, grid + orbs de fundo, botões em pílula).
 *
 * Fluxo:
 * 1. Tela inicial: só os botões "Entrar" e "Recuperar senha".
 * 2. Clicar em "Entrar" revela, na MESMA página, os campos de
 *    usuário e senha para autenticação.
 * 3. Clicar em "Recuperar senha" leva para uma página futura —
 *    troque a função `goToRecoverPassword` pela navegação real
 *    (react-router, next/navigation, etc). Por padrão, ele muda
 *    uma view interna só para simular esse destino.
 */

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Jost:wght@300;400;500&display=swap');

  .dfl-root {
    --teal: #00E5C3;
    --teal-dim: rgba(0,229,195,0.12);
    --amber: #FFB347;
    --bg: #060A12;
    --bg2: #0C1220;
    --bg3: #111927;
    --text: #EEF2F7;
    --muted: #7A8BA0;
    --border: rgba(255,255,255,0.07);

    position: relative;
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg);
    color: var(--text);
    font-family: 'Jost', sans-serif;
    overflow: hidden;
    padding: 24px;
    box-sizing: border-box;
  }

  .dfl-bg {
    position: absolute; inset: 0; z-index: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,229,195,0.08) 0%, transparent 70%);
  }

  .dfl-grid {
    position: absolute; inset: 0; z-index: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  .dfl-orb {
    position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none;
  }
  .dfl-orb-1 { width: 420px; height: 420px; background: rgba(0,229,195,0.10); top: -120px; left: -140px; }
  .dfl-orb-2 { width: 360px; height: 360px; background: rgba(255,179,71,0.07); bottom: -100px; right: -120px; }
  .dfl-orb-3 { width: 280px; height: 280px; background: rgba(120,80,255,0.08); top: 55%; right: 8%; }

  .dfl-card {
    position: relative; z-index: 2;
    width: 100%; max-width: 400px;
    background: rgba(12,18,32,0.75);
    backdrop-filter: blur(20px);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 44px 36px 36px;
    box-shadow: 0 30px 80px rgba(0,0,0,0.55), 0 0 60px rgba(0,229,195,0.06);
    text-align: center;
  }

  .dfl-logo {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: 24px;
    margin-bottom: 28px;
  }
  .dfl-logo-dot {
    width: 11px; height: 11px; border-radius: 50%; background: var(--teal);
    box-shadow: 0 0 16px rgba(0,229,195,0.7);
  }

  .dfl-badge {
    display: inline-flex; align-items: center; gap: 8px;
    border: 1px solid rgba(0,229,195,0.3); border-radius: 50px;
    padding: 5px 14px; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--teal); margin-bottom: 18px;
    background: rgba(0,229,195,0.05);
  }
  .dfl-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--teal); }

  .dfl-title {
    font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 26px; letter-spacing: -0.01em; margin-bottom: 8px;
  }

  .dfl-sub {
    font-size: 14px; color: var(--muted); line-height: 1.6;
    font-weight: 300; margin-bottom: 32px;
  }

  .dfl-actions { display: flex; flex-direction: column; gap: 12px; }

  .dfl-btn-primary {
    display: flex; align-items: center; justify-content: center; gap: 10px;
    width: 100%;
    background: var(--teal); color: #060A12; font-family: 'Syne', sans-serif;
    font-weight: 700; font-size: 15px; padding: 15px 24px; border-radius: 50px;
    border: none; cursor: pointer;
    letter-spacing: 0.02em;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .dfl-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,229,195,0.4); }
  .dfl-btn-primary:active { transform: translateY(0); }

  .dfl-btn-ghost {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%;
    background: transparent;
    border: 1px solid var(--border); color: var(--muted); font-family: 'Jost', sans-serif;
    font-weight: 400; font-size: 14px; padding: 13px 24px; border-radius: 50px;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s, color 0.2s;
  }
  .dfl-btn-ghost:hover {
    border-color: rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.04);
    color: var(--text);
  }

  .dfl-footer {
    margin-top: 28px; font-size: 12px; color: var(--muted);
  }

  /* ── formulário de login (usuário / senha) ── */
  .dfl-form { text-align: left; }

  .dfl-field { margin-bottom: 16px; }

  .dfl-label {
    display: block; font-size: 12px; color: var(--muted);
    margin-bottom: 7px; letter-spacing: 0.03em;
  }

  .dfl-input-wrap { position: relative; }

  .dfl-input {
    width: 100%;
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 13px 16px;
    font-family: 'Jost', sans-serif;
    font-size: 14px;
    color: var(--text);
    box-sizing: border-box;
    transition: border-color 0.2s, background 0.2s;
  }
  .dfl-input::placeholder { color: rgba(122,139,160,0.6); }
  .dfl-input:focus {
    outline: none;
    border-color: var(--teal);
    background: rgba(0,229,195,0.05);
  }
  .dfl-input[type="password"],
  .dfl-input.has-toggle { padding-right: 46px; }

  .dfl-input-toggle {
    position: absolute; top: 50%; right: 14px; transform: translateY(-50%);
    background: none; border: none; cursor: pointer;
    color: var(--muted); display: flex; padding: 0;
    transition: color 0.2s;
  }
  .dfl-input-toggle:hover { color: var(--teal); }

  .dfl-form-footer {
    display: flex; justify-content: flex-end; margin-bottom: 20px;
  }

  .dfl-link {
    background: none; border: none; cursor: pointer; padding: 0;
    font-family: 'Jost', sans-serif; font-size: 12.5px; color: var(--teal);
    transition: opacity 0.2s;
  }
  .dfl-link:hover { opacity: 0.8; }

  /* ── tela de "recuperar senha" (placeholder) ── */
  .dfl-placeholder-icon {
    width: 56px; height: 56px; border-radius: 50%;
    background: var(--teal-dim); border: 1px solid rgba(0,229,195,0.3);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 20px;
    color: var(--teal);
  }

  .dfl-back {
    display: inline-flex; align-items: center; gap: 6px;
    background: none; border: none; cursor: pointer;
    color: var(--muted); font-family: 'Jost', sans-serif; font-size: 13px;
    margin-top: 22px; transition: color 0.2s;
  }
  .dfl-back:hover { color: var(--teal); }

  @media (max-width: 480px) {
    .dfl-card { padding: 36px 24px 28px; border-radius: 16px; }
    .dfl-title { font-size: 22px; }
  }
`;

export default function LoginHelpdesk() {
  // "start" -> só os botões | "credentials" -> campos usuário/senha | "recover-placeholder"
  const [view, setView] = useState("start");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function openCredentials() {
    setView("credentials");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // TODO: acionar autenticação real aqui (chamada à API, SSO, etc).
    try {

        const resposta = await AuthService.login(
            username,
            password
        );

        console.log(resposta);

    } catch (erro) {

        console.log(erro);

    }
    
  }

  function goToRecoverPassword() {
    // TODO: substituir por navegação real, ex:
    // navigate("/recuperar-senha")  (react-router)
    // router.push("/recuperar-senha")  (next.js)
    setView("recover-placeholder");
  }

  function backToStart() {
    setView("start");
  }

  return (
    <div className="dfl-root">
      <style>{styles}</style>
      <div className="dfl-bg" />
      <div className="dfl-grid" />
      <div className="dfl-orb dfl-orb-1" />
      <div className="dfl-orb dfl-orb-2" />
      <div className="dfl-orb dfl-orb-3" />

      <div className="dfl-card">
        <div className="dfl-logo">
          <span className="dfl-logo-dot" />
          DeskFlow
        </div>

        {view === "start" && (
          <>
            <div className="dfl-badge">
              <span className="dfl-badge-dot" />
              Central de Chamados
            </div>
            <h1 className="dfl-title">Bem-vindo de volta</h1>
            <p className="dfl-sub">
              Acesse sua conta para abrir, acompanhar e resolver chamados.
            </p>

            <div className="dfl-actions">
              <button className="dfl-btn-primary" onClick={openCredentials}>
                <LogIn size={18} strokeWidth={2.4} />
                Entrar
              </button>
              <button className="dfl-btn-ghost" onClick={goToRecoverPassword}>
                <KeyRound size={16} strokeWidth={2} />
                Recuperar senha
              </button>
            </div>

            <div className="dfl-footer">
              Precisa de ajuda? Fale com o administrador do sistema.
            </div>
          </>
        )}

        {view === "credentials" && (
          <>
            <div className="dfl-badge">
              <span className="dfl-badge-dot" />
              Central de Chamados
            </div>
            <h1 className="dfl-title">Entrar na conta</h1>
            <p className="dfl-sub">
              Informe suas credenciais de acesso ao helpdesk.
            </p>

            <form className="dfl-form" onSubmit={handleSubmit}>
              <div className="dfl-field">
                <label className="dfl-label" htmlFor="dfl-username">
                  Usuário
                </label>
                <div className="dfl-input-wrap">
                  <input
                    id="dfl-username"
                    className="dfl-input"
                    type="text"
                    autoComplete="username"
                    placeholder="seu.usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="dfl-field">
                <label className="dfl-label" htmlFor="dfl-password">
                  Senha
                </label>
                <div className="dfl-input-wrap">
                  <input
                    id="dfl-password"
                    className="dfl-input has-toggle"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="dfl-input-toggle"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              <div className="dfl-form-footer">
                <button
                  type="button"
                  className="dfl-link"
                  onClick={goToRecoverPassword}
                >
                  Esqueci minha senha
                </button>
              </div>

              <div className="dfl-actions">
                <button className="dfl-btn-primary" type="submit">
                  <LogIn size={18} strokeWidth={2.4} />
                  Entrar
                </button>
              </div>
            </form>

            <button className="dfl-back" onClick={backToStart}>
              <ArrowLeft size={14} />
              Voltar
            </button>
          </>
        )}

        {view === "recover-placeholder" && (
          <>
            <div className="dfl-placeholder-icon">
              <KeyRound size={24} strokeWidth={2} />
            </div>
            <h1 className="dfl-title">Recuperar senha</h1>
            <p className="dfl-sub">
              Esta página ainda será criada. Aqui entrará o fluxo de
              recuperação de senha (e-mail, token, nova senha).
            </p>
            <button className="dfl-back" onClick={backToStart}>
              <ArrowLeft size={14} />
              Voltar para o login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
