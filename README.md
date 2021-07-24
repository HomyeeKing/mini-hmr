[中文文档](./README_ZH.md)

# HMR

The theory behind the hmr is quite simple, you can follow the step:

- **establish socket connect** we need to establish socket connection, here we use [`ws`](https://github.com/websockets/ws) 3rd module on server and raw `Websocket` on client, FYI `ws` also contain client socket module, so you can use it on both side.

- **watch file changes** use [`chokidar`](https://github.com/paulmillr/chokidar) to watch file changes, you can see relative config in their github

- **specify the change type** you can tell the client what type of file changes, then client do something according to the type, same for the server such as restart the server
