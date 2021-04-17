// highlight.js
document.querySelectorAll("pre").forEach(t => {
    hljs.highlightBlock(t)
}),
// summary
headings = document.querySelectorAll("main>article>div h2,main>article>div h3,main>article>div h4"),
summary = document.querySelector("aside>ul"),
document.querySelector("aside>ul>li:first-child").remove(),
url = window.location.href,
i=0,
headings.forEach(t => {
    tt = 'title' + i.toString(),
        t.setAttribute('id', tt),
        li = document.createElement("li"),
        a = document.createElement("a"),
        a.classList.add(tt, t.tagName.toUpperCase()), a.setAttribute("href", url + '#' + tt), a.innerText = t.innerText
    li.appendChild(a),
        summary.appendChild(li),
        ++i
}),
// on scroll active summary item
window.addEventListener('scroll', function(e) {
    headings.forEach(t => {
        if(window.scrollY >= (t.offsetTop - 50) & window.scrollY <= (t.offsetTop + 50)) {
            try {
                document.querySelector("aside>ul>li>a.active").classList.remove("active")
            } catch (error) {
                console.debug("No selected summary item found.")
            }
            document.querySelector('aside>ul>li>a.' + t.getAttribute("id")).classList.add("active")
        }
    })
});
// related articles
/*
article_tag = document.querySelector("main>article>span+div .tag:first-child").innerText,
article_keyword = article_tag ? article_tag : "nginx",
related_articles = document.querySelector("section[related] > div"),
related_article = document.querySelector("header form > div > div article"),
related_url = 'search?searchword=' + article_keyword + '&limit=6&areas[0]=blog',
load(related_articles, related_url, '.tm-main.tm-content.uk-width-medium-1-1'),
related_articles.style.display = "block";
*/