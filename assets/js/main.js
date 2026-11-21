---
# Jekyll xử lý file này để lấy link Google Sheet từ _config.yml
---
(function () {
  var grid = document.getElementById('grid');
  if (grid) {
    var PAGE = 12;
    var posts = Array.prototype.slice.call(grid.querySelectorAll('.post'));
    var chips = document.querySelectorAll('.chip');
    var btn = document.getElementById('loadMore');
    var filter = 'all';
    var shown = PAGE;

    function render() {
      var matched = 0;
      posts.forEach(function (p) {
        var ok = filter === 'all' || p.dataset.c === filter;
        if (ok) matched++;
        p.hidden = !ok || matched > shown;
      });
      btn.hidden = matched <= shown;
    }

    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        chips.forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        c.setAttribute('aria-pressed', 'true');
        filter = c.dataset.f;
        shown = PAGE;
        render();
      });
    });

    btn.addEventListener('click', function () {
      shown += PAGE;
      render();
    });

    render();
  }

  var form = document.getElementById('sub');
  if (form) {
    var email = document.getElementById('email');
    var trap = document.getElementById('website');
    var msg = document.getElementById('msg');
    var btnSub = form.querySelector('button');
    var endpoint = form.dataset.endpoint || '{{ site.newsletter_sheet_url }}';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = email.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        msg.textContent = 'Email chưa đúng, bạn kiểm tra lại giúp mình nhé.';
        email.focus();
        return;
      }
      if (!endpoint) {
        msg.textContent = 'Cảm ơn bạn! Hẹn gặp bạn vào chiều Chủ nhật.';
        return;
      }
      btnSub.disabled = true;
      msg.textContent = 'Đang gửi…';
      var body = new URLSearchParams({ email: v, website: trap ? trap.value : '', trang: location.href });
      fetch(endpoint, { method: 'POST', mode: 'no-cors', body: body })
        .then(function () {
          msg.textContent = 'Cảm ơn bạn đã đăng ký! Hẹn gặp bạn vào chiều Chủ nhật.';
          form.reset();
        })
        .catch(function () {
          msg.textContent = 'Chưa gửi được, bạn kiểm tra mạng rồi thử lại nhé.';
        })
        .finally(function () { btnSub.disabled = false; });
    });
    email.addEventListener('input', function () { msg.textContent = ''; });
  }
})();

/* Hành trình: sổ ảnh lật trang 3D */
(function () {
  var root = document.querySelector('.journey');
  if (!root) return;
  var stage = root.querySelector('.jr-stage');
  var pages = Array.prototype.slice.call(root.querySelectorAll('.jr-page'));
  var countEl = root.querySelector('.jr-count');
  var prev = root.querySelector('.jr-prev');
  var next = root.querySelector('.jr-next');
  var n = pages.length;
  if (!n) return;

  // Bố cục ảnh cho 1–5 tấm: [trái, trên, rộng, cao] theo %
  var LAYOUTS = {
    1: [[[10, 2, 80, 94]], [[14, 4, 72, 90]]],
    2: [[[2, 6, 52, 82], [44, 12, 52, 82]], [[4, 0, 58, 60], [36, 36, 60, 62]]],
    3: [[[2, 4, 46, 56], [50, 0, 46, 50], [22, 44, 54, 54]], [[0, 10, 42, 78], [38, 0, 34, 50], [40, 46, 58, 52]]],
    4: [[[2, 2, 46, 46], [52, 4, 44, 44], [4, 52, 44, 46], [50, 50, 46, 48]], [[0, 8, 38, 58], [34, 0, 34, 44], [66, 10, 34, 54], [22, 50, 56, 48]]],
    5: [[[0, 2, 36, 46], [34, 0, 32, 40], [66, 4, 34, 46], [6, 50, 44, 48], [50, 46, 48, 52]], [[2, 0, 42, 40], [46, 4, 50, 38], [0, 44, 30, 54], [30, 40, 36, 58], [64, 46, 36, 50]]]
  };
  function rand(a, b) { return a + Math.random() * (b - a); }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  pages.forEach(function (pg) {
    var photos = Array.prototype.slice.call(pg.querySelectorAll('.jr-photo'));
    var k = Math.min(Math.max(photos.length, 1), 5);
    var options = LAYOUTS[k];
    var slots = shuffle(options[Math.floor(Math.random() * options.length)].slice());
    photos.forEach(function (ph, i) {
      var s = slots[i];
      if (!s) { ph.hidden = true; return; }
      ph.style.left = (s[0] + rand(-1.5, 1.5)) + '%';
      ph.style.top = (s[1] + rand(-1.5, 1.5)) + '%';
      ph.style.width = s[2] + '%';
      ph.style.height = s[3] + '%';
      ph.style.zIndex = i + 1;
      ph.style.setProperty('--r', rand(-5, 5).toFixed(1) + 'deg');
      ph.style.setProperty('--tr', rand(-8, 8).toFixed(1) + 'deg');
    });
  });

  var pos = 0;
  function width() { return pages[0].offsetWidth || 300; }

  function render() {
    var W = width();
    var reach = W * 0.62;
    var step = Math.max(9, Math.min(22, W * 0.045));
    pages.forEach(function (pg, i) {
      var d = i - pos;
      var a = Math.abs(d);
      var s = d < 0 ? -1 : 1;
      var x, ang, z;
      if (a <= 1) { x = s * a * reach; ang = -s * a * 72; z = -a * 140; }
      else { x = s * (reach + (a - 1) * step); ang = -s * 72; z = -140 - (a - 1) * 12; }
      pg.style.transform = 'translateX(' + x.toFixed(1) + 'px) translateZ(' + z.toFixed(1) + 'px) rotateY(' + ang.toFixed(1) + 'deg)';
      pg.style.zIndex = 1000 - Math.round(a * 10);
      pg.style.setProperty('--shade', Math.min(a, 1) * 0.18 + Math.max(a - 1, 0) * 0.04);
      pg.style.visibility = a > 9 ? 'hidden' : 'visible';
      pg.setAttribute('aria-hidden', Math.round(pos) === i ? 'false' : 'true');
    });
    var cur = Math.round(Math.min(Math.max(pos, 0), n - 1));
    countEl.textContent = cur + 1;
    prev.disabled = cur <= 0;
    next.disabled = cur >= n - 1;
  }

  function go(i) {
    pos = Math.min(Math.max(i, 0), n - 1);
    render();
  }

  prev.addEventListener('click', function () { go(Math.round(pos) - 1); });
  next.addEventListener('click', function () { go(Math.round(pos) + 1); });
  stage.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(Math.round(pos) - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(Math.round(pos) + 1); }
  });

  // Kéo / vuốt
  var startX = 0, startPos = 0, dragging = false, moved = false, lastX = 0, lastT = 0, vel = 0;
  stage.addEventListener('pointerdown', function (e) {
    if (e.button !== 0) return;
    dragging = true; moved = false;
    startX = lastX = e.clientX; startPos = pos; lastT = performance.now(); vel = 0;
  });
  window.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var dx = e.clientX - startX;
    if (!moved && Math.abs(dx) > 6) { moved = true; stage.classList.add('dragging'); try { stage.setPointerCapture(e.pointerId); } catch (err) {} }
    if (!moved) return;
    var now = performance.now();
    vel = (e.clientX - lastX) / Math.max(now - lastT, 1);
    lastX = e.clientX; lastT = now;
    pos = Math.min(Math.max(startPos - dx / (width() * 0.62), -0.35), n - 0.65);
    render();
  });
  function end() {
    if (!dragging) return;
    dragging = false;
    stage.classList.remove('dragging');
    if (!moved) return;
    var target = Math.round(pos);
    if (target === Math.round(startPos) && Math.abs(vel) > 0.35) target += vel < 0 ? 1 : -1;
    go(target);
  }
  window.addEventListener('pointerup', end);
  window.addEventListener('pointercancel', end);

  // Bấm vào trang bên cạnh để lật tới trang đó; chặn link khi vừa kéo
  pages.forEach(function (pg, i) {
    pg.addEventListener('click', function (e) {
      if (moved) { e.preventDefault(); moved = false; return; }
      if (i !== Math.round(pos)) { e.preventDefault(); go(i); }
    });
  });

  // Cuộn ngang bằng touchpad
  var wheelLock = 0;
  stage.addEventListener('wheel', function (e) {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || Math.abs(e.deltaX) < 12) return;
    e.preventDefault();
    var now = Date.now();
    if (now - wheelLock < 450) return;
    wheelLock = now;
    go(Math.round(pos) + (e.deltaX > 0 ? 1 : -1));
  }, { passive: false });

  window.addEventListener('resize', render);
  render();
})();
