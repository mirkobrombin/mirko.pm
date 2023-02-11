---
title: "Open Source in the Wrong Way"
description: "Why recreate an open source project: motivations and consequences"
published: 2023-02-11
layout: post
published: false
is_translation: false
translation: false
is_english: true
---

It often happens that developers decide to start a new project instead of contributing to an existing one, becoming a growing trend in the open source world. This decision can lead to various problems, not just for the original software creator but also for the wider community of developers relying on it.

One of the main reasons for this trend is the lack of time and resources to contribute to an existing project, which is ironic thinking about the topic of this article. Many developers are driven by the desire to create something new and innovative, rather than simply improving on what has already been done. They may see an existing project as being too complex or difficult to work with, or they may simply not agree with the direction or philosophy of the existing project.

## The problems

However, this can lead to the fragmentation of the open source community, as developers work on their own projects and fail to collaborate with others. This can also result in the duplication of effort, as multiple projects are created to solve the same problem, but with different approaches and solutions.

Another issue is the potential harm to the reputation of the original project. When a new project is created, it may be seen as a direct challenge to the existing project, and this can cause resentment and mistrust among the developers. This can result in the fragmentation of the community, as developers become divided and refuse to work together.

Finally, the creator of the original software may be damaged by the creation of a new project, since some developers may decide to collaborate on the new project instead of the existing one, this usually happens because a new project has more need for developers and is usually easier to join and contribute since the project is not yet fully established. As a result, the old project will have less manpower available, losing the possibility of receiving more contributions and speeding up the development of new features.

## The exceptions

In some cases, creating a new project is essential, even if the result may seem similar, as the final goal is completely different. For example, Bottles was created to integrate the entire Wine toolset graphically, eliminating the dispersion between different and inconsistent tools, and its final goal is to install more software in more prefixes, rather than following the model of 1 app per 1 prefix.

Another example is Vanilla OS, which was created because the concepts would never be compatible with a distro like Fedora or Ubuntu or others. This project includes the removal of Packagekit, the immutable system with A/B partitioning, the use of a meta-package manager like Apx, automatic updates based on the conditions of the PC, and also the ability to allow the user to choose from the beginning how to use their device, whether to have Flatpak, Snap, Appimage, or just Apx.

A third example is Distrobox, which was created to be portable, written in bash. Additionally, it was designed to provide access to a wide range of distributions for the user, rather than just one.

> Small note, in the examples I refer only to projects that I know, I didn't want to cite other examples because I don't know the motivations behind the projects, and I didn't want to spread misinformation.

In these cases, the creation of a new project is the best solution to achieve the specific goals and objectives that cannot be achieved by contributing to an existing project. This is because the new project can be tailored to meet the specific needs of the developers and users, and can be designed from the ground up to achieve the desired outcomes.

## Some "wrong" reasons

Creating a new project that has the same purpose and goals as an existing project is not only a waste of time and resources, but it also causes damage to the open-source community.

I want to give some examples that consolidate my "wrong approach" hypothesis. I will not cite any specific projects, but I will give some examples of what I consider to be the wrong way to do things.

For example, if someone were to re-create Firefox with the exact same final purpose in mind, it would only duplicate the effort and resources that have already been put into the existing project. It would not bring any new or innovative ideas to the table and would only create confusion among users and developers.

Similarly, a hypothetical clone of Apx, the package manager of Vanilla OS, with the same exact objectives, would not benefit anyone. It would only cause unnecessary fragmentation and competition, while also potentially diverting resources and attention away from the original project. In the case of Apx, there are even fewer reasons to clone the project. Apx is a relatively young project that greatly benefits from contributions. It is also distro-agnostic, designed to be as versatile and compatible as possible with the needs of third-party Linux distributions. This was done specifically to encourage collaboration in the event that it is adopted by other distros. Cloning Apx would only cause unnecessary fragmentation and competition, while also potentially diverting resources and attention away from the original project.


## Final thoughts

If someone has clear reasons for wanting to contribute to a project, such as a missing feature or an imperfectly implemented function, they should take action accordingly. In these cases, it is best to contact the project administrator or a member of the team to find common ground. In extreme cases, where these requests cannot be met, a fork of the project may be necessary in order to minimize code divergence and reduce effort waste. This ensures that the new project can continue to develop while still contributing to the original project, rather than diverging completely and creating duplicate efforts. In these cases, it is important to work together and maintain a clear line of communication between both projects to avoid any misunderstandings and ensure that everyone is working towards the same goal.

This article is more about the ethics behind these actions. It is not meant to incriminate anyone and as long as there is no violation of copyright, it is simply an invitation to act as a community rather than against each other. The open source world is built on collaboration and mutual support, and it is important to remember this as we make decisions about how to contribute to existing projects or start new ones. By working together, we can build stronger and more effective solutions for everyone.
