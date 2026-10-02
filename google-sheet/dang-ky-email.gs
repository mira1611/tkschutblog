/**
 * Thu email đăng ký "Thư chiều Chủ nhật" từ blog tkschut vào Google Sheet.
 * Cách dùng: xem HUONG-DAN-DANG-BAI.md, mục "Thu email đăng ký".
 */
const TEN_TRANG_TINH = 'Đăng ký';

function doPost(e) {
  const p = (e && e.parameter) || {};
  const email = String(p.email || '').trim().toLowerCase();

  // Bỏ qua bot (ô ẩn "website" chỉ bot mới điền) và email sai định dạng
  if (p.website || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return phanHoi({ ok: false });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = layTrangTinh();
    const daCo = sheet.getRange(2, 2, Math.max(sheet.getLastRow() - 1, 1), 1)
      .getValues().flat().map(String);
    if (!daCo.includes(email)) {
      sheet.appendRow([new Date(), email, p.trang || '']);
    }
  } finally {
    lock.releaseLock();
  }
  return phanHoi({ ok: true });
}

function layTrangTinh() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(TEN_TRANG_TINH);
  if (!sheet) {
    sheet = ss.insertSheet(TEN_TRANG_TINH);
    sheet.appendRow(['Thời gian', 'Email', 'Đăng ký từ trang']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function phanHoi(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Mở link /exec trên trình duyệt: thấy chữ "OK" là ứng dụng web đang chạy. */
function doGet() {
  return ContentService.createTextOutput('OK – tkschut blog');
}

/** Chọn hàm này và bấm ▶ Chạy trong Apps Script để thử ghi một dòng vào Sheet. */
function thuNghiem() {
  doPost({ parameter: { email: 'thu-nghiem@example.com', trang: 'chạy thử trong Apps Script' } });
}
