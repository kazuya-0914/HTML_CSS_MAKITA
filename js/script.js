import { fetchWeatherData } from "./weather.js";
import { DeepL } from "./translation.js";

let html = '';
const domCode = document.getElementById('dom-code');

// ----- 教材コード

try {
  const button = document.getElementById('check-btn');
  button.addEventListener('click', validation);

  function validation() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const output = document.getElementById('output');

  let errors = [];

  if (name.trim() === '') {
    errors.push('お名前を入力してください。');
  } else if (name.length > 10) {
    errors.push('お名前が10文字を超えています。');
  }

  const emailPattern = /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+$/;
  if (!emailPattern.test(email)) {
    errors.push('メールアドレスの入力形式が正しくありません。');
  }

  if (errors.length > 0) {
    // 配列を改行区切りの文字列に変換して画面に表示
    output.innerHTML = errors.join('<br>');
  } else {
    output.innerHTML = ''; // エラーメッセージをクリア
    alert('バリデーションOKです。');
  }
  }

} catch(e) {
  const deepLmsg = await DeepL(e.message);
  html += `<div class="text-danger">【エラー】${deepLmsg}</div>`;
}

// -----
// DOM出力
domCode.innerHTML = html;

// 天気予報
// fetchWeatherData();

const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', () => {
  location.reload();
});