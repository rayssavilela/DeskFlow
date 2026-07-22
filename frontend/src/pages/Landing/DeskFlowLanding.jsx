import React, { useEffect, useRef, useState, useCallback } from "react";

/* ────────────────────────────────────────────────────────────
   DATA
──────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { href: "#features", label: "Recursos" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#precos", label: "Preços" },
];

const DASH_NAV_ITEMS = [
  "Dashboard",
  "Chamados",
  "Clientes",
  "Relatórios",
  "Base de conhecimento",
  "Automações",
  "Configurações",
];

const DASH_STATS = [
  { label: "Abertos", value: "24", delta: "+3 hoje", colorClass: "teal" },
  { label: "Resolvidos", value: "187", delta: "↑ 12% semana", colorClass: "amber" },
  { label: "CSAT", value: "98%", delta: "Excelente", colorClass: "white" },
];

const TICKETS = [
  { status: "open", text: "Erro ao finalizar compra no checkout", tag: "Urgente", tagClass: "" },
  { status: "pending", text: "Integração com ERP não sincroniza", tag: "Pendente", tagClass: "warn" },
  { status: "open", text: "Usuário não consegue redefinir senha", tag: "Aberto", tagClass: "" },
  { status: "closed", text: "Relatório mensal com dados incorretos", tag: "Resolvido", tagClass: "muted" },
  { status: "open", text: "API retornando erro 403 em produção", tag: "Urgente", tagClass: "" },
];

const LOGOS = ["Contabilix", "NovaTech", "Mercadex", "FluxoDigital", "BrasilSaaS", "Clickmais"];

const CHART_BARS = [
  { h: 30, cls: "" },
  { h: 55, cls: "med" },
  { h: 40, cls: "" },
  { h: 85, cls: "hi" },
  { h: 60, cls: "med" },
  { h: 45, cls: "" },
  { h: 92, cls: "hi" },
  { h: 50, cls: "" },
  { h: 70, cls: "med" },
  { h: 78, cls: "hi" },
  { h: 35, cls: "" },
  { h: 95, cls: "hi" },
];

const FEATURES = [
  {
    icon: "⚡",
    iconClass: "fi-teal",
    title: "Triagem Inteligente com IA",
    text: "Classifica, prioriza e atribui chamados automaticamente com base no histórico e urgência. Sem esforço manual.",
  },
  {
    icon: "📊",
    iconClass: "fi-amber",
    title: "Analytics em Tempo Real",
    text: "Painéis vivos com SLA, volume por canal, tempo de resposta e CSAT. Tome decisões com dados frescos.",
    large: true,
    chart: true,
  },
  {
    icon: "🔗",
    iconClass: "fi-purple",
    title: "Omnichannel Nativo",
    text: "WhatsApp, e-mail, chat no site e redes sociais em uma única fila unificada. Sem perder contexto.",
  },
  {
    icon: "🤖",
    iconClass: "fi-teal",
    title: "Respostas Automáticas",
    text: "Sugere respostas baseadas na base de conhecimento e resolve até 40% dos chamados sem intervenção humana.",
  },
  {
    icon: "🔔",
    iconClass: "fi-amber",
    title: "SLA e Alertas",
    text: "Configure prazos de resposta por categoria e receba alertas antes de violar o SLA. Nunca mais perca um prazo.",
  },
  {
    icon: "🛡️",
    iconClass: "fi-purple",
    title: "Segurança & Compliance",
    text: "Criptografia ponta a ponta, logs de auditoria, LGPD. Seus dados e os de seus clientes sempre protegidos.",
  },
];

const STEPS = [
  { num: "01", title: "Conecte seus canais", text: "Integre e-mail, WhatsApp e chat em minutos. Sem código, sem complicação." },
  { num: "02", title: "Configure sua equipe", text: "Crie grupos, defina SLAs e regras de atribuição automática por habilidade." },
  { num: "03", title: "Resolva com velocidade", text: "Sua equipe responde mais rápido, com contexto completo e IA ao lado." },
];

const TESTIMONIALS = [
  {
    text: "Reduzimos o tempo de resposta em 45% no primeiro mês. A triagem automática da IA é simplesmente absurda.",
    avatar: "RC",
    avatarClass: "av-teal",
    name: "Rafael Costa",
    role: "Head de Suporte · Contabilix",
  },
  {
    text: "Finalmente um helpdesk que não parece feito nos anos 2000. A interface é limpa e minha equipe adora usar.",
    avatar: "MA",
    avatarClass: "av-amber",
    name: "Mariana Azevedo",
    role: "CX Manager · NovaTech",
  },
  {
    text: "O omnichannel unificado mudou tudo. Hoje gerenciamos WhatsApp e e-mail numa tela só. Sem perder contexto.",
    avatar: "TS",
    avatarClass: "av-purple",
    name: "Thiago Santos",
    role: "Fundador · FluxoDigital",
  },
];

const STATS = [
  { target: 40, desc: "% menos tempo resolvendo chamados" },
  { target: 98, desc: "% de satisfação dos clientes" },
  { target: 3, desc: "min de tempo médio de primeira resposta" },
  { target: 1200, desc: "+ empresas já usam o DeskFlow" },
];

const FOOTER_LINKS = ["Privacidade", "Termos", "Status", "Documentação", "Contato"];

/* ────────────────────────────────────────────────────────────
   COMPONENT
──────────────────────────────────────────────────────────── */
export default function DeskFlowLanding() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeDashNav, setActiveDashNav] = useState(0);

  const rootRef = useRef(null);
  const cursorGlowRef = useRef(null);
  const heroGridRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);
  const dashRef = useRef(null);

  /* Load Google Fonts (Syne + Jost), same as original <head> */
  useEffect(() => {
    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = "https://fonts.googleapis.com";

    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href =
      "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Jost:wght@300;400;500&display=swap";

    document.head.appendChild(preconnect);
    document.head.appendChild(stylesheet);

    const prevScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.head.removeChild(preconnect);
      document.head.removeChild(stylesheet);
      document.documentElement.style.scrollBehavior = prevScrollBehavior;
    };
  }, []);

  /* Cursor glow */
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = e.clientX + "px";
        cursorGlowRef.current.style.top = e.clientY + "px";
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /* Scroll: parallax + nav padding */
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (window.scrollY > 60) setNavScrolled(true);
      else setNavScrolled(false);

      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          const slow = y * 0.15;
          const med = y * 0.25;
          const fast = y * 0.4;

          if (heroGridRef.current) {
            heroGridRef.current.style.transform = `perspective(800px) rotateX(${5 + slow * 0.01}deg) translateY(${slow * 0.5}px)`;
          }
          if (orb1Ref.current) orb1Ref.current.style.transform = `translateY(${slow}px)`;
          if (orb2Ref.current) orb2Ref.current.style.transform = `translateY(${-med * 0.6}px)`;
          if (orb3Ref.current) orb3Ref.current.style.transform = `translateY(${med * 0.4}px)`;
          if (dashRef.current) {
            dashRef.current.style.transform = `rotateX(${Math.max(4, 18 - fast * 0.06)}deg) rotateY(-3deg) translateY(${slow * 0.3}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Scroll reveal + count-up stats */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    root.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

    const animateCount = (el) => {
      const target = parseInt(el.dataset.target, 10);
      const suffix = target >= 1000 ? "+" : "%";
      const duration = 1800;
      const start = performance.now();
      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const val = Math.round(eased * target);
        el.textContent = val.toLocaleString("pt-BR") + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    };

    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".stat-big[data-target]").forEach(animateCount);
          }
        });
      },
      { threshold: 0.3 }
    );
    root.querySelectorAll(".stat-item").forEach((el) => statObserver.observe(el));

    return () => {
      revealObserver.disconnect();
      statObserver.disconnect();
    };
  }, []);

  /* 3D tilt on feature cards */
  const tiltCard = useCallback((e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rx = (y - 0.5) * -10;
    const ry = (x - 0.5) * 10;
    card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
    card.style.setProperty("--mx", `${x * 100}%`);
    card.style.setProperty("--my", `${y * 100}%`);
  }, []);

  const resetTilt = useCallback((e) => {
    e.currentTarget.style.transform = "";
  }, []);

  return (
    <div className="deskflow-landing" ref={rootRef}>
      <style>{CSS}</style>

      <div className="cursor-glow" ref={cursorGlowRef} />

      {/* NAV */}
      <nav style={{ padding: navScrolled ? "14px 60px" : "20px 60px" }}>
        <div className="logo">
          <span className="logo-dot" />
          DeskFlow
        </div>
        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <a href="#" className="nav-cta">Começar grátis</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" ref={heroGridRef} />
        <div className="orb orb-1" ref={orb1Ref} />
        <div className="orb orb-2" ref={orb2Ref} />
        <div className="orb orb-3" ref={orb3Ref} />

        <div style={{ width: "100%", maxWidth: 1200, padding: "0 60px" }}>
          <div className="hero-content">
            <div className="hero-badge">
              <span />
              Novo — Integração com IA Generativa
            </div>
            <h1 className="hero-title">
              Suporte que <span className="accent">resolve.</span>
              <br />
              <span className="line2">Equipe que respira.</span>
            </h1>
            <p className="hero-sub">
              O helpdesk que centraliza chamados, automatiza respostas e transforma cada problema em uma
              oportunidade de fidelizar o cliente.
            </p>
            <div className="hero-actions">
              <a href="#" className="btn-primary">Testar 14 dias grátis</a>
              <a href="#" className="btn-ghost">Ver demonstração →</a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="float-card float-1">
              <div className="float-tag">Tempo médio</div>
              <div className="float-val" style={{ color: "var(--teal)" }}>4m 12s</div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>↓ 38% esta semana</div>
            </div>

            <div className="float-card float-2">
              <div className="float-tag">Satisfação</div>
              <div className="float-val" style={{ color: "var(--amber)" }}>98.4%</div>
              <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>↑ CSAT hoje</div>
            </div>

            <div className="dashboard-3d" ref={dashRef}>
              <div className="dash-header">
                <div className="dash-dot r" />
                <div className="dash-dot y" />
                <div className="dash-dot g" />
                <span className="dash-title">DeskFlow — Painel principal</span>
              </div>
              <div className="dash-body">
                <div className="dash-sidebar">
                  {DASH_NAV_ITEMS.map((item, i) => (
                    <div
                      key={item}
                      className={`dash-nav-item${activeDashNav === i ? " active" : ""}`}
                      onClick={() => setActiveDashNav(i)}
                    >
                      <div className="dash-nav-icon" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="dash-main">
                  <div className="dash-stats">
                    {DASH_STATS.map((s) => (
                      <div className="stat-card" key={s.label}>
                        <div className="stat-label">{s.label}</div>
                        <div className={`stat-num ${s.colorClass}`}>{s.value}</div>
                        <div className="stat-delta">{s.delta}</div>
                      </div>
                    ))}
                  </div>
                  <div className="dash-tickets">
                    {TICKETS.map((t, i) => (
                      <div className="ticket-row" key={i}>
                        <div className={`ticket-status ${t.status}`} />
                        <div className="ticket-text">{t.text}</div>
                        <div
                          className={`ticket-tag ${t.tagClass}`}
                          style={
                            t.tagClass === "muted"
                              ? { background: "rgba(122,139,160,0.12)", color: "var(--muted)" }
                              : undefined
                          }
                        >
                          {t.tag}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <div className="logos-section">
        <div className="logos-label">Utilizado por equipes em crescimento</div>
        <div className="logos-row">
          {LOGOS.map((l) => (
            <div className="logo-company" key={l}>{l}</div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section className="section" id="features">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="reveal">
            <div className="section-tag">Recursos</div>
            <h2 className="section-title">Tudo que seu suporte precisa. Num só lugar.</h2>
            <p className="section-sub">
              Da abertura do chamado à resolução, o DeskFlow cuida do fluxo para que sua equipe foque no que
              importa: o cliente.
            </p>
          </div>

          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={`feature-card${f.large ? " large" : ""} reveal reveal-delay-${(i % 3) + 1}`}
                onMouseMove={tiltCard}
                onMouseLeave={resetTilt}
              >
                <div className={`feature-icon ${f.iconClass}`}>{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <p className="feature-text">{f.text}</p>
                {f.chart && (
                  <div className="feature-visual">
                    <div className="mini-chart">
                      {CHART_BARS.map((b, idx) => (
                        <div key={idx} className={`bar ${b.cls}`} style={{ height: `${b.h}%` }} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-section">
        <div className="stats-grid" style={{ maxWidth: 1200, margin: "0 auto" }}>
          {STATS.map((s, i) => (
            <div className={`stat-item reveal${i > 0 ? ` reveal-delay-${Math.min(i, 3)}` : ""}`} key={s.desc}>
              <span className="stat-big" data-target={s.target}>0</span>
              <div className="stat-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="section" id="como-funciona">
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <div className="reveal">
            <div className="section-tag">Como funciona</div>
            <h2 className="section-title" style={{ maxWidth: "100%" }}>
              Simples de configurar.
              <br />
              Poderoso desde o primeiro dia.
            </h2>
          </div>
          <div className="steps-row">
            {STEPS.map((s, i) => (
              <div className={`step reveal reveal-delay-${i + 1}`} key={s.num}>
                <div className="step-num-wrap">
                  <span className="step-num">{s.num}</span>
                </div>
                <div className="step-title">{s.title}</div>
                <p className="step-text">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        className="section"
        id="depoimentos"
        style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="reveal">
            <div className="section-tag">Depoimentos</div>
            <h2 className="section-title">Quem usa, não abre mão.</h2>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div className={`tcard reveal reveal-delay-${i + 1}`} key={t.name}>
                <div className="tcard-stars">★★★★★</div>
                <p className="tcard-text">"{t.text}"</p>
                <div className="tcard-author">
                  <div className={`tcard-avatar ${t.avatarClass}`}>{t.avatar}</div>
                  <div>
                    <div className="tcard-name">{t.name}</div>
                    <div className="tcard-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="reveal">
            <div className="section-tag">Comece agora</div>
            <h2 className="section-title" style={{ maxWidth: "100%" }}>
              Pronto para um suporte
              <br />
              que <span style={{ color: "var(--teal)" }}>realmente resolve?</span>
            </h2>
            <p className="section-sub">14 dias grátis. Sem cartão de crédito. Configure em menos de 10 minutos.</p>
          </div>
          <div className="cta-actions reveal reveal-delay-1">
            <a href="#" className="btn-primary" style={{ fontSize: 16, padding: "18px 44px" }}>Criar conta grátis</a>
            <a href="#" className="btn-ghost" style={{ fontSize: 16, padding: "18px 44px" }}>Falar com vendas</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div>
          <div className="logo" style={{ marginBottom: 8 }}>
            <span className="logo-dot" />
            DeskFlow
          </div>
          <div className="footer-copy">© 2025 DeskFlow. Todos os direitos reservados.</div>
        </div>
        <div className="footer-links">
          {FOOTER_LINKS.map((l) => (
            <a href="#" key={l}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   STYLES (scoped under .deskflow-landing so the component can be
   dropped into any React app without leaking global styles)
──────────────────────────────────────────────────────────── */
const CSS = `
.deskflow-landing, .deskflow-landing *, .deskflow-landing *::before, .deskflow-landing *::after {
  margin: 0; padding: 0; box-sizing: border-box;
}

.deskflow-landing {
  --teal: #00E5C3;
  --teal-dim: rgba(0,229,195,0.12);
  --amber: #FFB347;
  --bg: #060A12;
  --bg2: #0C1220;
  --bg3: #111927;
  --text: #EEF2F7;
  --muted: #7A8BA0;
  --border: rgba(255,255,255,0.07);
  --glow: 0 0 40px rgba(0,229,195,0.18);

  font-family: 'Jost', sans-serif;
  background: var(--bg);
  color: var(--text);
  overflow-x: hidden;
  position: relative;
}

/* NAV */
.deskflow-landing nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 60px;
  background: rgba(6,10,18,0.7);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  transition: padding 0.3s;
}
.deskflow-landing .logo {
  font-family: 'Syne', sans-serif; font-weight: 800; font-size: 22px;
  display: flex; align-items: center; gap: 10px;
}
.deskflow-landing .logo-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--teal); display: inline-block; }
.deskflow-landing .nav-links { display: flex; gap: 36px; list-style: none; }
.deskflow-landing .nav-links a { text-decoration: none; color: var(--muted); font-size: 14px; letter-spacing: 0.03em; transition: color 0.2s; }
.deskflow-landing .nav-links a:hover { color: var(--text); }
.deskflow-landing .nav-cta {
  background: var(--teal); color: #060A12; font-family: 'Syne', sans-serif;
  font-weight: 700; font-size: 13px; padding: 10px 24px; border-radius: 50px;
  text-decoration: none; letter-spacing: 0.04em; transition: transform 0.2s, box-shadow 0.2s;
}
.deskflow-landing .nav-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,229,195,0.35); }

/* HERO */
.deskflow-landing .hero {
  position: relative; min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden; padding-top: 80px;
}
.deskflow-landing .hero-bg {
  position: absolute; inset: 0; z-index: 0;
  background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,229,195,0.07) 0%, transparent 70%);
}
.deskflow-landing .hero-grid {
  position: absolute; inset: 0; z-index: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 60px 60px;
  transform-origin: center bottom;
  will-change: transform;
}
.deskflow-landing .orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; will-change: transform; }
.deskflow-landing .orb-1 { width: 500px; height: 500px; background: rgba(0,229,195,0.08); top: -100px; left: -150px; }
.deskflow-landing .orb-2 { width: 400px; height: 400px; background: rgba(255,179,71,0.06); bottom: -80px; right: -100px; }
.deskflow-landing .orb-3 { width: 300px; height: 300px; background: rgba(120,80,255,0.07); top: 40%; right: 10%; }

.deskflow-landing .hero-content { position: relative; z-index: 2; text-align: center; max-width: 860px; padding: 0 24px; margin: 0 auto; }
.deskflow-landing .hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  border: 1px solid rgba(0,229,195,0.3); border-radius: 50px;
  padding: 6px 16px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--teal); margin-bottom: 32px;
  background: rgba(0,229,195,0.05);
}
.deskflow-landing .hero-badge span { width: 6px; height: 6px; border-radius: 50%; background: var(--teal); animation: df-pulse 2s infinite; }
@keyframes df-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.4)} }

.deskflow-landing .hero-title {
  font-family: 'Syne', sans-serif; font-weight: 800;
  font-size: clamp(48px, 8vw, 90px); line-height: 1.0;
  letter-spacing: -0.03em; margin-bottom: 28px;
}
.deskflow-landing .hero-title .accent { color: var(--teal); }
.deskflow-landing .hero-title .line2 { color: var(--muted); font-weight: 400; }
.deskflow-landing .hero-sub {
  font-size: clamp(16px, 2vw, 20px); color: var(--muted); line-height: 1.7;
  max-width: 580px; margin: 0 auto 48px; font-weight: 300;
}
.deskflow-landing .hero-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

.deskflow-landing .btn-primary {
  background: var(--teal); color: #060A12; font-family: 'Syne', sans-serif;
  font-weight: 700; font-size: 15px; padding: 16px 36px; border-radius: 50px;
  text-decoration: none; transition: transform 0.2s, box-shadow 0.2s;
  letter-spacing: 0.02em; display: inline-block;
}
.deskflow-landing .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(0,229,195,0.4); }
.deskflow-landing .btn-ghost {
  border: 1px solid var(--border); color: var(--text); font-family: 'Syne', sans-serif;
  font-weight: 500; font-size: 15px; padding: 16px 36px; border-radius: 50px;
  text-decoration: none; transition: border-color 0.2s, background 0.2s; display: inline-block;
}
.deskflow-landing .btn-ghost:hover { border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.04); }

.deskflow-landing .hero-visual { position: relative; z-index: 2; margin-top: 72px; perspective: 1200px; }
.deskflow-landing .dashboard-3d {
  width: min(900px, 90vw); margin: 0 auto;
  transform: rotateX(18deg) rotateY(-3deg);
  transform-style: preserve-3d;
  border-radius: 16px; overflow: hidden;
  border: 1px solid rgba(0,229,195,0.2);
  box-shadow: 0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(0,229,195,0.08);
  will-change: transform;
  transition: transform 0.5s cubic-bezier(.25,.8,.25,1);
}
.deskflow-landing .dashboard-3d:hover { transform: rotateX(4deg) rotateY(0deg); }

.deskflow-landing .dash-header {
  background: #0C1525; padding: 14px 20px;
  display: flex; align-items: center; gap: 8px;
  border-bottom: 1px solid var(--border);
}
.deskflow-landing .dash-dot { width: 11px; height: 11px; border-radius: 50%; }
.deskflow-landing .dash-dot.r { background: #FF5F56; }
.deskflow-landing .dash-dot.y { background: #FFBD2E; }
.deskflow-landing .dash-dot.g { background: #27C93F; }
.deskflow-landing .dash-title { margin-left: 12px; font-size: 13px; color: var(--muted); font-family: 'Syne', sans-serif; }

.deskflow-landing .dash-body { background: #0A1020; display: grid; grid-template-columns: 220px 1fr; min-height: 400px; }
.deskflow-landing .dash-sidebar { background: #070D18; border-right: 1px solid var(--border); padding: 20px 0; }
.deskflow-landing .dash-nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: 11px 20px; font-size: 13px; cursor: pointer;
  transition: background 0.2s;
}
.deskflow-landing .dash-nav-item:hover, .deskflow-landing .dash-nav-item.active { background: var(--teal-dim); }
.deskflow-landing .dash-nav-item.active { color: var(--teal); border-left: 2px solid var(--teal); }
.deskflow-landing .dash-nav-icon { width: 16px; height: 16px; border-radius: 4px; background: currentColor; opacity: 0.5; flex-shrink: 0; }

.deskflow-landing .dash-main { padding: 24px; }
.deskflow-landing .dash-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px; }
.deskflow-landing .stat-card { background: #0F1828; border-radius: 10px; padding: 16px; border: 1px solid var(--border); }
.deskflow-landing .stat-label { font-size: 11px; color: var(--muted); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.06em; }
.deskflow-landing .stat-num { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 700; }
.deskflow-landing .stat-num.teal { color: var(--teal); }
.deskflow-landing .stat-num.amber { color: var(--amber); }
.deskflow-landing .stat-num.white { color: var(--text); }
.deskflow-landing .stat-delta { font-size: 11px; color: #3DD68C; margin-top: 4px; }

.deskflow-landing .ticket-row { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 13px; }
.deskflow-landing .ticket-status { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.deskflow-landing .ticket-status.open { background: var(--teal); }
.deskflow-landing .ticket-status.pending { background: var(--amber); }
.deskflow-landing .ticket-status.closed { background: var(--muted); }
.deskflow-landing .ticket-text { flex: 1; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.deskflow-landing .ticket-tag { font-size: 10px; padding: 3px 8px; border-radius: 4px; background: rgba(0,229,195,0.12); color: var(--teal); flex-shrink: 0; }
.deskflow-landing .ticket-tag.warn { background: rgba(255,179,71,0.12); color: var(--amber); }

.deskflow-landing .float-card {
  position: absolute; background: #0F1828;
  border: 1px solid rgba(0,229,195,0.25);
  border-radius: 12px; padding: 14px 18px;
  font-size: 13px; white-space: nowrap;
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);
  will-change: transform;
}
.deskflow-landing .float-1 { left: -80px; top: 100px; animation: df-floatA 6s ease-in-out infinite; }
.deskflow-landing .float-2 { right: -70px; top: 160px; animation: df-floatB 7s ease-in-out infinite; }
.deskflow-landing .float-tag { font-size: 10px; color: var(--teal); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.06em; }
.deskflow-landing .float-val { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 20px; }
@keyframes df-floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
@keyframes df-floatB { 0%,100%{transform:translateY(-8px)} 50%{transform:translateY(8px)} }

/* LOGOS */
.deskflow-landing .logos-section { padding: 60px 60px; border-top: 1px solid var(--border); text-align: center; }
.deskflow-landing .logos-label { font-size: 12px; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 32px; }
.deskflow-landing .logos-row { display: flex; align-items: center; justify-content: center; gap: 48px; flex-wrap: wrap; }
.deskflow-landing .logo-company { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 18px; color: rgba(255,255,255,0.15); letter-spacing: -0.02em; transition: color 0.3s; }
.deskflow-landing .logo-company:hover { color: rgba(255,255,255,0.35); }

/* FEATURES */
.deskflow-landing .section { padding: 120px 60px; }
.deskflow-landing .section-tag { font-size: 11px; color: var(--teal); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 16px; font-family: 'Syne', sans-serif; }
.deskflow-landing .section-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(36px, 5vw, 58px); line-height: 1.05; letter-spacing: -0.03em; margin-bottom: 20px; max-width: 640px; }
.deskflow-landing .section-sub { font-size: 18px; color: var(--muted); max-width: 500px; line-height: 1.7; font-weight: 300; }

.deskflow-landing .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 72px; perspective: 1000px; }
.deskflow-landing .feature-card {
  background: var(--bg2); border: 1px solid var(--border);
  border-radius: 20px; padding: 36px 32px;
  transition: transform 0.4s cubic-bezier(.25,.8,.25,1), border-color 0.3s, box-shadow 0.4s;
  transform-style: preserve-3d;
  cursor: default;
  position: relative; overflow: hidden;
}
.deskflow-landing .feature-card::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(0,229,195,0.06) 0%, transparent 60%);
  opacity: 0; transition: opacity 0.3s;
  pointer-events: none;
}
.deskflow-landing .feature-card:hover::before { opacity: 1; }
.deskflow-landing .feature-card:hover {
  transform: translateY(-8px) rotateX(4deg);
  border-color: rgba(0,229,195,0.3);
  box-shadow: 0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,229,195,0.1);
}
.deskflow-landing .feature-card.large { grid-column: span 2; }
.deskflow-landing .feature-icon { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; font-size: 24px; }
.deskflow-landing .fi-teal { background: rgba(0,229,195,0.1); color: var(--teal); }
.deskflow-landing .fi-amber { background: rgba(255,179,71,0.1); color: var(--amber); }
.deskflow-landing .fi-purple { background: rgba(160,100,255,0.1); color: #A064FF; }
.deskflow-landing .feature-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 20px; margin-bottom: 12px; letter-spacing: -0.02em; }
.deskflow-landing .feature-text { font-size: 15px; color: var(--muted); line-height: 1.7; font-weight: 300; }
.deskflow-landing .feature-visual { margin-top: 28px; border-radius: 10px; overflow: hidden; background: var(--bg3); border: 1px solid var(--border); padding: 16px; }
.deskflow-landing .mini-chart { display: flex; align-items: flex-end; gap: 6px; height: 64px; }
.deskflow-landing .bar { flex: 1; border-radius: 4px 4px 0 0; background: rgba(0,229,195,0.25); transition: height 0.5s; }
.deskflow-landing .bar.hi { background: var(--teal); }
.deskflow-landing .bar.med { background: rgba(0,229,195,0.5); }

/* STATS */
.deskflow-landing .stats-section { padding: 80px 60px; background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.deskflow-landing .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); border-radius: 20px; overflow: hidden; }
.deskflow-landing .stat-item { background: var(--bg2); padding: 48px 36px; text-align: center; transition: background 0.3s; }
.deskflow-landing .stat-item:hover { background: var(--bg3); }
.deskflow-landing .stat-big { font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(40px, 5vw, 64px); letter-spacing: -0.04em; color: var(--teal); display: block; line-height: 1; margin-bottom: 8px; }
.deskflow-landing .stat-desc { font-size: 14px; color: var(--muted); }

/* HOW IT WORKS */
.deskflow-landing .steps-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; margin-top: 72px; position: relative; }
.deskflow-landing .steps-row::before {
  content: ''; position: absolute; top: 36px; left: calc(16.6% + 24px); right: calc(16.6% + 24px);
  height: 1px; background: linear-gradient(90deg, transparent, var(--teal), transparent);
}
.deskflow-landing .step { text-align: center; padding: 0 40px; perspective: 600px; }
.deskflow-landing .step-num-wrap {
  width: 72px; height: 72px; border-radius: 50%; margin: 0 auto 28px;
  display: flex; align-items: center; justify-content: center;
  background: var(--bg2); border: 1px solid rgba(0,229,195,0.3);
  transform-style: preserve-3d; transition: transform 0.6s;
  position: relative; z-index: 1;
}
.deskflow-landing .step-num-wrap:hover { transform: rotateY(360deg); }
.deskflow-landing .step-num { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 22px; color: var(--teal); }
.deskflow-landing .step-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 18px; margin-bottom: 12px; }
.deskflow-landing .step-text { font-size: 15px; color: var(--muted); line-height: 1.7; font-weight: 300; }

/* TESTIMONIALS */
.deskflow-landing .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 72px; }
.deskflow-landing .tcard { background: var(--bg2); border: 1px solid var(--border); border-radius: 20px; padding: 32px; transition: transform 0.3s, border-color 0.3s; perspective: 800px; }
.deskflow-landing .tcard:hover { transform: translateY(-6px) rotateX(3deg); border-color: rgba(255,255,255,0.12); }
.deskflow-landing .tcard-stars { color: var(--amber); font-size: 14px; margin-bottom: 20px; }
.deskflow-landing .tcard-text { font-size: 15px; color: var(--muted); line-height: 1.75; margin-bottom: 24px; font-weight: 300; }
.deskflow-landing .tcard-author { display: flex; align-items: center; gap: 12px; }
.deskflow-landing .tcard-avatar { width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px; }
.deskflow-landing .av-teal { background: rgba(0,229,195,0.15); color: var(--teal); }
.deskflow-landing .av-amber { background: rgba(255,179,71,0.15); color: var(--amber); }
.deskflow-landing .av-purple { background: rgba(160,100,255,0.15); color: #A064FF; }
.deskflow-landing .tcard-name { font-family: 'Syne', sans-serif; font-weight: 600; font-size: 14px; }
.deskflow-landing .tcard-role { font-size: 12px; color: var(--muted); }

/* CTA */
.deskflow-landing .cta-section { padding: 140px 60px; text-align: center; position: relative; overflow: hidden; }
.deskflow-landing .cta-section::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 70% at 50% 50%, rgba(0,229,195,0.07) 0%, transparent 70%); }
.deskflow-landing .cta-section .section-title { max-width: 100%; margin-left: auto; margin-right: auto; }
.deskflow-landing .cta-section .section-sub { max-width: 480px; margin: 0 auto 48px; }
.deskflow-landing .cta-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; position: relative; z-index: 1; }

/* FOOTER */
.deskflow-landing footer { border-top: 1px solid var(--border); padding: 48px 60px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
.deskflow-landing .footer-copy { font-size: 13px; color: var(--muted); }
.deskflow-landing .footer-links { display: flex; gap: 28px; }
.deskflow-landing .footer-links a { font-size: 13px; color: var(--muted); text-decoration: none; transition: color 0.2s; }
.deskflow-landing .footer-links a:hover { color: var(--text); }

/* SCROLL REVEAL */
.deskflow-landing .reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
.deskflow-landing .reveal.visible { opacity: 1; transform: translateY(0); }
.deskflow-landing .reveal-delay-1 { transition-delay: 0.1s; }
.deskflow-landing .reveal-delay-2 { transition-delay: 0.2s; }
.deskflow-landing .reveal-delay-3 { transition-delay: 0.3s; }

/* CURSOR GLOW */
.deskflow-landing .cursor-glow {
  position: fixed; width: 400px; height: 400px; border-radius: 50%;
  background: radial-gradient(circle, rgba(0,229,195,0.05) 0%, transparent 70%);
  pointer-events: none; z-index: 0;
  transform: translate(-50%, -50%);
  transition: transform 0.1s;
  top: 0; left: 0;
}

@media (max-width: 900px) {
  .deskflow-landing nav { padding: 16px 24px !important; }
  .deskflow-landing .nav-links { display: none; }
  .deskflow-landing .section { padding: 80px 24px; }
  .deskflow-landing .features-grid, .deskflow-landing .testimonials-grid, .deskflow-landing .steps-row { grid-template-columns: 1fr; }
  .deskflow-landing .feature-card.large { grid-column: span 1; }
  .deskflow-landing .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .deskflow-landing .dash-body { grid-template-columns: 1fr; }
  .deskflow-landing .dash-sidebar { display: none; }
  .deskflow-landing .float-1, .deskflow-landing .float-2 { display: none; }
  .deskflow-landing .hero { padding-top: 80px; }
  .deskflow-landing .logos-section { padding: 60px 24px; }
  .deskflow-landing .stats-section { padding: 60px 24px; }
  .deskflow-landing .cta-section { padding: 80px 24px; }
  .deskflow-landing footer { padding: 40px 24px; }
}
`;
