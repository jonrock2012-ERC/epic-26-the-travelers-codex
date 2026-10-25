(function () {
  'use strict';
  var BOOK = window.BOOK || { title: 'Epic 26', subtitle: "The Traveler's Codex", chapters: [] };
  var CH = BOOK.chapters || [];
  var BY = {};
  CH.forEach(function (c) { BY[c.id] = c; });
  var app = document.getElementById('app');

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function setNav(which, chapterLabel) {
    var cover = document.getElementById('nav-cover');
    var contents = document.getElementById('nav-contents');
    var chapter = document.getElementById('nav-chapter');
    cover.classList.toggle('on', which === 'welcome');
    contents.classList.toggle('on', which === 'contents');
    if (which === 'chapter' && chapterLabel) {
      chapter.hidden = false;
      chapter.textContent = chapterLabel;
      chapter.classList.add('on');
      // keep href pointing at current hash
      chapter.setAttribute('href', location.hash || '#contents');
    } else {
      chapter.hidden = true;
      chapter.classList.remove('on');
      chapter.textContent = 'Chapter';
    }
  }

  // Locked 25 Oct 2026. Exact words — do not paraphrase.
  var HOME_SUMMARY = {
    title: "Epic 26: The Traveler's Codex",
    author: "Jon Rock Carter \u00b7 The Alchemist",
    paragraphs: [
      "For thirty-three years he has driven the night roads, carrying two things he cannot explain: a string of small dark bells that have never made a sound, and an unopened letter in a woman's hand.",
      "Then one evening he leaves his load and walks. The sky splits, the bells ring, and he remembers a wall above a rising sea, a city's last day, and his own voice shouting warnings that saved no one.",
      "Others are remembering too. They failed together once. Now the old breaking is returning.",
      "This time they will not stand on a wall. They will open a gate and set a table."
    ],
    tagline: "A mythic novel about memory, failure, and the long road home."
  };

  function homeSummary() {
    var h = '<div class="home-summary">';
    h += '<p class="sum-title">' + esc(HOME_SUMMARY.title) + '</p>';
    h += '<p class="sum-author">' + esc(HOME_SUMMARY.author) + '</p>';
    HOME_SUMMARY.paragraphs.forEach(function (p) {
      h += '<p>' + esc(p) + '</p>';
    });
    h += '<p class="sum-tagline">' + esc(HOME_SUMMARY.tagline) + '</p>';
    h += '</div>';
    return h;
  }

  function welcome() {
    setNav('welcome');
    document.title = BOOK.title + ' — ' + BOOK.subtitle;
    var h = '<section class="welcome" aria-labelledby="wt">';
    h += '<img class="cover" src="cover_splash.jpg" alt="Cover of ' + esc(BOOK.title) + ': ' + esc(BOOK.subtitle) + '">';
    h += '<p class="tag">A novel</p>';
    h += '<h1 id="wt">' + esc(BOOK.title) + '</h1>';
    h += '<p class="sub">' + esc(BOOK.subtitle) + '</p>';
    h += homeSummary();
    h += '<div class="cta">';
    h += '<a class="btn" href="#ch/01">Begin reading</a>';
    h += '<a class="btn alt" href="#contents">Contents</a>';
    h += '</div>';
    h += '<div class="rule" aria-hidden="true"></div>';
    h += '</section>';
    app.innerHTML = h;
    window.scrollTo(0, 0);
  }

  function contents() {
    setNav('contents');
    document.title = 'Contents · ' + BOOK.title;
    var h = '<section class="toc-wrap" aria-labelledby="ct">';
    h += '<h1 id="ct">Contents</h1>';
    h += '<p class="lead">' + esc(BOOK.title) + ' — ' + esc(BOOK.subtitle) + '</p>';
    h += '<ol class="toc">';
    CH.forEach(function (c) {
      var isAck = !c.title || /^acknowledgments$/i.test(c.number);
      var label = c.title ? c.title : c.number;
      var num = c.title ? c.number : '';
      h += '<li' + (isAck ? ' class="ack"' : '') + '>';
      h += '<a href="#ch/' + esc(c.id) + '">';
      if (num) h += '<span class="num">' + esc(num) + '</span>';
      h += '<span class="ttl">' + esc(label) + '</span>';
      h += '</a></li>';
    });
    h += '</ol></section>';
    app.innerHTML = h;
    window.scrollTo(0, 0);
  }

  function renderBody(paragraphs) {
    var html = '';
    var prevBreak = true; // first para after title: no indent
    paragraphs.forEach(function (p) {
      if (p == null) return;
      var t = String(p);
      if (t.trim() === '') {
        html += '<p class="blank" aria-hidden="true"></p>';
        prevBreak = true;
        return;
      }
      if (/^\*\s*\*\s*\*$/.test(t.trim())) {
        html += '<p class="break" aria-hidden="true">* * *</p>';
        prevBreak = true;
        return;
      }
      html += '<p' + (prevBreak ? ' class="after-break"' : '') + '>' + esc(t) + '</p>';
      prevBreak = false;
    });
    return html;
  }

  function chapterView(c) {
    var idx = CH.indexOf(c);
    var prev = idx > 0 ? CH[idx - 1] : null;
    var next = idx < CH.length - 1 ? CH[idx + 1] : null;
    var short = c.title ? c.number.replace(/^Chapter\s+/i, 'Ch. ') : c.number;
    setNav('chapter', short);
    document.title = (c.title || c.number) + ' · ' + BOOK.title;

    var h = '<div class="toolbar">';
    h += '<a class="btn alt" href="#contents">&larr; Contents</a>';
    h += '<span class="spacer"></span>';
    h += '</div>';
    h += '<article class="chapter">';
    h += '<p class="crumb">' + esc(BOOK.title) + '</p>';
    if (c.title) {
      h += '<p class="ch-label">' + esc(c.number) + '</p>';
      h += '<h1>' + esc(c.title) + '</h1>';
    } else {
      h += '<h1>' + esc(c.number) + '</h1>';
    }
    if (c.image) {
      var alt = c.title || c.number || 'Chapter';
      h += '<img class="chapter-hero" src="' + esc(c.image) + '" alt="' + esc(alt) + '">';
    }
    h += '<div class="body">' + renderBody(c.paragraphs || []) + '</div>';
    h += '<nav class="navrow" aria-label="Chapter navigation">';
    if (prev) {
      h += '<a class="btn alt" href="#ch/' + esc(prev.id) + '">&larr; ' + esc(prev.title ? prev.number.replace(/^Chapter\s+/i, 'Ch. ') : prev.number) + '</a>';
    } else {
      h += '<span class="btn alt is-disabled" aria-disabled="true">&larr; Previous</span>';
    }
    if (next) {
      h += '<a class="btn" href="#ch/' + esc(next.id) + '">' + esc(next.title ? next.number.replace(/^Chapter\s+/i, 'Ch. ') : next.number) + ' &rarr;</a>';
    } else {
      h += '<span class="btn is-disabled" aria-disabled="true">Next &rarr;</span>';
    }
    h += '</nav></article>';
    app.innerHTML = h;
    window.scrollTo(0, 0);
  }

  function route() {
    var h = decodeURIComponent((location.hash || '').replace(/^#/, ''));
    if (!h || h === 'welcome') return welcome();
    if (h === 'contents' || h === 'toc') return contents();
    var m = /^ch\/(\d{1,2})$/i.exec(h);
    if (m) {
      var id = m[1].length === 1 ? '0' + m[1] : m[1];
      var c = BY[id];
      if (c) return chapterView(c);
      app.innerHTML = '<p>Chapter not found. <a href="#contents">Back to contents</a></p>';
      return;
    }
    welcome();
  }

  window.addEventListener('hashchange', route);
  route();
})();
