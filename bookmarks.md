---
layout: bookmarks
---
{% assign bookmarks = site.bookmarks %}

{% for bookmark in bookmarks %}
    {% include bookmarks-listing.html bookmark=bookmark %}
{% endfor %}