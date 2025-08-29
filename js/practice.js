// 練習するフレーズの保存
const a = document.querySelector('a[href="verbs.html"]');
a.addEventListener('click', function() {
    en = document.getElementById("en")
    ja = document.getElementById("ja")
    const savedPhrase = {
        en: en.textContent,
        ja: ja.textContent
    };
    localStorage.setItem("savedPhrase", JSON.stringify(savedPhrase));
    console.log("最新のフレーズを保存:", savedPhrase);
});