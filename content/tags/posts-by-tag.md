---
eleventyComputed:
    title: "#{{ tagPage.tag }}"
layout: tags.liquid
pagination:
    data: collections.postsByTag
    size: 1
    alias: tagPage
permalink: "{{ tagPage.currentHref }}"
---

