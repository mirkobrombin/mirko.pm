---
title: "Keep it fucking simple @css"
description: "What I want to talk to you about today is the method with which anyone normally develops the interface of a website."
published: true
layout: post
---

What I want to talk about today is the method that anyone usually uses to develop a website's interface.

Initially (and I'm talking many years ago), websites were limited by the lack of rules and elements, which forced developers (not yet classified as web designers at the time) to create simple but functional interfaces.

As the years went by, the tools at our disposal increased, HTML and CSS became proper languages in their own right, allowing us today to create functional and complex interfaces.

![](https://media0.giphy.com/media/10rJCb79m16aRy/giphy.gif?cid=790b761110ab7d3263e17e79a1d6613a81f1f90e12e4e8b4&rid=giphy.gif)

Nevertheless, this is an example where <mark>progress evolves faster than developers/designers</mark>, leading them to not fully exploit the resources, resulting in low-quality and poor performance outcomes.

To give a practical example, CSS Frameworks have been used for many years, which are a set of components and rules for creating applications and websites. On the one hand, we are guaranteed that by applying these rules, an application will be well-integrated and consistent in every aspect. On the other hand, we end up with heavy style sheets, often with unnecessary rules and dead code that we will most likely never use.

Referring to the phrase **progress evolves faster than developers/designers**, if we used to have fewer resources at our disposal but much slower connections, today we have more resources and incredibly fast connections, yet the experience hasn't changed much, and a website loads in about the same time.

Simply put, by using only the truly essential resources and thus avoiding the use of CSS Frameworks, we end up with more performant and lightweight applications, with simpler source code, reducing not only loading times but also the time spent understanding and maintaining it.

To give a practical example by quoting the **navbar** source code offered by Bootstrap:

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
        </li>
        </ul>
    </div>
</nav>
```

What immediately stands out is:

* The complex readability of the code
* The compulsive use of classes
* The unnecessary repetition of container elements

Everything can be simplified with a minimal structure using basic HTML elements, as in the example below:

```html
<header>
    <a href="#">
        <h1>Brand</h1>
    </a>
    <button></button>
    <nav>
        <ul>
            <li selected><a href="#">Home</a></li>
            <li><a href="#">Link</a></li>
        </ul>
    </nav>
</header>
```

Bootstrap, like many other CSS Frameworks, uses several classes for event management and element identification in JavaScript scripts, for example in opening/closing the mobile menu.

![](https://media1.giphy.com/media/13XW2MJE0XCoM0/giphy.gif?cid=790b7611d6b872db885ff15e635a83fe915441b166232cf4&rid=giphy.gif)

The use of classes is not necessary if we have a clear idea of the structure of the project we want to create. In the example mentioned above, we have a simple header with a logo, a button, and a navigation menu.

Our goal is to show the button only on mobile devices, for example on screens smaller than 720px, so we will hide this button (which has no class as it is the only one present in the header):

```css
header>button {
    display: none
}
```

Then, to make it appear again on devices smaller than 720px:

```css
@media screen and (max-width: 719px) {
    header>button {
        display: block
    }
}
```

Regarding the management of the open/close menu event on mobile devices, we can opt for a JavaScript script using the same `header>button` element for interaction. Otherwise, as mobile devices have touch screens, we can use their perception of the pseudo _:hover_ to recreate the press event:

```css
@media screen and (max-width: 719px) {
    header>nav {
        display: none;
    }
    header>button:hover>nav {
        display: block;
    }
}
```

This will achieve the same result since the pseudo _:hover_ on touch devices is interpreted as a click without release, thus clicking outside the element will achieve the opposite effect by removing the focus. The same procedure can be applied to contextual menus.

![](https://media1.giphy.com/media/3OvvA11fPUvfYRFjxS/giphy.gif?cid=790b7611f2ed097755ca7a2d0285f73a616ed1d5649e50b0&rid=giphy.gif)

My goal with this article is not to illustrate how to create an interface but to encourage anyone who wants to try it to use the resources they have available well, carefully evaluating the pros and cons of adopting a framework.

The principle of **KISS** (Keep It Simple, Stupid) teaches us that it is important to maintain a simple approach, to avoid getting in our own way. Another principle that can summarize this entire article is definitely **Less is more**, as using fewer resources or rather only the necessary ones allows us to have a bigger picture of what the final product will be, improving not only the final form but future maintenance times as well.

I hope I've bored you enough to uninstall your operating system.

See you around.

__Mirko_
