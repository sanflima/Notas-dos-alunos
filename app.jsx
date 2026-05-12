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

// Imagens de fundo dos cards (pasta assets/)
const TURMA_IMGS = {
  lcc1:  "assets/img1.jpg",
  adm1:  "assets/img2.jpg",
  agroA: "assets/img3.jpg",
  agroB: "assets/img4.jpg",
  agroC: "assets/img5.jpg",
  agroD: "assets/img6.jpg",
};

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
    notas: { s1: { p1: [0,0,0], p2: [0,0,0], rec: 0 }, s2: { p1: [0,0,0], p2: [0,0,0], rec: 0 }, rec: 0 },
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
function migrarAluno(aluno) {
  const notes = aluno.notas || {};
  if (notes.s1) {
    // já novo formato — garante rec dentro de s1/s2
    return {
      ...aluno,
      notas: {
        ...notes,
        s1: { ...notes.s1, rec: notes.s1.rec ?? 0 },
        s2: notes.s2 ? { ...notes.s2, rec: notes.s2.rec ?? 0 }
                     : { p1: [], p2: [], rec: 0 },
        rec: notes.rec ?? 0,
      },
    };
  }
  const p1 = notes.p1 || [];
  const p2 = notes.p2 || [];
  return {
    ...aluno,
    notas: {
      s1: { p1: p1.length ? [...p1] : [0,0,0], p2: p2.length ? [...p2] : [0,0,0], rec: 0 },
      s2: { p1: Array(p1.length || 3).fill(0), p2: Array(p2.length || 3).fill(0), rec: 0 },
      rec: 0,
    },
  };
}

function calcularAluno(aluno, cfg, opts = {}) {
  const semestres = opts.semestres || 2; // 1 = curso anual com 1 semestre, 2 = padrão
  const notes = aluno.notas || {};
  const s1n = notes.s1 || { p1: notes.p1 || [], p2: notes.p2 || [] };
  const s2n = notes.s2 || { p1: [], p2: [] };
  const s1p1 = (s1n.p1 || []).reduce((s, n) => s + (parseFloat(n) || 0), 0);
  const s1p2 = (s1n.p2 || []).reduce((s, n) => s + (parseFloat(n) || 0), 0);
  const semestre1 = s1p1 + s1p2; // score bruto do S1
  const s2p1 = (s2n.p1 || []).reduce((s, n) => s + (parseFloat(n) || 0), 0);
  const s2p2 = (s2n.p2 || []).reduce((s, n) => s + (parseFloat(n) || 0), 0);
  const semestre2 = s2p1 + s2p2; // score bruto do S2

  // Rec. Paralela: prevalece a maior nota (só válida se semestre < 60)
  const recP1 = parseFloat(s1n.rec) || 0;
  const recP2 = parseFloat(s2n.rec) || 0;
  const efS1 = (semestre1 < 60 && recP1 > semestre1) ? recP1 : semestre1;
  const efS2 = (semestre2 < 60 && recP2 > semestre2) ? recP2 : semestre2;

  // MCC — para curso com 1 semestre usa só S1; para 2 semestres usa a média
  const mediaFinal = semestres === 1 ? efS1 : (efS1 + efS2) / 2;
  const mcc10 = mediaFinal / 10;

  // Rec. Final — NRF inserida em escala 0-10 (padrão IF Baiano)
  const rec = parseFloat(notes.rec) || 0; // NRF 0-10
  const limAprov = cfg?.pontosAprovacao || 60;
  const elegibleRec = mediaFinal < limAprov;

  // Fórmula IF Baiano: MF = (MCC×6 + NRF×4) / 10
  let mf10 = mcc10;
  let final = mediaFinal;
  if (elegibleRec && rec > 0) {
    mf10 = (mcc10 * 6 + rec * 4) / 10;
    final = mf10 * 10; // converte para 0-100 para exibição consistente
  }

  // Aprovação: sem rec → mediaFinal ≥ 60; com rec → MF ≥ 5,0 (= 50 em 0-100)
  const limFinal = (elegibleRec && rec > 0) ? 50 : limAprov;
  let status = final >= limFinal ? "APROVADO" : "REPROVADO";
  if (aluno.statusMatricula === "desistente") status = "DESISTENTE";
  return { s1p1, s1p2, semestre1, recP1, efS1,
           s2p1, s2p2, semestre2, recP2, efS2,
           mediaFinal, mcc10, rec, mf10, final, status, elegibleRec };
}

function exportCSV(turma, alunos, cfg) {
  const p1c = cfg.estrutura.p1;
  const p2c = cfg.estrutura.p2;
  const head = [
    "Matrícula", "Nome",
    ...p1c.map(a => `S1_P1_${a.nome}`), "Total S1-P1",
    ...p2c.map(a => `S1_P2_${a.nome}`), "Total S1-P2", "Semestre 1",
    ...p1c.map(a => `S2_P1_${a.nome}`), "Total S2-P1",
    ...p2c.map(a => `S2_P2_${a.nome}`), "Total S2-P2", "Semestre 2",
    "Média Final", "Rec", "Final", "Status",
  ];
  const rows = alunos.map(a => {
    const c = calcularAluno(a, cfg);
    const s1n = a.notas?.s1 || { p1: a.notas?.p1 || [], p2: a.notas?.p2 || [] };
    const s2n = a.notas?.s2 || { p1: [], p2: [] };
    return [
      a.matricula, a.nome,
      ...(s1n.p1 || []), c.s1p1.toFixed(1),
      ...(s1n.p2 || []), c.s1p2.toFixed(1), c.semestre1.toFixed(1),
      ...(s2n.p1 || []), c.s2p1.toFixed(1),
      ...(s2n.p2 || []), c.s2p2.toFixed(1), c.semestre2.toFixed(1),
      c.mediaFinal.toFixed(1), c.rec.toFixed(1), c.final.toFixed(1), c.status,
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

function TopBar({ pal, view, turma, onHome, salvando }) {
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
        {salvando !== null && (
          <div style={{
            fontSize: 12, fontWeight: 600,
            color: salvando ? pal.inkSoft : pal.success,
            display: "flex", alignItems: "center", gap: 5,
            transition: "color .4s",
          }}>
            <span style={{ fontSize: 14 }}>{salvando ? "⟳" : "✓"}</span>
            {salvando ? "Salvando…" : "Salvo na nuvem"}
          </div>
        )}
        <div style={{ fontSize: 13, color: pal.inkMuted }}>2026/1 · Senhor do Bonfim</div>
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
              background: pal.surface, borderRadius: 20,
              border: `2.5px solid ${cc.ink}28`, overflow: "hidden",
              cursor: "pointer", transition: "transform .18s, box-shadow .18s",
              display: "flex", flexDirection: "column",
              boxShadow: `0 3px 10px ${cc.ink}18`,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = `0 18px 36px ${cc.ink}35`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = `0 3px 10px ${cc.ink}18`; }}
            >
              {/* ── Cabeçalho com imagem de fundo ── */}
              <div style={{
                height: 175,
                background: cc.bg,
                backgroundImage: TURMA_IMGS[t.id] ? `url('${TURMA_IMGS[t.id]}')` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative", padding: "18px 18px 14px",
                display: "flex", alignItems: "flex-end", justifyContent: "space-between",
              }}>
                {/* overlay gradiente sobre a foto */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: `linear-gradient(150deg, ${cc.bg}55 0%, ${cc.bg}dd 100%)`,
                }} />
                {/* ícone da turma */}
                <div style={{
                  width: 80, height: 80, borderRadius: 20,
                  background: "white",
                  display: "grid", placeItems: "center",
                  fontWeight: 900, fontSize: 22, color: cc.ink,
                  boxShadow: `0 6px 20px rgba(0,0,0,0.22)`,
                  position: "relative", zIndex: 1, flexShrink: 0,
                }}>{t.icone}</div>
                {/* badges direita */}
                <div style={{ display: "flex", flexDirection: "column",
                  alignItems: "flex-end", gap: 6, position: "relative", zIndex: 1 }}>
                  <div style={{
                    background: "rgba(255,255,255,0.92)", color: cc.ink,
                    padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 800,
                    letterSpacing: 0.4, boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                  }}>{t.nivel}</div>
                  <div style={{
                    background: `${cc.bg}cc`, color: cc.ink,
                    padding: "3px 11px", borderRadius: 999, fontSize: 12, fontWeight: 700,
                    backdropFilter: "blur(6px)", border: `1px solid ${cc.ink}22`,
                  }}>{t.codigo}</div>
                </div>
              </div>

              {/* ── Corpo do card ── */}
              <div style={{ padding: "16px 18px 16px", flex: 1, display: "flex",
                flexDirection: "column", gap: 8 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: cc.ink,
                    textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 5 }}>
                    {t.curso}
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: pal.ink,
                    letterSpacing: -0.4, marginBottom: 4 }}>{t.nome}</div>
                  <div style={{ fontSize: 12, color: pal.inkMuted }}>
                    {t.turmaCurta} · {t.cargaHoraria}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: "auto", paddingTop: 10,
                  borderTop: `1.5px dashed ${cc.ink}22` }}>
                  <Pill label={`${alunos.length} alunos`} bg={cc.soft} fg={cc.ink} />
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
  const [showMover, setShowMover] = useState(null);
  const [showNovo, setShowNovo] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [semestreAtivo, setSemestreAtivo] = useState("s1");

  const tableWrapRef = useRef(null);
  const topScrollRef = useRef(null);
  const topInnerRef  = useRef(null);

  useEffect(() => {
    const wrap = tableWrapRef.current;
    const top  = topScrollRef.current;
    const inner = topInnerRef.current;
    if (!wrap || !top || !inner) return;
    const updateWidth = () => {
      inner.style.width = wrap.scrollWidth + "px";
    };
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(wrap);
    const onWrap = () => { if (top.scrollLeft !== wrap.scrollLeft) top.scrollLeft = wrap.scrollLeft; };
    const onTop  = () => { if (wrap.scrollLeft !== top.scrollLeft) wrap.scrollLeft = top.scrollLeft; };
    wrap.addEventListener("scroll", onWrap);
    top.addEventListener("scroll", onTop);
    return () => {
      ro.disconnect();
      wrap.removeEventListener("scroll", onWrap);
      top.removeEventListener("scroll", onTop);
    };
  }, [semestreAtivo]);

  const calcs = useMemo(() => {
    const map = {};
    const opts = { semestres: turma.nivel === "Graduação" ? 1 : 2 };
    alunos.forEach(a => { map[a.id] = calcularAluno(a, cfg, opts); });
    return map;
  }, [alunos, cfg, turma.nivel]);

  const elegiveisRec = useMemo(() =>
    alunos.filter(a => calcs[a.id]?.elegibleRec && a.statusMatricula !== "desistente").length,
  [alunos, calcs]);

  const filtrados = useMemo(() => {
    let arr = alunos.filter(a =>
      a.nome.toLowerCase().includes(busca.toLowerCase()) ||
      a.matricula.toLowerCase().includes(busca.toLowerCase())
    );
    if (semestreAtivo === "rec") {
      arr = arr.filter(a => calcs[a.id]?.elegibleRec && a.statusMatricula !== "desistente");
    } else if (filtroStatus !== "todos") {
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
  }, [alunos, busca, filtroStatus, semestreAtivo, ordem, calcs]);

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
      const notes = { ...(a.notas || {}) };
      if (grupo === "rec") {
        // NRF da Recuperação Final — escala 0-10
        return { ...a, notas: { ...notes, rec: Math.max(0, Math.min(10, parseFloat(valor) || 0)) } };
      }
      const semKey = semestreAtivo === "rec" ? "s1" : semestreAtivo;
      const sNotes = { ...(notes[semKey] || { p1: [], p2: [] }) };
      if (grupo === "recP") {
        // Rec. Paralela do semestre — escala 0-100
        sNotes.rec = Math.max(0, Math.min(100, parseFloat(valor) || 0));
        return { ...a, notas: { ...notes, [semKey]: sNotes } };
      }
      const arr = [...(sNotes[grupo] || [])];
      while (arr.length < cfg.estrutura[grupo].length) arr.push(0);
      const max = cfg.estrutura[grupo][idx]?.peso || 0;
      let n = parseFloat(valor); if (isNaN(n)) n = 0;
      n = Math.max(0, Math.min(max, n));
      arr[idx] = n;
      sNotes[grupo] = arr;
      return { ...a, notas: { ...notes, [semKey]: sNotes } };
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

  function getNotasSem(aluno) {
    const notes = aluno.notas || {};
    if (semestreAtivo === "s1") return notes.s1 || { p1: notes.p1 || [], p2: notes.p2 || [] };
    return notes[semestreAtivo] || { p1: [], p2: [] };
  }

  const novoAlunoNotas = { s1: { p1: [0,0,0], p2: [0,0,0], rec: 0 }, s2: { p1: [0,0,0], p2: [0,0,0], rec: 0 }, rec: 0 };

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
        <Kpi pal={pal} label="Média final" value={stats.media.toFixed(1)} accent={pal.accent} />
        <GraficoDesempenho pal={pal} alunos={alunos} calcs={calcs} cfg={cfg} />
      </div>

      {/* ── Seletor de semestre ── */}
      <div style={{ display: "flex", gap: 0, marginBottom: 16, background: pal.surface,
        borderRadius: 12, padding: 4, width: "fit-content",
        border: `1px solid ${pal.line}`, boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
        {[
          { v: "s1", l: "1º Semestre" },
          ...(turma.nivel === "Graduação" ? [] : [{ v: "s2", l: "2º Semestre" }]),
          { v: "rec", l: `Recuperação Final${elegiveisRec > 0 ? ` (${elegiveisRec})` : ""}` },
        ].map(op => (
          <button key={op.v} onClick={() => setSemestreAtivo(op.v)} style={{
            padding: "9px 20px", border: "none", borderRadius: 9, cursor: "pointer",
            background: semestreAtivo === op.v
              ? (op.v === "rec" ? pal.coralSoft : pal.primarySoft)
              : "transparent",
            color: semestreAtivo === op.v
              ? (op.v === "rec" ? "#B91C1C" : pal.primaryDark)
              : pal.inkMuted,
            fontWeight: 700, fontSize: 13,
            boxShadow: semestreAtivo === op.v ? "0 2px 6px rgba(0,0,0,0.08)" : "none",
            transition: "all .15s",
          }}>{op.l}</button>
        ))}
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
        {semestreAtivo !== "rec" && (
          <Segmented pal={pal} value={filtroStatus} onChange={setFiltroStatus} options={[
            { v: "todos", l: "Todos" },
            { v: "APROVADO", l: "Aprovados" },
            { v: "REPROVADO", l: "Reprovados" },
            { v: "DESISTENTE", l: "Desistentes" },
          ]} />
        )}
        <Btn pal={pal} variant="ghost" onClick={() => setShowNovo(true)}>+ Novo aluno</Btn>
      </div>

      {/* ── Scrollbar superior sincronizada ── */}
      <div ref={topScrollRef} style={{
        overflowX: "auto", overflowY: "hidden", height: 14,
        borderRadius: 7, marginBottom: 4,
      }}>
        <div ref={topInnerRef} style={{ height: 1 }} />
      </div>

      {/* ── Tabela ── */}
      <div ref={tableWrapRef} style={{
        background: pal.surface, borderRadius: 14, border: `1px solid ${pal.line}`,
        overflow: "auto", boxShadow: "0 4px 14px rgba(15,23,42,0.04)",
      }}>
        {semestreAtivo === "rec" ? (
          /* Tabela Recuperação Final */
          <table style={{ borderCollapse: "separate", borderSpacing: 0, width: "100%",
            minWidth: 750, fontSize: dFont }}>
            <thead>
              <tr>
                <Th pal={pal} sticky onClick={() => ordenarPor("nome")}
                  ordem={ordem} campo="nome" align="left" style={{ minWidth: 220 }}>Aluno</Th>
                <Th pal={pal} group="p1" style={{ whiteSpace: "normal", minWidth: 68 }}>
                  S1 efetivo
                </Th>
                {turma.nivel !== "Graduação" && (
                  <Th pal={pal} group="p2" style={{ whiteSpace: "normal", minWidth: 68 }}>
                    S2 efetivo
                  </Th>
                )}
                <Th pal={pal} style={{ whiteSpace: "normal", minWidth: 60 }}>MCC (0-10)</Th>
                <Th pal={pal} style={{ background: pal.coralSoft, color: "#B91C1C",
                  whiteSpace: "normal", minWidth: 70 }}>
                  NRF (0-10)
                </Th>
                <Th pal={pal} onClick={() => ordenarPor("final")} ordem={ordem} campo="final"
                  style={{ whiteSpace: "normal", minWidth: 60 }}>MF (0-10)</Th>
                <Th pal={pal} onClick={() => ordenarPor("status")} ordem={ordem} campo="status">Status</Th>
                <Th pal={pal}>Ações</Th>
              </tr>
            </thead>
            <tbody>
              {filtrados.length === 0 && (
                <tr><td colSpan={8} style={{ padding: 40, textAlign: "center",
                  color: pal.inkMuted, fontSize: 14 }}>
                  Nenhum aluno elegível para recuperação. Todos aprovados!
                </td></tr>
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
                          background: `linear-gradient(135deg, ${pal.coral}, ${pal.accent})`,
                          color: "white", display: "grid", placeItems: "center",
                          fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                          {aluno.nome.split(" ").map(n => n[0]).slice(0,2).join("")}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ color: pal.ink, fontSize: dFont, fontWeight: 600,
                            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                            maxWidth: 200 }}>{aluno.nome}</div>
                          <div style={{ color: pal.inkMuted, fontSize: 11 }}>{aluno.matricula}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ ...tdStyle(pal, dRow), background: rowBg,
                      color: pal.primaryDark, fontWeight: 700 }}>{c.efS1.toFixed(1)}</td>
                    {turma.nivel !== "Graduação" && (
                      <td style={{ ...tdStyle(pal, dRow), background: rowBg,
                        color: "#7E22CE", fontWeight: 700 }}>{c.efS2.toFixed(1)}</td>
                    )}
                    <td style={{ ...tdStyle(pal, dRow), background: rowBg, fontWeight: 700 }}>
                      {c.mcc10.toFixed(2)}
                    </td>
                    <td style={{ ...tdStyle(pal, dRow), background: rowBg,
                      backgroundColor: idx % 2 ? "#FFF5F5" : "#FFF0F0" }}>
                      <NotaInput pal={pal} value={aluno.notas?.rec || 0} max={10}
                        size={dInput} onChange={v => atualizarNota(aluno.id, "rec", null, v)} />
                    </td>
                    <td style={{ ...tdStyle(pal, dRow), background: rowBg,
                      fontWeight: 800, fontSize: dFont + 1,
                      color: c.mf10 >= 5 ? pal.success : pal.coral }}>
                      {c.mf10.toFixed(2)}
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
        ) : (
          /* Tabela S1 / S2 */
          <table style={{ borderCollapse: "separate", borderSpacing: 0, width: "100%",
            minWidth: 1100, fontSize: dFont }}>
            <thead>
              <tr>
                <Th pal={pal} rowSpan={2} sticky onClick={() => ordenarPor("nome")}
                  ordem={ordem} campo="nome" align="left" style={{ minWidth: 220 }}>Aluno</Th>
                <Th pal={pal} colSpan={cfg.estrutura.p1.length} group="p1">
                  <ParcelaHeader pal={pal} group="p1" cfg={cfg} setCfg={setCfg} />
                </Th>
                <Th pal={pal} rowSpan={2}>Total P1</Th>
                <Th pal={pal} colSpan={cfg.estrutura.p2.length} group="p2">
                  <ParcelaHeader pal={pal} group="p2" cfg={cfg} setCfg={setCfg} />
                </Th>
                <Th pal={pal} rowSpan={2}>Total P2</Th>
                <Th pal={pal} rowSpan={2}>
                  {semestreAtivo === "s1" ? "Semestre 1" : "Semestre 2"}
                </Th>
                <Th pal={pal} rowSpan={2} style={{ background: pal.coralSoft, color: "#B91C1C",
                  whiteSpace: "normal", minWidth: 70 }}>
                  Rec. Paralela
                </Th>
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
                const semNotes = getNotasSem(aluno);
                const totalP1 = semestreAtivo === "s1" ? c.s1p1 : c.s2p1;
                const totalP2 = semestreAtivo === "s1" ? c.s1p2 : c.s2p2;
                const semRaw   = semestreAtivo === "s1" ? c.semestre1 : c.semestre2;
                const semTotal = semestreAtivo === "s1" ? c.efS1 : c.efS2; // efetivo após recP
                const recPVal  = semNotes.rec || 0;
                const eligRecP = semRaw < 60;
                const limAprov = cfg?.pontosAprovacao || 60;
                const semStatus = aluno.statusMatricula === "desistente" ? "DESISTENTE"
                  : semTotal >= limAprov ? "APROVADO" : "REPROVADO";
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
                        <NotaInput pal={pal} value={(semNotes.p1 || [])[i] || 0} max={it.peso}
                          size={dInput}
                          onChange={v => atualizarNota(aluno.id, "p1", i, v)} />
                      </td>
                    ))}
                    <td style={{ ...tdStyle(pal, dRow), background: rowBg, fontWeight: 700 }}>
                      {totalP1.toFixed(1)}
                    </td>
                    {cfg.estrutura.p2.map((it, i) => (
                      <td key={"p2"+i} style={{ ...tdStyle(pal, dRow), background: rowBg,
                        backgroundColor: idx % 2 ? "#FAF5FF" : "#FCFAFE" }}>
                        <NotaInput pal={pal} value={(semNotes.p2 || [])[i] || 0} max={it.peso}
                          size={dInput}
                          onChange={v => atualizarNota(aluno.id, "p2", i, v)} />
                      </td>
                    ))}
                    <td style={{ ...tdStyle(pal, dRow), background: rowBg, fontWeight: 700 }}>
                      {totalP2.toFixed(1)}
                    </td>
                    <td style={{ ...tdStyle(pal, dRow), background: rowBg, fontWeight: 700,
                      color: pal.primaryDark }}>
                      {semRaw.toFixed(1)}
                      {recPVal > 0 && eligRecP && (
                        <span style={{ fontSize: 10, color: "#B91C1C", marginLeft: 4 }}>
                          →{semTotal.toFixed(1)}
                        </span>
                      )}
                    </td>
                    {/* Rec. Paralela — sempre editável; só conta no cálculo se semRaw < 60 */}
                    <td style={{ ...tdStyle(pal, dRow), background: rowBg,
                      backgroundColor: idx % 2 ? "#FFF5F5" : "#FFF0F0",
                      opacity: eligRecP ? 1 : 0.4 }}>
                      <NotaInput pal={pal} value={recPVal} max={100}
                        size={dInput} onChange={v => atualizarNota(aluno.id, "recP", null, v)} />
                    </td>
                    <td style={{ ...tdStyle(pal, dRow), background: rowBg,
                      fontWeight: 800, fontSize: dFont + 1,
                      color: semTotal >= limAprov ? pal.success : pal.coral }}>
                      {semTotal.toFixed(1)}
                    </td>
                    <td style={{ ...tdStyle(pal, dRow), background: rowBg }}>
                      <StatusBadge pal={pal} status={semStatus} />
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
        )}
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
              notas: { ...novoAlunoNotas },
            })),
          ]);
          setShowImport(false);
        }} />}

      {showNovo && <ModalNovoAluno pal={pal} onClose={() => setShowNovo(false)}
        onSalvar={(nome, matricula) => {
          setAlunos(prev => [...prev, {
            id: `${turma.id}_n_${Date.now()}`, turmaId: turma.id, nome, matricula,
            statusMatricula: "ativo",
            notas: { ...novoAlunoNotas },
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
      whiteSpace: small ? "normal" : "nowrap", verticalAlign: small ? "top" : "middle",
      minWidth: small ? 80 : "auto",
      letterSpacing: 0.2, textTransform: small ? "none" : "uppercase",
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
  const [editando, setEditando] = useState(false);
  const [nomeLocal, setNomeLocal] = useState(item.nome);
  useEffect(() => { setNomeLocal(item.nome); }, [item.nome]);

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
      {editando ? (
        <input autoFocus value={nomeLocal}
          onChange={e => setNomeLocal(e.target.value)}
          onBlur={() => { update("nome", nomeLocal); setEditando(false); }}
          onKeyDown={e => { if (e.key === "Enter") e.target.blur(); }}
          style={{
            border: `1px solid ${groupColor}60`, background: "white", textAlign: "center",
            fontWeight: 700, fontSize: 11, color: groupColor, width: 90,
            padding: "2px 4px", borderRadius: 4, outline: "none",
            textTransform: "uppercase", letterSpacing: 0.3,
            boxShadow: `0 0 0 2px ${groupColor}40`,
          }} />
      ) : (
        <div onClick={() => setEditando(true)} title="Clique para editar o nome"
          style={{
            fontWeight: 700, fontSize: 11, color: groupColor, width: 90,
            textAlign: "center", textTransform: "uppercase", letterSpacing: 0.3,
            wordBreak: "break-word", lineHeight: 1.35, cursor: "text",
            padding: "2px 4px", borderRadius: 4,
          }}>{item.nome}</div>
      )}
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
  const num = parseFloat(v) || 0;
  const pct = max > 0 ? num / max : 0;
  const noteColor = num === max && max > 0 ? "#1E3A8A"   // azul escuro — nota máxima
                  : pct < 0.6               ? "#DC2626"   // vermelho — abaixo de 60%
                  :                           pal.ink;    // normal
  return (
    <input type="number" min={0} max={max} value={v}
      onChange={e => setV(e.target.value)}
      onWheel={e => e.target.blur()}
      onBlur={() => onChange(v)}
      style={{
        width: 56, height: size, padding: "0 6px", textAlign: "center",
        border: `1.5px solid ${pal.line}`, borderRadius: 8, fontSize: 13,
        fontWeight: 600, color: noteColor, background: "white",
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

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(null); // null = firebase não configurado
  const dbRef = useRef(null);
  const saveTimer = useRef(null);

  const [view, setView] = useState("home");
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

  // Inicializa Firebase e carrega dados salvos
  useEffect(() => {
    const cfg = window.FIREBASE_CONFIG;
    if (!cfg || !cfg.projectId || cfg.projectId === "PREENCHER") {
      setCarregando(false);
      return;
    }
    try {
      const fbApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(cfg);
      const db = firebase.firestore(fbApp);
      dbRef.current = db;
      Promise.all([
        db.collection('notas2026').doc('alunos').get(),
        db.collection('notas2026').doc('cfg').get(),
      ]).then(([aDoc, cDoc]) => {
        const savePromises = [];
        if (aDoc.exists && aDoc.data().lista?.length) {
          setTodosAlunos(aDoc.data().lista.map(a => migrarAluno(a)));
        } else {
          // Firebase vazio — salva o seed inicial
          const seed = [];
          TURMAS_SEED.forEach(t => { seed.push(...seedAlunosFromData(t.id)); });
          savePromises.push(db.collection('notas2026').doc('alunos').set({ lista: seed }));
        }
        if (cDoc.exists && cDoc.data().dados) {
          setCfgPorTurma(cDoc.data().dados);
        } else {
          const seedCfg = {};
          TURMAS_SEED.forEach(t => seedCfg[t.id] = JSON.parse(JSON.stringify(ESTRUTURA_PADRAO)));
          savePromises.push(db.collection('notas2026').doc('cfg').set({ dados: seedCfg }));
        }
        return Promise.all(savePromises);
      }).then(() => {
        setSalvando(false);
        setCarregando(false);
      }).catch(() => setCarregando(false));
    } catch(e) { setCarregando(false); }
  }, []);

  // Auto-save notas (debounce 1.5s)
  useEffect(() => {
    if (!dbRef.current || carregando) return;
    setSalvando(true);
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      dbRef.current.collection('notas2026').doc('alunos')
        .set({ lista: todosAlunos })
        .then(() => setSalvando(false))
        .catch(() => setSalvando(false));
    }, 1500);
  }, [todosAlunos]);

  // Auto-save configurações
  useEffect(() => {
    if (!dbRef.current || carregando) return;
    dbRef.current.collection('notas2026').doc('cfg')
      .set({ dados: cfgPorTurma })
      .catch(() => {});
  }, [cfgPorTurma]);

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

  if (carregando) return (
    <div style={{ background: pal.bg, minHeight: "100vh", display: "grid",
      placeItems: "center", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📚</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: pal.ink }}>Carregando notas…</div>
        <div style={{ fontSize: 14, color: pal.inkMuted, marginTop: 8 }}>
          Conectando ao banco de dados
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ background: pal.bg, minHeight: "100vh",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: pal.ink }}>
      <TopBar pal={pal} view={view} turma={turma} salvando={salvando}
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
