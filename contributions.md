---
layout: contributions
---
{% assign contributions = site.contributions | sort: "date" | sort: "updated" | reverse %}

{% for contribution in contributions %}
    {% include contributions-listing.html contribution=contribution %}
{% endfor %}