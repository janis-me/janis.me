---
layout: $layouts/Blog.astro
title: Highlighting blocks of CSS selectors - awesome syntax highlighting!
desc: A simple way to highlight blocks of CSS selectors in code blocks, using just a few lines of CSS.
createdAt: 2025-08-04
updatedAt: 2025-08-04
published: true
tags: ['css', 'coding']
---

If you use Astro, vitepress or similar tools for showing code, or use [shiki](https://shiki.style/) directly, you sometimes want to put extra emphasis on certain lines by highlighting them.

Let me show you a nice way to put borders around groups of these highlighted lines, with just a couple lines of CSS! I will throw some code at you right away, to showcase how it could look. I am using SCSS here, but it will work just as wekll with plain CSS.

```scss {3-5,7}
code {
  &:has(.highlighted) {
    .line:not(.highlighted):has(+ .highlighted) + .highlighted {
      border-top: $highlighted-border;
    }
    
    .highlighted:not(:has(+ .highlighted)) {
      border-bottom: $highlighted-border;
    }
  }
}
```
In the code block above, some lines are highlighted with a border, and the rest is pretty blurry. 

Note, that the border shows around all the highlighted lines, but not in between them. This was done without having to add extra classes, just by using CSS pseudo-classes and selectors!

For the code examples, we assume that all lines have a `line` class, and the highlighted lines have an additional `highlighted` class. This is how shiki (and thus vitepress and astro) have it set up by default.

__Let's dive in__

The easy part first: Blurring everything that is not highlighted. You could also greyscale, or leave this part out!

```scss
.line:not(.highlighted) {
  filter: blur(1px);
}
```

I guess that explains itself. Next, select the first highlighted line that comes after a non-highlighted line, and add a border on top of it:

```scss
.line:not(.highlighted):has(+ .highlighted) + .highlighted {
  border-top: 1px dashed #212121;
}
```

This first selects a non-highlighted line where the next line is highlighted (the `:has(+ .highlighted)` part), and then selects the next line using the next-sibling combinator.

For the bottom border, we seleect all highlighted lines that are not followed by another highlighted line:

```scss
.highlighted:not(:has(+ .highlighted)) {
  border-bottom: 1px dashed #212121;
}
```

If you want to add left and right borders, you can simply select them with `.highlighted`.

Lastly, if the first line is highlighted, our top border won't work, because there is no previous, non-highlighted line! So we add a simple fallback:

```scss
.highlighted:first-of-type {
  border-top: 1px dashed #212121;
}
```

Throwing all of that into a `code` selector, we get the final result:

```scss
code:has(.highlighted) {
  .line:not(.highlighted) {
    filter: blur(1px);
  }

  // The first highlighted line, if there is no previous line
  .highlighted:first-of-type {
    border-top: $highlighted-border;
  }

  // Select the first highlighted line that comes after a non-highlighted line
  .line:not(.highlighted):has(+ .highlighted) + .highlighted {
    border-top: $highlighted-border;
  }

  // highlighted lines that are not followed by another highlighted line
  .highlighted:not(:has(+ .highlighted)) {
    border-bottom: $highlighted-border;
  }
}
```