# AVScripts

This is for keeping AV related scripts.

## AV CHeck List.html
- A checklist for AV service

## HymnNumDisplay.html
- A new attempt to do the hymn number conversion using web browser docks. It uses localstorage for setting and getting hymn numbers.
	### HymnNumDisplay.js
	- functions for HymnNumDisplay
	### HymnNumDisplay.css
	- styles for HymnNumDisplay
	### HymnNum.html
	- Hymn text to be shown on video/TV

- Configure: use "http://absolute/" for custom browser docks setup instead of "file:///"
- Usage: 
	- Add "HymnNumDisplay.html" to OBS custom browser dock
	- Add "HymnNum.html" as a broswer source in a OBS scene
	- When number is typed inside one of the input boxes in "HymnNumDisplay.html", it fetches the corresponding English or Spanish hymn number and stores them in localStorage.
	- When localStorage changes, it updates the hymn text in "HymnNum.html".

## Hymn-num-converter.lua (Not used)
- A lua script for OBS to auto convert hymn number entered from English to Spanish or vice versa, and display in the text box overlaying the video.
- It interacts with the text box inside a scene.
- Not as good as using HymnNumDisplay.html