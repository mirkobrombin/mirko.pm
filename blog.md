<span>My personal blog<br />
    <small>My point of view but also programming, cooking and saving.</small>
</span>

{% assign posts = site.posts | sort: "date" | sort: "updated" | reverse %}

{% for post in posts %}
    {% assign post = include.post %}
    {% assign date = post.date %}
    <article>
        <h3>{{ post.title }}</h3>
        <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ date | date: "%a, %b %e, %Y" }}</time>
        {{ post.content | strip_html | truncatewords: 32 }}
        <a href="blog/{{ post.url }}">Read</a>
    </article>
{% endfor %}