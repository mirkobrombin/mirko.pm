---
layout: none
---
[
  {% for post in site.posts %}
    {
      "title"    : "{{ post.title | escape }}",
      "tags"     : "{{ post.tags }}",
      "excerpt"  : "{{ post.content | strip_html | truncatewords: 32 }}…",
      "url"      : "{{ site.baseurl }}{{ post.url }}",
      "date"     : "{{ post.date }}"
    } {% unless forloop.last %},{% endunless %}
  {% endfor %}
]