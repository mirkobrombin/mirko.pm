---
title: "My experience making a Linux distribution"
description: "Creating a Linux distribution is a challenging task that requires a lot of dedication and focus, and I learned a lot through the process of creating my own."
published: 2023-02-15
layout: post
published: true
is_translation: false
translation: false
is_english: true
---

Creating a Linux distribution is a challenging task that requires a lot of dedication and focus, and I learned a lot through the process of creating my own. 

## The Beginning

In the beginning, it felt like swimming in open water, because there is no documentation out there, there are common methods but these are not really documented and you end up going down the classic old road of "let's see how others do it", inevitably ending up in a storm of different, often contradictory, terminologies and approaches.

Now I can say that creating a distribution by itself is not a really complicated task.. of course if you understand how to do it. I asked myself many times why these procedures weren't documented, why there weren't "noob-proof" guides, but after my experience I realized that it's not really possible to document this process, as there are many possible ways to achieve the same result , many distributions look similar to the eye of the end user but have a distinctly different structure underneath, and creating "the ultimate guide" is simply not possible.

On the other hand I admit that having had to discover so many things by myself was much more rewarding than following a documentation or a guide. Sure, I thought about quitting the project many times in the process and had many headaches, but I'm proud that I held on.

## Always Take Breaks

In the initial phase of the project, it was important for me to keep in mind the entire functioning of the distribution. Writing down documentation would have slowed down the development process, and at that time, I was a volcano of ideas and it would have been a real waste of time to write down everything that was on my mind. Let's say that my mind was the safest and most versatile space at that time, even if I often saturated ~~my RAM~~ it. 

I spent months where my brain was grinding ideas even when I didn't want to think about the project. At some point I started obsessing over the user experience of the project, I wanted every single aspect of the deployment to be perfect and provide the best user experience. However, this was turning into a witch hunt, where I was seeing mistakes even where there were none. I wanted the system to do exactly what I said, even when it couldn't.

I've always been passionate about UX, I feel almost physical pain when something is tedious, difficult and requires unnecessary effort to use. I often experience this annoyance also in my projects because it is not really possible to think of every detail. I had to learn to sacrifice some of these details and then come back to them over time, so as not to slow down the real development. Of course, as a UX designer I understand that this view of "perfect" is subjective and that something that may seem wrong to me may seem perfect to someone else. However, I was not able to see the difference between what was wrong and what was right, and I was starting to lose my focus on what really mattered for the project. 

At that point, I had to **take a break** and completely disconnect from the project for a day. The next day, I had a much clearer understanding of the priorities and was able to finish the necessary tasks for the first important build of the distribution.

This experience taught me the importance of taking breaks and disconnecting from a project to avoid getting lost in it. It also helped me to prioritize the important aspects of the project and focus on those to create a better product.

## Let Others Help You

As often happens in Open source projects, other developers started joining and contributing. This was a turning point as it allowed me to **delegate tasks** and reduce my workload. At first I was so focused, that I was hesitant to do so, as I feared that these tasks would not be done as I would have done them. I was in a phase where I felt like I was the only one with a clear vision of the project, which in hindsight, was not a **healthy attitude**.

However, the new contributors brought fresh perspectives and ideas to the table, which helped to improve the project significantly. I began to trust my team and felt confident in delegating tasks to them. The work they produced was better than I could have imagined. Our team is bonded by a shared passion for the project and builds on a friendship and mutual respect that I haven't often seen in other projects.

As the project grew and our team expanded, I learned the **importance of collaboration** and the benefits of seeking input from others. The different perspectives and experiences of my team members helped me to understand the project in a different light and opened up new possibilities that I would have never thought of on my own. I also learned to trust my team, which allowed me to delegate tasks and focus on areas that I could best contribute to.

## My Skills Improved

Working on this project has greatly improved my programming skills. Just a few days ago, I needed to create two Gtk applications, the Drivers Utility and PRIME Utility, to replace the corresponding functions in the Vanilla Control Center. To my surprise, I was able to design, develop, and package these applications in less than two days.

I was impressed with myself because I realized that I had not thought much about the development phase, as it had become almost automatic for me. This was a testament to how much my skills had improved since starting the project, although I still have a hard time calling myself a developer.

I gained a deeper understanding of the underlying architecture and design of a Linux distribution. I feel much more confident in my code than when I was developing Bottles, where I wasted even weeks investigating on which approach was the right one or simply reflecting on whether that approach could be criticized by other developers, making me look like a fool. In fact, one of the most common barriers that I, and I imagine others, have overcome is worrying about how other developers would judge my code. This is a useless fear because it not only leads you to look for problems even when they don't exist, but it pushes you to believe that you are not up to the situation. Anyone who doesn't agree with my code can always tell me or open a PR to improve it.

Moreover, working with a team of contributors allowed me to learn from others and share my knowledge and experience. Collaborating with others helped me to gain new perspectives and insights into development. It also taught me the importance of **communication, coordination, and teamwork** in software development.

## Final Thoughts

Overall, creating a Linux distribution has been an incredibly rewarding experience for me. I have learned a lot about Linux, programming, and project management, as well as the importance of collaboration and taking breaks.

One of the most important things that I have learned is the value of perseverance. Creating a Linux distribution is not an easy task, and there were many times when I wanted to give up. However, I was able to push through those moments and come out the other side with a much better understanding of what it takes to create a successful project.

I am proud of what my team and I have accomplished with this distribution, and I believe that we have created something that is unique and valuable for the Linux community. It is my hope that this distribution will continue to grow and improve over time, and that it will help to inspire others to create their own projects and contribute to the open source community.

Small addition: For more than half of the article I refer to the first version of Vanilla OS, now very distant from today's version. That version was used as the basis for subsequent versions with Almost and ABRoot, in these the project was led in the company of Luca di Maio. I wanted to clarify it.
