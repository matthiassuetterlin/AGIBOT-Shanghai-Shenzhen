(() => {
  "use strict";

  const STORAGE_KEY = "agibot-shanghai-spatial-planner-v2";
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

  const floorGeometry = {
    "3F": {
      areaScale: 1,
      outlines: [
        "M4 31 Q4 27 10 27 L29 30 Q31 24 41 24 L56 24 Q65 24 68 33 L67 83 Q67 93 57 95 L14 94 Q4 94 4 84 Z",
        "M70 68 Q75 64 84 64 Q96 66 97 78 L97 92 L70 92 Z",
        "M68 18 Q80 13 96 5 L100 17 L71 36 Z",
      ],
      cores: [
        { x: 18, y: 44, w: 34, h: 33, label: "Gebäudekern" },
        { x: 31, y: 30, w: 11, h: 8, label: "Treppenhaus" },
      ],
      corridors: ["M17 41 H55 V80 H17 Z", "M20 60 H53"],
      bays: [
        bay("3f-nw", "Nordwest · Fassade bis Treppenhaus", 4.5, 29, 18, 12, "0 14%, 12% 0, 100% 12%, 100% 100%, 3% 100%", ["links oben", "oben links", "nordwest", "treppenhaus"]),
        bay("3f-n1", "Nord · links vom Treppenhaus", 23, 27, 12, 13, "0 12%, 25% 0, 100% 8%, 100% 100%, 0 100%", ["oben", "nord", "treppenhaus"]),
        bay("3f-n2", "Nord · rechts vom Treppenhaus", 43, 27, 13, 13, "0 5%, 100% 0, 100% 100%, 0 100%", ["oben", "nord", "treppenhaus"]),
        bay("3f-ne", "Nordost · gebogene Fassade", 56, 29, 11, 19, "0 0, 72% 0, 100% 22%, 92% 100%, 0 100%", ["rechts oben", "oben rechts", "nordost", "fassade"]),
        bay("3f-w1", "Westfassade · oben", 4.5, 43, 12.5, 17, "8% 0, 100% 0, 100% 100%, 0 100%, 0 12%", ["links", "west", "fassade"]),
        bay("3f-w2", "Westfassade · Mitte", 4.5, 61, 12.5, 17, "0 0, 100% 0, 100% 100%, 3% 100%", ["links", "west", "mitte", "fassade"]),
        bay("3f-w3", "Südwest · Fassade", 5, 79, 18, 13, "0 0, 100% 0, 100% 100%, 18% 100%, 3% 76%", ["links unten", "unten links", "südwest", "fassade"]),
        bay("3f-s1", "Südfassade · links", 24, 80, 15, 13, "0 0, 100% 0, 100% 100%, 0 94%", ["unten", "süd", "fassade"]),
        bay("3f-s2", "Südfassade · Mitte", 40, 80, 14, 13, "0 0, 100% 0, 100% 90%, 0 100%", ["unten", "süd", "mitte", "fassade"]),
        bay("3f-se", "Südost · gebogene Fassade", 55, 76, 11, 16, "0 0, 100% 0, 92% 78%, 66% 100%, 0 100%", ["rechts unten", "unten rechts", "südost", "fassade"]),
        bay("3f-e1", "Ostfassade · Mitte", 53, 55, 13, 18, "0 0, 100% 0, 94% 100%, 0 100%", ["rechts", "ost", "mitte", "fassade"]),
        bay("3f-inner-n", "Nordgalerie · Kernkante", 24, 38, 27, 7, "0 0, 100% 0, 96% 100%, 0 100%", ["kern", "haupttrakt", "nordgalerie"]),
        bay("3f-flow", "Erschließungsring · freizuhalten", 17, 41, 39, 39, "0 0, 100% 0, 100% 100%, 0 100%", ["korridor", "erschließung"], true, 130.7),
        bay("3f-hall", "Multifunction Hall", 71, 69, 25, 21, "5% 0, 76% 0, 100% 18%, 100% 100%, 0 100%, 0 20%", ["halle", "rechts unten"], false, 190.5),
        bay("3f-terrace", "Outdoor Terrace", 70, 9, 26, 23, "0 45%, 77% 0, 100% 12%, 100% 70%, 22% 100%", ["terrasse", "außen", "rechts oben"], false, 261.6),
      ],
      orders: {
        narrative: ["3f-nw", "3f-w1", "3f-w2", "3f-w3", "3f-s1", "3f-s2", "3f-se", "3f-e1", "3f-ne", "3f-n2", "3f-n1", "3f-inner-n"],
        perimeter: ["3f-nw", "3f-n1", "3f-n2", "3f-ne", "3f-e1", "3f-se", "3f-s2", "3f-s1", "3f-w3", "3f-w2", "3f-w1", "3f-inner-n"],
        islands: ["3f-nw", "3f-n1", "3f-n2", "3f-w1", "3f-inner-n", "3f-e1", "3f-w2", "3f-s1", "3f-s2", "3f-w3", "3f-se", "3f-ne"],
        hub: ["3f-inner-n", "3f-n1", "3f-n2", "3f-ne", "3f-e1", "3f-se", "3f-s2", "3f-s1", "3f-w3", "3f-w2", "3f-w1", "3f-nw"],
      },
    },
    "4F": {
      areaScale: 1.65,
      outlines: ["M12 4 Q4 5 3 18 L6 84 Q6 96 18 98 L80 97 Q92 97 94 85 L97 18 Q96 5 84 3 Z"],
      cores: [
        { x: 22, y: 29, w: 48, h: 45, label: "Gebäudekern" },
        { x: 36, y: 8, w: 19, h: 9, label: "Treppenhaus" },
      ],
      corridors: ["M19 25 H73 V77 H19 Z", "M20 50 H72"],
      bays: [
        bay("4f-nw", "Nordwest · Fassade", 7, 8, 25, 15, "10% 0, 100% 16%, 100% 100%, 0 100%, 0 26%", ["links oben", "oben links", "nordwest", "fassade"]),
        bay("4f-n1", "Nord · links vom Treppenhaus", 28, 18, 16, 9, "0 0, 100% 0, 100% 100%, 0 100%", ["oben", "treppenhaus", "nord"]),
        bay("4f-n2", "Nord · rechts vom Treppenhaus", 51, 17, 17, 10, "0 0, 100% 0, 100% 100%, 0 100%", ["oben", "treppenhaus", "nord"]),
        bay("4f-ne", "Nordost · Fassade", 69, 8, 24, 17, "0 12%, 86% 0, 100% 25%, 100% 100%, 0 100%", ["rechts oben", "oben rechts", "nordost", "fassade"]),
        bay("4f-w1", "Westfassade · oben", 7, 25, 13, 21, "6% 0, 100% 0, 100% 100%, 0 100%", ["links", "west", "fassade"]),
        bay("4f-w2", "Westfassade · unten", 7, 49, 13, 23, "0 0, 100% 0, 100% 100%, 4% 100%", ["links", "west", "fassade"]),
        bay("4f-sw", "Südwest · Fassade", 8, 74, 25, 18, "0 0, 100% 0, 100% 100%, 12% 100%, 0 75%", ["links unten", "unten links", "südwest", "fassade"]),
        bay("4f-s1", "Südfassade · Mitte links", 31, 76, 18, 17, "0 0, 100% 0, 100% 100%, 0 100%", ["unten", "süd", "fassade"]),
        bay("4f-s2", "Südfassade · Mitte rechts", 51, 76, 18, 17, "0 0, 100% 0, 100% 100%, 0 100%", ["unten", "süd", "fassade"]),
        bay("4f-se", "Südost · Fassade", 69, 73, 23, 19, "0 0, 100% 0, 100% 72%, 85% 100%, 0 100%", ["rechts unten", "unten rechts", "südost", "fassade"]),
        bay("4f-e1", "Ostfassade · Mitte", 72, 28, 20, 42, "0 0, 100% 0, 96% 100%, 0 100%", ["rechts", "ost", "mitte", "fassade"]),
        bay("4f-flow", "Erschließungsring · freizuhalten", 19, 25, 54, 52, "0 0, 100% 0, 100% 100%, 0 100%", ["korridor", "erschließung"], true, 80),
      ],
      orders: {
        narrative: ["4f-nw", "4f-n1", "4f-n2", "4f-ne", "4f-e1", "4f-se", "4f-s2", "4f-s1", "4f-sw", "4f-w2", "4f-w1"],
        perimeter: ["4f-nw", "4f-n1", "4f-n2", "4f-ne", "4f-e1", "4f-se", "4f-s2", "4f-s1", "4f-sw", "4f-w2", "4f-w1"],
        islands: ["4f-nw", "4f-n1", "4f-n2", "4f-w1", "4f-ne", "4f-e1", "4f-w2", "4f-sw", "4f-s1", "4f-s2", "4f-se"],
        hub: ["4f-e1", "4f-n1", "4f-n2", "4f-ne", "4f-se", "4f-s2", "4f-s1", "4f-sw", "4f-w2", "4f-w1", "4f-nw"],
      },
    },
  };

  function bay(id, label, x, y, w, h, clip, tags, reserved = false, exactArea = null) {
    return { id, label, x, y, w, h, clip, tags, reserved, exactArea };
  }

  function makeZone(id, name, area, category, sequence, bayId, description, requirement, options = {}) {
    const content = contentStrategy(name, category, description);
    return {
      id, name, area, category, sequence, bayId,
      x: 0, y: 0, w: 10, h: 10,
      shape: "inherit",
      color: categoryColor(category),
      description,
      requirement,
      exhibit: options.exhibit || content.exhibit,
      story: options.story || content.story,
      fitBay: Boolean(options.fitBay),
      fixed: Boolean(options.fixed),
    };
  }

  function contentStrategy(name, category, description) {
    const subject = name.replaceAll("·", " ");
    const strategies = {
      brand: { exhibit: `Großformatiger Auftakt, physische Meilensteine und ein klarer Medienanker zu ${subject}.`, story: "Mit einer starken Leitfrage beginnen, eine Kernbotschaft pro Blickachse zeigen und vertiefende Inhalte erst auf Interaktion öffnen." },
      product: { exhibit: `Originalprodukte, aufgeschnittene Komponenten, Materialmuster und kurze Funktionsdemonstrationen zu ${subject}.`, story: "Vom sichtbaren Produkt zum inneren System erklären: erst Nutzen, dann Mechanik, Sensorik und Software in drei verständlichen Ebenen." },
      intelligence: { exhibit: `Live-Roboter, Echtzeitdaten und abstrahierte Bewegungs- oder Entscheidungsgeometrien für ${subject}.`, story: "Eine Handlung auslösen, ihre Wahrnehmung visualisieren und anschließend die Entscheidung des Systems als verständliche Ursache-Wirkungs-Kette zeigen." },
      scenario: { exhibit: `Szenografische Arbeitszelle mit realem Robotereinsatz, Requisiten, Statuslicht und Prozessdaten für ${subject}.`, story: "Den vollständigen Job-to-be-done zeigen: Ausgangslage, autonome Handlung, Übergabe an Mensch oder System und messbares Ergebnis." },
      ecosystem: { exhibit: `Vernetzte Partner-, Plattform- und Datenbausteine rund um ${subject}, kombiniert mit einem physischen Systemmodell.`, story: "Die einzelnen Akteure als Module erklären und danach sichtbar machen, welchen zusätzlichen Wert erst ihr Zusammenspiel erzeugt." },
      event: { exhibit: `Flexible Bühne, mobile Bestuhlung, Präsentationswand und umstellbare Demonstrationsmodule für ${subject}.`, story: "Ein klares Fokusobjekt schaffen; Inhalte für Vortrag, Signing, Workshop und temporäre Ausstellung ohne Umbau der Grundinfrastruktur wechseln." },
      outdoor: { exhibit: `Robuste Testfelder, Rampen, wechselnde Untergründe und sichere Zuschauerpositionen für ${subject}.`, story: "Fähigkeiten als sichtbare Herausforderung erzählen: Terrain, Aufgabe, autonome Reaktion und Performancevergleich in einer kurzen Schleife." },
      support: { exhibit: `Funktionsgerechte Einbauten, mobile Lager- oder Arbeitsmodule und klar getrennte Betriebswege für ${subject}.`, story: "Betriebsfunktionen zurückhaltend, aber eindeutig lesbar organisieren und alle Wechsel-, Wartungs- und Nachfüllprozesse vom Besucherfluss trennen." },
      circulation: { exhibit: "Freigehaltener Orientierungsraum mit Bodenlinie, Blickachsen, Wartepunkten und Sicherheitsabständen.", story: "Besucher intuitiv über Licht, Bodenmaterial und Sichtbeziehungen führen; keine Exponate in Flucht-, Warte- oder Demonstrationskorridore stellen." },
    };
    return strategies[category] || { exhibit: description, story: "Inhalt klar staffeln und mit einem physischen sowie einem medialen Beweis erklären." };
  }

  function createDefaultState() {
    const result = {
      version: 2,
      activeFloor: "3F",
      selectedId: null,
      filter: "all",
      settings: { shapeLanguage: "soft", layoutPreset: "narrative", routeVisible: true, labelsVisible: true },
      floors: {
        "3F": {
          targetArea: 2082.8,
          narrative: "Warum AgiBot? · Marke, Produkte und Systemkompetenz",
          image: "assets/shanghai-3f-plan.png",
          imageAlt: "Grundriss Shanghai, 3. Obergeschoss",
          recommendationTitle: "Fassade bespielen, Kern und Korridor freihalten",
          recommendationText: "Die Ausstellung liegt als zusammenhängender Ring zwischen Fassade und Kern. Erschließung, Treppenhäuser und Technik bleiben als No-go-Flächen frei; Halle und Terrasse sind eigene Raumkörper.",
          zones: [
            makeZone("3f-arrival", "Ankommen · Welcome & Photo", 75, "brand", 1, "3f-nw", "Begrüßung, Gruppenbildung, Welcome Screen und Fotomoment.", "Welcome Screen, Photo Area und Besucher-Sammlung vor dem narrativen Einstieg."),
            makeZone("3f-mission", "Mission · Unternehmen · Patente", 135, "brand", 2, "3f-w1", "Mission, Entwicklung, globale Positionierung und Patentwand.", "Company Introduction, Mission, Milestones und digital ergänzbare Patentdarstellung."),
            makeZone("3f-product", "Produktfamilien & Core Components", 210, "product", 3, "3f-w2", "A3U, G2, X2, D2, Gelenksensorik und Dexterous Hand.", "Vollständige Produktfamilien plus Reserve für etwa zwei neue Produkte."),
            makeZone("3f-motion", "Motion Intelligence", 155, "intelligence", 4, "3f-w3", "Dynamische Demonstrationen oder wechselnde Sport- und Bewegungsmedien.", "Sichere Live-Demo oder Screen-Alternative; Outdoor-Demo kann angebunden werden."),
            makeZone("3f-interaction", "Interaction Intelligence", 110, "intelligence", 5, "3f-s1", "Multimedia-Erklärung mit direkter Mensch-Roboter-Interaktion.", "Interaktion am realen Roboter mit klarer Sicherheits- und Besuchergrenze."),
            makeZone("3f-task", "Task Intelligence & Me-Go", 125, "intelligence", 6, "3f-s2", "Task-Demo, Me-Go Datenerfassung, Tisch und Video/PPT.", "Task Intelligence Demo inklusive 1.400 × 700 mm Tisch und Medienfläche."),
            makeZone("3f-aima", "AIMA Technology Ecosystem", 145, "ecosystem", 7, "3f-se", "Lingqu, Lingxin, Lingchuang und Jingling als verbundenes System.", "AIMA Gesamteinführung sowie vier Module mit Screen und Roboterdemonstration."),
            makeZone("3f-proof", "Deployment Proof", 155, "scenario", 8, "3f-e1", "Industrie, Hotel, Retail Warehouse und Security als Anwendungsnachweis.", "Reale Daten, Cases und Betriebsbedingungen als Vertrauensbeweis."),
            makeZone("3f-qiyuan", "Qiyuan Companion Home", 90, "scenario", 9, "3f-ne", "Wohnliche Szene für Q1 und T1 mit Bewegung, Interaktion und Tanz.", "Home-like Scenario mit zwei Robotern und ausreichender Bewegungsfläche."),
            makeZone("3f-ecosystem", "Commercial Ecosystem", 80, "ecosystem", 10, "3f-n2", "Plan A, A-Chain, kommerzielle Partner und Partnernetzwerk.", "Venture-, Supply-Chain- und Partnerökosystem als skalierbares Medienmodul."),
            makeZone("3f-office", "Office · 20 Personen", 120, "support", null, "3f-n1", "Arbeitsbereich für rund 20 Personen.", "Der Brief verlangt im 3F-Ausstellungsbereich ein Büro für etwa 20 Personen."),
            makeZone("3f-storage", "Storage", 100, "support", null, "3f-inner-n", "Lager für Betrieb, Wechselmodule und Showroom-Equipment.", "Der Brief nennt ca. 100 m² Lagerfläche auf 3F."),
            makeZone("3f-flow", "Transition · Safety · Charging", 130.7, "circulation", null, "3f-flow", "Puffer für Besucherfluss, sichere Demoabstände und Ladeinfrastruktur.", "Planungsreserve für Zirkulation, Demonstrationsgrenzen und Ladepunkte.", { fitBay: true, fixed: true }),
            makeZone("3f-hall", "Multifunction Hall", 190.5, "event", 11, "3f-hall", "Meeting, Signing, Temporary Exhibition und Standing Buffet.", "Möbelwechsel, AV, Stauraum und direkte Empfangsanbindung an den Showroom.", { fitBay: true, fixed: true }),
            makeZone("3f-terrace", "Outdoor Terrace · Multi-Terrain", 261.6, "outdoor", 12, "3f-terrace", "Pause und Multi-Terrain-Demo für quadrupede Roboter.", "261,6 m² Terrasse für Erholung, Outdoor-Demo, Technik und Wartungszugang.", { fitBay: true, fixed: true }),
          ],
        },
        "4F": {
          targetArea: 1632.4,
          narrative: "Wohin geht AgiBot? · Deployment-State Scenario Innovation Centre",
          image: "assets/shanghai-4f-plan.png",
          imageAlt: "Grundriss Shanghai, 4. Obergeschoss",
          recommendationTitle: "Szenarien als Fassadenring",
          recommendationText: "Die Szenariozellen besetzen den Ring zwischen Fassade und Gebäudekern. Der umlaufende Erschließungsraum bleibt lesbar, flexibel und frei von festen Exponaten.",
          zones: [
            makeZone("4f-arrival", "Arrival · Scenario Briefing", 90, "brand", 1, "4f-nw", "Übergang von 3F in die Welt realer Einsatzszenarien.", "Klare Orientierung und Briefing vor dynamischen Demonstrationen."),
            makeZone("4f-industrial", "Industrial Handling", 235, "scenario", 2, "4f-n1", "Industrielles Handling und Materialbewegung.", "Immersive Deployment-State-Szene mit realen Betriebsbedingungen."),
            makeZone("4f-logistics", "Logistics Sorting", 180, "scenario", 3, "4f-n2", "Logistiksortierung und Materialfluss.", "Flexible Szene für Sortierung, Übergaben und skalierbare Workflows."),
            makeZone("4f-production", "Production Line Loading", 180, "scenario", 4, "4f-ne", "Be- und Entladung einer Produktionslinie.", "Reale Taktung, sichere Besucherpositionen und sichtbare Systemkoordination."),
            makeZone("4f-sports", "Sports Competition", 150, "scenario", 5, "4f-e1", "Sportliche Bewegungs- und Performance-Szenarien.", "Wechselnde Sportformate und dynamische Demonstrationen."),
            makeZone("4f-cleaning", "Industrial & Commercial Cleaning", 150, "scenario", 6, "4f-se", "Industrielle und gewerbliche Reinigung.", "Nachvollziehbarer Arbeitsablauf mit Betriebs-, Lade- und Wartungslogik."),
            makeZone("4f-security", "Security Patrol", 130, "scenario", 7, "4f-s2", "Autonome Patrouille und Inspektion.", "Live-Demo oder Medienalternative; Schnittstelle zu Outdoor-Livefeeds möglich."),
            makeZone("4f-retail", "Retail Service Station", 140, "scenario", 8, "4f-s1", "Retail Service, Guidance und Kundeninteraktion.", "Kommerzielles Szenario mit verständlicher Kundenreise und Serviceübergaben."),
            makeZone("4f-culture", "Culture & Tourism", 140, "scenario", 9, "4f-sw", "Kultur-, Tourismus- und Hospitality-Anwendungen.", "Emotionales Besuchererlebnis und flexible Content-Erneuerung."),
            makeZone("4f-lab", "Scenario Innovation Lab", 107.4, "intelligence", 10, "4f-w2", "Zukünftige Branchen, Workflows und wechselnde Pilotanwendungen.", "Minimal austauschbare Content-Einheit und wiederverwendbare Schnittstellen."),
            makeZone("4f-storage", "Storage", 50, "support", null, "4f-w1", "Lager für Szenariomodule und Betriebsmittel.", "Der Brief nennt ca. 50 m² Lagerfläche auf 4F."),
            makeZone("4f-flow", "Flexible Flow & Safety", 80, "circulation", null, "4f-flow", "Flexible Besucherführung, Demoabstände und Ladepunkte.", "Planungsreserve für einen anpassbaren, sicheren Szenarioparcours.", { fitBay: true, fixed: true }),
          ],
        },
      },
    };
    Object.keys(result.floors).forEach((floorCode) => result.floors[floorCode].zones.forEach((item) => fitZoneToBay(item, floorCode, item.fitBay)));
    return result;
  }

  const defaultState = createDefaultState();

  const els = {
    floorTabs: [...document.querySelectorAll(".floor-tab")],
    zoneList: document.querySelector("#zoneList"),
    zoneLayer: document.querySelector("#zoneLayer"),
    buildingLayer: document.querySelector("#buildingLayer"),
    routeLayer: document.querySelector("#routeLayer"),
    routeLine: document.querySelector("#routeLine"),
    routeGlow: document.querySelector("#routeGlow"),
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
    placementCommand: document.querySelector("#placementCommand"),
    applyCommandButton: document.querySelector("#applyCommandButton"),
    fitBayButton: document.querySelector("#fitBayButton"),
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
    zoneExhibit: document.querySelector("#zoneExhibit"),
    zoneStory: document.querySelector("#zoneStory"),
    geometryArea: document.querySelector("#geometryArea"),
    bayName: document.querySelector("#bayName"),
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

  function categoryColor(category) {
    return { brand: "#785cff", product: "#2f7dff", intelligence: "#00a7a5", scenario: "#ff8a3d", ecosystem: "#bc5de8", event: "#e94794", outdoor: "#4eb473", support: "#737984", circulation: "#c69c48" }[category] || "#785cff";
  }
  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved?.version === 2 && saved.floors?.["3F"] && saved.floors?.["4F"]) return saved;
    } catch (error) { console.warn("Gespeicherte Planung konnte nicht gelesen werden.", error); }
    return clone(defaultState);
  }
  function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); els.saveStatus.textContent = "Lokal gespeichert"; }
  function activeFloor() { return state.floors[state.activeFloor]; }
  function activeZones() { return activeFloor().zones; }
  function selectedZone() { return activeZones().find((item) => item.id === state.selectedId) || null; }
  function geometry() { return floorGeometry[state.activeFloor]; }
  function findBay(floorCode, bayId) { return floorGeometry[floorCode].bays.find((item) => item.id === bayId) || null; }
  function snapshot() { return clone(state); }
  function pushHistory(previous = snapshot()) { history.push(previous); if (history.length > 60) history.shift(); future = []; updateUndoButtons(); }
  function undo() { if (!history.length) return; future.push(snapshot()); state = history.pop(); render(); saveState(); showToast("Änderung rückgängig"); }
  function redo() { if (!future.length) return; history.push(snapshot()); state = future.pop(); render(); saveState(); showToast("Änderung wiederholt"); }
  function updateUndoButtons() { els.undoButton.disabled = history.length === 0; els.redoButton.disabled = future.length === 0; }
  function formatArea(value) { return new Intl.NumberFormat("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value); }

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
    renderBuildingGeometry(); renderZoneList(); renderZones(); renderInspector(); renderAreaSummary(); updateRoute(); updateScore(); updateUndoButtons();
    els.layoutStatus.textContent = `${presetLabel(state.settings.layoutPreset)} · ${activeZones().length} Zonen · Kern geschützt`;
    requestAnimationFrame(syncOverlayToImage);
  }

  function renderBuildingGeometry() {
    const map = geometry();
    els.buildingLayer.innerHTML = `
      <g class="usable-footprints">${map.outlines.map((path) => `<path d="${path}" vector-effect="non-scaling-stroke"></path>`).join("")}</g>
      <g class="planning-bays">${map.bays.filter((item) => !item.reserved).map((item) => `<rect x="${item.x}" y="${item.y}" width="${item.w}" height="${item.h}" rx="1.4" vector-effect="non-scaling-stroke"></rect>`).join("")}</g>
      <g class="reserved-corridors">${map.corridors.map((path) => `<path d="${path}" vector-effect="non-scaling-stroke"></path>`).join("")}</g>
      <g class="building-cores">${map.cores.map((core) => `<rect x="${core.x}" y="${core.y}" width="${core.w}" height="${core.h}" rx="1" vector-effect="non-scaling-stroke"></rect>`).join("")}</g>`;
  }

  function renderZoneList() {
    els.zoneList.innerHTML = "";
    activeZones().forEach((item) => {
      const visible = state.filter === "all" || categoryGroups[state.filter]?.has(item.category);
      const button = document.createElement("button");
      button.type = "button";
      button.className = `zone-list-item${item.id === state.selectedId ? " is-selected" : ""}${visible ? "" : " is-muted"}`;
      button.style.setProperty("--zone-color", item.color);
      button.innerHTML = `<span class="zone-dot"></span><span class="zone-list-copy"><strong>${escapeHtml(item.name)}</strong><small>${categoryLabels[item.category] || item.category}${item.sequence ? ` · Stop ${item.sequence}` : ""}</small></span><span class="zone-list-area">${formatArea(item.area)} m²</span>`;
      button.addEventListener("click", () => selectZone(item.id));
      els.zoneList.append(button);
    });
  }

  function renderZones() {
    els.zoneLayer.innerHTML = "";
    activeZones().forEach((item) => {
      const zoneEl = document.createElement("div");
      zoneEl.className = `zone zone-${item.category}`;
      if (item.id === state.selectedId) zoneEl.classList.add("is-selected");
      if (item.fixed) zoneEl.classList.add("is-fixed");
      if (item.fitBay) zoneEl.classList.add("is-bay-fitted");
      if (item.shape && item.shape !== "inherit") zoneEl.classList.add(`shape-${item.shape}`);
      if (state.filter !== "all" && !categoryGroups[state.filter]?.has(item.category)) zoneEl.classList.add("is-dimmed");
      zoneEl.dataset.zoneId = item.id;
      updateZoneStyle(zoneEl, item);
      zoneEl.innerHTML = `<div class="zone-program program-${programType(item.category)}" aria-hidden="true"><span class="program-screen"></span><span class="program-object"></span><span class="program-object"></span><span class="program-line"></span></div><div class="zone-content">${item.sequence ? `<span class="zone-sequence">${item.sequence}</span>` : ""}<span class="zone-name">${escapeHtml(item.name)}</span><span class="zone-area">${formatArea(item.area)} m²</span></div>${item.id === state.selectedId && !item.fixed ? '<span class="resize-handle" aria-hidden="true"></span>' : ""}`;
      if (!item.fixed) zoneEl.addEventListener("pointerdown", beginZoneInteraction);
      zoneEl.addEventListener("click", (event) => { event.stopPropagation(); selectZone(item.id); });
      els.zoneLayer.append(zoneEl);
    });
  }

  function updateZoneStyle(element, item) {
    element.style.left = `${item.x}%`; element.style.top = `${item.y}%`; element.style.width = `${item.w}%`; element.style.height = `${item.h}%`; element.style.setProperty("--zone-color", item.color);
    const targetBay = findBay(state.activeFloor, item.bayId);
    element.style.clipPath = item.fitBay && targetBay ? `polygon(${targetBay.clip})` : "";
  }

  function programType(category) { return { brand: "media", product: "gallery", intelligence: "data", scenario: "cell", ecosystem: "network", event: "stage", outdoor: "terrain", support: "support", circulation: "flow" }[category] || "gallery"; }

  function renderInspector() {
    const item = selectedZone();
    els.emptyInspector.classList.toggle("is-hidden", Boolean(item)); els.zoneForm.classList.toggle("is-hidden", !item); els.deleteZoneButton.disabled = !item || item.fixed; els.fitBayButton.disabled = !item || item.fixed || !item.bayId;
    if (!item) return;
    els.zoneName.value = item.name; els.zoneArea.value = item.area; els.zoneCategory.value = item.category; els.zoneDescription.value = item.description || ""; els.zoneSequence.value = item.sequence ?? 0; els.zoneShape.value = item.shape || "inherit"; els.zoneColor.value = item.color;
    els.zoneRequirement.textContent = item.requirement || "Keine zusätzliche Anforderung hinterlegt.";
    els.zoneExhibit.textContent = item.exhibit || contentStrategy(item.name, item.category, item.description).exhibit;
    els.zoneStory.textContent = item.story || contentStrategy(item.name, item.category, item.description).story;
    els.geometryArea.textContent = `${formatArea(geometryArea(item, state.activeFloor))} m² aus Geometrie`;
    els.bayName.textContent = findBay(state.activeFloor, item.bayId)?.label || "Freie Position – beim Loslassen wird eingerastet";
  }

  function renderAreaSummary() {
    const floor = activeFloor(); const planned = activeZones().reduce((sum, item) => sum + Number(item.area || 0), 0); const delta = planned - floor.targetArea; const percent = Math.min(100, Math.max(0, (planned / floor.targetArea) * 100));
    els.targetArea.textContent = `${formatArea(floor.targetArea)} m²`; els.plannedArea.textContent = `${formatArea(planned)} m² geplant`; els.areaDelta.textContent = `${delta > 0 ? "+" : delta < 0 ? "−" : "±"} ${formatArea(Math.abs(delta))} m²`; els.areaDelta.style.color = Math.abs(delta) < 0.2 ? "var(--success)" : "var(--danger)"; els.areaProgress.style.width = `${percent}%`;
  }

  function selectZone(id) { state.selectedId = id; renderZoneList(); renderZones(); renderInspector(); updateRoute(); }
  function setToggle(element, active) { element.classList.toggle("is-active", active); element.setAttribute("aria-pressed", String(active)); }

  function beginZoneInteraction(event) {
    if (event.button !== 0) return;
    const zoneEl = event.currentTarget; const item = activeZones().find((zoneItem) => zoneItem.id === zoneEl.dataset.zoneId); if (!item || item.fixed) return;
    event.preventDefault(); event.stopPropagation(); if (state.selectedId !== item.id) selectZone(item.id);
    const isResize = event.target.classList.contains("resize-handle"); const layerRect = els.zoneLayer.getBoundingClientRect();
    dragSession = { item, isResize, startX: event.clientX, startY: event.clientY, original: { x: item.x, y: item.y, w: item.w, h: item.h, area: item.area }, layerRect, previous: snapshot() };
    item.fitBay = false; zoneEl.setPointerCapture(event.pointerId); zoneEl.addEventListener("pointermove", moveZoneInteraction); zoneEl.addEventListener("pointerup", endZoneInteraction, { once: true }); zoneEl.addEventListener("pointercancel", endZoneInteraction, { once: true });
  }

  function moveZoneInteraction(event) {
    if (!dragSession) return;
    const dx = ((event.clientX - dragSession.startX) / dragSession.layerRect.width) * 100; const dy = ((event.clientY - dragSession.startY) / dragSession.layerRect.height) * 100; const { item, original, isResize } = dragSession;
    if (isResize) {
      const targetBay = findBay(state.activeFloor, item.bayId); const maxW = targetBay ? targetBay.x + targetBay.w - item.x : 100 - item.x; const maxH = targetBay ? targetBay.y + targetBay.h - item.y : 100 - item.y;
      item.w = clamp(roundTenth(original.w + dx), 4, Math.max(4, maxW)); item.h = clamp(roundTenth(original.h + dy), 4, Math.max(4, maxH)); item.area = geometryArea(item, state.activeFloor); els.zoneArea.value = item.area; els.geometryArea.textContent = `${formatArea(item.area)} m² aus Geometrie`;
    } else { item.x = clamp(roundTenth(original.x + dx), 0, 100 - item.w); item.y = clamp(roundTenth(original.y + dy), 0, 100 - item.h); }
    updateZoneElement(item); renderAreaSummary(); updateRoute(); updateScore(); els.saveStatus.textContent = isResize ? "Fläche und m² werden angepasst" : "Bay wird beim Loslassen erkannt";
  }

  function endZoneInteraction(event) {
    const target = event.currentTarget; target.removeEventListener("pointermove", moveZoneInteraction); if (!dragSession) return;
    const { item, isResize, previous } = dragSession; if (!isResize) snapZoneToNearestBay(item); pushHistory(previous); dragSession = null; render(); saveState(); showToast(isResize ? `Geometrie entspricht jetzt ${formatArea(item.area)} m²` : "Zone in zulässige Grundrissfläche eingerastet");
  }

  function updateZoneElement(item) {
    const element = els.zoneLayer.querySelector(`[data-zone-id="${cssEscape(item.id)}"]`); if (!element) return; updateZoneStyle(element, item); const areaLabel = element.querySelector(".zone-area"); if (areaLabel) areaLabel.textContent = `${formatArea(item.area)} m²`;
  }

  function snapZoneToNearestBay(item) {
    const candidates = geometry().bays.filter((candidate) => !candidate.reserved && !["3f-hall", "3f-terrace"].includes(candidate.id)); const center = { x: item.x + item.w / 2, y: item.y + item.h / 2 }; const target = candidates.sort((a, b) => pointDistance(center, bayCenter(a)) - pointDistance(center, bayCenter(b)))[0]; if (target) assignZoneToBay(item, target, false, true);
  }

  function assignZoneToBay(item, targetBay, fill = false, swap = true) {
    const oldBay = findBay(state.activeFloor, item.bayId);
    if (swap) { const occupant = activeZones().find((candidate) => candidate.id !== item.id && !candidate.fixed && candidate.bayId === targetBay.id); if (occupant && oldBay) { occupant.bayId = oldBay.id; occupant.fitBay = false; fitZoneToBay(occupant, state.activeFloor, false); } }
    item.bayId = targetBay.id; item.fitBay = fill; fitZoneToBay(item, state.activeFloor, fill);
  }

  function fitZoneToBay(item, floorCode, fill) {
    const targetBay = findBay(floorCode, item.bayId); if (!targetBay) return;
    if (fill) { Object.assign(item, { x: targetBay.x, y: targetBay.y, w: targetBay.w, h: targetBay.h }); item.area = targetBay.exactArea ?? geometryArea(item, floorCode); return; }
    const scale = floorGeometry[floorCode].areaScale; const desiredFootprint = Math.max(20, Number(item.area) / scale); const aspect = clamp(targetBay.w / targetBay.h, 0.45, 4.5); let width = Math.sqrt(desiredFootprint * aspect); let height = desiredFootprint / width; const maxW = targetBay.w; const maxH = targetBay.h; const shrink = Math.min(1, maxW / width, maxH / height); width *= shrink; height *= shrink;
    item.w = roundTenth(Math.max(4, width)); item.h = roundTenth(Math.max(4, height)); item.x = roundTenth(targetBay.x + (targetBay.w - item.w) / 2); item.y = roundTenth(targetBay.y + (targetBay.h - item.h) / 2);
  }

  function geometryArea(item, floorCode) { const targetBay = findBay(floorCode, item.bayId); if (item.fitBay && targetBay?.exactArea) return roundTenth(targetBay.exactArea); return roundTenth(item.w * item.h * floorGeometry[floorCode].areaScale); }
  function resizeZoneToArea(item, newArea) { item.area = Math.max(1, roundTenth(newArea)); item.fitBay = false; fitZoneToBay(item, state.activeFloor, false); const actual = geometryArea(item, state.activeFloor); if (actual < item.area * 0.92) { item.area = actual; showToast("Fläche auf die verfügbare Grundriss-Bay begrenzt"); } }

  function updateRoute() {
    const points = activeZones().filter((item) => Number(item.sequence) > 0).sort((a, b) => a.sequence - b.sequence).map((item) => ({ x: roundTenth(item.x + item.w / 2), y: roundTenth(item.y + item.h / 2) }));
    const routedPoints = routeAroundCores(points, geometry().cores);
    const path = smoothPath(routedPoints); els.routeLine.setAttribute("d", path); els.routeGlow.setAttribute("d", path); els.routeLayer.querySelectorAll(".route-stop").forEach((node) => node.remove());
    points.forEach((point, index) => { const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle"); circle.setAttribute("class", "route-stop"); circle.setAttribute("cx", point.x); circle.setAttribute("cy", point.y); circle.setAttribute("r", "0.85"); circle.setAttribute("vector-effect", "non-scaling-stroke"); const title = document.createElementNS("http://www.w3.org/2000/svg", "title"); title.textContent = `Besucherstop ${index + 1}`; circle.append(title); els.routeLayer.append(circle); });
  }

  function routeAroundCores(points, cores) {
    if (points.length < 2) return points;
    const routed = [points[0]];
    for (let index = 1; index < points.length; index += 1) {
      const from = routed[routed.length - 1];
      const to = points[index];
      const blockingCore = cores.find((core) => segmentCrossesRect(from, to, core));
      if (blockingCore) {
        const margin = 3.2;
        const left = blockingCore.x - margin;
        const right = blockingCore.x + blockingCore.w + margin;
        const top = blockingCore.y - margin;
        const bottom = blockingCore.y + blockingCore.h + margin;
        const candidates = [
          [{ x: left, y: from.y }, { x: left, y: to.y }],
          [{ x: right, y: from.y }, { x: right, y: to.y }],
          [{ x: from.x, y: top }, { x: to.x, y: top }],
          [{ x: from.x, y: bottom }, { x: to.x, y: bottom }],
        ];
        const safe = candidates.filter((candidate) => !candidate.some((point) => point.x < 1 || point.x > 99 || point.y < 1 || point.y > 99));
        const selected = (safe.length ? safe : candidates).sort((a, b) => routedDistance(from, a, to) - routedDistance(from, b, to))[0];
        routed.push(...selected.map((point) => ({ x: roundTenth(point.x), y: roundTenth(point.y) })));
      }
      routed.push(to);
    }
    return routed;
  }

  function segmentCrossesRect(from, to, rect) {
    const padding = 0.8;
    for (let step = 1; step < 20; step += 1) {
      const ratio = step / 20;
      const x = from.x + (to.x - from.x) * ratio;
      const y = from.y + (to.y - from.y) * ratio;
      if (x > rect.x - padding && x < rect.x + rect.w + padding && y > rect.y - padding && y < rect.y + rect.h + padding) return true;
    }
    return false;
  }

  function routedDistance(from, waypoints, to) {
    const route = [from, ...waypoints, to];
    return route.slice(1).reduce((total, point, index) => total + pointDistance(route[index], point), 0);
  }

  function smoothPath(points) {
    if (!points.length) return "";
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let index = 0; index < points.length - 1; index += 1) {
      const current = points[index];
      const next = points[index + 1];
      const midpoint = { x: roundTenth((current.x + next.x) / 2), y: roundTenth((current.y + next.y) / 2) };
      path += ` Q ${current.x} ${current.y}, ${midpoint.x} ${midpoint.y}`;
    }
    const last = points[points.length - 1];
    path += ` T ${last.x} ${last.y}`;
    return path;
  }

  function updateScore() {
    const zones = activeZones().filter((item) => item.category !== "circulation"); let overlap = 0; for (let a = 0; a < zones.length; a += 1) for (let b = a + 1; b < zones.length; b += 1) overlap += overlapArea(zones[a], zones[b]); const route = zones.filter((item) => item.sequence).sort((a, b) => a.sequence - b.sequence); let routeDistance = 0; for (let index = 1; index < route.length; index += 1) routeDistance += distance(route[index - 1], route[index]); const invalid = zones.filter((item) => !findBay(state.activeFloor, item.bayId)).length; const score = Math.round(clamp(100 - overlap * 0.55 - Math.max(0, routeDistance - 150) * 0.08 - invalid * 12, 28, 98)); els.flowScore.textContent = String(score); els.flowScore.style.color = score >= 80 ? "var(--success)" : score >= 62 ? "#f0bd5b" : "var(--danger)";
  }
  function overlapArea(a, b) { return Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y)); }
  function distance(a, b) { return pointDistance({ x: a.x + a.w / 2, y: a.y + a.h / 2 }, { x: b.x + b.w / 2, y: b.y + b.h / 2 }); }
  function pointDistance(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
  function bayCenter(item) { return { x: item.x + item.w / 2, y: item.y + item.h / 2 }; }

  function generateLayout(preset) {
    const previous = snapshot(); const order = geometry().orders[preset] || geometry().orders.narrative; const movable = activeZones().filter((item) => !item.fixed).sort((a, b) => (a.sequence || 99) - (b.sequence || 99)); movable.forEach((item, index) => { const targetBay = findBay(state.activeFloor, order[index % order.length]); if (targetBay) assignZoneToBay(item, targetBay, false, false); }); state.settings.layoutPreset = preset; pushHistory(previous); render(); saveState(); showToast(`${presetLabel(preset)} grundrissgebunden angewendet`);
  }

  function applyPlacementCommand() {
    const raw = els.placementCommand.value.trim(); if (!raw) { showToast("Bitte eine Platzierungsanweisung eingeben"); return; } const command = normalizeText(raw); let item = selectedZone(); if (!item) item = activeZones().map((zoneItem) => ({ item: zoneItem, score: keywordScore(command, normalizeText(zoneItem.name)) })).sort((a, b) => b.score - a.score)[0]?.item; if (!item || item.fixed) { showToast(item?.fixed ? "Diese Fläche ist als Gebäudebereich fixiert" : "Bitte zuerst eine Zone auswählen"); return; }
    if (command.includes("korridor") || command.includes("erschliessung")) showToast("Der Korridor ist geschützt – platziert wird in der nächstgelegenen Fassaden-Bay");
    const available = geometry().bays.filter((candidate) => !candidate.reserved && !["3f-hall", "3f-terrace"].includes(candidate.id)); const ranked = available.map((candidate) => ({ candidate, score: candidate.tags.reduce((score, tag) => score + (command.includes(normalizeText(tag)) ? normalizeText(tag).length : 0), 0) })).sort((a, b) => b.score - a.score); const targetBay = ranked[0]?.score > 0 ? ranked[0].candidate : findBay(state.activeFloor, item.bayId) || available[0]; const fill = ["fassade", "auffullen", "ausfullen", "komplett", "bis zum", "ganze ecke"].some((keyword) => command.includes(keyword)); const previous = snapshot(); assignZoneToBay(item, targetBay, fill, true); state.selectedId = item.id; pushHistory(previous); render(); saveState(); showToast(`${item.name} → ${targetBay.label}${fill ? " · vollständig gefüllt" : ""}`);
  }
  function keywordScore(command, name) { return name.split(/\s+/).filter((word) => word.length > 3 && command.includes(word)).reduce((sum, word) => sum + word.length, 0); }
  function normalizeText(value) { return String(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ß/g, "ss"); }

  function fitSelectedBay() { const item = selectedZone(); const targetBay = item && findBay(state.activeFloor, item.bayId); if (!item || !targetBay || item.fixed) return; const previous = snapshot(); item.fitBay = true; fitZoneToBay(item, state.activeFloor, true); pushHistory(previous); render(); saveState(); showToast(`${targetBay.label} vollständig belegt`); }

  function syncOverlayToImage() {
    const stageRect = els.planStage.getBoundingClientRect(); const naturalRatio = els.floorPlan.naturalWidth / els.floorPlan.naturalHeight; if (!naturalRatio || !stageRect.width || !stageRect.height) return; const stageRatio = stageRect.width / stageRect.height; let width; let height; let left; let top;
    if (stageRatio > naturalRatio) { height = stageRect.height; width = height * naturalRatio; left = (stageRect.width - width) / 2; top = 0; } else { width = stageRect.width; height = width / naturalRatio; left = 0; top = (stageRect.height - height) / 2; }
    [els.zoneLayer, els.routeLayer, els.buildingLayer].forEach((layer) => { layer.style.inset = "auto"; layer.style.left = `${left}px`; layer.style.top = `${top}px`; layer.style.width = `${width}px`; layer.style.height = `${height}px`; });
  }

  function addZone() { const previous = snapshot(); const availableBay = geometry().bays.find((candidate) => !candidate.reserved && !activeZones().some((item) => item.bayId === candidate.id)) || geometry().bays.find((candidate) => !candidate.reserved); const id = `${state.activeFloor.toLowerCase()}-custom-${Date.now()}`; const item = makeZone(id, "Neue Zone", 50, "scenario", null, availableBay.id, "Editierbare Planungszone.", "Benutzerdefinierte Zone; Anforderung bitte ergänzen."); fitZoneToBay(item, state.activeFloor, false); activeZones().push(item); state.selectedId = id; pushHistory(previous); render(); saveState(); showToast("Neue Zone in freie Grundriss-Bay gelegt"); }
  function deleteSelectedZone() { const item = selectedZone(); if (!item || item.fixed) return; const previous = snapshot(); activeFloor().zones = activeZones().filter((candidate) => candidate.id !== item.id); state.selectedId = null; pushHistory(previous); render(); saveState(); showToast("Zone gelöscht"); }
  function duplicateSelectedZone() { const item = selectedZone(); if (!item || item.fixed) return; const previous = snapshot(); const copy = clone(item); copy.id = `${item.id}-copy-${Date.now()}`; copy.name = `${item.name} – Kopie`; copy.sequence = null; copy.fitBay = false; const sourceBay = findBay(state.activeFloor, item.bayId); const targetBay = geometry().bays.filter((candidate) => !candidate.reserved).sort((a, b) => pointDistance(bayCenter(a), bayCenter(sourceBay)) - pointDistance(bayCenter(b), bayCenter(sourceBay))).find((candidate) => !activeZones().some((zoneItem) => zoneItem.bayId === candidate.id)) || sourceBay; copy.bayId = targetBay.id; fitZoneToBay(copy, state.activeFloor, false); activeZones().push(copy); state.selectedId = copy.id; pushHistory(previous); render(); saveState(); showToast("Zone dupliziert und in freie Bay gelegt"); }

  function updateSelectedFromForm(event) {
    const item = selectedZone(); if (!item) return; const previousArea = item.area; item.name = els.zoneName.value.trim() || "Unbenannte Zone"; item.category = els.zoneCategory.value; item.description = els.zoneDescription.value; item.sequence = Math.max(0, Number(els.zoneSequence.value) || 0) || null; item.shape = els.zoneShape.value; item.color = els.zoneColor.value;
    if (event?.target === els.zoneArea) { const nextArea = Math.max(1, Number(els.zoneArea.value) || 1); if (Math.abs(nextArea - previousArea) > 0.05) resizeZoneToArea(item, nextArea); }
    renderZoneList(); renderZones(); renderAreaSummary(); renderInspector(); updateRoute(); updateScore(); saveState();
  }

  function exportPlan() { const exportData = clone(state); exportData.exportedAt = new Date().toISOString(); exportData.source = "AGIBOT Shanghai Showroom Design Brief, September 2026"; const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = `agibot-shanghai-zoning-${new Date().toISOString().slice(0, 10)}.json`; document.body.append(anchor); anchor.click(); anchor.remove(); URL.revokeObjectURL(url); showToast("Planung als JSON exportiert"); }
  function importPlan(file) { const reader = new FileReader(); reader.onload = () => { try { const incoming = JSON.parse(reader.result); if (incoming?.version !== 2 || !incoming.floors?.["3F"] || !incoming.floors?.["4F"]) throw new Error("Ungültiges Planungsformat"); pushHistory(snapshot()); state = incoming; state.selectedId = null; render(); saveState(); showToast("Planung importiert"); } catch (error) { console.error(error); showToast("Import fehlgeschlagen – bitte V2-Planung verwenden"); } els.importInput.value = ""; }; reader.readAsText(file); }
  function resetPlan() { if (!window.confirm("Alle lokalen Änderungen auf den grundrissgebundenen Briefing-Stand zurücksetzen?")) return; pushHistory(snapshot()); state = clone(defaultState); render(); saveState(); showToast("Grundrissgebundener Briefing-Stand wiederhergestellt"); }
  function showToast(message) { clearTimeout(toastTimer); els.toast.textContent = message; els.toast.classList.add("is-visible"); toastTimer = window.setTimeout(() => els.toast.classList.remove("is-visible"), 2400); }
  function presetLabel(preset) { return { narrative: "Narrative Schleife", perimeter: "Perimeter-Parcours", islands: "Szenario-Inseln", hub: "Hub & Satelliten" }[preset]; }
  function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
  function roundTenth(value) { return Math.round(value * 10) / 10; }
  function escapeHtml(value) { return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;"); }
  function cssEscape(value) { return window.CSS?.escape ? window.CSS.escape(value) : value.replace(/[^a-zA-Z0-9_-]/g, "\\$&"); }

  els.floorTabs.forEach((tab) => tab.addEventListener("click", () => { state.activeFloor = tab.dataset.floor; state.selectedId = null; render(); saveState(); }));
  els.planStage.addEventListener("click", () => { state.selectedId = null; renderZoneList(); renderZones(); renderInspector(); });
  els.generateButton.addEventListener("click", () => generateLayout(els.layoutPreset.value));
  els.layoutPreset.addEventListener("change", () => { state.settings.layoutPreset = els.layoutPreset.value; els.layoutStatus.textContent = `${presetLabel(state.settings.layoutPreset)} · ${activeZones().length} Zonen · Kern geschützt`; saveState(); });
  els.shapeLanguage.addEventListener("change", () => { const previous = snapshot(); state.settings.shapeLanguage = els.shapeLanguage.value; pushHistory(previous); render(); saveState(); });
  els.routeToggle.addEventListener("click", () => { state.settings.routeVisible = !state.settings.routeVisible; render(); saveState(); });
  els.labelToggle.addEventListener("click", () => { state.settings.labelsVisible = !state.settings.labelsVisible; render(); saveState(); });
  els.applyCommandButton.addEventListener("click", applyPlacementCommand);
  els.placementCommand.addEventListener("keydown", (event) => { if (event.key === "Enter") { event.preventDefault(); applyPlacementCommand(); } });
  els.fitBayButton.addEventListener("click", fitSelectedBay);
  els.filterChips.forEach((chip) => chip.addEventListener("click", () => { state.filter = chip.dataset.filter; els.filterChips.forEach((item) => item.classList.toggle("is-active", item === chip)); renderZoneList(); renderZones(); }));
  [els.zoneName, els.zoneArea, els.zoneCategory, els.zoneDescription, els.zoneSequence, els.zoneShape, els.zoneColor].forEach((control) => control.addEventListener("change", updateSelectedFromForm));
  els.zoneName.addEventListener("input", updateSelectedFromForm); els.zoneDescription.addEventListener("input", updateSelectedFromForm);
  els.addZoneButton.addEventListener("click", addZone); els.deleteZoneButton.addEventListener("click", deleteSelectedZone); els.duplicateZoneButton.addEventListener("click", duplicateSelectedZone); els.exportButton.addEventListener("click", exportPlan);
  els.importInput.addEventListener("change", () => { const [file] = els.importInput.files; if (file) importPlan(file); });
  els.resetButton.addEventListener("click", resetPlan); els.undoButton.addEventListener("click", undo); els.redoButton.addEventListener("click", redo); els.floorPlan.addEventListener("load", syncOverlayToImage); window.addEventListener("resize", syncOverlayToImage); new ResizeObserver(syncOverlayToImage).observe(els.planStage);

  render();
})();
