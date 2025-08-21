document.querySelectorAll('.phrase-list').forEach(section => {
    const jsonFile = section.id; // idがファイル名
    fetch(`./json/${jsonFile}`)
        .then(res => res.json())
        .then(data => {
        data.forEach(phrase => {
            const phraseSection = document.createElement('section');
            const phraseDiv = document.createElement('div');
            phraseDiv.classList.add('phrase');
            phraseDiv.innerHTML = `
                <p class="en">${phrase.en}</p>
                <p class="ja">${phrase.ja}</p>
            `;
            phraseSection.appendChild(phraseDiv);

            const ul = document.createElement('ul');
            ul.classList.add('example-sentence');
            phrase.examples.forEach(ex => {
            const li = document.createElement('li');
            li.innerHTML = `
                <p class="en">${ex.en}</p>
                <p class="ja">${ex.ja}</p>
            `;
            ul.appendChild(li);
            });

            phraseSection.appendChild(ul);
            section.appendChild(phraseSection);
        });
        })
        .catch(err => console.error(`${jsonFile} の読み込みに失敗しました:`, err));
    });