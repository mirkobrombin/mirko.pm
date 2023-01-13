---
class: post
title: '#howto – Come conoscere il file system in uso'
date: 2021-02-08
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
> Questa guida è stata inizialmente scritta in data 2 ottobre 2017 da Mirko Brombin e revisionata e aggiornata quasi tre anni dopo da Alessandro Zangrandi. La versione originale è visibile a <a href="http://archive.today/Mzlss">questa pagina</a>.

Possono esserci dei casi in cui è necessario sapere che **file system** sta usando il nostro hard disk o SSD, magari su un PC non in nostro possesso.

In questa guida vedremo alcuni modi per identificare il file system presente su un disco in cui è stata installata una distribuzione Linux qualsiasi.

## Come conoscere il file system in uso

### Utilizzo di df

`df` è un comando che viene utilizzato per conoscere la percentuale di spazio utilizzata e libera in un disco. Con il parametro *-T*, però, è possibile anche conoscere quale file system è usato dal disco.

```bash
df -Th
```

Il seguente comando ci darà un output simile a:

```bash
Filesystem     Type      Size  Used Avail Use% Mounted on
/dev/root      ext4      117G  4.4G  108G   4% /
devtmpfs       devtmpfs  430M     0  430M   0% /dev
tmpfs          tmpfs     463M  8.0K  463M   1% /dev/shm
tmpfs          tmpfs     463M   19M  444M   5% /run
tmpfs          tmpfs     5.0M  4.0K  5.0M   1% /run/lock
tmpfs          tmpfs     463M     0  463M   0% /sys/fs/cgroup
/dev/sda1      fuseblk   932G  894G   38G  96% /mnt/disco
/dev/mmcblk0p1 vfat      253M   46M  207M  18% /boot
tmpfs          tmpfs      93M     0   93M   0% /run/user/1000
```

### Utilizzo di fsck

`fsck` è un comando che, solitamente, viene utilizzato per controllare l'integrità ed, eventualmente, riparare un file system. Con il parametro *-N* è possibile anche conoscere quale file system è in uso, a patto che venga indicato il disco a cui vogliamo riferirci.

```bash
fsck -N /dev/mmcblk0p1
```

darà un output simile a:

```bash
fsck from util-linux 2.33.1
[/sbin/fsck.vfat (1) -- /boot] fsck.vfat /dev/mmcblk0p1
```

### Utilizzo di lsblk

`lsblk` è un altro comando che, a differenza dei precedenti, mostra semplicemente le partizioni dei dischi. Con l'istruzione *-f* verrà mostrato anche il file system in uso:

```bash
lsblk -f
```

fornirà un output simile a:

```bash
NAME        FSTYPE LABEL  UUID                                 FSAVAIL FSUSE% MOUNTPOINT
sda                                                                           
??sda1      exfat  Disco  UUID-Disco                           37.7G    96%   /mnt/disco
mmcblk0                                                                       
??mmcblk0p1 vfat   boot   UUID-Disco                           206.8M   18%   /boot
??mmcblk0p2 ext4   rootfs UUID-Disco                           107.9G   4%    /
```

### Utilizzo di mount

`mount` viene usato per montare delle partizioni di un disco, ma può essere sfruttato anche per conoscere il file system di un disco.

```bash
mount | grep "^/dev"
```

ci darà un output come il seguente:

```bash
/dev/mmcblk0p2 on / type ext4 (rw,noatime)
/dev/sda1 on /mnt/disco type fuseblk (rw,nosuid,nodev,relatime,user_id=0,group_id=0,default_permissions,allow_other,blksize=4096)
/dev/mmcblk0p1 on /boot type vfat (rw,relatime,fmask=0022,dmask=0022,codepage=437,iocharset=ascii,shortname=mixed,errors=remount-ro)
```

Per dubbi o chiarimenti non esitate a chiedere nel nostro [gruppo telegram](https://t.me/linuxpeople).
