(() => {
  "use strict";

  const STORAGE_KEY = "agibot-shanghai-spatial-planner-v1";
  const categoryLabels = {
    brand: "Marke",
    product: "Produkt",
    intelligence: "Intelligenz",
    scenario: "Szenario",
    ecosystem: "Ökosystem",
    event: "Event",
    outdoor: "Outdoor",
    support: "Betrieb",
    circulation: "Flow",
  };

  const categoryGroups = {
    content: new Set(["brand", "product", "intelligence", "ecosystem"]),
    scenario: new Set(["scenario", "event", "outdoor"]),
    support: new Set(["support", "circulation"]),
  };

  const defaultState = {
    version: 1,
    activeFloor: "3F",
    selectedId: null,
    filter: "all",
    settings: {
      shapeLanguage: "soft",
      layoutPreset: "narrative",
      routeVisible: true,
      labelsVisible: true,
    },
    floors: {
      "3F": {
        targetArea: 2082.8,
        narrative: "Warum AgiBot? · Marke, Produkte und Systemkompetenz",
        image: "assets/shanghai-3f-plan.png",
        imageAlt: "Grundriss Shanghai, 3. Obergeschoss",
        recommendationTitle: "System vor Szenario",
        recommendationText:
          "Auf 3F erst Marke, Produktfamilien und die drei Intelligenzebenen erklären. Reale Anwendungen bilden den Übergang zu 4F.",
        zones: [
          zone("3f-arrival", "Ankommen · Welcome & Photo", 75, "brand", 1, 4, 29, 16, 10, "Begrüßung, Gruppenbildung, Welcome Screen und Fotomoment.", "Welcome Screen, Photo Area und Besucher-Sammlung vor dem narrativen Einstieg."),
          zone("3f-mission", "Mission · Unternehmen · Patente", 135, "brand", 2, 4, 42, 18, 12, "Mission, Entwicklung, globale Positionierung und Patentwand.", "Company Introduction, Mission, Milestones und digital ergänzbare Patentdarstellung."),
          zone("3f-product", "Produktfamilien & Core Components", 210, "product", 3, 4, 57, 20, 15, "A3U, G2, X2, D2, Gelenksensorik und Dexterous Hand.", "Vollständige Produktfamilien plus Reserve für etwa zwei neue Produkte."),
          zone("3f-motion", "Motion Intelligence", 155, "intelligence", 4, 5, 76, 20, 12, "Dynamische Demonstrationen oder wechselnde Sport- und Bewegungsmedien.", "Sichere Live-Demo oder Screen-Alternative; Outdoor-Demo kann angebunden werden."),
          zone("3f-interaction", "Interaction Intelligence", 110, "intelligence", 5, 27, 82, 15, 10, "Multimedia-Erklärung mit direkter Mensch-Roboter-Interaktion.", "Interaktion am realen Roboter mit klarer Sicherheits- und Besuchergrenze."),
          zone("3f-task", "Task Intelligence & Me-Go", 125, "intelligence", 6, 44, 82, 16, 10, "Task-Demo, Me-Go Datenerfassung, Tisch und Video/PPT.", "Task Intelligence Demo inklusive 1.400 × 700 mm Tisch und Medienfläche."),
          zone("3f-aima", "AIMA Technology Ecosystem", 145, "ecosystem", 7, 51, 66, 16, 12, "Lingqu, Lingxin, Lingchuang und Jingling als verbundenes System.", "AIMA Gesamteinführung sowie vier Module mit Screen und Roboterdemonstration."),
          zone("3f-proof", "Deployment Proof", 155, "scenario", 8, 51, 49, 17, 13, "Industrie, Hotel, Retail Warehouse und Security als Anwendungsnachweis.", "Reale Daten, Cases und Betriebsbedingungen als Vertrauensbeweis."),
          zone("3f-qiyuan", "Qiyuan Companion Home", 90, "scenario", 9, 52, 33, 15, 11, "Wohnliche Szene für Q1 und T1 mit Bewegung, Interaktion und Tanz.", "Home-like Scenario mit zwei Robotern und ausreichender Bewegungsfläche."),
          zone("3f-ecosystem", "Commercial Ecosystem", 80, "ecosystem", 10, 35, 23, 15, 9, "Plan A, A-Chain, kommerzielle Partner und Partnernetzwerk.", "Venture-, Supply-Chain- und Partnerökosystem als skalierbares Medienmodul."),
          zone("3f-office", "Office · 20 Personen", 120, "support", null, 26, 32, 12, 9, "Arbeitsbereich für rund 20 Personen.", "Der Brief verlangt im 3F-Ausstellungsbereich ein Büro für etwa 20 Personen."),
          zone("3f-storage", "Storage", 100, "support", null, 21, 18, 12, 8, "Lager für Betrieb, Wechselmodule und Showroom-Equipment.", "Der Brief nennt ca. 100 m² Lagerfläche auf 3F."),
          zone("3f-flow", "Transition · Safety · Charging", 130.7, "circulation", null, 26, 52, 20, 9, "Puffer für Besucherfluss, sichere Demoabstände und Ladeinfrastruktur.", "Planungsreserve für Zirkulation, Demonstrationsgrenzen und Ladepunkte."),
          zone("3f-hall", "Multifunction Hall", 190.5, "event", 11, 71, 72, 24, 18, "Meeting, Signing, Temporary Exhibition und Standing Buffet.", "Möbelwechsel, AV, Stauraum und direkte Empfangsanbindung an den Showroom."),
          zone("3f-terrace", "Outdoor Terrace · Multi-Terrain", 261.6, "outdoor", 12, 70, 14, 24, 18, "Pause und Multi-Terrain-Demo für quadrupede Roboter.", "261,6 m² Terrasse für Erholung, Outdoor-Demo, Technik und Wartungszugang."),
        ],
      },
      "4F": {
        targetArea: 1632.4,
        narrative: "Wohin geht AgiBot? · Deployment-State Scenario Innovation Centre",
        image: "assets/shanghai-4f-plan.png",
        imageAlt: "Grundriss Shanghai, 4. Obergeschoss",
        recommendationTitle: "Szenarien als austauschbare Module",
        recommendationText:
          "4F sollte reale Arbeitsabläufe immersiv zeigen. Energie, Daten, Medien und Sicherheitsgrenzen werden als wiederverwendbare Infrastruktur geplant.",
        zones: [
          zone("4f-arrival", "Arrival · Scenario Briefing", 90, "brand", 1, 39, 5, 22, 9, "Übergang von 3F in die Welt realer Einsatzszenarien.", "Klare Orientierung und Briefing vor dynamischen Demonstrationen."),
          zone("4f-industrial", "Industrial Handling", 235, "scenario", 2, 8, 17, 20, 15, "Industrielles Handling und Materialbewegung.", "Immersive Deployment-State-Szene mit realen Betriebsbedingungen."),
          zone("4f-logistics", "Logistics Sorting", 180, "scenario", 3, 30, 18, 18, 13, "Logistiksortierung und Materialfluss.", "Flexible Szene für Sortierung, Übergaben und skalierbare Workflows."),
          zone("4f-production", "Production Line Loading", 180, "scenario", 4, 51, 18, 20, 14, "Be- und Entladung einer Produktionslinie.", "Reale Taktung, sichere Besucherpositionen und sichtbare Systemkoordination."),
          zone("4f-sports", "Sports Competition", 150, "scenario", 5, 73, 29, 18, 14, "Sportliche Bewegungs- und Performance-Szenarien.", "Wechselnde Sportformate und dynamische Demonstrationen."),
          zone("4f-cleaning", "Industrial & Commercial Cleaning", 150, "scenario", 6, 73, 47, 18, 14, "Industrielle und gewerbliche Reinigung.", "Nachvollziehbarer Arbeitsablauf mit Betriebs-, Lade- und Wartungslogik."),
          zone("4f-security", "Security Patrol", 130, "scenario", 7, 72, 65, 18, 13, "Autonome Patrouille und Inspektion.", "Live-Demo oder Medienalternative; Schnittstelle zu Outdoor-Livefeeds möglich."),
          zone("4f-retail", "Retail Service Station", 140, "scenario", 8, 51, 79, 19, 12, "Retail Service, Guidance und Kundeninteraktion.", "Kommerzielles Szenario mit verständlicher Kundenreise und Serviceübergaben."),
          zone("4f-culture", "Culture & Tourism", 140, "scenario", 9, 29, 79, 19, 12, "Kultur-, Tourismus- und Hospitality-Anwendungen.", "Emotionales Besuchererlebnis und flexible Content-Erneuerung."),
          zone("4f-lab", "Scenario Innovation Lab", 107.4, "intelligence", 10, 8, 65, 18, 12, "Zukünftige Branchen, Workflows und wechselnde Pilotanwendungen.", "Minimal austauschbare Content-Einheit und wiederverwendbare Schnittstellen."),
          zone("4f-storage", "Storage", 50, "support", null, 9, 48, 15, 10, "Lager für Szenariomodule und Betriebsmittel.", "Der Brief nennt ca. 50 m² Lagerfläche auf 4F."),
          zone("4f-flow", "Flexible Flow & Safety", 80, "circulation", null, 31, 91, 38, 5, "Flexible Besucherführung, Demoabstände und Ladepunkte.", "Planungsreserve für einen anpassbaren, sicheren Szenarioparcours."),
        ],
      },
    },
  };

  const els = {
    floorTabs: [...document.querySelectorAll(".floor-tab")],
    zoneList: document.querySelector("#zoneList"),
    zoneLayer: document.querySelector("#zoneLayer"),
    routeLayer: document.querySelector("#routeLayer"),
    routeLine: document.querySelector("#routeLine"),
    planFrame: document.querySelector("#planFrame"),
    planStage: document.querySelector("#planStage"),
    floorPlan: document.querySelector("#floorPlan"),
    targetArea: document.querySelector("#targetArea"),
    plannedArea: document.querySelector("#plannedArea"),
    areaDelta: document.querySelector("#areaDelta"),
    areaProgress: document.querySelector("#areaProgress"),
    floorBadge: document.querySelector("#floorBadge"),
    floorNarrative: document.querySelector("#floorNarrative"),
    flowScore: document.querySelector("#flowScore"),
    saveStatus: document.querySelector("#saveStatus"),
    layoutStatus: document.querySelector("#layoutStatus"),
    layoutPreset: document.querySelector("#layoutPreset"),
    shapeLanguage: document.querySelector("#shapeLanguage"),
    routeToggle: document.querySelector("#routeToggle"),
    labelToggle: document.querySelector("#labelToggle"),
    generateButton: document.querySelector("#generateButton"),
    addZoneButton: document.querySelector("#addZoneButton"),
    deleteZoneButton: document.querySelector("#deleteZoneButton"),
    duplicateZoneButton: document.querySelector("#duplicateZoneButton"),
    exportButton: document.querySelector("#exportButton"),
    importInput: document.querySelector("#importInput"),
    resetButton: document.querySelector("#resetButton"),
    undoButton: document.querySelector("#undoButton"),
    redoButton: document.querySelector("#redoButton"),
    emptyInspector: document.querySelector("#emptyInspector"),
    zoneForm: document.querySelector("#zoneForm"),
    zoneName: document.querySelector("#zoneName"),
    zoneArea: document.querySelector("#zoneArea"),
    zoneCategory: document.querySelector("#zoneCategory"),
    zoneDescription: document.querySelector("#zoneDescription"),
    zoneSequence: document.querySelector("#zoneSequence"),
    zoneShape: document.querySelector("#zoneShape"),
    zoneColor: document.querySelector("#zoneColor"),
    zoneRequirement: document.querySelector("#zoneRequirement"),
    recommendationTitle: document.querySelector("#recommendationTitle"),
    recommendationText: document.querySelector("#recommendationText"),
    filterChips: [...document.querySelectorAll(".filter-chip")],
    toast: document.querySelector("#toast"),
  };

  let state = loadState();
  let history = [];
  let future = [];
  let dragSession = null;
  let toastTimer = null;

  function zone(id, name, area, category, sequence, x, y, w, h, description, requirement) {
    return {
      id,
      name,
      area,
      category,
      sequence,
      x,
      y,
      w,
      h,
      shape: "inherit",
      color: categoryColor(category),
      description,
      requirement,
    };
  }

  function categoryColor(category) {
    return {
      brand: "#785cff",
      product: "#2f7dff",
      intelligence: "#00a7a5",
      scenario: "#ff8a3d",
      ecosystem: "#bc5de8",
      event: "#e94794",
      outdoor: "#4eb473",
      support: "#737984",
      circulation: "#c69c48",
    }[category] || "#785cff";
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved?.version === 1 && saved.floors?.["3F"] && saved.floors?.["4F"]) return saved;
    } catch (error) {
      console.warn("Gespeicherte Planung konnte nicht gelesen werden.", error);
    }
    return clone(defaultState);
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    els.saveStatus.textContent = "Lokal gespeichert";
  }

  function activeFloor() {
    return state.floors[state.activeFloor];
  }

  function activeZones() {
    return activeFloor().zones;
  }

  function selectedZone() {
    return activeZones().find((item) => item.id === state.selectedId) || null;
  }

  function snapshot() {
    return clone(state);
  }

  function pushHistory(previous = snapshot()) {
    history.push(previous);
    if (history.length > 60) history.shift();
    future = [];
    updateUndoButtons();
  }

  function undo() {
    if (!history.length) return;
    future.push(snapshot());
    state = history.pop();
    render();
    saveState();
    showToast("Änderung rückgängig");
  }

  function redo() {
    if (!future.length) return;
    history.push(snapshot());
    state = future.pop();
    render();
    saveState();
    showToast("Änderung wiederholt");
  }

  function updateUndoButtons() {
    els.undoButton.disabled = history.length === 0;
    els.redoButton.disabled = future.length === 0;
  }

  function formatArea(value) {
    return new Intl.NumberFormat("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value);
  }

  function render() {
    const floor = activeFloor();
    els.floorTabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.floor === state.activeFloor));
    els.floorPlan.src = floor.image;
    els.floorPlan.alt = floor.imageAlt;
    els.floorBadge.textContent = state.activeFloor;
    els.floorNarrative.textContent = floor.narrative;
    els.recommendationTitle.textContent = floor.recommendationTitle;
    els.recommendationText.textContent = floor.recommendationText;
    els.layoutPreset.value = state.settings.layoutPreset;
    els.shapeLanguage.value = state.settings.shapeLanguage;
    els.planFrame.className = `plan-frame shape-${state.settings.shapeLanguage}`;
    els.planFrame.classList.toggle("route-hidden", !state.settings.routeVisible);
    els.planFrame.classList.toggle("labels-hidden", !state.settings.labelsVisible);
    setToggle(els.routeToggle, state.settings.routeVisible);
    setToggle(els.labelToggle, state.settings.labelsVisible);
    renderZoneList();
    renderZones();
    renderInspector();
    renderAreaSummary();
    updateRoute();
    updateScore();
    updateUndoButtons();
    els.layoutStatus.textContent = `${presetLabel(state.settings.layoutPreset)} · ${activeZones().length} Zonen`;
    requestAnimationFrame(syncOverlayToImage);
  }

  function renderZoneList() {
    els.zoneList.innerHTML = "";
    activeZones().forEach((item) => {
      const visible = state.filter === "all" || categoryGroups[state.filter]?.has(item.category);
      const button = document.createElement("button");
      button.type = "button";
      button.className = `zone-list-item${item.id === state.selectedId ? " is-selected" : ""}${visible ? "" : " is-muted"}`;
      button.style.setProperty("--zone-color", item.color);
      button.innerHTML = `
        <span class="zone-dot"></span>
        <span class="zone-list-copy">
          <strong>${escapeHtml(item.name)}</strong>
          <small>${categoryLabels[item.category] || item.category}${item.sequence ? ` · Stop ${item.sequence}` : ""}</small>
        </span>
        <span class="zone-list-area">${formatArea(item.area)} m²</span>
      `;
      button.addEventListener("click", () => selectZone(item.id));
      els.zoneList.append(button);
    });
  }

  function renderZones() {
    els.zoneLayer.innerHTML = "";
    activeZones().forEach((item) => {
      const zoneEl = document.createElement("div");
      zoneEl.className = "zone";
      if (item.id === state.selectedId) zoneEl.classList.add("is-selected");
      if (item.shape && item.shape !== "inherit") zoneEl.classList.add(`shape-${item.shape}`);
      if (state.filter !== "all" && !categoryGroups[state.filter]?.has(item.category)) zoneEl.classList.add("is-dimmed");
      zoneEl.dataset.zoneId = item.id;
      zoneEl.style.left = `${item.x}%`;
      zoneEl.style.top = `${item.y}%`;
      zoneEl.style.width = `${item.w}%`;
      zoneEl.style.height = `${item.h}%`;
      zoneEl.style.setProperty("--zone-color", item.color);
      zoneEl.innerHTML = `
        <div class="zone-content">
          ${item.sequence ? `<span class="zone-sequence">${item.sequence}</span>` : ""}
          <span class="zone-name">${escapeHtml(item.name)}</span>
          <span class="zone-area">${formatArea(item.area)} m²</span>
        </div>
        ${item.id === state.selectedId ? '<span class="resize-handle" aria-hidden="true"></span>' : ""}
      `;
      zoneEl.addEventListener("pointerdown", beginZoneInteraction);
      zoneEl.addEventListener("click", (event) => {
        event.stopPropagation();
        selectZone(item.id);
      });
      els.zoneLayer.append(zoneEl);
    });
  }

  function renderInspector() {
    const item = selectedZone();
    els.emptyInspector.classList.toggle("is-hidden", Boolean(item));
    els.zoneForm.classList.toggle("is-hidden", !item);
    els.deleteZoneButton.disabled = !item;
    if (!item) return;
    els.zoneName.value = item.name;
    els.zoneArea.value = item.area;
    els.zoneCategory.value = item.category;
    els.zoneDescription.value = item.description || "";
    els.zoneSequence.value = item.sequence ?? 0;
    els.zoneShape.value = item.shape || "inherit";
    els.zoneColor.value = item.color;
    els.zoneRequirement.textContent = item.requirement || "Keine zusätzliche Anforderung hinterlegt.";
  }

  function renderAreaSummary() {
    const floor = activeFloor();
    const planned = activeZones().reduce((sum, item) => sum + Number(item.area || 0), 0);
    const delta = planned - floor.targetArea;
    const percent = Math.min(100, Math.max(0, (planned / floor.targetArea) * 100));
    els.targetArea.textContent = `${formatArea(floor.targetArea)} m²`;
    els.plannedArea.textContent = `${formatArea(planned)} m² geplant`;
    els.areaDelta.textContent = `${delta > 0 ? "+" : delta < 0 ? "−" : "±"} ${formatArea(Math.abs(delta))} m²`;
    els.areaDelta.style.color = Math.abs(delta) < 0.2 ? "var(--success)" : "var(--danger)";
    els.areaProgress.style.width = `${percent}%`;
  }

  function selectZone(id) {
    state.selectedId = id;
    renderZoneList();
    renderZones();
    renderInspector();
    updateRoute();
  }

  function setToggle(element, active) {
    element.classList.toggle("is-active", active);
    element.setAttribute("aria-pressed", String(active));
  }

  function beginZoneInteraction(event) {
    if (event.button !== 0) return;
    const zoneEl = event.currentTarget;
    const item = activeZones().find((zoneItem) => zoneItem.id === zoneEl.dataset.zoneId);
    if (!item) return;
    event.preventDefault();
    event.stopPropagation();
    if (state.selectedId !== item.id) selectZone(item.id);
    const isResize = event.target.classList.contains("resize-handle");
    const layerRect = els.zoneLayer.getBoundingClientRect();
    dragSession = {
      item,
      isResize,
      startX: event.clientX,
      startY: event.clientY,
      original: { x: item.x, y: item.y, w: item.w, h: item.h },
      layerRect,
      previous: snapshot(),
    };
    zoneEl.setPointerCapture(event.pointerId);
    zoneEl.addEventListener("pointermove", moveZoneInteraction);
    zoneEl.addEventListener("pointerup", endZoneInteraction, { once: true });
    zoneEl.addEventListener("pointercancel", endZoneInteraction, { once: true });
  }

  function moveZoneInteraction(event) {
    if (!dragSession) return;
    const dx = ((event.clientX - dragSession.startX) / dragSession.layerRect.width) * 100;
    const dy = ((event.clientY - dragSession.startY) / dragSession.layerRect.height) * 100;
    const { item, original, isResize } = dragSession;
    if (isResize) {
      item.w = clamp(roundHalf(original.w + dx), 5, 100 - item.x);
      item.h = clamp(roundHalf(original.h + dy), 5, 100 - item.y);
    } else {
      item.x = clamp(roundHalf(original.x + dx), 0, 100 - item.w);
      item.y = clamp(roundHalf(original.y + dy), 0, 100 - item.h);
    }
    updateZoneElement(item);
    updateRoute();
    updateScore();
    els.saveStatus.textContent = "Änderung offen";
  }

  function endZoneInteraction(event) {
    const target = event.currentTarget;
    target.removeEventListener("pointermove", moveZoneInteraction);
    if (dragSession) {
      pushHistory(dragSession.previous);
      dragSession = null;
      render();
      saveState();
    }
  }

  function updateZoneElement(item) {
    const element = els.zoneLayer.querySelector(`[data-zone-id="${cssEscape(item.id)}"]`);
    if (!element) return;
    element.style.left = `${item.x}%`;
    element.style.top = `${item.y}%`;
    element.style.width = `${item.w}%`;
    element.style.height = `${item.h}%`;
  }

  function updateRoute() {
    const points = activeZones()
      .filter((item) => Number(item.sequence) > 0)
      .sort((a, b) => a.sequence - b.sequence)
      .map((item) => `${roundHalf(item.x + item.w / 2)},${roundHalf(item.y + item.h / 2)}`);
    els.routeLine.setAttribute("points", points.join(" "));
  }

  function updateScore() {
    const zones = activeZones();
    let overlap = 0;
    for (let a = 0; a < zones.length; a += 1) {
      for (let b = a + 1; b < zones.length; b += 1) {
        overlap += overlapArea(zones[a], zones[b]);
      }
    }
    const route = zones.filter((item) => item.sequence).sort((a, b) => a.sequence - b.sequence);
    let routeDistance = 0;
    for (let index = 1; index < route.length; index += 1) {
      routeDistance += distance(route[index - 1], route[index]);
    }
    const score = Math.round(clamp(100 - overlap * 0.4 - Math.max(0, routeDistance - 160) * 0.11, 32, 98));
    els.flowScore.textContent = String(score);
    els.flowScore.style.color = score >= 80 ? "var(--success)" : score >= 62 ? "#f0bd5b" : "var(--danger)";
  }

  function overlapArea(a, b) {
    const width = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x));
    const height = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
    return width * height;
  }

  function distance(a, b) {
    const ax = a.x + a.w / 2;
    const ay = a.y + a.h / 2;
    const bx = b.x + b.w / 2;
    const by = b.y + b.h / 2;
    return Math.hypot(ax - bx, ay - by);
  }

  function generateLayout(preset) {
    const previous = snapshot();
    const zones = activeZones();
    const special = new Set(state.activeFloor === "3F" ? ["3f-hall", "3f-terrace"] : []);
    const movable = zones.filter((item) => !special.has(item.id));
    const bounds = state.activeFloor === "3F" ? { x: 4, y: 20, w: 63, h: 73 } : { x: 7, y: 5, w: 86, h: 89 };

    if (preset === "narrative") {
      const source = defaultState.floors[state.activeFloor].zones;
      zones.forEach((item) => {
        const original = source.find((candidate) => candidate.id === item.id);
        if (original) Object.assign(item, { x: original.x, y: original.y, w: original.w, h: original.h });
      });
    } else if (preset === "perimeter") {
      perimeterLayout(movable, bounds);
    } else if (preset === "islands") {
      gridLayout(movable, bounds, state.activeFloor === "3F" ? 3 : 4);
    } else if (preset === "hub") {
      hubLayout(movable, bounds);
    }

    if (state.activeFloor === "3F") {
      const hall = zones.find((item) => item.id === "3f-hall");
      const terrace = zones.find((item) => item.id === "3f-terrace");
      if (hall) Object.assign(hall, { x: 71, y: 72, w: 24, h: 18 });
      if (terrace) Object.assign(terrace, { x: 70, y: 14, w: 24, h: 18 });
    }

    state.settings.layoutPreset = preset;
    pushHistory(previous);
    render();
    saveState();
    showToast(`${presetLabel(preset)} angewendet`);
  }

  function perimeterLayout(zones, bounds) {
    const routeZones = [...zones].sort((a, b) => (a.sequence || 99) - (b.sequence || 99));
    const positions = perimeterPositions(routeZones.length, bounds);
    routeZones.forEach((item, index) => {
      const width = clamp(9 + Math.sqrt(item.area) * 0.46, 11, 21);
      const height = clamp(6 + Math.sqrt(item.area) * 0.28, 7, 14);
      item.w = width;
      item.h = height;
      item.x = clamp(positions[index].x - width / 2, bounds.x, bounds.x + bounds.w - width);
      item.y = clamp(positions[index].y - height / 2, bounds.y, bounds.y + bounds.h - height);
    });
  }

  function perimeterPositions(count, bounds) {
    const points = [];
    const perimeter = 2 * (bounds.w + bounds.h);
    for (let index = 0; index < count; index += 1) {
      let d = (index / count) * perimeter;
      if (d <= bounds.w) points.push({ x: bounds.x + d, y: bounds.y });
      else if ((d -= bounds.w) <= bounds.h) points.push({ x: bounds.x + bounds.w, y: bounds.y + d });
      else if ((d -= bounds.h) <= bounds.w) points.push({ x: bounds.x + bounds.w - d, y: bounds.y + bounds.h });
      else points.push({ x: bounds.x, y: bounds.y + bounds.h - (d - bounds.w) });
    }
    return points;
  }

  function gridLayout(zones, bounds, columns) {
    const gap = 2;
    const rows = Math.ceil(zones.length / columns);
    const cellW = (bounds.w - gap * (columns - 1)) / columns;
    const cellH = (bounds.h - gap * (rows - 1)) / rows;
    zones.forEach((item, index) => {
      const column = index % columns;
      const row = Math.floor(index / columns);
      item.x = roundHalf(bounds.x + column * (cellW + gap));
      item.y = roundHalf(bounds.y + row * (cellH + gap));
      item.w = roundHalf(cellW);
      item.h = roundHalf(cellH);
    });
  }

  function hubLayout(zones, bounds) {
    const sorted = [...zones].sort((a, b) => b.area - a.area);
    const hub = sorted[0];
    hub.w = 24;
    hub.h = 18;
    hub.x = bounds.x + bounds.w / 2 - hub.w / 2;
    hub.y = bounds.y + bounds.h / 2 - hub.h / 2;
    const satellites = sorted.slice(1);
    satellites.forEach((item, index) => {
      const angle = (Math.PI * 2 * index) / satellites.length - Math.PI / 2;
      const width = clamp(10 + Math.sqrt(item.area) * 0.35, 11, 18);
      const height = clamp(7 + Math.sqrt(item.area) * 0.2, 8, 13);
      const radiusX = bounds.w * 0.39;
      const radiusY = bounds.h * 0.39;
      item.w = width;
      item.h = height;
      item.x = clamp(bounds.x + bounds.w / 2 + Math.cos(angle) * radiusX - width / 2, bounds.x, bounds.x + bounds.w - width);
      item.y = clamp(bounds.y + bounds.h / 2 + Math.sin(angle) * radiusY - height / 2, bounds.y, bounds.y + bounds.h - height);
    });
  }

  function syncOverlayToImage() {
    const stageRect = els.planStage.getBoundingClientRect();
    const naturalRatio = els.floorPlan.naturalWidth / els.floorPlan.naturalHeight;
    if (!naturalRatio || !stageRect.width || !stageRect.height) return;
    const stageRatio = stageRect.width / stageRect.height;
    let width;
    let height;
    let left;
    let top;
    if (stageRatio > naturalRatio) {
      height = stageRect.height;
      width = height * naturalRatio;
      left = (stageRect.width - width) / 2;
      top = 0;
    } else {
      width = stageRect.width;
      height = width / naturalRatio;
      left = 0;
      top = (stageRect.height - height) / 2;
    }
    [els.zoneLayer, els.routeLayer].forEach((layer) => {
      layer.style.inset = "auto";
      layer.style.left = `${left}px`;
      layer.style.top = `${top}px`;
      layer.style.width = `${width}px`;
      layer.style.height = `${height}px`;
    });
  }

  function addZone() {
    const previous = snapshot();
    const id = `${state.activeFloor.toLowerCase()}-custom-${Date.now()}`;
    activeZones().push(
      zone(id, "Neue Zone", 50, "scenario", null, 40, 42, 14, 10, "Editierbare Planungszone.", "Benutzerdefinierte Zone; Anforderung bitte ergänzen."),
    );
    state.selectedId = id;
    pushHistory(previous);
    render();
    saveState();
    showToast("Neue Zone angelegt");
  }

  function deleteSelectedZone() {
    const item = selectedZone();
    if (!item) return;
    const previous = snapshot();
    activeFloor().zones = activeZones().filter((candidate) => candidate.id !== item.id);
    state.selectedId = null;
    pushHistory(previous);
    render();
    saveState();
    showToast("Zone gelöscht");
  }

  function duplicateSelectedZone() {
    const item = selectedZone();
    if (!item) return;
    const previous = snapshot();
    const copy = clone(item);
    copy.id = `${item.id}-copy-${Date.now()}`;
    copy.name = `${item.name} – Kopie`;
    copy.x = clamp(item.x + 3, 0, 100 - item.w);
    copy.y = clamp(item.y + 3, 0, 100 - item.h);
    copy.sequence = null;
    activeZones().push(copy);
    state.selectedId = copy.id;
    pushHistory(previous);
    render();
    saveState();
    showToast("Zone dupliziert");
  }

  function updateSelectedFromForm() {
    const item = selectedZone();
    if (!item) return;
    item.name = els.zoneName.value.trim() || "Unbenannte Zone";
    item.area = Math.max(1, Number(els.zoneArea.value) || 1);
    item.category = els.zoneCategory.value;
    item.description = els.zoneDescription.value;
    item.sequence = Math.max(0, Number(els.zoneSequence.value) || 0) || null;
    item.shape = els.zoneShape.value;
    item.color = els.zoneColor.value;
    renderZoneList();
    renderZones();
    renderAreaSummary();
    updateRoute();
    updateScore();
    saveState();
  }

  function exportPlan() {
    const exportData = clone(state);
    exportData.exportedAt = new Date().toISOString();
    exportData.source = "AGIBOT Shanghai Showroom Design Brief, September 2026";
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `agibot-shanghai-zoning-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    showToast("Planung als JSON exportiert");
  }

  function importPlan(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const incoming = JSON.parse(reader.result);
        if (incoming?.version !== 1 || !incoming.floors?.["3F"] || !incoming.floors?.["4F"]) {
          throw new Error("Ungültiges Planungsformat");
        }
        pushHistory(snapshot());
        state = incoming;
        state.selectedId = null;
        render();
        saveState();
        showToast("Planung importiert");
      } catch (error) {
        console.error(error);
        showToast("Import fehlgeschlagen");
      }
      els.importInput.value = "";
    };
    reader.readAsText(file);
  }

  function resetPlan() {
    if (!window.confirm("Alle lokalen Änderungen auf den Briefing-Stand zurücksetzen?")) return;
    pushHistory(snapshot());
    state = clone(defaultState);
    render();
    saveState();
    showToast("Briefing-Stand wiederhergestellt");
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    els.toast.textContent = message;
    els.toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => els.toast.classList.remove("is-visible"), 1800);
  }

  function presetLabel(preset) {
    return {
      narrative: "Narrative Schleife",
      perimeter: "Perimeter-Parcours",
      islands: "Szenario-Inseln",
      hub: "Hub & Satelliten",
    }[preset];
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function roundHalf(value) {
    return Math.round(value * 2) / 2;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function cssEscape(value) {
    return window.CSS?.escape ? window.CSS.escape(value) : value.replace(/[^a-zA-Z0-9_-]/g, "\\$&");
  }

  els.floorTabs.forEach((tab) =>
    tab.addEventListener("click", () => {
      state.activeFloor = tab.dataset.floor;
      state.selectedId = null;
      render();
      saveState();
    }),
  );

  els.planStage.addEventListener("click", () => {
    state.selectedId = null;
    renderZoneList();
    renderZones();
    renderInspector();
  });

  els.generateButton.addEventListener("click", () => generateLayout(els.layoutPreset.value));
  els.layoutPreset.addEventListener("change", () => {
    state.settings.layoutPreset = els.layoutPreset.value;
    els.layoutStatus.textContent = `${presetLabel(state.settings.layoutPreset)} · ${activeZones().length} Zonen`;
    saveState();
  });
  els.shapeLanguage.addEventListener("change", () => {
    const previous = snapshot();
    state.settings.shapeLanguage = els.shapeLanguage.value;
    pushHistory(previous);
    render();
    saveState();
  });
  els.routeToggle.addEventListener("click", () => {
    state.settings.routeVisible = !state.settings.routeVisible;
    render();
    saveState();
  });
  els.labelToggle.addEventListener("click", () => {
    state.settings.labelsVisible = !state.settings.labelsVisible;
    render();
    saveState();
  });

  els.filterChips.forEach((chip) =>
    chip.addEventListener("click", () => {
      state.filter = chip.dataset.filter;
      els.filterChips.forEach((item) => item.classList.toggle("is-active", item === chip));
      renderZoneList();
      renderZones();
    }),
  );

  [els.zoneName, els.zoneArea, els.zoneCategory, els.zoneDescription, els.zoneSequence, els.zoneShape, els.zoneColor].forEach(
    (control) => control.addEventListener("change", updateSelectedFromForm),
  );
  els.zoneName.addEventListener("input", updateSelectedFromForm);
  els.zoneDescription.addEventListener("input", updateSelectedFromForm);

  els.addZoneButton.addEventListener("click", addZone);
  els.deleteZoneButton.addEventListener("click", deleteSelectedZone);
  els.duplicateZoneButton.addEventListener("click", duplicateSelectedZone);
  els.exportButton.addEventListener("click", exportPlan);
  els.importInput.addEventListener("change", () => {
    const [file] = els.importInput.files;
    if (file) importPlan(file);
  });
  els.resetButton.addEventListener("click", resetPlan);
  els.undoButton.addEventListener("click", undo);
  els.redoButton.addEventListener("click", redo);
  els.floorPlan.addEventListener("load", syncOverlayToImage);
  window.addEventListener("resize", syncOverlayToImage);
  new ResizeObserver(syncOverlayToImage).observe(els.planStage);

  render();
})();
