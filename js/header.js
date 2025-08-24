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
        <select id="country">
            <option value="en-US">アメリカ英語</option>
            <option value="en-GB">イギリス英語</option>
            <option value="en-AU">オーストラリア英語</option>
            <option value="en-CA">カナダ英語</option>
        </select>
    </nav>
    `
}

const countrySelect = document.getElementById("country");
// ページ読み込み時に復元
const savedCountry = localStorage.getItem("selectedCountry");
if (savedCountry) {
    countrySelect.value = savedCountry;
}
// 選択変更時に保存
countrySelect.addEventListener("change", () => {
    localStorage.setItem("selectedCountry", countrySelect.value);
    console.log("国設定を保存:", countrySelect.value);
});