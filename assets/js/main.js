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
    var msg = document.getElementById('msg');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = email.value.trim();
      msg.textContent = /^\S+@\S+\.\S+$/.test(v)
        ? 'Cảm ơn bạn! Hẹn gặp bạn vào chiều Chủ nhật.'
        : 'Email chưa đúng, bạn kiểm tra lại giúp mình nhé.';
    });
    email.addEventListener('input', function () { msg.textContent = ''; });
  }
})();
