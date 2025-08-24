const header = document.getElementById('header');
if( header != null) {
    header.innerHTML = `
    <div><a href="/EnglishMaster/index.html" id="title">English</a></div>
    <nav>
        <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul>
            <li><a href="/EnglishMaster/index.html">ホーム</a></li>
        </ul>
        <label for="country">発音</label>
        <select id="country"></select>
    </nav>
    `
}

function populateVoiceList() {
    const select = document.getElementById("country");
    select.innerHTML = ""; // 初期化
    const voices = speechSynthesis.getVoices();

    const langs = {
        "en-US": "アメリカ英語",
        "en-GB": "イギリス英語",
        "en-AU": "オーストラリア英語",
        "en-CA": "カナダ英語"
    };

    Object.entries(langs).forEach(([code, label]) => {
        const option = document.createElement("option");
        option.value = code;
        option.textContent = label;

        // voices に存在する場合のみ有効
        if (!voices.some(v => v.lang === code)) {
            option.disabled = true; // 選択不可に
        }

        select.appendChild(option);
    });

    // LocalStorageから選択を復元
    const saved = localStorage.getItem("selectedCountry");
    if (saved && select.querySelector(`option[value="${saved}"]`)) {
        select.value = saved;
    }

    select.addEventListener("change", () => {
        localStorage.setItem("selectedCountry", select.value);
        console.log("国設定を保存:", select.value);
    });
}

// ページ読み込み時に一度描画
populateVoiceList();

// 音声リストが変化したら再描画（非同期対応）
speechSynthesis.onvoiceschanged = populateVoiceList;