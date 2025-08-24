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
    // 表示したい言語のリスト
    const langs = {
        "en-US": "アメリカ英語",
        "en-GB": "イギリス英語",
        "en-AU": "オーストラリア英語",
        "en-CA": "カナダ英語"
    };

    // 実際に voices に存在するものだけ option を作る
    Object.entries(langs).forEach(([code, label]) => {
        if (voices.some(v => v.lang === code)) {
            const option = document.createElement("option");
            option.value = code;
            option.textContent = label;
            select.appendChild(option);
        }
    });

    // LocalStorageから選択を復元
    const saved = localStorage.getItem("selectedCountry");
    if (saved && select.querySelector(`option[value="${saved}"]`)) {
        select.value = saved;
    }

    // 選択変更を保存
    select.addEventListener("change", () => {
        localStorage.setItem("selectedCountry", select.value);
        console.log("国設定を保存:", select.value);
    });
}

// 音声リストは非同期で読み込まれる場合があるのでイベントを使う
speechSynthesis.onvoiceschanged = populateVoiceList();