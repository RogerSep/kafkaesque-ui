# Offline application example

This example showcases a way to keep state in `localStorage` to keep user content
even if the server goes down.

The main idea is in `bootstrap.ts` which has a listener on the topic `user.requests`. It pushes the events to the server. This has the effect of communicating with the server in a multiplexed manner, meaning, you can push events from any tab and only the leader will make the requests.

To use the example, visit `http://localhost:8080/offline.html` and hit the `submit` button, see in the dev tools how connections to the server are successful from the leader tab; other tabs won't see network activity. You can also kill the server either in the terminal or using the button `Kill server` in the UI (the button will just cause pushes to the server respond with a 500 error, so it's not really down unlike killing the server, but it works both ways).

When the server is down and you submit stuff, the `localStorage` will start to fill up and the leader tab will retry to send the events to the server with an exponential backoff of `1s`, `4s`, `9s`, `16s` and cap at `25s`, if you bring the server back up, the next retry will succeed and the accumulated events will be sent, emptying the `localStorage`.