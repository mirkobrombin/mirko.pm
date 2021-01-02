---
layout: projects
---
{% assign projects = site.projects %}

{% for project in projects %}
    {% include projects-listing.html project=project %}
{% endfor %}