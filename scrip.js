function tinhNgayDe() {
  const input = document.getElementById("ngay_phoi").value.trim();
  if (!input) {
    document.getElementById("result").innerText =
      "Vui lòng nhập ngày phối giống!";
    return;
  }
  // Kiểm tra và chuyển đổi định dạng dd/mm/yyyy
  const parts = input.split("/");
  if (parts.length !== 3) {
    document.getElementById("result").innerText =
      "Định dạng ngày không hợp lệ!";
    return;
  }
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Tháng trong JS bắt đầu từ 0
  const year = parseInt(parts[2], 10);
  const date = new Date(year, month, day);
  if (
    isNaN(date.getTime()) ||
    date.getDate() !== day ||
    date.getMonth() !== month ||
    date.getFullYear() !== year
  ) {
    document.getElementById("result").innerText = "Ngày không hợp lệ!";
    return;
  }
  // Thêm 114 ngày
  date.setDate(date.getDate() + 114);
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  document.getElementById(
    "result"
  ).innerText = `Ngày dự kiến lợn đẻ: ${d}/${m}/${y}`;
}
