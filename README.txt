Epic 26 — The Traveler's Codex
Web reader (box scaffold). Novel manuscript Draft 15, whole book.

OWNERSHIP (locked 24 Oct 2026)
  TE  = box scaffold only (this folder)
  MM  = GitHub Pages host/deploy under jonrock2012-erc (cookbook pattern)
  TE does NOT git init, push, create a GitHub repo, or deploy anywhere.
  Meta robots stays noindex,nofollow until Rock OK's public; MM flips later.

OPEN LOCALLY (no build step, no CDN)
  file://
    Open index.html in a browser (double-click or drag into a tab).
  http://
    From this folder:
      cd /workspace/epic26_reader
      python3 -m http.server 8765
    Then visit http://127.0.0.1:8765/

FILES
  index.html          shell + sticky header + noindex meta
  app.css             literary palette (dark band / warm paper)
  app.js              hash routes: #welcome #contents #ch/01 … #ch/13
  data.js             window.BOOK (generated — do not hand-edit)
  cover.jpg           Cover Rev A2 front (chrome / brand mark)
  cover_splash.jpg    Cover Rev A2 1728×2304 (welcome splash)
  plates/             per-chapter A2 heroes (one file each; 03/04/11 are storyboard panels)
  tools/build_data.py regenerates data.js from Draft 15 chapter files
  README.txt          this file

REBUILD data.js
  python3 /workspace/epic26_reader/tools/build_data.py
  Source chapters: /workspace/epic26/d15/ch/c01.txt … c13.txt
  (c01–c12 = Chapters One–Twelve; c13 = Acknowledgments)
  Each source line is LINE_NUMBER|text; the builder strips the N| prefix.

CONTENT
  Manuscript = Novel Draft 15, whole book, no holdbacks.
  Chrome title/subtitle: "Epic 26" / "The Traveler's Codex".
  Never-show items stay out of chrome/about/footer/meta only;
  D15 body is not cut for those rules.

ROUTES
  #welcome     cover splash, locked home summary, Begin reading
  #contents    table of contents
  #ch/01 … #ch/13   chapter / acknowledgments view
