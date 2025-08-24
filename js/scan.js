// HTML ファイル名（拡張子抜き）を取得
const fileName = location.pathname.split("/").pop().replace(".html", "");
const ul = document.getElementById("phrase-list");  // id="phrase-list" を取得
fetch(`./json/${fileName}.json`)  // HTML名.json を読み込む
    .then(res => res.json())
    .then(data => {
        function renderList() {
            const selectedCategory = document.querySelector('input[name="category"]:checked').value;
            ul.innerHTML = ''; // 一旦クリア
            data.forEach(phrase => {
                if (phrase.category === selectedCategory) {
                    const li = document.createElement('li');
                    li.id = 'phrase';
                    li.innerHTML = `
                        ${phrase.en}
                        <span class="play-sound" style="float:right; cursor:pointer;">🔊</span>
                    `;
                    ul.appendChild(li);

                    // li全体をクリック → ポップアップ表示
                    li.onclick = function (event) {
                        if (event.target.classList.contains('play-sound')) return;

                        document.getElementById("en").textContent = phrase.en;
                        document.getElementById("ja").textContent = phrase.ja;
                        document.getElementById("popup").style.display = "flex";

                        const ulEx = document.getElementById("example");
                        ulEx.innerHTML = "";
                        if (phrase.examples) {
                            phrase.examples.forEach(ex => {
                                const liEx = document.createElement('li');
                                liEx.innerHTML = `
                                    <p class="ex_en">${ex.en}</p>
                                    <p class="ex_ja">${ex.ja}</p>
                                `;
                                ulEx.appendChild(liEx);
                            });
                        }
                    };

                    // 音声マーククリック → 読み上げ
                    li.querySelector('.play-sound').addEventListener('click', function () {
                        // () 内の文字を削除
                        const textToSpeak = phrase.en.replace(/\(.*?\)/g, '').trim();
                        const utterance = new SpeechSynthesisUtterance(textToSpeak);
                        utterance.lang = localStorage.getItem("selectedCountry") || "en-US";
                        speechSynthesis.speak(utterance);
                    });
                }
            });
        }

        renderList(); // 初期表示

        // ラジオボタン切り替え時
        document.querySelectorAll('input[name="category"]').forEach(radio => {
            radio.addEventListener('change', renderList);
        });
    })
    .catch(err => console.error(`${fileName}.json の読み込みに失敗しました:`, err));

// 背景クリックで閉じる
document.getElementById("popup").addEventListener("click", function (event) {
    if (event.target === this) {
        this.style.display = "none";
    }
});
