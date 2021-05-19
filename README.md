# PoEChat
## Installation
Install node.js and npm from [here](https://www.npmjs.com/get-npm)

Clone repository and run ``npm install`` in terminal of project's directory

In ```index.js``` if your path to Client.txt is not default (C:/Program Files (x86)/Grinding Gear Games/Path of Exile/logs/Client.txt), you should specify your own instead of ``process.env.CLIENT_PATH``
```javascript
var tail = new Tail("C:/YourPoEFolder/logs/Client.txt");
```
## Start
In order to start write ``npm start`` in the terminal.

In console you'll see ``link to chat: IPaddress:4000`` and you can navigate to your chat monitor using this link in browser.
