#madplay /tmp/run/mountd/mmcblk0p1/xmas/Kataware\ Doki.mp3 -o wave:- --display-time=current | aplay -D plughw:1,0
madplay $* -o wave:- --display-time=current | aplay -D plughw:1,0
#ffmpeg -i $* -f wav - | aplay -D plughw:1,0