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
    const voices = speechSynthesis.getVoices();

    if (!voices.length) return; // voices がまだ来ていなければ描画せず終了

    select.innerHTML = ""; // 初期化

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
            option.disabled = true;
        }

        select.appendChild(option);
    });

    // LocalStorageから復元
    const saved = localStorage.getItem("selectedCountry");
    if (saved && select.querySelector(`option[value="${saved}"]`)) {
        select.value = saved;
    }

    select.addEventListener("change", () => {
        localStorage.setItem("selectedCountry", select.value);
        console.log("国設定を保存:", select.value);
    });
}

// voices が変化したら描画（スマホ対応）
speechSynthesis.onvoiceschanged = populateVoiceList;

// PC向け：すでに voices があれば描画
populateVoiceList();