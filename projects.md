---
title: Projects
layout: projects
---
{% assign projects = site.projects | sort: "date" | sort: "updated" | reverse %}

{% for project in projects %}
    {% include projects-listing.html project=project %}
{% endfor %}