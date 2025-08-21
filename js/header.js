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
    </nav>
    `
}