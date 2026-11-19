(function () {
  const DATA = window.ROADMAP_DATA || [];
  const STORAGE_KEY = "stats_roadmap_v3_state";

  const defaultState = {
    theme: "light",
    activeTopicId: DATA[0] ? DATA[0].id : null,
    activeTab: "theory",
    filter: "all",
    search: "",
    completedTopics: [],
    questionStatus: {}
  };

  let state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...defaultState };
      return { ...defaultState, ...JSON.parse(raw) };
    } catch {
      return { ...defaultState };
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }

  // DOM Elements
  const sidebar = document.getElementById("sidebar");
  const topicNav = document.getElementById("topicNav");
  const contentArea = document.getElementById("contentArea");
  const breadcrumb = document.getElementById("breadcrumb");
  const searchInput = document.getElementById("searchInput");
  const overallProgressText = document.getElementById("overallProgressText");
  const overallProgressFill = document.getElementById("overallProgressFill");
  const solvedQuestionsText = document.getElementById("solvedQuestionsText");
  const correctRateText = document.getElementById("correctRateText");
  const prevTopicBtn = document.getElementById("prevTopicBtn");
  const nextTopicBtn = document.getElementById("nextTopicBtn");
  const themeToggle = document.getElementById("themeToggle");
  const roadmapModal = document.getElementById("roadmapModal");

  // Theme
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    themeToggle.textContent = state.theme === "dark" ? "☀️" : "🌙";
  }

  themeToggle.addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    applyTheme();
    saveState();
  });

  // Mobile sidebar
  document.getElementById("openSidebar").addEventListener("click", () => sidebar.classList.add("open"));
  document.getElementById("closeSidebar").addEventListener("click", () => sidebar.classList.remove("open"));

  // Modal
  document.getElementById("openRoadmapModal").addEventListener("click", () => roadmapModal.classList.remove("hidden"));
  document.getElementById("closeRoadmapModal").addEventListener("click", () => roadmapModal.classList.add("hidden"));
  roadmapModal.addEventListener("click", (e) => {
    if (e.target === roadmapModal) roadmapModal.classList.add("hidden");
  });

  // Reset
  document.getElementById("resetProgressBtn").addEventListener("click", () => {
    if (confirm("Tüm konu ve soru ilerlemeniz sıfırlanacak. Emin misiniz?")) {
      state.completedTopics = [];
      state.questionStatus = {};
      saveState();
      renderAll();
    }
  });

  // Filter & Search
  document.querySelectorAll(".pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".pill").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.filter = btn.dataset.filter;
      renderNav();
    });
  });

  searchInput.addEventListener("input", (e) => {
    state.search = e.target.value.trim().toLowerCase();
    renderNav();
  });

  // Prev / Next
  prevTopicBtn.addEventListener("click", () => {
    const idx = DATA.findIndex((t) => t.id === state.activeTopicId);
    if (idx > 0) {
      selectTopic(DATA[idx - 1].id);
    }
  });

  nextTopicBtn.addEventListener("click", () => {
    const idx = DATA.findIndex((t) => t.id === state.activeTopicId);
    if (idx >= 0 && idx < DATA.length - 1) {
      selectTopic(DATA[idx + 1].id);
    }
  });

  function selectTopic(id) {
    state.activeTopicId = id;
    state.activeTab = "theory";
    saveState();
    sidebar.classList.remove("open");
    renderAll();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateProgressUI() {
    const totalTopics = DATA.length;
    const doneTopics = state.completedTopics.length;
    const pct = totalTopics ? Math.round((doneTopics / totalTopics) * 100) : 0;
    overallProgressText.textContent = `${doneTopics} / ${totalTopics} Konu`;
    overallProgressFill.style.width = `${pct}%`;

    let totalQ = 0;
    let solvedQ = 0;
    let correctQ = 0;
    DATA.forEach((t) => {
      totalQ += t.questions.length;
      t.questions.forEach((q) => {
        const st = state.questionStatus[q.id];
        if (st && st.answered) {
          solvedQ++;
          if (st.correct) correctQ++;
        }
      });
    });

    solvedQuestionsText.textContent = `${solvedQ} / ${totalQ} Soru Çözüldü`;
    const acc = solvedQ ? Math.round((correctQ / solvedQ) * 100) : 0;
    correctRateText.textContent = `%${acc} Doğruluk`;
  }

  function renderNav() {
    topicNav.innerHTML = "";
    const levels = [1, 2, 3];
    const levelNames = {
      1: "Seviye 1: Temeller & Olasılık",
      2: "Seviye 2: Çıkarımsal İstatistik",
      3: "Seviye 3: İleri & Nedensellik"
    };

    levels.forEach((lvl) => {
      const items = DATA.filter((t) => {
        if (t.level !== lvl) return false;
        if (state.filter === "core" && t.tag !== "core") return false;
        if (state.filter === "optional" && t.tag !== "optional") return false;
        if (state.filter === "explain" && !t.explainability) return false;
        if (state.search) {
          const hay = (t.title + " " + t.summary + " " + (t.keywords || []).join(" ")).toLowerCase();
          if (!hay.includes(state.search)) return false;
        }
        return true;
      });

      if (!items.length) return;

      const lvlTitle = document.createElement("div");
      lvlTitle.className = "nav-level-title";
      lvlTitle.textContent = levelNames[lvl];
      topicNav.appendChild(lvlTitle);

      items.forEach((t) => {
        const btn = document.createElement("button");
        const isDone = state.completedTopics.includes(t.id);
        btn.className = `nav-item ${t.id === state.activeTopicId ? "active" : ""} ${isDone ? "completed" : ""}`;
        btn.innerHTML = `
          <span class="nav-item-left">
            <span class="nav-status-dot"></span>
            <span>${t.order}. ${t.title}</span>
          </span>
          <span class="nav-badges">
            ${t.explainability ? '<span title="Açıklanabilirlik">✱</span>' : ""}
            <span>${t.tag === "core" ? "●" : "○"}</span>
          </span>
        `;
        btn.addEventListener("click", () => selectTopic(t.id));
        topicNav.appendChild(btn);
      });
    });
  }

  function renderMath(container) {
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(container, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
          ],
          throwOnError: false
        });
      } catch {}
    }
  }

  function renderContent() {
    const topic = DATA.find((t) => t.id === state.activeTopicId) || DATA[0];
    if (!topic) {
      contentArea.innerHTML = "<div class='card'>Konu bulunamadı.</div>";
      return;
    }

    const idx = DATA.findIndex((t) => t.id === topic.id);
    prevTopicBtn.disabled = idx <= 0;
    nextTopicBtn.disabled = idx >= DATA.length - 1;
    breadcrumb.textContent = `${topic.levelTitle} › ${topic.title}`;

    const isCompleted = state.completedTopics.includes(topic.id);
    const solvedInTopic = topic.questions.filter((q) => state.questionStatus[q.id]?.answered).length;
    const correctInTopic = topic.questions.filter((q) => state.questionStatus[q.id]?.correct).length;

    let html = `
      <section class="topic-hero">
        <div class="topic-meta">
          <span class="badge badge-level">Seviye ${topic.level} · Konu #${topic.order}</span>
          <span class="badge ${topic.tag === "core" ? "badge-core" : "badge-optional"}">
            ${topic.tag === "core" ? "Çekirdek" : "Seçmeli"}
          </span>
          ${topic.explainability ? '<span class="badge badge-explain">✱ Açıklanabilirlik Bağlantısı</span>' : ""}
        </div>
        <h2>${topic.title}</h2>
        <p class="topic-summary">${topic.summary}</p>
        <div class="topic-hero-actions">
          <span style="font-size:13.5px; color:var(--text-muted)">
            Soru Durumu: <strong>${solvedInTopic} / ${topic.questions.length}</strong> çözüldü (${correctInTopic} doğru)
          </span>
          <button class="${isCompleted ? "btn-success" : "btn-primary"}" id="toggleCompleteBtn">
            ${isCompleted ? "✓ Konu Tamamlandı" : "Konuyu Tamamlandı İşaretle"}
          </button>
        </div>
      </section>

      <div class="tabs">
        <button class="tab-btn ${state.activeTab === "theory" ? "active" : ""}" data-tab="theory">📖 Konu Anlatımı</button>
        <button class="tab-btn ${state.activeTab === "examples" ? "active" : ""}" data-tab="examples">🧮 Sayısal Örnekler (${topic.examples.length})</button>
        <button class="tab-btn ${state.activeTab === "lab" ? "active" : ""}" data-tab="lab">🧪 İnteraktif Laboratuvar</button>
        <button class="tab-btn ${state.activeTab === "questions" ? "active" : ""}" data-tab="questions">✍️ 5 Soru &amp; Çözüm</button>
      </div>

      <div id="tabBody"></div>
    `;

    contentArea.innerHTML = html;

    document.getElementById("toggleCompleteBtn").addEventListener("click", () => {
      if (state.completedTopics.includes(topic.id)) {
        state.completedTopics = state.completedTopics.filter((id) => id !== topic.id);
      } else {
        state.completedTopics.push(topic.id);
      }
      saveState();
      renderAll();
    });

    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activeTab = btn.dataset.tab;
        saveState();
        renderContent();
      });
    });

    const tabBody = document.getElementById("tabBody");
    if (state.activeTab === "theory") {
      tabBody.innerHTML = topic.theoryHtml;
    } else if (state.activeTab === "examples") {
      tabBody.innerHTML = renderExamplesHtml(topic);
    } else if (state.activeTab === "lab") {
      renderLab(tabBody, topic.labId);
    } else if (state.activeTab === "questions") {
      renderQuestions(tabBody, topic);
    }

    renderMath(contentArea);
  }

  function renderExamplesHtml(topic) {
    return topic.examples
      .map(
        (ex) => `
      <div class="card example-card">
        <h3>${ex.title}</h3>
        <p><strong>Problem:</strong> ${ex.problem.replace(/\n/g, "<br>")}</p>
        <h4>Adım Adım Hesaplama</h4>
        <ol class="step-list">
          ${ex.steps.map((s) => `<li>${s}</li>`).join("")}
        </ol>
        <div class="callout tip">
          <strong>Sonuç:</strong> ${ex.answer}
        </div>
        <div class="callout">
          <strong>Veri Bilimi Yorumu:</strong> ${ex.interpretation}
        </div>
      </div>
    `
      )
      .join("");
  }

  function renderQuestions(container, topic) {
    container.innerHTML = topic.questions
      .map((q, i) => {
        const saved = state.questionStatus[q.id];
        return `
        <div class="card question-card" id="qcard-${q.id}">
          <div class="q-header">
            <strong>Soru ${i + 1} / ${topic.questions.length}</strong>
            <span class="q-type-badge">${q.category} · ${q.type === "numeric" ? "Sayısal Hesaplama" : "Çoktan Seçmeli"}</span>
          </div>
          <p>${q.prompt}</p>
          ${
            q.type === "numeric"
              ? `
            <div class="numeric-answer-row">
              <input type="number" step="any" class="numeric-input" id="num-${q.id}" placeholder="Sayısal cevap..." value="${saved?.userAnswer ?? ""}" />
              ${q.unit ? `<span>${q.unit}</span>` : ""}
              <button class="btn-primary btn-sm check-num-btn" data-qid="${q.id}">Kontrol Et</button>
            </div>
            ${q.hint ? `<p style="font-size:12.5px; color:var(--text-muted); margin-top:4px;">💡 İpucu: ${q.hint}</p>` : ""}
          `
              : `
            <div class="q-options">
              ${q.options
                .map((opt, idx) => {
                  let cls = "";
                  if (saved?.answered) {
                    if (idx === q.answerIndex) cls = "correct";
                    else if (idx === saved.userAnswer && !saved.correct) cls = "wrong";
                  }
                  return `
                  <label class="q-option ${cls}">
                    <input type="radio" name="mcq-${q.id}" value="${idx}" ${saved?.userAnswer === idx ? "checked" : ""} />
                    <span>${opt}</span>
                  </label>
                `;
                })
                .join("")}
            </div>
            <button class="btn-primary btn-sm check-mcq-btn" data-qid="${q.id}">Cevabı Kontrol Et</button>
          `
          }
          <div class="q-actions">
            <button class="btn-secondary btn-sm toggle-sol-btn" data-qid="${q.id}">👁️ Adım Adım Çözümü &amp; Yorumu Göster</button>
          </div>
          <div id="fb-${q.id}" class="q-feedback ${saved?.answered ? (saved.correct ? "ok" : "err") : "hidden"}">
            ${
              saved?.answered
                ? saved.correct
                  ? "✓ Tebrikler, doğru cevap!"
                  : `✗ Yanlış cevap. Doğru cevap: ${q.type === "numeric" ? q.answer + (q.unit ? " " + q.unit : "") : q.options[q.answerIndex]}`
                : ""
            }
          </div>
          <div id="sol-${q.id}" class="solution-box hidden">
            <strong>Adım Adım Çözüm:</strong>
            <ol class="step-list">
              ${q.solutionSteps.map((s) => `<li>${s}</li>`).join("")}
            </ol>
            <div class="callout tip" style="margin-bottom:0">
              <strong>Veri Bilimi Notu:</strong> ${q.dsNote}
            </div>
          </div>
        </div>
      `;
      })
      .join("");

    // Bind events
    container.querySelectorAll(".check-num-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const qid = btn.dataset.qid;
        const q = topic.questions.find((x) => x.id === qid);
        const val = parseFloat(document.getElementById(`num-${qid}`).value);
        if (Number.isNaN(val)) {
          alert("Lütfen geçerli bir sayı girin.");
          return;
        }
        const tol = q.tolerance ?? 0.01;
        const isCorrect = Math.abs(val - q.answer) <= tol;
        state.questionStatus[qid] = { answered: true, correct: isCorrect, userAnswer: val };
        saveState();
        updateProgressUI();
        renderQuestions(container, topic);
        renderMath(container);
      });
    });

    container.querySelectorAll(".check-mcq-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const qid = btn.dataset.qid;
        const q = topic.questions.find((x) => x.id === qid);
        const checked = container.querySelector(`input[name="mcq-${qid}"]:checked`);
        if (!checked) {
          alert("Lütfen bir seçenek işaretleyin.");
          return;
        }
        const chosen = parseInt(checked.value, 10);
        const isCorrect = chosen === q.answerIndex;
        state.questionStatus[qid] = { answered: true, correct: isCorrect, userAnswer: chosen };
        saveState();
        updateProgressUI();
        renderQuestions(container, topic);
        renderMath(container);
      });
    });

    container.querySelectorAll(".toggle-sol-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const sol = document.getElementById(`sol-${btn.dataset.qid}`);
        sol.classList.toggle("hidden");
        renderMath(sol);
      });
    });
  }

  // ==========================================
  // INTERAKTIF LABORATUVARLAR (19 KONU)
  // ==========================================
  function renderLab(container, labId) {
    if (labId === "lab-descriptive") {
      container.innerHTML = `
        <div class="card">
          <h3>🧪 Betimsel İstatistik &amp; Aykırı Değer Laboratuvarı</h3>
          <p>Aşağıdaki sayıları değiştirin (ör. sona büyük bir aykırı değer ekleyin) ve Ortalama vs. Medyan farkını canlı görün:</p>
          <div class="lab-control">
            <label>Veri Seti (virgülle ayırın):</label>
            <input type="text" id="descInput" value="30, 32, 35, 38, 40, 42, 215" />
          </div>
          <div class="lab-output" id="descOut"></div>
        </div>
      `;
      const calc = () => {
        const arr = document.getElementById("descInput").value.split(",").map((x) => parseFloat(x.trim())).filter((x) => !Number.isNaN(x)).sort((a, b) => a - b);
        if (arr.length < 2) return;
        const n = arr.length;
        const mean = arr.reduce((a, b) => a + b, 0) / n;
        const medianOf = (a) => (a.length % 2 ? a[(a.length - 1) / 2] : (a[a.length / 2 - 1] + a[a.length / 2]) / 2);
        const med = medianOf(arr);
        const variance = arr.reduce((a, b) => a + (b - mean) ** 2, 0) / (n - 1);
        const std = Math.sqrt(variance);
        const half = Math.floor(n / 2);
        const q1 = medianOf(arr.slice(0, half));
        const q3 = medianOf(arr.slice(n % 2 ? half + 1 : half));
        const iqr = q3 - q1;
        const upper = q3 + 1.5 * iqr;
        const outliers = arr.filter((x) => x < q1 - 1.5 * iqr || x > upper);
        document.getElementById("descOut").innerHTML = `
          <div class="lab-metrics">
            <div class="metric-box"><div class="metric-label">Ortalama</div><div class="metric-val">${mean.toFixed(2)}</div></div>
            <div class="metric-box"><div class="metric-label">Medyan</div><div class="metric-val">${med.toFixed(2)}</div></div>
            <div class="metric-box"><div class="metric-label">Std Sapma (s)</div><div class="metric-val">${std.toFixed(2)}</div></div>
            <div class="metric-box"><div class="metric-label">IQR (Q3-Q1)</div><div class="metric-val">${iqr.toFixed(2)}</div></div>
          </div>
          <p style="margin:0; font-size:13.5px;">Üst Aykırı Sınırı: <strong>${upper.toFixed(2)}</strong> | Tespit Edilen Aykırı Değerler: <strong>${outliers.length ? outliers.join(", ") : "Yok"}</strong></p>
        `;
      };
      document.getElementById("descInput").addEventListener("input", calc);
      calc();
      return;
    }

    if (labId === "lab-simpson") {
      container.innerHTML = `
        <div class="card">
          <h3>🧪 Simpson Paradoksu Simülatörü</h3>
          <p>Alt gruplarda A her zaman B'den iyi (%90 > %85 ve %20 > %15) iken grup ağırlıklarını değiştirerek toplam sonucun nasıl tersine döndüğünü görün:</p>
          <div class="lab-grid">
            <div class="lab-control"><label>A Grubu Ağır Vaka Sayısı: <span id="sAVal">300</span></label><input type="range" id="sA" min="50" max="500" value="300" /></div>
            <div class="lab-control"><label>B Grubu Hafif Vaka Sayısı: <span id="sBVal">300</span></label><input type="range" id="sB" min="50" max="500" value="300" /></div>
          </div>
          <div class="lab-output" id="simpsonOut"></div>
        </div>
      `;
      const calc = () => {
        const aHeavy = +document.getElementById("sA").value;
        const bLight = +document.getElementById("sB").value;
        document.getElementById("sAVal").textContent = aHeavy;
        document.getElementById("sBVal").textContent = bLight;
        const aLight = 100, bHeavy = 100;
        const aTotal = ((0.9 * aLight + 0.2 * aHeavy) / (aLight + aHeavy)) * 100;
        const bTotal = ((0.85 * bLight + 0.15 * bHeavy) / (bLight + bHeavy)) * 100;
        document.getElementById("simpsonOut").innerHTML = `
          <div class="lab-metrics">
            <div class="metric-box"><div class="metric-label">A Toplam Başarı</div><div class="metric-val">%${aTotal.toFixed(1)}</div></div>
            <div class="metric-box"><div class="metric-label">B Toplam Başarı</div><div class="metric-val">%${bTotal.toFixed(1)}</div></div>
          </div>
          <p style="margin:0; font-size:13.5px;">${bTotal > aTotal ? "⚠️ <strong>Simpson Paradoksu Aktif!</strong> Alt gruplarda A daha iyi olmasına rağmen toplamda B önde görünüyor." : "✓ Şu an toplamda da A önde."}</p>
        `;
      };
      document.getElementById("sA").addEventListener("input", calc);
      document.getElementById("sB").addEventListener("input", calc);
      calc();
      return;
    }

    if (labId === "lab-bayes") {
      container.innerHTML = `
        <div class="card">
          <h3>🧪 Bayes Teoremi &amp; Baz Oran Hesaplayıcı</h3>
          <div class="lab-grid">
            <div class="lab-control"><label>Baz Oran P(H) %: <span id="bPriorV">1</span>%</label><input type="range" id="bPrior" min="0.5" max="50" step="0.5" value="1" /></div>
            <div class="lab-control"><label>Duyarlılık P(+|H) %: <span id="bSensV">90</span>%</label><input type="range" id="bSens" min="50" max="99" value="90" /></div>
            <div class="lab-control"><label>Yanlış Alarm P(+|Hᶜ) %: <span id="bFpV">5</span>%</label><input type="range" id="bFp" min="1" max="30" value="5" /></div>
          </div>
          <div class="lab-output" id="bayesOut"></div>
        </div>
      `;
      const calc = () => {
        const pH = +document.getElementById("bPrior").value / 100;
        const sens = +document.getElementById("bSens").value / 100;
        const fp = +document.getElementById("bFp").value / 100;
        document.getElementById("bPriorV").textContent = (pH * 100).toFixed(1);
        document.getElementById("bSensV").textContent = (sens * 100).toFixed(0);
        document.getElementById("bFpV").textContent = (fp * 100).toFixed(0);
        const pPos = sens * pH + fp * (1 - pH);
        const post = (sens * pH) / pPos;
        document.getElementById("bayesOut").innerHTML = `
          <div class="lab-metrics">
            <div class="metric-box"><div class="metric-label">Toplam Alarm P(+)</div><div class="metric-val">%${(pPos * 100).toFixed(2)}</div></div>
            <div class="metric-box"><div class="metric-label">Gerçek Olasılık P(H|+)</div><div class="metric-val">%${(post * 100).toFixed(2)}</div></div>
          </div>
        `;
      };
      ["bPrior", "bSens", "bFp"].forEach((id) => document.getElementById(id).addEventListener("input", calc));
      calc();
      return;
    }

    if (labId === "lab-normal") {
      container.innerHTML = `
        <div class="card">
          <h3>🧪 Normal Dağılım &amp; Z-Skoru Görselleştirici</h3>
          <div class="lab-grid">
            <div class="lab-control"><label>Ortalama (μ):</label><input type="number" id="nMu" value="70" /></div>
            <div class="lab-control"><label>Std Sapma (σ):</label><input type="number" id="nSig" min="1" value="10" /></div>
            <div class="lab-control"><label>Gözlem (x):</label><input type="number" id="nX" value="85" /></div>
          </div>
          <div class="lab-output" id="normOut"></div>
          <canvas id="normCanvas" class="lab-canvas" width="600" height="200" style="margin-top:12px;"></canvas>
        </div>
      `;
      const draw = () => {
        const mu = +document.getElementById("nMu").value || 0;
        const sig = Math.max(0.1, +document.getElementById("nSig").value || 1);
        const x = +document.getElementById("nX").value || 0;
        const z = (x - mu) / sig;
        document.getElementById("normOut").innerHTML = `<div class="lab-metrics"><div class="metric-box"><div class="metric-label">Z-Skoru</div><div class="metric-val">${z.toFixed(2)}</div></div></div>`;
        const cvs = document.getElementById("normCanvas");
        const ctx = cvs.getContext("2d");
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        ctx.strokeStyle = "#2563eb";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let px = 0; px <= cvs.width; px++) {
          const zVal = -4 + (px / cvs.width) * 8;
          const yVal = Math.exp(-0.5 * zVal * zVal);
          const py = 180 - yVal * 150;
          if (px === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
        const markerX = Math.max(5, Math.min(cvs.width - 5, ((z + 4) / 8) * cvs.width));
        ctx.strokeStyle = "#dc2626";
        ctx.beginPath();
        ctx.moveTo(markerX, 15);
        ctx.lineTo(markerX, 185);
        ctx.stroke();
      };
      ["nMu", "nSig", "nX"].forEach((id) => document.getElementById(id).addEventListener("input", draw));
      draw();
      return;
    }

    if (labId === "lab-clt") {
      container.innerHTML = `
        <div class="card">
          <h3>🧪 Merkezi Limit Teoremi (CLT) Simülatörü</h3>
          <p>Sağa aşırı çarpık bir Üstel dağılımdan $n$ boyutlu örneklemler çekip 1000 kez ortalamasını alarak Normal dağılıma yaklaşımı gözlemleyin:</p>
          <div class="lab-grid">
            <div class="lab-control"><label>Örneklem Büyüklüğü (n): <span id="cltNV">30</span></label><input type="range" id="cltN" min="1" max="100" value="30" /></div>
            <div class="lab-control" style="display:flex;align-items:flex-end;"><button class="btn-primary" id="cltRun">1000 Örneklem Çek</button></div>
          </div>
          <canvas id="cltCanvas" class="lab-canvas" width="600" height="210"></canvas>
        </div>
      `;
      const run = () => {
        const n = +document.getElementById("cltN").value;
        document.getElementById("cltNV").textContent = n;
        const means = [];
        for (let i = 0; i < 1000; i++) {
          let s = 0;
          for (let j = 0; j < n; j++) s += -Math.log(1 - Math.random());
          means.push(s / n);
        }
        drawHistogram("cltCanvas", means, 22, "#2563eb");
      };
      document.getElementById("cltN").addEventListener("input", run);
      document.getElementById("cltRun").addEventListener("click", run);
      run();
      return;
    }

    if (labId === "lab-bootstrap") {
      container.innerHTML = `
        <div class="card">
          <h3>🧪 Canlı Bootstrap %95 Güven Aralığı Simülatörü</h3>
          <div class="lab-control"><label>Örneklem Verisi (virgülle):</label><input type="text" id="bootIn" value="12, 15, 14, 19, 22, 18, 25, 31, 16, 20" /></div>
          <button class="btn-primary btn-sm" id="bootRun" style="margin-top:10px;">1000 Bootstrap Çalıştır</button>
          <div class="lab-output" id="bootOut"></div>
          <canvas id="bootCanvas" class="lab-canvas" width="600" height="190" style="margin-top:12px;"></canvas>
        </div>
      `;
      const run = () => {
        const arr = document.getElementById("bootIn").value.split(",").map((x) => parseFloat(x.trim())).filter((x) => !Number.isNaN(x));
        if (arr.length < 2) return;
        const boots = [];
        for (let b = 0; b < 1000; b++) {
          let sum = 0;
          for (let i = 0; i < arr.length; i++) sum += arr[Math.floor(Math.random() * arr.length)];
          boots.push(sum / arr.length);
        }
        const sorted = [...boots].sort((a, b) => a - b);
        const lo = sorted[24];
        const hi = sorted[974];
        document.getElementById("bootOut").innerHTML = `<strong>%95 Bootstrap Güven Aralığı (Ortalama):</strong> [${lo.toFixed(2)}, ${hi.toFixed(2)}]`;
        drawHistogram("bootCanvas", boots, 20, "#059669");
      };
      document.getElementById("bootRun").addEventListener("click", run);
      run();
      return;
    }

    if (labId === "lab-bayesian") {
      container.innerHTML = `
        <div class="card">
          <h3>🧪 Beta-Binom Sonsal Güncelleyici</h3>
          <div class="lab-grid">
            <div class="lab-control"><label>Önsel α:</label><input type="number" id="byA" min="1" value="2" /></div>
            <div class="lab-control"><label>Önsel β:</label><input type="number" id="byB" min="1" value="8" /></div>
            <div class="lab-control"><label>Başarı (k):</label><input type="number" id="byK" min="0" value="4" /></div>
            <div class="lab-control"><label>Toplam Deneme (n):</label><input type="number" id="byN" min="1" value="10" /></div>
          </div>
          <div class="lab-output" id="byOut"></div>
        </div>
      `;
      const calc = () => {
        const a = Math.max(1, +document.getElementById("byA").value || 1);
        const b = Math.max(1, +document.getElementById("byB").value || 1);
        const n = Math.max(1, +document.getElementById("byN").value || 1);
        const k = Math.min(n, Math.max(0, +document.getElementById("byK").value || 0));
        const aPost = a + k;
        const bPost = b + (n - k);
        const priorMean = a / (a + b);
        const postMean = aPost / (aPost + bPost);
        document.getElementById("byOut").innerHTML = `
          <div class="lab-metrics">
            <div class="metric-box"><div class="metric-label">Önsel Ortalama</div><div class="metric-val">%${(priorMean * 100).toFixed(1)}</div></div>
            <div class="metric-box"><div class="metric-label">Posterior Beta(α, β)</div><div class="metric-val">Beta(${aPost}, ${bPost})</div></div>
            <div class="metric-box"><div class="metric-label">Sonsal Beklenen Oran</div><div class="metric-val">%${(postMean * 100).toFixed(1)}</div></div>
          </div>
        `;
      };
      ["byA", "byB", "byK", "byN"].forEach((id) => document.getElementById(id).addEventListener("input", calc));
      calc();
      return;
    }

    // Diğer tüm konular için temiz çok amaçlı hesaplayıcılar
    const genericLabs = {
      "lab-corr": {
        title: "Kovaryans ve Pearson Korelasyon Hesaplayıcı",
        fields: [
          { id: "cX", label: "X Değerleri (virgülle)", type: "text", val: "1, 2, 3, 4, 5" },
          { id: "cY", label: "Y Değerleri (virgülle)", type: "text", val: "2, 4, 5, 4, 6" }
        ],
        compute: (v) => {
          const x = v.cX.split(",").map(Number).filter((n) => !Number.isNaN(n));
          const y = v.cY.split(",").map(Number).filter((n) => !Number.isNaN(n));
          const n = Math.min(x.length, y.length);
          if (n < 2) return "En az 2 çift girin.";
          const mx = x.slice(0, n).reduce((a, b) => a + b, 0) / n;
          const my = y.slice(0, n).reduce((a, b) => a + b, 0) / n;
          let num = 0, sx = 0, sy = 0;
          for (let i = 0; i < n; i++) {
            num += (x[i] - mx) * (y[i] - my);
            sx += (x[i] - mx) ** 2;
            sy += (y[i] - my) ** 2;
          }
          const cov = num / (n - 1);
          const r = num / Math.sqrt(sx * sy || 1);
          return `<strong>Cov(X, Y):</strong> ${cov.toFixed(3)} &nbsp;|&nbsp; <strong>Pearson r:</strong> ${r.toFixed(3)}`;
        }
      },
      "lab-estimators": {
        title: "Tahmin Edici MSE Ayrışımı (Bias² + Variance)",
        fields: [
          { id: "eBias", label: "Bias (Yanlılık)", type: "number", val: "2" },
          { id: "eVar", label: "Varyans", type: "number", val: "5" }
        ],
        compute: (v) => {
          const b = +v.eBias || 0, vr = +v.eVar || 0;
          return `<strong>Bias²:</strong> ${(b * b).toFixed(2)} &nbsp;|&nbsp; <strong>Toplam MSE:</strong> ${(b * b + vr).toFixed(2)}`;
        }
      },
      "lab-mle": {
        title: "Bernoulli Log-Likelihood Hesaplayıcı",
        fields: [
          { id: "mK", label: "Başarı Sayısı (k)", type: "number", val: "7" },
          { id: "mN", label: "Toplam Deneme (n)", type: "number", val: "10" },
          { id: "mP", label: "Aday Olasılık (p)", type: "number", val: "0.7" }
        ],
        compute: (v) => {
          const k = +v.mK, n = +v.mN, p = Math.min(0.999, Math.max(0.001, +v.mP));
          const ll = k * Math.log(p) + (n - k) * Math.log(1 - p);
          return `<strong>Log-Likelihood ℓ(p):</strong> ${ll.toFixed(3)} &nbsp;|&nbsp; <strong>Gerçek MLE (k/n):</strong> ${(k / n).toFixed(3)}`;
        }
      },
      "lab-hypothesis": {
        title: "Cohen's d &amp; Bonferroni Eşiği Hesaplayıcı",
        fields: [
          { id: "hM1", label: "Grup 1 Ortalama", type: "number", val: "85" },
          { id: "hM2", label: "Grup 2 Ortalama", type: "number", val: "75" },
          { id: "hS", label: "Havuz Std Sapma", type: "number", val: "20" },
          { id: "hM", label: "Test Sayısı (m)", type: "number", val: "20" }
        ],
        compute: (v) => {
          const d = ((+v.hM1) - (+v.hM2)) / (+v.hS || 1);
          const bonf = 0.05 / Math.max(1, +v.hM);
          return `<strong>Cohen's d:</strong> ${d.toFixed(2)} &nbsp;|&nbsp; <strong>Bonferroni α (0.05/m):</strong> ${bonf.toFixed(4)}`;
        }
      },
      "lab-missing": {
        title: "MNAR Yanlılık Simülatörü",
        fields: [
          { id: "msDolu", label: "Dolu Satır Sayısı", type: "number", val: "800" },
          { id: "msDoluOrt", label: "Dolu Ortalama", type: "number", val: "40000" },
          { id: "msBos", label: "Eksik Satır Sayısı", type: "number", val: "200" },
          { id: "msBosOrt", label: "Eksiklerin Gizli Ortalaması", type: "number", val: "90000" }
        ],
        compute: (v) => {
          const d = +v.msDolu, dO = +v.msDoluOrt, b = +v.msBos, bO = +v.msBosOrt;
          const realMean = (d * dO + b * bO) / (d + b);
          return `<strong>Gerçek Ortalama:</strong> ${realMean.toFixed(0)} &nbsp;|&nbsp; <strong>Ortalama Imputation Sonucu:</strong> ${dO} &nbsp;|&nbsp; <strong>Yanlılık:</strong> ${(dO - realMean).toFixed(0)}`;
        }
      },
      "lab-regression": {
        title: "VIF &amp; Odds Ratio Hesaplayıcı",
        fields: [
          { id: "rR2", label: "Yardımcı Regresyon R² (0-0.99)", type: "number", val: "0.80" },
          { id: "rBeta", label: "Lojistik Regresyon β Katsayısı", type: "number", val: "0.693" }
        ],
        compute: (v) => {
          const r2 = Math.min(0.99, Math.max(0, +v.rR2));
          const vif = 1 / (1 - r2);
          const or = Math.exp(+v.rBeta || 0);
          return `<strong>VIF:</strong> ${vif.toFixed(2)} ${vif > 5 ? "(⚠️ Yüksek)" : "(✓ Normal)"} &nbsp;|&nbsp; <strong>Odds Ratio (e^β):</strong> ${or.toFixed(3)}x`;
        }
      },
      "lab-biasvar": {
        title: "Toplam Hata = Bias² + Variance + Gürültü",
        fields: [
          { id: "bvB", label: "Bias", type: "number", val: "3" },
          { id: "bvV", label: "Variance", type: "number", val: "16" },
          { id: "bvN", label: "İndirgenemez Gürültü (σ²)", type: "number", val: "5" }
        ],
        compute: (v) => {
          const b = +v.bvB, vr = +v.bvV, n = +v.bvN;
          return `<strong>Bias²:</strong> ${b * b} &nbsp;|&nbsp; <strong>Toplam Beklenen Hata:</strong> ${(b * b + vr + n).toFixed(2)}`;
        }
      },
      "lab-abtest": {
        title: "A/B Testi Örneklem Büyüklüğü Hesaplayıcı (%80 Güç, α=0.05)",
        fields: [
          { id: "abP", label: "Mevcut Dönüşüm Oranı (0-1)", type: "number", val: "0.10" },
          { id: "abD", label: "Hedef Fark MDE (Δ)", type: "number", val: "0.02" }
        ],
        compute: (v) => {
          const p = +v.abP, d = Math.max(0.001, +v.abD);
          const n = Math.ceil((16 * p * (1 - p)) / (d * d));
          return `<strong>Grup Başına Gereken Kullanıcı:</strong> ~${n.toLocaleString("tr-TR")} (Toplam: ~${(2 * n).toLocaleString("tr-TR")})`;
        }
      },
      "lab-entropy": {
        title: "İkili Entropi, Cross-Entropy ve KL Iraksaması (log₂)",
        fields: [
          { id: "enP", label: "Gerçek Olasılık P(1)", type: "number", val: "0.8" },
          { id: "enQ", label: "Model Tahmini Q(1)", type: "number", val: "0.5" }
        ],
        compute: (v) => {
          const p = Math.min(0.999, Math.max(0.001, +v.enP));
          const q = Math.min(0.999, Math.max(0.001, +v.enQ));
          const hp = -(p * Math.log2(p) + (1 - p) * Math.log2(1 - p));
          const hpq = -(p * Math.log2(q) + (1 - p) * Math.log2(1 - q));
          const kl = hpq - hp;
          return `<strong>H(P):</strong> ${hp.toFixed(3)} bit &nbsp;|&nbsp; <strong>Cross-Entropy H(P,Q):</strong> ${hpq.toFixed(3)} bit &nbsp;|&nbsp; <strong>KL(P||Q):</strong> ${kl.toFixed(3)} bit`;
        }
      },
      "lab-pca": {
        title: "PCA Açıklanan Varyans Hesaplayıcı",
        fields: [
          { id: "pEig", label: "Özdeğerler λ (virgülle)", type: "text", val: "4.5, 2.5, 0.7, 0.3" }
        ],
        compute: (v) => {
          const arr = v.pEig.split(",").map(Number).filter((n) => !Number.isNaN(n) && n >= 0);
          const tot = arr.reduce((a, b) => a + b, 0) || 1;
          return arr.map((val, i) => `PC${i + 1}: %${((val / tot) * 100).toFixed(1)}`).join(" &nbsp;|&nbsp; ");
        }
      },
      "lab-causal": {
        title: "Difference-in-Differences (DiD) Hesaplayıcı",
        fields: [
          { id: "dT0", label: "Müdahale Öncesi", type: "number", val: "100" },
          { id: "dT1", label: "Müdahale Sonrası", type: "number", val: "135" },
          { id: "dC0", label: "Kontrol Öncesi", type: "number", val: "80" },
          { id: "dC1", label: "Kontrol Sonrası", type: "number", val: "95" }
        ],
        compute: (v) => {
          const dt = (+v.dT1) - (+v.dT0);
          const dc = (+v.dC1) - (+v.dC0);
          return `<strong>Müdahale Farkı:</strong> ${dt} &nbsp;|&nbsp; <strong>Kontrol Farkı:</strong> ${dc} &nbsp;|&nbsp; <strong>Net DiD Etkisi:</strong> ${dt - dc}`;
        }
      },
      "lab-timeseries": {
        title: "Zaman Serisi Tahmin Metrikleri (MAE, RMSE, MAPE)",
        fields: [
          { id: "tsY", label: "Gerçek Değerler (virgülle)", type: "text", val: "100, 150, 200" },
          { id: "tsYh", label: "Tahminler (virgülle)", type: "text", val: "90, 150, 220" }
        ],
        compute: (v) => {
          const y = v.tsY.split(",").map(Number).filter((n) => !Number.isNaN(n));
          const yh = v.tsYh.split(",").map(Number).filter((n) => !Number.isNaN(n));
          const n = Math.min(y.length, yh.length);
          if (!n) return "Veri girin.";
          let mae = 0, mse = 0, mape = 0;
          for (let i = 0; i < n; i++) {
            const e = Math.abs(y[i] - yh[i]);
            mae += e;
            mse += e * e;
            if (y[i] !== 0) mape += e / Math.abs(y[i]);
          }
          return `<strong>MAE:</strong> ${(mae / n).toFixed(2)} &nbsp;|&nbsp; <strong>RMSE:</strong> ${Math.sqrt(mse / n).toFixed(2)} &nbsp;|&nbsp; <strong>MAPE:</strong> %${((mape / n) * 100).toFixed(1)}`;
        }
      }
    };

    const g = genericLabs[labId];
    if (g) {
      container.innerHTML = `
        <div class="card">
          <h3>🧪 ${g.title}</h3>
          <div class="lab-grid">
            ${g.fields
              .map(
                (f) => `
              <div class="lab-control">
                <label>${f.label}</label>
                <input type="${f.type}" step="any" id="${f.id}" value="${f.val}" />
              </div>
            `
              )
              .join("")}
          </div>
          <div class="lab-output" id="genLabOut"></div>
        </div>
      `;
      const update = () => {
        const vals = {};
        g.fields.forEach((f) => (vals[f.id] = document.getElementById(f.id).value));
        document.getElementById("genLabOut").innerHTML = g.compute(vals);
      };
      g.fields.forEach((f) => document.getElementById(f.id).addEventListener("input", update));
      update();
    }
  }

  function drawHistogram(canvasId, values, bins, color) {
    const cvs = document.getElementById(canvasId);
    if (!cvs || !values.length) return;
    const ctx = cvs.getContext("2d");
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = max - min || 1;
    const counts = new Array(bins).fill(0);
    values.forEach((v) => {
      const idx = Math.min(bins - 1, Math.floor(((v - min) / span) * bins));
      counts[idx]++;
    });
    const maxC = Math.max(...counts) || 1;
    const w = (cvs.width - 20) / bins;
    ctx.fillStyle = color;
    counts.forEach((c, i) => {
      const h = (c / maxC) * (cvs.height - 30);
      ctx.fillRect(10 + i * w, cvs.height - 15 - h, w - 2, h);
    });
  }

  function renderAll() {
    applyTheme();
    updateProgressUI();
    renderNav();
    renderContent();
  }

  window.addEventListener("DOMContentLoaded", renderAll);
  if (document.readyState !== "loading") renderAll();
})();
