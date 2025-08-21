// ハンバーガーメニュー
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector("nav");

    hamburger.addEventListener("click", function () {
        this.classList.toggle("active"); // ハンバーガーアイコンの変化
        nav.classList.toggle("open"); // ナビゲーションメニューの開閉
    });
});