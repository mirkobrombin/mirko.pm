---
title: "Open Source in the Wrong Way"
description: "Why recreate an open source project: motivations and consequences"
published: 2023-02-12
layout: post
published: true
is_translation: false
translation: false
is_english: true
review_by: TheEvilSkeleton
---

It often happens that developers start a new project, instead of contributing to an existing one. This decision can lead to various problems, not just for the software authors of the existing project, but also for the wider community.

In my experience, one of the main reasons for this trend is the lack of time and resources to contribute to an existing project, which is ironic, as starting a new project is time consuming all by itself - you have to set everything up, like chat rooms, forums, etc. Many developers are driven by the desire to create something new and innovative, rather than simply improving on what has already been done. They may see an existing project as being too complex or difficult to work with, or they may simply not agree with the direction or philosophy of the existing project.

## The problems

This can lead to worsening the fragmentation of the free and open-source community, as developers work on their own projects and may avoid collaborating with others. This can also result in unnecessarily duplicating efforts, as multiple projects are created to solve the same problem(s) and implemented similarly.

Another issue is the potential harm to the reputation of the existing project. When a new project is created, it may be seen as a direct competitor to the existing project. This can cause resentment and mistrust among the developers. This can result in the fragmentation of the community, as developers become divided and refuse to work together.

Finally, the authors of the existing project may be harmed by the new project, since some contributors may decide to collaborate on the new project instead of the existing one. This usually happens because a new project has more need for contributors, while the barrier is extremely low, since the project is not yet fully established.

## The exceptions

In some cases, creating a new project is essential, even if the result may seem similar. Sometimes, only the end goal is entirely different, sometimes only the implementation is different, and sometimes both. For example, [Bottles](https://usebottles.com/) was created to be a general-purpose Wine frontend to integrate the entire Wine toolset graphically, eliminating the need of using different and inconsistent tools, whereas Lutris is designed specifically with gaming in mind.

Another example is [Vanilla OS](https://vanillaos.org/), which was created because the philosophy and implementations would never be compatible with a distro like Fedora Silverblue, Ubuntu or others. Vanilla OS removes Packagekit, it implements an immutable system with A/B partitioning, the use of a meta-package manager named Apx, automatic updates based on the conditions of the PC, and also the ability to allow the user to choose between Flatpak, Snap (soon), Appimage, or just Apx. One of the goals of Vanilla OS is to make it very easy for newcomers to contribute - our projects are on GitHub, and chat and forums are on Discord.

A third example is [Distrobox](https://distrobox.privatedns.org/), which was created to be portable and compatible with Docker and Podman. Additionally, it was designed to provide access to a wide range of distributions for the user.

*Small note, in the examples I refer only to projects that I am familiar with.*

In these cases, creating a new project is the best solution to achieve the specific goals and objectives that cannot be achieved by contributing to an existing project. This is because the new project can be tailored to meet the specific needs of the developers and users, and can be designed from the ground up to achieve the desired outcomes.

## Some "wrong" reasons

Creating a new project that has the same purpose and goals as an existing project is not only a waste of time and resources, but it can also harm the free and open-source community.

I prefer to not call anyone out, as I don't want to harm them, but I will give some examples of what I consider to be the wrong way to do things.

For example, if someone recreates Firefox with identical end goals and approaches in mind, it would only duplicate the effort and resources that have already been put into the existing project. It would not bring any new or innovative ideas to the table and would only create confusion among users and developers.

Similarly, a hypothetical clone of Apx, the package manager of Vanilla OS, with the same exact objectives, would not benefit anyone. It would only cause unnecessary fragmentation and competition, while also potentially diverting resources and attention away from the original project. In the case of Apx, there are even fewer reasons to clone the project. Apx is a relatively young project. It is also distro-agnostic, designed to be as versatile and compatible with as many Linux distributions as possible. This was done specifically to encourage collaboration in the event that it can be used by anyone on any distro. Cloning Apx would only cause unnecessary fragmentation and perhaps even competition.

## Final thoughts

If someone has clear reasons for wanting to contribute to a project, such as a missing or incomplete feature, they should take action accordingly. In these cases, it is best to contact a or more members of the team to find a common ground. In extreme cases, where these requests cannot be met, a fork of the project may be necessary in order to minimize code divergence and reduce effort waste. This ensures that the new project can continue to develop while still contributing to the existing project, and vice-versa, rather than diverging completely and duplicating efforts. In these cases, it is important to work together and maintain a clear line of communication between both projects to avoid any misunderstandings and ensure that everyone is working towards the same goal.

This article is more about the ethics behind these actions. It is not meant to incriminate anyone and as long as there is no violation of copyright, it is simply an invitation to act as a community rather than against each other. The open source world is built on collaboration and mutual support, and it is important to remember this as we make decisions about how to contribute to existing projects or start new ones. By working together, we can build stronger and more effective solutions for everyone.
