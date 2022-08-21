# ChromeMV3WebsocketExample
This is an example of a node server that is able to receive data from a chrome extension using the new Manifest Version 3 with a websocket
Written by Wyatt Sanders
https://wyattsanders.com

Install dependencies----------------
npm install
-----------------------

Chrome Install--------------
install the latest version of Chrome in 2022
go to chrome->settings->extensions
set into developer mode
load unpacked extension-> select this folder

Run it---------------------
start the server "node .\server.js"
open the chrome extension "ChromeMV3WebsocketExample" then click the only button "click to test"
then your server console should read:
"New Connection
::1: it works!
connection closed"
