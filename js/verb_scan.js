document.querySelectorAll('.verb-list').forEach(section => {
    const jsonFile = section.id; // idがファイル名

    // JSON を一度読み込んで保持
    fetch(`./json/${jsonFile}`)
        .then(res => res.json())
        .then(data => {
            // ラジオボタンの選択によって表示を更新
            function renderList() {
                const selectedCategory = document.querySelector('input[name="category"]:checked').value;
                section.innerHTML = ''; // 一旦クリア
                data.forEach(phrase => {
                    if (phrase.category === selectedCategory) {
                        const phraseSection = document.createElement('section');
                        const phraseDiv = document.createElement('div');
                        phraseDiv.classList.add('phrase');
                        phraseDiv.innerHTML = `
                            <p class="en">${phrase.en}</p>
                            <p class="ja">${phrase.ja}</p>
                        `;
                        phraseSection.appendChild(phraseDiv);
                        section.appendChild(phraseSection);
                    }
                });
            }

            // 初期表示
            renderList();

            // ラジオボタン切り替え時に更新
            document.querySelectorAll('input[name="category"]').forEach(radio => {
                radio.addEventListener('change', renderList);
            });
        })
        .catch(err => console.error(`${jsonFile} の読み込みに失敗しました:`, err));
});