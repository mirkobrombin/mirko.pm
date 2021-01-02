<span>My personal blog<br />
    <small>My point of view but also programming, cooking and saving.</small>
</span>

{% assign posts = site.posts | sort: "date" | sort: "updated" | reverse %}

{% for post in posts %}
    {% include posts-listing.html post=post %}
{% endfor %}