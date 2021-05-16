# PoEChat
## Installation
Install node.js and npm from [here](https://www.npmjs.com/get-npm)

Clone repository and run ``npm install`` in terminal of project's directory
## In ```index.js``` if your path to Client.txt is not default (C:/Program Files (x86)/Grinding Gear Games/Path of Exile/logs/Client.txt), you should specify your own instead of ``process.env.CLIENT_PATH``
```javascript
var tail = new Tail(process.env.CLIENT_PATH);
```
## Start
In order to start write ``npm start`` in the terminal

Then open Command Prompt(cmd) on your pc to run command ``ipconfig`` and find your ``IPv4 Address. . . . . . . . . . . : xxx.xxx.xxx.xxx``

Open browser and go to ``yourIPv4address:4000``
