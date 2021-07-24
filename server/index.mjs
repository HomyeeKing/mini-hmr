import http from 'http'
import fs from 'fs'
import chokidar from 'chokidar'
import { createWebsocketServer } from './ws.mjs'
import { handleHMR } from './hmr.mjs'

export function createServer(){
    const cwd = process.cwd()

    const server = http.createServer((req,res)=>{
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile('./client/index.html',"utf-8",(err,data)=>{
            if(err) throw err
            res.end(data)
        })
    })
    
  
    const ws = createWebsocketServer(server)

    //hmr
    const watcher = chokidar.watch(cwd,{
        ignored: ['**/node_modules/**', '**/.git/**'],
        ignorePermissionErrors: true,
        disableGlobbing: true,
    })

    watcher.on('change',(file)=>{
        handleHMR(file,server)
    })
    return {
        httpServer:server,
        ws,
        async close(){
            await Promise.all([
                watcher.close(),
                server.close()
            ])
        },
        listen(port,isRestart = false){
            console.clear()
            isRestart&&console.log('restart');
            server.listen(port,"0.0.0.0")
            console.log(`server is running at http://localhost:${port}`);        
        }
    }
}


createServer().listen(3333)



