---
title: Bookmarks
layout: bookmarks
---

{% assign bookmarks = site.bookmarks | sort: "date" | sort: "updated" | reverse %}

{% for bookmark in bookmarks %}
{% include bookmarks-listing.html bookmark=bookmark %}
{% endfor %}
