---
title: "The IDE I was looking for"
description: "GNOME Builder is a very powerful tool, it allows you to develop mainly in 7 languages."
published: true
layout: post
---

I've been a developer for several years now, I started to googling <mark>how
to make a website</mark> I was 14 years old and since then I've
made *(I switched to StackOverflow 👅)*.

I'm lucky enough to have grown up at a time when computer science,
precisely the programming, was in strong evolution. In those days no one
could imagine that Javascript would become such a language
famous as to give rise to rivers of frameworks based on it.

The technology itself has evolved at such a speed that it is within reach of
All. There are many programming languages, suitable for every context,
to every developer.

### IDE & Code editors

I started my way as a programmer on Windows, opened the notepad and
amused to make colored writings appear on my web page which, for
fortune, was in local 😅.

When I discovered PHP, I felt the need to move on to a more structured editor
as Notepads. This provided plugins, code syntax, formatting, and
so many other tools that helped me digest that language better.

In one year I switched to Visual Studio for Visual Basic and C# needs, even though
I abandoned these languages pretty quickly when I bought an iMac with
OS X Mountain Lion. I started using editors like BBEdit and Brackets.

The big change was when I moved to Ubuntu several years ago. From here you will
I save the roundup of editors and IDE I tried, just wanting to mention
some: geany, gedit, eclipse, atom, code, elementary code, and jetbrains*. These
served me to find him, the ultimate IDE.

#### The ultimate IDE.

The way I program and the target itself have changed very recently.
From 2017 I started to develop 
[Telegram bot] (https://unifiedban.solutions) for the safety and management of
groups, desktop and server software (Linux), publishing portals and
[CMS](https://github.com/biskuitorg/) etc.

As GTK application development is my main target, I have
started using <mark>GNOME Builder</mark>, the IDE all in one of
Gnome.

![](/uploads/2021-01-03 09-00-54-gnome-builder.png)

I avoid talking about his elegance and my being fond of GTKs in
general or we don't stop talking about it.

GNOME Builder is a very powerful tool, it allows you to develop
mainly in 7 languages (those commonly used by GNOME for
its applications):

- C
- Javascript
Python 💘
Rust, Rust
- C++
- C#
- Vala

![](/uploads/2021-01-03 09-50-43-gnome-builder-new-project.png)

It allows you to immediately choose the license with which to distribute the software,
enable Git versioning and preconfigure the project for a given
Context. you can choose the target for the application type
that we are going to develop:

- GNOME application (then support for GTK widgets)
- Shared library
- Command-line application  

.. or trivially an empty project.

We can even choose one of GNOME's projects from which to learn or
Collaborate.

![](/uploads/2021-01-03 09-55-09-gnome-builder-gnome-sources.png)

#### Meson & Flatpak Integration

GNOME Builder is <mark>Flatpak and Meson</mark> by default. This means that
every application created, was born as Flatpak and with the build system 
meson+ninja.

This is an optional choice, just delete the '.json' manifest in the
root of the project to use only the meson+ninja pair. But I appreciate the
choice, Flatpak is from GNOME and I find it a great incentive to encourage
distribution of the project as Flatpak since its inception.

#### Glade, is that you?

I have been using Glade for some time for the realization of GTK interfaces. Yes
it's a really powerful tool that from a graphic editor returns
the project in interpretable format 'xml', normally with extension '.ui' or
'.glade'.

![](/uploads/2021-01-03 10-03-31-glade.png)

Includes all [widgets](https://developer.gnome.org/gtk3/stable/GtkWidget.html)
GTK, properties, signals, accelerators, everything. It allows you to create a
full interface from scratch. Initially, amazed by the efficiency of this
tool, I did not miss its integration into GNOME Builder.
But with the continuous expansion of the code of
[Bottles] (https://github.com/bottlesdevs/Bottles), one of the applications to which
work, I began to feel *the weight* of having to go through an application
to the other.

Now, because I'm a 🙈 and I never analyze a program right before
to use it, I hadn't noticed that Builder provides a Glade integration.

![](/uploads/2021-01-03 09-05-21-gnome-builder-glade.png)

I think it's still an unstable stage because some slowdown
i sensed it but this integration makes Builder the complete IDE as far as
is about my use. From here I can begin and end the development of a
application, without ever abandoning the screen. It allows you to browse the
documentation without switching to the browser integrates the todolist that you created
analyzing the application code. It provides a functional debugger, the
valgrind analysis tool and allows the profiling of the process.

Thank you GNOME 💖, I will be forever grateful.

__Mirko_
