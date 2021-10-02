// highlight.js
document.querySelectorAll("pre").forEach(t => {
    hljs.highlightBlock(t)
}),
// summary
headings = document.querySelectorAll(".article article>div h2,.article article>div h3,main>article>div h4"),
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

document.addEventListener("DOMContentLoaded", function(event) {
    var changelog_list = document.querySelector(".changelog ul");
    var post_url = window.location.href.split("/")[4];
    var post_date = document.querySelector(".metainfo time").getAttribute("datetime");
    var api_url = `https://api.github.com/repos/linuxhubit/linuxhub.it/commits?path=_posts/${post_date}-${post_url}.md`;
    fetch(api_url).then(function(response) {
        var commits = response.json();
        commits.then(function(commits) {
            for (var i = 0; i < commits.length; i++) {
                var commit = commits[i];
                var li = document.createElement("li");
                var a = document.createElement("a");
                var commit_date = new Date(commit.commit.author.date);
                a.innerHTML = `
                    <img src="${commit.author.avatar_url}" alt="${commit.commit.author.name}">
                    <span class="date">${commit_date.toLocaleDateString()} ${commit_date.toLocaleTimeString()}</span>
                `;
                a.setAttribute("href", commit.html_url);
                a.setAttribute("target", "_blank");
                li.appendChild(a);
                changelog_list.appendChild(li);
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function(event) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        with (document.getElementById("hljs_theme")) {
            href = href.replace("solarized-light.min.css", "solarized-dark.min.css");
        }
    }
});