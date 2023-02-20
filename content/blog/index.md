---
title: Blog
layout: blog.liquid
pagination:
    data: collections.posts
    size: 10
    reverse: true
permalink: "/blog/{% if pagination.pageNumber > 0 %}page-{{ pagination.pageNumber | plus: 1 }}/{% endif %}"
---

