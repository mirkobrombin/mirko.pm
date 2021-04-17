/* https://git.mirko.pm/brombinmirko/httploader-js */
let body = document.getElementsByTagName("body")[0];

/* load data from other page */
function load(dom, url, source_dom=false)
{
    let xml_http = new XMLHttpRequest(), content, content_process;
    xml_http.onreadystatechange = function()
    {
        if (xml_http.readyState === 4 && xml_http.status === 200)
        {
            content = xml_http.responseText;
            if(source_dom)
            {
                content_process = document.createElement("div"),
                content_process.innerHTML = content,
                content_process.id = "content_process",
                content_process.style.display = "none",
                content = content_process.querySelector(source_dom).outerHTML
            }
            dom.innerHTML = content;
        }
    };
    xml_http.open("GET", url, true);
    xml_http.send(null);
}