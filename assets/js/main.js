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
