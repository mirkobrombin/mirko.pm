search_field = document.querySelector("header input[type='search']"),
    body = document.querySelector("body"),
    header = document.querySelector("header"),
    search_results = document.querySelector("header form > div"),
    search_result = document.querySelector("header form > div > div article"),
    search_keywords = "";


var taglist_tmp = [];
var posts = [];

fetch('http://127.0.0.1:4000/search.json')
    .then(res => res.json())
    .then((posts) => {
        console.info("linux/hub Posts index found.");

        function search() 
        {
            term = search_field.value.toLowerCase();
            search_results.innerHTML = "",
            body.style.overflow = "hidden";

            if(term.length < 3) {return false}

            console.log(`Searching for ${term}`)
            if (!header.classList.contains("typing"))
            {
                header.classList.add("typing")
            }
            window.scrollTo(0, 0);
            var results = []

            for (var i=0 ; i < posts.length ; i++)
            {
                if (posts[i]["title"].toLowerCase().includes(term)) 
                {
                    results.push(posts[i]);
                }
            }

            results.forEach(result => {
                var post = document.createElement("article");
                post.innerHTML = `
                    <a href="${result["url"]}">
                        <h2>${result["title"]}</h2>
                    </a>
                `;
                search_results.appendChild(post);
            });
            search_results.style.display = "block";
        }
        search_field.addEventListener("keyup", search);
    })
    .catch(err => 
    {
        console.error("Failed to fetch linux/hub Posts index!");
        throw err
    });

window.addEventListener('mouseup', e => {
    if (e.target.tagName != "ARTICLE" & e.target.tagName != "INPUT") {
        search_results.style.display = "none",
            search_results.innerHTML = "",
            body.style.overflow = "auto",
            search_field.value = "",
            header.classList.remove("typing");
    }
});