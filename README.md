# **Obsidian Alignment Tracker**

I always have found the alignment system DnD has a bit odd. I believe the players actions should determine their alginment and not the other way arround. Some people agree that then the alignment has no reason of being, but I think
that this way you can get a better understanding of how are the players percieved
in the world their characters live. It also restricts some magic items that have  alignment requirements.

Well, for those hwo think the way I do and use obsidian I have a method that have worked since now:

I draw two tables, one with the LC axis and another with the GE one. Every time my players do something that can be seen as Lawfull, Chaotic, Neutral, Good or Evel I mark a dot on the corresponding cell, and from time to time I look at the alignment tables I got for every one of them and I get a better view of what is their alingment, sometimes I even tell them so they know it.

To do this in obsidian I developed this plugin, you just need to create a `alignmenttracker` block and use it, the propper usage is:
```
```alignmenttracker
L: 0
C: 0
G: 0
E: 0
```

Every time they do something that would correspond to `L`, `C`, `G` or `E` you can increase the corresponding number, and the gird will be automatically generated. 
