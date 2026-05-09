// =============================================================
//  NOTAS DOS ALUNOS — Sistema multi-turmas
//  Paleta: turquesa primária, roxo destaques, coral atenção
// =============================================================

const { useState, useEffect, useMemo, useRef } = React;

// ---------- TWEAKS ----------
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "density": "comfortable",
  "palette": "turquoise"
}/*EDITMODE-END*/;

// ---------- PALETAS ----------
const PALETTES = {
  turquoise: {
    name: "Turquesa",
    primary: "#14B8B0",
    primaryDark: "#0E8E88",
    primarySoft: "#D6F5F2",
    accent: "#A855F7",
    accentSoft: "#F3E8FF",
    coral: "#FF7A59",
    coralSoft: "#FFE5DC",
    success: "#10B981",
    successSoft: "#D1FAE5",
    danger: "#EF4444",
    dangerSoft: "#FEE2E2",
    warn: "#F59E0B",
    warnSoft: "#FEF3C7",
    bg: "#F2F7FB",
    surface: "#FFFFFF",
    line: "#E4ECF2",
    ink: "#0F172A",
    inkMuted: "#64748B",
    inkSoft: "#94A3B8",
  },
  purple: {
    name: "Roxo",
    primary: "#A855F7",
    primaryDark: "#7E22CE",
    primarySoft: "#F3E8FF",
    accent: "#14B8B0",
    accentSoft: "#D6F5F2",
    coral: "#FF7A59",
    coralSoft: "#FFE5DC",
    success: "#10B981",
    successSoft: "#D1FAE5",
    danger: "#EF4444",
    dangerSoft: "#FEE2E2",
    warn: "#F59E0B",
    warnSoft: "#FEF3C7",
    bg: "#F5F2FB",
    surface: "#FFFFFF",
    line: "#EAE2F2",
    ink: "#0F172A",
    inkMuted: "#64748B",
    inkSoft: "#94A3B8",
  },
  coral: {
    name: "Coral",
    primary: "#FF7A59",
    primaryDark: "#E55A3A",
    primarySoft: "#FFE5DC",
    accent: "#14B8B0",
    accentSoft: "#D6F5F2",
    coral: "#A855F7",
    coralSoft: "#F3E8FF",
    success: "#10B981",
    successSoft: "#D1FAE5",
    danger: "#EF4444",
    dangerSoft: "#FEE2E2",
    warn: "#F59E0B",
    warnSoft: "#FEF3C7",
    bg: "#FBF5F2",
    surface: "#FFFFFF",
    line: "#F2E4DC",
    ink: "#0F172A",
    inkMuted: "#64748B",
    inkSoft: "#94A3B8",
  },
};

// ---------- DADOS MOCK (LEGADO - sobrescrito por turmas-data.js) ----------
const _LEGACY_TURMAS = [
  {
    id: "t1",
    nome: "Matemática Aplicada",
    codigo: "LIC.0164",
    professor: "Sandro Ferreira de Lima",
    turma: "20252.4.SBF06GL.1N",
    curso: "Lic. em Ciências da Computação",
    periodo: "2025/2",
    cargaHoraria: "60h",
    cor: "turquoise",
    icone: "∑",
  },
  {
    id: "t2",
    nome: "Algoritmos e Estruturas de Dados",
    codigo: "LIC.0212",
    professor: "Ana Paula Ribeiro",
    turma: "20252.4.SBF06GL.2N",
    curso: "Lic. em Ciências da Computação",
    periodo: "2025/2",
    cargaHoraria: "80h",
    cor: "purple",
    icone: "{ }",
  },
  {
    id: "t3",
    nome: "Banco de Dados",
    codigo: "LIC.0298",
    professor: "Carlos Eduardo Mendes",
    turma: "20252.3.SBF06GL.1N",
    curso: "Lic. em Ciências da Computação",
    periodo: "2025/2",
    cargaHoraria: "60h",
    cor: "coral",
    icone: "DB",
  },
  {
    id: "t4",
    nome: "Engenharia de Software",
    codigo: "LIC.0341",
    professor: "Mariana Costa Lima",
    turma: "20252.5.SBF06GL.1N",
    curso: "Lic. em Ciências da Computação",
    periodo: "2025/2",
    cargaHoraria: "80h",
    cor: "green",
    icone: "⚙",
  },
  {
    id: "t5",
    nome: "Redes de Computadores",
    codigo: "LIC.0289",
    professor: "Roberto Almeida Silva",
    turma: "20252.4.SBF06GL.1N",
    curso: "Lic. em Ciências da Computação",
    periodo: "2025/2",
    cargaHoraria: "60h",
    cor: "blue",
    icone: "⇄",
  },
  {
    id: "t6",
    nome: "Inteligência Artificial",
    codigo: "LIC.0412",
    professor: "Patrícia Oliveira Souza",
    turma: "20252.6.SBF06GL.1N",
    curso: "Lic. em Ciências da Computação",
    periodo: "2025/2",
    cargaHoraria: "80h",
    cor: "magenta",
    icone: "AI",
  },
  {
    id: "t7",
    nome: "Didática Geral",
    codigo: "LIC.0103",
    professor: "Luciana Ferreira Gomes",
    turma: "20252.2.SBF06GL.1N",
    curso: "Lic. em Ciências da Computação",
    periodo: "2025/2",
    cargaHoraria: "60h",
    cor: "amber",
    icone: "✎",
  },
  {
    id: "t8",
    nome: "Desenvolvimento Web",
    codigo: "LIC.0387",
    professor: "Tiago Henrique Barros",
    turma: "20252.5.SBF06GL.2N",
    curso: "Lic. em Ciências da Computação",
    periodo: "2025/2",
    cargaHoraria: "80h",
    cor: "teal",
    icone: "</>",
  },
];

// Cor visual por card (não muda com a paleta — variedade na tela inicial)
const CARD_COLORS = {
  turquoise: { bg: "#D6F5F2", ink: "#0E8E88", soft: "#ECFAF8" },
  purple:    { bg: "#F3E8FF", ink: "#7E22CE", soft: "#FAF5FF" },
  coral:     { bg: "#FFE5DC", ink: "#E55A3A", soft: "#FFF2EC" },
  green:     { bg: "#D1FAE5", ink: "#047857", soft: "#ECFDF5" },
  blue:      { bg: "#DBEAFE", ink: "#1E40AF", soft: "#EFF6FF" },
  magenta:   { bg: "#FCE7F3", ink: "#BE185D", soft: "#FDF2F8" },
  amber:     { bg: "#FEF3C7", ink: "#B45309", soft: "#FFFBEB" },
  teal:      { bg: "#CCFBF1", ink: "#0F766E", soft: "#F0FDFA" },
};

// ---------- DADOS REAIS (carregados de turmas-data.js) ----------
const TURMAS_SEED = window.TURMAS_REAIS;

function seedAlunosFromData(turmaId) {
  const lista = (window.ALUNOS_REAIS && window.ALUNOS_REAIS[turmaId]) || [];
  return lista.map(([matricula, nome], i) => ({
    id: `${turmaId}_a${i}`,
    turmaId, nome, matricula,
    statusMatricula: "ativo",
    notas: { p1: [0, 0, 0], p2: [0, 0, 0], paralela: 0 },
  }));
}

// (dados legados removidos)

const ESTRUTURA_PADRAO = {
  pontosAprovacao: 60,
  estrutura: {
    p1: [
      { nome: "Simulado", peso: 20 },
      { nome: "Teste", peso: 20 },
      { nome: "Projeto", peso: 10 },
    ],
    p2: [
      { nome: "Simulado", peso: 20 },
      { nome: "Teste", peso: 20 },
      { nome: "Projeto", peso: 10 },
    ],
  },
};

// ---------- HELPERS ----------
function calcularAluno(aluno, cfg) {
  const p1 = aluno.notas.p1.reduce((s, n) => s + (parseFloat(n) || 0), 0);
  const p2 = aluno.notas.p2.reduce((s, n) => s + (parseFloat(n) || 0), 0);
  const semestre = p1 + p2;
  const paralela = parseFloat(aluno.notas.paralela) || 0;
  let final = semestre;
  if (semestre < cfg.pontosAprovacao && paralela > semestre) final = paralela;
  let status = final >= cfg.pontosAprovacao ? "APROVADO" : "REPROVADO";
  if (aluno.statusMatricula === "desistente") status = "DESISTENTE";
  return { p1, p2, semestre, paralela, final, status };
}

function exportCSV(turma, alunos, cfg) {
  const head = [
    "Matrícula", "Nome",
    ...cfg.estrutura.p1.map((a, i) => `P1_${a.nome}`),
    "Total P1",
    ...cfg.estrutura.p2.map((a, i) => `P2_${a.nome}`),
    "Total P2", "Semestre", "Paralela", "Final", "Status",
  ];
  const rows = alunos.map(a => {
    const c = calcularAluno(a, cfg);
    return [
      a.matricula, a.nome,
      ...a.notas.p1, c.p1.toFixed(1),
      ...a.notas.p2, c.p2.toFixed(1),
      c.semestre.toFixed(1), c.paralela.toFixed(1), c.final.toFixed(1), c.status,
    ];
  });
  const csv = [head, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `notas_${turma.codigo}.csv`; a.click();
  URL.revokeObjectURL(url);
}

function parseCSVAlunos(texto) {
  const linhas = texto.split(/\r?\n/).filter(l => l.trim().length > 0);
  const out = [];
  let start = 0;
  // detecta cabeçalho
  if (/matr|nome/i.test(linhas[0])) start = 1;
  for (let i = start; i < linhas.length; i++) {
    const cols = linhas[i].split(/[,;\t]/).map(c => c.trim().replace(/^"|"$/g, ""));
    if (cols.length < 2) continue;
    out.push({ matricula: cols[0], nome: cols[1] });
  }
  return out;
}

// =============================================================
//  COMPONENTES UI
// =============================================================

function Logo({ pal }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: `linear-gradient(135deg, ${pal.primary}, ${pal.accent})`,
        display: "grid", placeItems: "center", color: "white",
        fontWeight: 800, fontSize: 18, letterSpacing: -0.5,
        boxShadow: `0 4px 12px ${pal.primary}40`,
      }}>N</div>
      <div style={{ lineHeight: 1.1 }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: pal.ink, letterSpacing: -0.3 }}>Notas</div>
        <div style={{ fontSize: 11, color: pal.inkMuted, fontWeight: 500 }}>dos alunos</div>
      </div>
    </div>
  );
}

function TopBar({ pal, view, turma, onHome }) {
  return (
    <div style={{
      background: pal.surface,
      borderBottom: `1px solid ${pal.line}`,
      padding: "14px 28px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: 16, position: "sticky", top: 0, zIndex: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <Logo pal={pal} />
        {view === "turma" && turma && (
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14 }}>
            <button onClick={onHome} style={{
              border: "none", background: pal.bg, color: pal.inkMuted,
              padding: "6px 12px", borderRadius: 8, cursor: "pointer",
              fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
            }}>← Turmas</button>
            <span style={{ color: pal.inkSoft }}>/</span>
            <span style={{ color: pal.ink, fontWeight: 600 }}>{turma.nome}</span>
          </div>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ fontSize: 13, color: pal.inkMuted }}>2025/2 · Senhor do Bonfim</div>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: `linear-gradient(135deg, ${pal.accent}, ${pal.primary})`,
          display: "grid", placeItems: "center", color: "white",
          fontWeight: 700, fontSize: 13,
        }}>SF</div>
      </div>
    </div>
  );
}

// ---------- TELA: HOME (CARDS DE TURMAS) ----------
function HomeTurmas({ pal, turmas, alunosPorTurma, onOpen, onNovaTurma }) {
  const [busca, setBusca] = useState("");
  const filtradas = turmas.filter(t =>
    t.nome.toLowerCase().includes(busca.toLowerCase()) ||
    t.codigo.toLowerCase().includes(busca.toLowerCase()) ||
    t.professor.toLowerCase().includes(busca.toLowerCase())
  );

  const totalAlunos = Object.values(alunosPorTurma).flat().length;
  const totalAprovados = Object.entries(alunosPorTurma).reduce((s, [_, alunos]) =>
    s + alunos.filter(a => calcularAluno(a, ESTRUTURA_PADRAO).status === "APROVADO").length, 0);

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 28px 64px" }}>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${pal.primary} 0%, ${pal.accent} 100%)`,
        borderRadius: 20, padding: "32px 36px", color: "white",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: 28, position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -40, top: -40, width: 220, height: 220,
          borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ position: "absolute", right: 80, bottom: -60, width: 160, height: 160,
          borderRadius: "50%", background: pal.coral, opacity: 0.25 }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.9, letterSpacing: 0.5,
            textTransform: "uppercase", marginBottom: 8 }}>Bom dia, Professor</div>
          <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, letterSpacing: -0.8 }}>
            Suas turmas de 2026/1
          </h1>
          <p style={{ margin: "8px 0 0", fontSize: 15, opacity: 0.9, maxWidth: 480 }}>
            Administração e Agropecuária Integrado · Campus Senhor do Bonfim
          </p>
        </div>
        <div style={{ display: "flex", gap: 24, position: "relative", zIndex: 1 }}>
          <Stat label="Turmas" value={turmas.length} />
          <Stat label="Alunos" value={totalAlunos} />
          <Stat label="Aprovados" value={totalAprovados} />
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: 20, gap: 16, flexWrap: "wrap" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: pal.surface, padding: "10px 14px", borderRadius: 12,
          border: `1px solid ${pal.line}`, flex: 1, minWidth: 280, maxWidth: 420,
        }}>
          <span style={{ color: pal.inkSoft, fontSize: 16 }}>⌕</span>
          <input
            value={busca} onChange={e => setBusca(e.target.value)}
            placeholder="Buscar turma, código ou professor…"
            style={{ border: "none", outline: "none", flex: 1, fontSize: 14,
              background: "transparent", color: pal.ink }}
          />
        </div>
        <button onClick={onNovaTurma} style={{
          background: pal.primary, color: "white", border: "none",
          padding: "11px 18px", borderRadius: 12, fontWeight: 700, fontSize: 14,
          cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
          boxShadow: `0 4px 12px ${pal.primary}40`,
        }}>+ Nova turma</button>
      </div>

      {/* Grid de cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 18 }}>
        {filtradas.map(t => {
          const alunos = alunosPorTurma[t.id] || [];
          const aprov = alunos.filter(a => calcularAluno(a, ESTRUTURA_PADRAO).status === "APROVADO").length;
          const cc = CARD_COLORS[t.cor] || CARD_COLORS.turquoise;
          return (
            <div key={t.id} onClick={() => onOpen(t.id)} style={{
              background: pal.surface, borderRadius: 16,
              border: `1px solid ${pal.line}`, overflow: "hidden",
              cursor: "pointer", transition: "transform .15s, box-shadow .15s",
              display: "flex", flexDirection: "column",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(15,23,42,0.10)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = ""; }}
            >
              <div style={{ height: 96, background: cc.bg, position: "relative", padding: 16,
                display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div style={{ width: 50, height: 50, borderRadius: 12, background: "white",
                  display: "grid", placeItems: "center", fontWeight: 800, fontSize: 14,
                  color: cc.ink, boxShadow: "0 2px 6px rgba(0,0,0,0.06)" }}>{t.icone}</div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <div style={{ background: "rgba(255,255,255,0.85)", color: cc.ink,
                    padding: "3px 9px", borderRadius: 999, fontSize: 10, fontWeight: 700,
                    letterSpacing: 0.3 }}>
                    {t.nivel}
                  </div>
                  <div style={{ color: cc.ink, fontSize: 10, fontWeight: 600, opacity: 0.85 }}>
                    {t.codigo}
                  </div>
                </div>
              </div>
              <div style={{ padding: "16px 18px 16px", flex: 1, display: "flex",
                flexDirection: "column", gap: 8 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: cc.ink,
                    textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
                    {t.curso}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: pal.ink,
                    letterSpacing: -0.3, marginBottom: 4 }}>{t.nome}</div>
                  <div style={{ fontSize: 12, color: pal.inkMuted }}>
                    {t.turmaCurta} · {t.cargaHoraria}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: "auto", paddingTop: 10,
                  borderTop: `1px dashed ${pal.line}` }}>
                  <Pill label={`${alunos.length} alunos`} bg={pal.bg} fg={pal.inkMuted} />
                  <Pill label={`${aprov} aprov.`} bg={pal.successSoft} fg={pal.success} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div style={{ textAlign: "right" }}>
      <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1, letterSpacing: -1 }}>{value}</div>
      <div style={{ fontSize: 11, opacity: 0.85, fontWeight: 600, textTransform: "uppercase",
        letterSpacing: 0.5, marginTop: 4 }}>{label}</div>
    </div>
  );
}

function Pill({ label, bg, fg }) {
  return <span style={{ background: bg, color: fg, padding: "4px 10px",
    borderRadius: 999, fontSize: 11, fontWeight: 700 }}>{label}</span>;
}

// ---------- TELA: TURMA (LANÇAMENTO DE NOTAS) ----------
function TurmaView({ pal, turma, alunos, setAlunos, cfg, setCfg, density,
                     turmas, onMoverAluno }) {
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [ordem, setOrdem] = useState({ campo: "nome", dir: "asc" });
  const [showImport, setShowImport] = useState(false);
  const [showMover, setShowMover] = useState(null); // alunoId
  const [showNovo, setShowNovo] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  const calcs = useMemo(() => {
    const map = {};
    alunos.forEach(a => { map[a.id] = calcularAluno(a, cfg); });
    return map;
  }, [alunos, cfg]);

  const filtrados = useMemo(() => {
    let arr = alunos.filter(a =>
      a.nome.toLowerCase().includes(busca.toLowerCase()) ||
      a.matricula.toLowerCase().includes(busca.toLowerCase())
    );
    if (filtroStatus !== "todos") {
      arr = arr.filter(a => calcs[a.id]?.status === filtroStatus);
    }
    arr = [...arr].sort((a, b) => {
      let va, vb;
      if (ordem.campo === "nome") { va = a.nome; vb = b.nome; }
      else if (ordem.campo === "matricula") { va = a.matricula; vb = b.matricula; }
      else if (ordem.campo === "final") { va = calcs[a.id]?.final || 0; vb = calcs[b.id]?.final || 0; }
      else if (ordem.campo === "status") { va = calcs[a.id]?.status || ""; vb = calcs[b.id]?.status || ""; }
      if (va < vb) return ordem.dir === "asc" ? -1 : 1;
      if (va > vb) return ordem.dir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [alunos, busca, filtroStatus, ordem, calcs]);

  const stats = useMemo(() => {
    let aprov = 0, reprov = 0, somaF = 0, validos = 0;
    alunos.forEach(a => {
      const c = calcs[a.id];
      if (!c) return;
      if (c.status === "APROVADO") aprov++;
      if (c.status === "REPROVADO") reprov++;
      if (c.status !== "DESISTENTE") { somaF += c.final; validos++; }
    });
    return { total: alunos.length, aprov, reprov,
      media: validos ? (somaF / validos) : 0 };
  }, [alunos, calcs]);

  function atualizarNota(id, grupo, idx, valor) {
    setAlunos(prev => prev.map(a => {
      if (a.id !== id) return a;
      const p1 = [...(a.notas.p1 || [])];
      const p2 = [...(a.notas.p2 || [])];
      // pad to match current structure length
      while (p1.length < cfg.estrutura.p1.length) p1.push(0);
      while (p2.length < cfg.estrutura.p2.length) p2.push(0);
      const novo = { ...a, notas: { ...a.notas, p1, p2 } };
      if (grupo === "paralela") novo.notas.paralela = parseFloat(valor) || 0;
      else {
        const max = cfg.estrutura[grupo][idx]?.peso || 0;
        let n = parseFloat(valor); if (isNaN(n)) n = 0;
        n = Math.max(0, Math.min(max, n));
        novo.notas[grupo][idx] = n;
      }
      return novo;
    }));
  }

  function alternarDesistente(id) {
    setAlunos(prev => prev.map(a => a.id === id
      ? { ...a, statusMatricula: a.statusMatricula === "desistente" ? "ativo" : "desistente" }
      : a));
  }

  function removerAluno(id) {
    if (!confirm("Remover este aluno?")) return;
    setAlunos(prev => prev.filter(a => a.id !== id));
  }

  function ordenarPor(campo) {
    setOrdem(o => ({ campo, dir: o.campo === campo && o.dir === "asc" ? "desc" : "asc" }));
  }

  const dRow = density === "compact" ? 6 : 10;
  const dFont = density === "compact" ? 12 : 13;
  const dInput = density === "compact" ? 32 : 38;

  return (
    <div style={{ maxWidth: 1440, margin: "0 auto", padding: "24px 28px 64px" }}>
      {/* Cabeçalho da turma */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 16, flexWrap: "wrap", marginBottom: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: CARD_COLORS[turma.cor]?.bg || pal.primarySoft,
            color: CARD_COLORS[turma.cor]?.ink || pal.primary,
            display: "grid", placeItems: "center", fontWeight: 800, fontSize: 20,
          }}>{turma.icone}</div>
          <div>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: pal.ink,
              letterSpacing: -0.6 }}>{turma.nome}</h1>
            <div style={{ fontSize: 13, color: pal.inkMuted, marginTop: 4 }}>
              {turma.codigo} · {turma.professor} · {turma.turma} · {turma.cargaHoraria}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Btn pal={pal} variant="ghost" onClick={() => setShowConfig(true)}>⚙ Avaliação</Btn>
          <Btn pal={pal} variant="ghost" onClick={() => exportCSV(turma, alunos, cfg)}>↓ Exportar CSV</Btn>
          <Btn pal={pal} variant="ghost" onClick={() => window.print()}>🖨 PDF</Btn>
          <Btn pal={pal} variant="primary" onClick={() => setShowImport(true)}>↑ Importar CSV</Btn>
        </div>
      </div>

      {/* KPIs + Gráfico */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1.6fr",
        gap: 14, marginBottom: 22 }}>
        <Kpi pal={pal} label="Alunos" value={stats.total} accent={pal.primary} />
        <Kpi pal={pal} label="Aprovados" value={stats.aprov} accent={pal.success} />
        <Kpi pal={pal} label="Reprovados" value={stats.reprov} accent={pal.coral} />
        <Kpi pal={pal} label="Média da turma" value={stats.media.toFixed(1)} accent={pal.accent} />
        <GraficoDesempenho pal={pal} alunos={alunos} calcs={calcs} cfg={cfg} />
      </div>

      {/* Toolbar tabela */}
      <div style={{
        background: pal.surface, borderRadius: 14, padding: "12px 14px",
        border: `1px solid ${pal.line}`, marginBottom: 14,
        display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8,
          background: pal.bg, padding: "8px 12px", borderRadius: 10, flex: 1, minWidth: 220 }}>
          <span style={{ color: pal.inkSoft }}>⌕</span>
          <input value={busca} onChange={e => setBusca(e.target.value)}
            placeholder="Buscar por nome ou matrícula…"
            style={{ border: "none", outline: "none", flex: 1, fontSize: 14,
              background: "transparent", color: pal.ink }} />
        </div>
        <Segmented pal={pal} value={filtroStatus} onChange={setFiltroStatus} options={[
          { v: "todos", l: "Todos" },
          { v: "APROVADO", l: "Aprovados" },
          { v: "REPROVADO", l: "Reprovados" },
          { v: "DESISTENTE", l: "Desistentes" },
        ]} />
        <Btn pal={pal} variant="ghost" onClick={() => setShowNovo(true)}>+ Novo aluno</Btn>
      </div>

      {/* Tabela */}
      <div style={{
        background: pal.surface, borderRadius: 14, border: `1px solid ${pal.line}`,
        overflow: "auto", boxShadow: "0 4px 14px rgba(15,23,42,0.04)",
      }}>
        <table style={{ borderCollapse: "separate", borderSpacing: 0, width: "100%",
          minWidth: 1100, fontSize: dFont }}>
          <thead>
            <tr>
              <Th pal={pal} rowSpan={2} sticky onClick={() => ordenarPor("nome")}
                ordem={ordem} campo="nome" align="left" style={{ minWidth: 220 }}>
                Aluno
              </Th>
              <Th pal={pal} colSpan={cfg.estrutura.p1.length} group="p1">
                <ParcelaHeader pal={pal} group="p1" cfg={cfg} setCfg={setCfg} />
              </Th>
              <Th pal={pal} rowSpan={2}>Total P1</Th>
              <Th pal={pal} colSpan={cfg.estrutura.p2.length} group="p2">
                <ParcelaHeader pal={pal} group="p2" cfg={cfg} setCfg={setCfg} />
              </Th>
              <Th pal={pal} rowSpan={2}>Total P2</Th>
              <Th pal={pal} rowSpan={2}>Semestre</Th>
              <Th pal={pal} rowSpan={2}>Paralela</Th>
              <Th pal={pal} rowSpan={2} onClick={() => ordenarPor("final")}
                ordem={ordem} campo="final">Final</Th>
              <Th pal={pal} rowSpan={2} onClick={() => ordenarPor("status")}
                ordem={ordem} campo="status">Status</Th>
              <Th pal={pal} rowSpan={2}>Ações</Th>
            </tr>
            <tr>
              {cfg.estrutura.p1.map((it, i) => (
                <Th key={"p1"+i} pal={pal} group="p1" small>
                  <AtividadeEditor pal={pal} group="p1" item={it} idx={i}
                    cfg={cfg} setCfg={setCfg} />
                </Th>
              ))}
              {cfg.estrutura.p2.map((it, i) => (
                <Th key={"p2"+i} pal={pal} group="p2" small>
                  <AtividadeEditor pal={pal} group="p2" item={it} idx={i}
                    cfg={cfg} setCfg={setCfg} />
                </Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtrados.length === 0 && (
              <tr><td colSpan={20} style={{ padding: 40, textAlign: "center",
                color: pal.inkMuted, fontSize: 14 }}>Nenhum aluno encontrado.</td></tr>
            )}
            {filtrados.map((aluno, idx) => {
              const c = calcs[aluno.id];
              const rowBg = idx % 2 ? pal.bg : pal.surface;
              return (
                <tr key={aluno.id}>
                  <td style={{ ...tdStyle(pal, dRow), textAlign: "left", fontWeight: 600,
                    position: "sticky", left: 0, background: rowBg, zIndex: 1,
                    borderRight: `1px solid ${pal.line}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%",
                        background: `linear-gradient(135deg, ${pal.primary}, ${pal.accent})`,
                        color: "white", display: "grid", placeItems: "center",
                        fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                        {aluno.nome.split(" ").map(n => n[0]).slice(0,2).join("")}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ color: pal.ink, fontSize: dFont, fontWeight: 600,
                          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                          maxWidth: 200 }}>{aluno.nome}</div>
                        <div style={{ color: pal.inkMuted, fontSize: 11, fontWeight: 400 }}>
                          {aluno.matricula}
                        </div>
                      </div>
                    </div>
                  </td>
                  {cfg.estrutura.p1.map((it, i) => (
                    <td key={"p1"+i} style={{ ...tdStyle(pal, dRow), background: rowBg,
                      backgroundColor: idx % 2 ? "#ECFAF8" : "#F4FCFB" }}>
                      <NotaInput pal={pal} value={aluno.notas.p1[i] || 0} max={it.peso}
                        size={dInput}
                        onChange={v => atualizarNota(aluno.id, "p1", i, v)} />
                    </td>
                  ))}
                  <td style={{ ...tdStyle(pal, dRow), background: rowBg, fontWeight: 700 }}>
                    {c.p1.toFixed(1)}
                  </td>
                  {cfg.estrutura.p2.map((it, i) => (
                    <td key={"p2"+i} style={{ ...tdStyle(pal, dRow), background: rowBg,
                      backgroundColor: idx % 2 ? "#FAF5FF" : "#FCFAFE" }}>
                      <NotaInput pal={pal} value={aluno.notas.p2[i] || 0} max={it.peso}
                        size={dInput}
                        onChange={v => atualizarNota(aluno.id, "p2", i, v)} />
                    </td>
                  ))}
                  <td style={{ ...tdStyle(pal, dRow), background: rowBg, fontWeight: 700 }}>
                    {c.p2.toFixed(1)}
                  </td>
                  <td style={{ ...tdStyle(pal, dRow), background: rowBg, fontWeight: 700,
                    color: pal.primaryDark }}>{c.semestre.toFixed(1)}</td>
                  <td style={{ ...tdStyle(pal, dRow), background: rowBg }}>
                    <NotaInput pal={pal} value={aluno.notas.paralela} max={100}
                      size={dInput}
                      onChange={v => atualizarNota(aluno.id, "paralela", null, v)} />
                  </td>
                  <td style={{ ...tdStyle(pal, dRow), background: rowBg,
                    fontWeight: 800, fontSize: dFont + 1, color: pal.ink }}>
                    {c.final.toFixed(1)}
                  </td>
                  <td style={{ ...tdStyle(pal, dRow), background: rowBg }}>
                    <StatusBadge pal={pal} status={c.status} />
                  </td>
                  <td style={{ ...tdStyle(pal, dRow), background: rowBg }}>
                    <div style={{ display: "flex", gap: 4, justifyContent: "center" }}>
                      <IconBtn pal={pal} title="Mover de turma" onClick={() => setShowMover(aluno.id)}>⇄</IconBtn>
                      <IconBtn pal={pal} title={aluno.statusMatricula === "desistente" ? "Reativar" : "Marcar desistente"}
                        onClick={() => alternarDesistente(aluno.id)}>
                        {aluno.statusMatricula === "desistente" ? "↻" : "⊘"}
                      </IconBtn>
                      <IconBtn pal={pal} variant="danger" title="Excluir"
                        onClick={() => removerAluno(aluno.id)}>×</IconBtn>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modais */}
      {showImport && <ModalImport pal={pal} onClose={() => setShowImport(false)}
        onImport={novos => {
          setAlunos(prev => [
            ...prev,
            ...novos.map((n, i) => ({
              id: `${turma.id}_imp_${Date.now()}_${i}`,
              turmaId: turma.id, nome: n.nome, matricula: n.matricula,
              statusMatricula: "ativo",
              notas: { p1: [0,0,0], p2: [0,0,0], paralela: 0 },
            })),
          ]);
          setShowImport(false);
        }} />}

      {showNovo && <ModalNovoAluno pal={pal} onClose={() => setShowNovo(false)}
        onSalvar={(nome, matricula) => {
          setAlunos(prev => [...prev, {
            id: `${turma.id}_n_${Date.now()}`, turmaId: turma.id, nome, matricula,
            statusMatricula: "ativo",
            notas: { p1: [0,0,0], p2: [0,0,0], paralela: 0 },
          }]);
          setShowNovo(false);
        }} />}

      {showMover && <ModalMover pal={pal} alunoId={showMover} alunos={alunos}
        turmas={turmas} turmaAtual={turma} onClose={() => setShowMover(null)}
        onMover={(alunoId, novaTurmaId) => { onMoverAluno(alunoId, novaTurmaId); setShowMover(null); }} />}

      {showConfig && <ModalConfig pal={pal} cfg={cfg} setCfg={setCfg}
        onClose={() => setShowConfig(false)} />}
    </div>
  );
}

// ---------- WIDGETS ----------
function Kpi({ pal, label, value, accent }) {
  return (
    <div style={{
      background: pal.surface, borderRadius: 14, padding: "16px 18px",
      border: `1px solid ${pal.line}`, position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4,
        background: accent }} />
      <div style={{ fontSize: 11, color: pal.inkMuted, fontWeight: 700,
        textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color: pal.ink, letterSpacing: -0.8,
        lineHeight: 1 }}>{value}</div>
    </div>
  );
}

function GraficoDesempenho({ pal, alunos, calcs, cfg }) {
  // Histograma de notas finais em 5 faixas
  const faixas = [
    { l: "0-20", min: 0, max: 20, count: 0 },
    { l: "21-40", min: 21, max: 40, count: 0 },
    { l: "41-59", min: 41, max: 59, count: 0 },
    { l: "60-79", min: 60, max: 79, count: 0 },
    { l: "80+", min: 80, max: 200, count: 0 },
  ];
  alunos.forEach(a => {
    const c = calcs[a.id]; if (!c || a.statusMatricula === "desistente") return;
    const f = faixas.find(x => c.final >= x.min && c.final <= x.max);
    if (f) f.count++;
  });
  const max = Math.max(1, ...faixas.map(f => f.count));
  return (
    <div style={{ background: pal.surface, borderRadius: 14, padding: "14px 18px",
      border: `1px solid ${pal.line}`, display: "flex", flexDirection: "column" }}>
      <div style={{ fontSize: 11, color: pal.inkMuted, fontWeight: 700,
        textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>
        Distribuição de notas finais
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, flex: 1, height: 70 }}>
        {faixas.map((f, i) => {
          const aprov = f.min >= 60;
          const h = (f.count / max) * 100;
          return (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column",
              alignItems: "center", gap: 4 }}>
              <div style={{ fontSize: 10, color: pal.inkMuted, fontWeight: 700 }}>{f.count}</div>
              <div style={{ width: "100%", height: `${h}%`, minHeight: 4,
                background: aprov ? pal.primary : pal.coral, borderRadius: "6px 6px 2px 2px",
                transition: "height .3s" }} />
              <div style={{ fontSize: 10, color: pal.inkMuted }}>{f.l}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Th({ pal, children, rowSpan, colSpan, group, small, sticky, align,
              onClick, ordem, campo, style }) {
  const groupBg = group === "p1" ? pal.primarySoft
    : group === "p2" ? pal.accentSoft : pal.bg;
  const groupColor = group === "p1" ? pal.primaryDark
    : group === "p2" ? "#7E22CE" : pal.ink;
  const isSorted = ordem && ordem.campo === campo;
  return (
    <th rowSpan={rowSpan} colSpan={colSpan} onClick={onClick} style={{
      background: groupBg, color: groupColor, padding: small ? "6px 8px" : "10px 8px",
      fontSize: small ? 11 : 12, fontWeight: 700, textAlign: align || "center",
      borderBottom: `2px solid ${pal.line}`, borderRight: `1px solid ${pal.line}`,
      position: sticky ? "sticky" : "static", left: sticky ? 0 : "auto",
      zIndex: sticky ? 3 : 2, top: 0, cursor: onClick ? "pointer" : "default",
      whiteSpace: "nowrap", letterSpacing: 0.2, textTransform: small ? "none" : "uppercase",
      ...style,
    }}>
      {children}
      {isSorted && <span style={{ marginLeft: 4 }}>{ordem.dir === "asc" ? "▲" : "▼"}</span>}
    </th>
  );
}

function tdStyle(pal, vPad) {
  return {
    padding: `${vPad}px 8px`, textAlign: "center", fontSize: 13,
    borderBottom: `1px solid ${pal.line}`, color: pal.ink,
  };
}

function AtividadeEditor({ pal, group, item, idx, cfg, setCfg }) {
  function update(campo, val) {
    const novo = JSON.parse(JSON.stringify(cfg));
    novo.estrutura[group][idx][campo] = campo === "peso" ? (parseFloat(val) || 0) : val;
    setCfg(novo);
  }
  function remover() {
    if (cfg.estrutura[group].length <= 1) return;
    if (!confirm(`Remover "${item.nome}"?`)) return;
    const novo = JSON.parse(JSON.stringify(cfg));
    novo.estrutura[group].splice(idx, 1);
    setCfg(novo);
  }
  const groupColor = group === "p1" ? pal.primaryDark : "#7E22CE";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center",
      gap: 3, position: "relative", padding: "2px 4px" }}>
      <input value={item.nome}
        onChange={e => update("nome", e.target.value)}
        style={{
          border: "none", background: "transparent", textAlign: "center",
          fontWeight: 700, fontSize: 11, color: groupColor, width: 78,
          padding: "2px 4px", borderRadius: 4, outline: "none",
          textTransform: "uppercase", letterSpacing: 0.3,
        }}
        onFocus={e => { e.target.style.background = "white";
          e.target.style.boxShadow = `0 0 0 2px ${groupColor}40`; }}
        onBlur={e => { e.target.style.background = "transparent";
          e.target.style.boxShadow = "none"; }}
        title="Clique para editar o nome" />
      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
        <input type="number" value={item.peso}
          onChange={e => update("peso", e.target.value)}
          style={{
            border: "none", background: "transparent", textAlign: "right",
            fontWeight: 600, fontSize: 10, color: groupColor, width: 28,
            padding: "1px 2px", borderRadius: 3, outline: "none",
            opacity: 0.9,
          }}
          onFocus={e => { e.target.style.background = "white";
            e.target.style.boxShadow = `0 0 0 2px ${groupColor}40`; }}
          onBlur={e => { e.target.style.background = "transparent";
            e.target.style.boxShadow = "none"; }}
          title="Peso máximo da atividade" />
        <span style={{ fontSize: 10, color: groupColor, opacity: 0.85,
          fontWeight: 500 }}>pts</span>
        {cfg.estrutura[group].length > 1 && (
          <button onClick={remover} title="Remover atividade" style={{
            border: "none", background: "transparent", color: groupColor,
            opacity: 0.5, cursor: "pointer", fontSize: 11, padding: 0,
            width: 14, height: 14, lineHeight: 1,
          }}
            onMouseEnter={e => { e.currentTarget.style.opacity = 1;
              e.currentTarget.style.color = "#B91C1C"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = 0.5;
              e.currentTarget.style.color = groupColor; }}
          >×</button>
        )}
      </div>
    </div>
  );
}

function ParcelaHeader({ pal, group, cfg, setCfg }) {
  function adicionar() {
    const novo = JSON.parse(JSON.stringify(cfg));
    novo.estrutura[group].push({ nome: "Nova", peso: 10 });
    setCfg(novo);
  }
  const groupColor = group === "p1" ? pal.primaryDark : "#7E22CE";
  const total = cfg.estrutura[group].reduce((s, x) => s + (x.peso || 0), 0);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center",
      gap: 8 }}>
      <span>Parcela {group === "p1" ? "1" : "2"}</span>
      <span style={{ fontSize: 10, opacity: 0.7, fontWeight: 500,
        textTransform: "none", letterSpacing: 0 }}>{total} pts</span>
      <button onClick={adicionar} title="Adicionar atividade" style={{
        border: `1px dashed ${groupColor}`, background: "rgba(255,255,255,0.5)",
        color: groupColor, cursor: "pointer", fontSize: 11, padding: "1px 7px",
        borderRadius: 4, fontWeight: 700, lineHeight: 1.4,
      }}>+ atividade</button>
    </div>
  );
}

function _tdStyleBlocked(pal, vPad) {
  return {};
}

function NotaInput({ pal, value, max, onChange, size }) {
  const [v, setV] = useState(value || "");
  useEffect(() => { setV(value || ""); }, [value]);
  return (
    <input type="number" min={0} max={max} value={v}
      onChange={e => setV(e.target.value)}
      onBlur={() => onChange(v)}
      style={{
        width: 56, height: size, padding: "0 6px", textAlign: "center",
        border: `1.5px solid ${pal.line}`, borderRadius: 8, fontSize: 13,
        fontWeight: 600, color: pal.ink, background: "white",
        outline: "none", transition: "border-color .15s, box-shadow .15s",
      }}
      onFocus={e => { e.target.style.borderColor = pal.primary;
        e.target.style.boxShadow = `0 0 0 3px ${pal.primary}25`; }}
      onBlurCapture={e => { e.target.style.borderColor = pal.line;
        e.target.style.boxShadow = "none"; }}
    />
  );
}

function StatusBadge({ pal, status }) {
  const st = {
    APROVADO: { bg: pal.successSoft, fg: "#047857", label: "Aprovado" },
    REPROVADO: { bg: pal.coralSoft, fg: "#B91C1C", label: "Reprovado" },
    DESISTENTE: { bg: pal.bg, fg: pal.inkMuted, label: "Desistente" },
  }[status] || { bg: pal.bg, fg: pal.inkMuted, label: status };
  return <span style={{
    background: st.bg, color: st.fg, padding: "5px 11px", borderRadius: 999,
    fontSize: 11, fontWeight: 700, whiteSpace: "nowrap",
  }}>{st.label}</span>;
}

function IconBtn({ pal, children, onClick, variant, title }) {
  const isDanger = variant === "danger";
  return (
    <button onClick={onClick} title={title} style={{
      width: 28, height: 28, border: "none", borderRadius: 7,
      background: isDanger ? pal.coralSoft : pal.bg,
      color: isDanger ? "#B91C1C" : pal.inkMuted,
      cursor: "pointer", fontWeight: 700, fontSize: 14,
      display: "grid", placeItems: "center",
    }}>{children}</button>
  );
}

function Btn({ pal, children, onClick, variant }) {
  const styles = {
    primary: { bg: pal.primary, fg: "white", shadow: `0 4px 12px ${pal.primary}40` },
    accent: { bg: pal.accent, fg: "white", shadow: `0 4px 12px ${pal.accent}40` },
    coral: { bg: pal.coral, fg: "white", shadow: `0 4px 12px ${pal.coral}40` },
    ghost: { bg: pal.surface, fg: pal.ink, border: `1px solid ${pal.line}`, shadow: "none" },
    danger: { bg: pal.coralSoft, fg: "#B91C1C", shadow: "none" },
  }[variant || "primary"];
  return (
    <button onClick={onClick} style={{
      background: styles.bg, color: styles.fg, border: styles.border || "none",
      padding: "10px 14px", borderRadius: 10, fontWeight: 700, fontSize: 13,
      cursor: "pointer", boxShadow: styles.shadow,
      display: "flex", alignItems: "center", gap: 6,
    }}>{children}</button>
  );
}

function Segmented({ pal, value, onChange, options }) {
  return (
    <div style={{ display: "flex", background: pal.bg, padding: 3, borderRadius: 10 }}>
      {options.map(o => (
        <button key={o.v} onClick={() => onChange(o.v)} style={{
          padding: "7px 13px", border: "none", borderRadius: 8, cursor: "pointer",
          background: value === o.v ? pal.surface : "transparent",
          color: value === o.v ? pal.ink : pal.inkMuted,
          fontWeight: 600, fontSize: 12,
          boxShadow: value === o.v ? "0 2px 4px rgba(0,0,0,0.06)" : "none",
        }}>{o.l}</button>
      ))}
    </div>
  );
}

// ---------- MODAIS ----------
function Modal({ pal, title, onClose, children, width }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(15,23,42,0.5)",
      display: "grid", placeItems: "center", zIndex: 100, padding: 20,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: pal.surface, borderRadius: 16, width: "100%", maxWidth: width || 520,
        maxHeight: "90vh", overflow: "auto", boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
      }}>
        <div style={{
          padding: "18px 22px", borderBottom: `1px solid ${pal.line}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: pal.ink }}>{title}</h2>
          <button onClick={onClose} style={{
            border: "none", background: pal.bg, width: 32, height: 32, borderRadius: 8,
            cursor: "pointer", fontSize: 18, color: pal.inkMuted,
          }}>×</button>
        </div>
        <div style={{ padding: 22 }}>{children}</div>
      </div>
    </div>
  );
}

function ModalImport({ pal, onClose, onImport }) {
  const [texto, setTexto] = useState("");
  const fileRef = useRef();
  function handleFile(e) {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => setTexto(r.result);
    r.readAsText(f);
  }
  const preview = parseCSVAlunos(texto);
  return (
    <Modal pal={pal} title="Importar alunos" width={620} onClose={onClose}>
      <p style={{ margin: "0 0 14px", color: pal.inkMuted, fontSize: 13 }}>
        Cole abaixo ou suba um CSV com <b>matrícula, nome</b> em cada linha.
        Separadores aceitos: vírgula, ponto-e-vírgula ou tabulação.
      </p>
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <input ref={fileRef} type="file" accept=".csv,.txt" onChange={handleFile}
          style={{ display: "none" }} />
        <Btn pal={pal} variant="ghost" onClick={() => fileRef.current.click()}>
          📎 Escolher arquivo
        </Btn>
        <Btn pal={pal} variant="ghost" onClick={() => setTexto(
          "Matricula,Nome\n20251SBF06GL0050,Maria Eduarda Silva\n20251SBF06GL0051,João Pedro Souza\n20251SBF06GL0052,Carla Ribeiro Lima"
        )}>Exemplo</Btn>
      </div>
      <textarea value={texto} onChange={e => setTexto(e.target.value)} rows={8}
        placeholder="20251SBF06GL0050, Maria Silva&#10;20251SBF06GL0051, João Souza"
        style={{
          width: "100%", padding: 12, border: `1px solid ${pal.line}`,
          borderRadius: 10, fontFamily: "monospace", fontSize: 13,
          resize: "vertical", outline: "none", color: pal.ink, background: pal.bg,
          boxSizing: "border-box",
        }} />
      {preview.length > 0 && (
        <div style={{ marginTop: 12, padding: 12, background: pal.primarySoft,
          borderRadius: 10, fontSize: 13, color: pal.primaryDark }}>
          <b>{preview.length}</b> aluno(s) detectado(s). Pré-visualização:
          <ul style={{ margin: "8px 0 0", paddingLeft: 20, fontSize: 12 }}>
            {preview.slice(0, 4).map((p, i) => (
              <li key={i}>{p.matricula} — {p.nome}</li>
            ))}
            {preview.length > 4 && <li>… +{preview.length - 4} mais</li>}
          </ul>
        </div>
      )}
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 18 }}>
        <Btn pal={pal} variant="ghost" onClick={onClose}>Cancelar</Btn>
        <Btn pal={pal} onClick={() => onImport(preview)}>
          Importar {preview.length > 0 ? preview.length : ""}
        </Btn>
      </div>
    </Modal>
  );
}

function ModalNovoAluno({ pal, onClose, onSalvar }) {
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  return (
    <Modal pal={pal} title="Novo aluno" onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Field pal={pal} label="Nome completo">
          <input value={nome} onChange={e => setNome(e.target.value)}
            style={inputStyle(pal)} placeholder="Ex.: Maria Silva" />
        </Field>
        <Field pal={pal} label="Matrícula">
          <input value={matricula} onChange={e => setMatricula(e.target.value)}
            style={inputStyle(pal)} placeholder="Ex.: 20251SBF06GL0099" />
        </Field>
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 18 }}>
        <Btn pal={pal} variant="ghost" onClick={onClose}>Cancelar</Btn>
        <Btn pal={pal} onClick={() => nome && matricula && onSalvar(nome, matricula)}>
          Adicionar aluno
        </Btn>
      </div>
    </Modal>
  );
}

function ModalMover({ pal, alunoId, alunos, turmas, turmaAtual, onClose, onMover }) {
  const aluno = alunos.find(a => a.id === alunoId);
  const [destino, setDestino] = useState("");
  const opcoes = turmas.filter(t => t.id !== turmaAtual.id);
  if (!aluno) return null;
  return (
    <Modal pal={pal} title="Mover aluno de turma" onClose={onClose}>
      <div style={{
        background: pal.bg, padding: 12, borderRadius: 10, marginBottom: 16,
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%",
          background: `linear-gradient(135deg, ${pal.primary}, ${pal.accent})`,
          color: "white", display: "grid", placeItems: "center",
          fontSize: 13, fontWeight: 700 }}>
          {aluno.nome.split(" ").map(n => n[0]).slice(0,2).join("")}
        </div>
        <div>
          <div style={{ fontWeight: 700, color: pal.ink, fontSize: 14 }}>{aluno.nome}</div>
          <div style={{ fontSize: 12, color: pal.inkMuted }}>{aluno.matricula}</div>
        </div>
      </div>
      <Field pal={pal} label="Mover para a turma">
        <select value={destino} onChange={e => setDestino(e.target.value)}
          style={inputStyle(pal)}>
          <option value="">Selecione…</option>
          {opcoes.map(t => (
            <option key={t.id} value={t.id}>{t.nome} — {t.codigo}</option>
          ))}
        </select>
      </Field>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 18 }}>
        <Btn pal={pal} variant="ghost" onClick={onClose}>Cancelar</Btn>
        <Btn pal={pal} onClick={() => destino && onMover(alunoId, destino)}>Mover aluno</Btn>
      </div>
    </Modal>
  );
}

function ModalConfig({ pal, cfg, setCfg, onClose }) {
  const [local, setLocal] = useState(JSON.parse(JSON.stringify(cfg)));
  function setItem(grupo, idx, campo, val) {
    const novo = JSON.parse(JSON.stringify(local));
    novo.estrutura[grupo][idx][campo] = campo === "peso" ? (parseFloat(val) || 0) : val;
    setLocal(novo);
  }
  return (
    <Modal pal={pal} title="Configuração da avaliação" width={620} onClose={onClose}>
      <Field pal={pal} label="Pontuação para aprovação">
        <input type="number" value={local.pontosAprovacao}
          onChange={e => setLocal({ ...local, pontosAprovacao: parseFloat(e.target.value) || 0 })}
          style={inputStyle(pal)} />
      </Field>
      {["p1", "p2"].map(g => (
        <div key={g} style={{ marginTop: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: pal.ink, marginBottom: 8,
            textTransform: "uppercase", letterSpacing: 0.5 }}>
            Parcela {g === "p1" ? "1" : "2"}
          </div>
          {local.estrutura[g].map((it, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 8,
              marginBottom: 8 }}>
              <input value={it.nome} onChange={e => setItem(g, i, "nome", e.target.value)}
                style={inputStyle(pal)} placeholder="Nome da atividade" />
              <input type="number" value={it.peso} onChange={e => setItem(g, i, "peso", e.target.value)}
                style={inputStyle(pal)} placeholder="Peso" />
            </div>
          ))}
        </div>
      ))}
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 18 }}>
        <Btn pal={pal} variant="ghost" onClick={onClose}>Cancelar</Btn>
        <Btn pal={pal} onClick={() => { setCfg(local); onClose(); }}>Salvar</Btn>
      </div>
    </Modal>
  );
}

function Field({ pal, label, children }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700,
        color: pal.inkMuted, textTransform: "uppercase", letterSpacing: 0.5,
        marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}

function inputStyle(pal) {
  return {
    width: "100%", padding: "10px 12px", border: `1px solid ${pal.line}`,
    borderRadius: 10, fontSize: 14, color: pal.ink, background: "white",
    outline: "none", boxSizing: "border-box",
  };
}

// =============================================================
//  APP
// =============================================================
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const pal = PALETTES[t.palette] || PALETTES.turquoise;

  const [view, setView] = useState("home"); // home | turma
  const [turmaAtivaId, setTurmaAtivaId] = useState(null);
  const [turmas, setTurmas] = useState(TURMAS_SEED);
  const [todosAlunos, setTodosAlunos] = useState(() => {
    const out = [];
    TURMAS_SEED.forEach(t => { out.push(...seedAlunosFromData(t.id)); });
    return out;
  });
  const [cfgPorTurma, setCfgPorTurma] = useState(() => {
    const o = {}; TURMAS_SEED.forEach(t => o[t.id] = JSON.parse(JSON.stringify(ESTRUTURA_PADRAO))); return o;
  });

  const turma = turmas.find(x => x.id === turmaAtivaId);
  const alunosTurma = todosAlunos.filter(a => a.turmaId === turmaAtivaId);
  const alunosPorTurma = useMemo(() => {
    const m = {}; turmas.forEach(t => m[t.id] = []);
    todosAlunos.forEach(a => { if (m[a.turmaId]) m[a.turmaId].push(a); });
    return m;
  }, [todosAlunos, turmas]);

  function setAlunosTurma(updater) {
    setTodosAlunos(prev => {
      const naTurma = prev.filter(a => a.turmaId === turmaAtivaId);
      const novosNa = typeof updater === "function" ? updater(naTurma) : updater;
      return [...prev.filter(a => a.turmaId !== turmaAtivaId), ...novosNa];
    });
  }

  function moverAluno(alunoId, novaTurmaId) {
    setTodosAlunos(prev => prev.map(a => a.id === alunoId
      ? { ...a, turmaId: novaTurmaId } : a));
  }

  function novaTurma() {
    const id = `t${Date.now()}`;
    const cores = ["turquoise","purple","coral","green","blue","magenta","amber","teal"];
    const nova = {
      id, nome: "Nova Turma", codigo: "LIC.0000",
      professor: "Definir", turma: "20252.0.SBF06GL.1N",
      curso: "Lic. em Ciências da Computação", periodo: "2025/2",
      cargaHoraria: "60h", cor: cores[turmas.length % cores.length], icone: "★",
    };
    setTurmas(prev => [...prev, nova]);
    setCfgPorTurma(prev => ({ ...prev, [id]: JSON.parse(JSON.stringify(ESTRUTURA_PADRAO)) }));
    setTurmaAtivaId(id); setView("turma");
  }

  return (
    <div style={{ background: pal.bg, minHeight: "100vh",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: pal.ink }}>
      <TopBar pal={pal} view={view} turma={turma}
        onHome={() => { setView("home"); setTurmaAtivaId(null); }} />

      {view === "home" && (
        <HomeTurmas pal={pal} turmas={turmas} alunosPorTurma={alunosPorTurma}
          onOpen={id => { setTurmaAtivaId(id); setView("turma"); }}
          onNovaTurma={novaTurma} />
      )}
      {view === "turma" && turma && (
        <TurmaView pal={pal} turma={turma} alunos={alunosTurma}
          setAlunos={setAlunosTurma} cfg={cfgPorTurma[turma.id]}
          setCfg={c => setCfgPorTurma(p => ({ ...p, [turma.id]: c }))}
          density={t.density} turmas={turmas} onMoverAluno={moverAluno} />
      )}

      <TweaksPanel title="Tweaks">
        <TweakSection title="Aparência">
          <TweakRadio label="Densidade da tabela" value={t.density}
            onChange={v => setTweak("density", v)}
            options={[{ value: "comfortable", label: "Confortável" },
                      { value: "compact", label: "Compacta" }]} />
          <TweakSelect label="Paleta" value={t.palette}
            onChange={v => setTweak("palette", v)}
            options={[
              { value: "turquoise", label: "Turquesa (padrão)" },
              { value: "purple", label: "Roxo" },
              { value: "coral", label: "Coral" },
            ]} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
