# From Scratch Website

Static website for the game From Scratch.

## GitHub Pages setup

Use these settings in GitHub:

```text
Settings > Pages > Build and deployment
Source: Deploy from a branch
Branch: main
Folder: /root
```

The public site entry point is:

```text
index.html
```

## Structure

```text
index.html
404.html
.nojekyll
assets/css/site.css
assets/js/site.js
news/static-site-live.html
news/starting-from-nothing.html
```

## Local workflow

Use the MVC/admin version locally as a private content editor, then export or copy the static output into this repository.

Recommended export target:

```text
index.html
news/*.html
assets/css/site.css
assets/js/site.js
assets/images/*
```

Then publish changes with:

```bash
git add .
git commit -m "Update static website"
git push
```
