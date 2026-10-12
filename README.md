# AgiBot Shanghai Spatial Planner

Browser-based planning tool for the Shanghai showroom on levels 3F and 4F. It turns the supplied floor plans and bilingual design brief into a movable zoning study for early concept and visitor-flow planning.

## What is included

- Separate, scaled planning canvases for Shanghai 3F and 4F
- Brief-derived zone library with area budgets and requirements
- Drag-and-drop placement and resize handles
- Editable zone names, areas, descriptions, sequence and shape language
- Four automatic zoning studies:
  - Narrative Loop
  - Perimeter Flow
  - Scenario Islands
  - Hub & Satellites
- Four visual shape languages:
  - Soft Tech
  - Precise Modules
  - Organic Islands
  - Flow Capsules
- Visitor-route overlay, overlap/flow heuristics and area accounting
- Undo/redo, local autosave, JSON export/import and custom zones

## Run locally

No build step or package installation is required. Serve the repository with any static HTTP server, for example:

```powershell
python -m http.server 8765
```

Then open `http://localhost:8765`.

## Planning basis

The initial zoning data is based on the supplied Shanghai/Shenzhen Showroom Design Brief and the Shanghai 3F/4F plan PDFs. The configured floor totals are:

| Floor | Planning scope | Area |
| --- | --- | ---: |
| 3F | Exhibition, multifunction hall and outdoor terrace | 2,082.8 m² |
| 4F | Scenario innovation center exhibition | 1,632.4 m² |

The individual thematic areas are an editable working allocation. They are not a construction survey or a substitute for verified CAD measurements, code review, accessibility planning, fire egress or structural/MEP coordination.

## Data and privacy

Planning state is stored only in the current browser via `localStorage`. Exported JSON files can be used for reviews or transferred between browsers. No analytics, backend or external API is used.

