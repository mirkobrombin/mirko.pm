---
title: "This is why Bottles is about to leave Flatpak"
description: "I also see that the Flathub user community (the repository where Bottles is distributed) is very demanding."
published: 2021-06-20
layout: post
published: true
is_translation: true
---
Bottles was born as an absolutely non-pretentious project in 2017, it was mostly
my personal need.
In 2020 I decided to give new light to the project, aiming to offer a new concept
of Windows in a bottle.

Since that day the project made many steps, many people have joined me 
contributing with concepts, ideas, translations and code.

To date Bottles is a grown project, its v3 brings with it many bugfixes, 
improvements and a solid foundation. As announced months ago, work has begun on 
Bottles v4, a complete redesign of the project. In fact, under the hood, 
[everything changes](https://github.com/bottlesdevs/Bottles/issues/133). 
The project has been split into two libraries (
[libwine](https://github.com/bottlesdevs/libwine) and 
[libbottles](https://github.com/bottlesdevs/libbottles)), the system components, 
dependencies and installer are being rewritten too. In short, a really new 
project from scratch that is proceeding in small steps but of which I am proud, 
*really proud of it.*

![](https://camo.githubusercontent.com/67c8dc53cbd154e38b2af4f22176da7246e70e720474b9bb5776550110d9694a/68747470733a2f2f7062732e7477696d672e636f6d2f6d656469612f4579635231635758414145747856523f666f726d61743d6a7067)

Bottles is currently distributed in multiple formats: AppImage, deb, snap, 
flatpak, AUR and rpm. We can say that we have managed to reach more users than 
we ever expected and I am grateful to all those who have contributed with a 
constructive report. Special thanks to all of you, words are not enough.

## The work behind Bottles
*Bottles is a project that takes a very long time*, really a **long time**.

Just applying the new translations requires revision on my part, I have to check 
that these have not been vandalized and do not contain bad words. Several users 
contribute to the translations by suggesting corrections, these too must be 
manually verified and approved.

Dealing with bug reports and new feature requests also takes a lot of time. 
Unfortunately not all users know how to open an issue in the correct way and 
often they provide not enough details to understand the problem. Then a 
conversation begins trying to understand the problem, asking for more logs 
(possibly in English ... *seriously provide them in English*, a small part of 
me dies every time you publish a log in any other languages). Often a log is not 
enough and we have to replicate the user's steps to identify the problem, 
creating a VM with the same distro, desktop environment and package.
Sometimes we are lucky and can easily replicate the bug and this is confirmed 
and fixed within a maximum of one day depending on its severity.

But when we are not able to replicate a bug then we start a research phase in 
the code to try to imagine what may have caused the problem. If this step also 
fails, the bug is reported as "not replicable" and remains there until new 
details emerge. We are never happy (really NEVER) to give up on a bug but when 
it is not replicable, we have no other choice.

Each new feature request is analyzed and if the need is high, an investigation 
begins to understand if this feature can be easily integrated and if it can 
improve or worsen the UX of the software. It often happens that we have to give 
up integrating a new feature as this is not compatible with the current project 
structure and therefore is stalled, waiting for the next main release, which 
could allow the integration of the feature.

Ok, I have described the management of any Open source project (and not) but in 
this case it is a project designed and *developed by a single person (me)*. Ok 
there are many contributions received and I'm not complaining, indeed thank you 
again seriously, please continue. Unfortunately, however, none of these 
contributions take place on Bottles v4 or in the management of the Issues or in 
the revision phase of the translations.

## Ok.. What about Flatpak?
Flatpak is currently the package that I personally use less and of which I have 
less knowledge. Most of the bugs reported are related to the Flatpak version of 
Bottles and I really spend many days figuring out how to fix them, this because 
of my little knowledge about it.

*This lack of experience of mine*, plus the reduced time I have due to what I 
have explained above (and my job), means that I cannot focus on developing 
Bottles v4 as I should, slowing down the project drastically.

I also see that the **Flathub user community** (the repository where Bottles is 
distributed) is very demanding (and sometimes annoying). I browsed the Bottles 
reviews on GNOME Software and was very amazed to find that alongside some 
positive reviews, there are others that are very negative and unfortunately 
absolutely not constructive. **Stop everyone**, I know what you are thinking 
and no .. I do not expect only positive reviews and I am much happier to read 
negative ones as these *help me to grow and improve*. Unfortunately, however, 
these criticisms are not constructive and often complain about **Wine** problems 
instead of Bottles.

*Bottles is NOT Wine*: this is what I have said over and over again. Bottles 
is a Wine prefix manager, with several features but it ends there. We don't 
promise to run Windows software that doesn't work with Wine, and we don't claim 
Bottles is THE definitive way to do it. Unfortunately this simple concept does 
not enter their heads and I find myself being judged on third party software 
instead of my own.

![](https://media.giphy.com/media/duJI8BEPPDkvm/giphy.gif)

I have also read criticisms related to the decision to remove Winetricks from 
Bottles. Regarding this decision I have spent many, very many words and I have 
explained over and over again the reason that led to this choice so I will not 
explain it again. I will just say that the intention to remove Winetricks was 
announced a little over a year ago, it was also announced in Bottles itself 
with an alert. Winetricks is no longer present in Bottles since 2.1.

**Bottles is not yet another Wine prefix manager**, there are already many 
similar (and perhaps better) tools that share in how they work and the tools 
they offer (including Winetricks) and my intention is not to create a program 
which already exists, otherwise I wasn't wasting my time.

So .. back to the Flatpak issue. In the next few days I will officially remove 
Bottles from Flathub, preventing the receipt of future official updates. This 
means that Flatpak itself will no longer be one of the project's official 
distribution channels and official support will no longer be given on that 
package. The Flathub beta repository is currently maintained by third parties 
who take care of keeping it aligned with git, however even this will no longer 
be officially supported.

## Goodbye forever to Flatpak?
![](https://media1.tenor.com/images/b7e17ee010f0cc3955db366f931764f8/tenor.gif?itemid=10683738)

Officially yes, *I will no longer distribute Bottles via Flatpak*. Anyone
feel free to republish and keep it, with patches and updates, but this one will
not be officially supported by the project. It will still be possible
build the Flatpak from source and install a local copy, I will keep the manifest
updated to the current version.

_Mirko