function tinhNgayDe() {
  const input = document.getElementById("ngay_phoi").value.trim();
  const resultEl = document.getElementById("result");

  if (!input) {
    resultEl.innerText = "Vui lòng nhập ngày phối giống!";
    return;
  }

  const parts = input.split("/");
  if (parts.length !== 3) {
    resultEl.innerText = "Định dạng ngày không hợp lệ!";
    return;
  }

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  const date = new Date(year, month, day);

  if (isNaN(date.getTime())) {
    resultEl.innerText = "Ngày không hợp lệ!";
    return;
  }

  // Lợn mang thai ~114 ngày
  date.setDate(date.getDate() + 114);

  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();

  resultEl.innerHTML = `
    <div>
      <strong>Ngày dự kiến lợn đẻ: ${d}/${m}/${y}</strong><br>
      <span style="color:#c0392b; font-size:18px; margin-top:10px">
        Vui lòng chú ý những ngày gần ngày đẻ trước 1–2 ngày
      </span>
    </div>
  `;
}

/*-------------------------- AI DỰ ĐOÁN --------------------------*/
async function duDoanAI() {
  const breed = document.getElementById("breed").value;
  const parity = document.getElementById("parity").value;
  const weight = document.getElementById("weight").value;
  const previous = document.getElementById("previous").value;

  const API_KEY = "AIzaSyD3CPc7w9OwktsY3Roop9JNrpNANoFhEsE"; // API của bạn

  document.getElementById("ai_result").innerText = "Đang dự đoán...";

  const prompt = `
Bạn là chuyên gia chăn nuôi lợn tại Việt Nam.

Thông tin:
- Giống lợn: ${breed}
- Lứa thứ: ${parity}
- Cân nặng lợn mẹ: ${weight} kg
- Số con lứa trước: ${previous}

Hãy dự đoán số lợn con sinh ra.

Trả lời đúng định dạng:
Dự đoán: XX–YY con.
Khuyến nghị: ...
`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
        API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("API RESPONSE:", data);

    if (!data.candidates || !data.candidates.length) {
      throw new Error("Không có candidates từ API");
    }

    const text =
      data.candidates[0].content.parts[0].text || "Không có nội dung trả về";

    document.getElementById("ai_result").innerText = text;
  } catch (error) {
    document.getElementById("ai_result").innerText = "Lỗi AI: " + error.message;
  }
}

document.getElementById("result").innerHTML = `
    <div>
      <strong>Ngày dự kiến lợn đẻ: ${d}/${m}/${y}</strong><br />
      <span style="color:#c0392b; font-size:14px;">
        Vui lòng chú ý những ngày gần ngày đẻ trước 1–2 ngày
      </span>
    </div>
  `;
