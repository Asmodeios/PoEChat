# PoEChat
## Installation
Clone repository and run ``npm install`` in terminal of project's directory
## In ```index.js``` if your path to Client.txt is not default (C:/Program Files (x86)/Grinding Gear Games/Path of Exile/logs/Client.txt), you should specify your own instead of ``process.env.CLIENT_PATH``
```javascript
var tail = new Tail(process.env.CLIENT_PATH);
```
