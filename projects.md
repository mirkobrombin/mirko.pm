---
layout: projects
---
{% assign projects = site.projects %}

{% for project in projects %}
    {{ project.name }}
    {% include projects-listing.html project=project %}
{% endfor %}