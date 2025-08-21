document.querySelectorAll('.phrase-list').forEach(section => {
    const jsonFile = section.id; // idがファイル名
    fetch(`./json/${jsonFile}`)  // JSON を一度読み込んで保持
        .then(res => res.json())
        .then(data => {
            function renderList() {  // ラジオボタンの選択によって表示を更新
                const selectedCategory = document.querySelector('input[name="category"]:checked').value;
                section.innerHTML = ''; // 一旦クリア

                // ulを作る
                const ul = document.createElement('ul');
                section.appendChild(ul);

                data.forEach(phrase => {
                    if (phrase.category === selectedCategory) {
                        const li = document.createElement('li');
                        li.classList.add('phrase');
                        li.innerHTML = `<p>${phrase.en}</p>`;
                        ul.appendChild(li);

                        li.onclick = function () {  // ポップアップ表示
                            document.getElementById("en").textContent = phrase.en;
                            document.getElementById("ja").textContent = phrase.ja;
                            document.getElementById("popup").style.display = "flex";
                            const ul = document.getElementById("example");
                            ul.innerHTML = ""; // クリックするたびにリストをリセット
                            if (phrase.examples) {
                                phrase.examples.forEach(ex => {
                                    const li = document.createElement('li');
                                    li.innerHTML = `
                                        <p class="ex_en">${ex.en}</p>
                                        <p class="ex_ja">${ex.ja}</p>
                                    `;
                                    ul.appendChild(li);
                                });
                            }
                        };
                    }
                });
            }
            renderList();  // 初期表示
            // ラジオボタン切り替え時に更新
            document.querySelectorAll('input[name="category"]').forEach(radio => {
                radio.addEventListener('change', renderList);
            });
        })
        .catch(err => console.error(`${jsonFile} の読み込みに失敗しました:`, err));
});

// 背景クリックで閉じる
document.getElementById("popup").addEventListener("click", function (event) {
    if (event.target === this) { // popup-contentの外側がクリックされた場合のみ閉じる
        this.style.display = "none";
    }
});
