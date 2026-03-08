#!/usr/bin/bash
for i in ./*
do 
	wopng=${i//.png/} 
	wojpgpng=${wopng//.jpeg/} 
	wojpgpngjpeg=${wojpgpng//.jpg/} 
	echo $wojpgpngjpeg
	echo "Extension is "
	extension="${i##*.}"
	echo $extension
	# if png exists already
	if [ $extension == "jpeg" ] 
	then
		ffmpeg -n -i $i $wojpgpngjpeg.png
	elif [ $extension == "jpg" ]
	then
		ffmpeg -n -i $i $wojpgpngjpeg.png
	fi


done
