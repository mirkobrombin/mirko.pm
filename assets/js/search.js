search_field = document.querySelector("header input[type='search']"),
header = document.querySelector("header"),
search_results = document.querySelector("header form > div"),
tags_results = document.querySelector("header form > section"),
search_result = document.querySelector("header form > div > div article"),
search_field.addEventListener("keyup", search),
search_keywords = "";

var taglist = [
    'centos',
    'fedora',
    'ubuntu',
    'debian',
    'nginx',
    'apache',
    'nextcloud',
    'nodejs',
    'mongodb',
    'chromeos',
    'letsencrypt',
    'netcore',
    'natale',
    'vestacp',
    'python',
    'php',
    'github',
    'arch linux',
    'gnome',
    'rhel',
    'ssh',
    'bash',
    'systemd',
    'privacy',
    'caddy',
];

var special_taglist = [
    ['halloween', "Buu sono un fantasma 👻!", "#ffe7d3", "#f48024"],
];

var taglist_tmp = [];

function search() {
    search_field.value = search_field.value.toLowerCase();
    if (!header.classList.contains("typing")) {
        header.classList.add("typing")
    }
    window.scrollTo(0, 0),
    tags_results.scrollTo(tags_results.scrollWidth - tags_results.clientWidth, 0),
    search_keywords = search_field.value.replace(/ /g, "+"),
    tags_results.innerHTML = search_field.value,
    search_url = 'search?searchword=' + search_keywords + '&limit=12&areas[0]=blog',
    load(search_results, search_url, '.tm-main.tm-content.uk-width-medium-1-1'),
    search_results.style.display = "block",
    tags_results.style.display = "block",
    body.style.overflow = "hidden";

    // tags
    search_keywords = search_keywords.split("+"),
    tmp_search_keywords = "";
    search_keywords.forEach(function (tag) {
        if (taglist.includes(tag)) {
            tmp_search_keywords = tmp_search_keywords + `<div class="tag ${tag}">${tag}</div>`
        } else if (special_taglist.some(row => row.includes(tag))) {
            index = special_taglist.indexOf(tag) + 1,
            row = special_taglist[index],
            tmp_search_keywords = tmp_search_keywords + `<div class="tag special-tag" style="background-color: ${row[2]}; color: ${row[3]}">${row[1]}</div>`
        } else {
            tmp_search_keywords = tmp_search_keywords + ` ${tag}`
        }
        tags_results.innerHTML = tmp_search_keywords
    })
}

window.addEventListener('mouseup', e => {
    if (e.target.tagName != "ARTICLE" & e.target.tagName != "INPUT") {
        console.log(e.target.tagName),
        search_results.style.display = "none",
        tags_results.style.display = "none",
        tags_results.innerHTML = "",
        taglist_tmp = [],
        body.style.overflow = "auto",
        search_field.value = "",
        header.classList.remove("typing");
    }
});