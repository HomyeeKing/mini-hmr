import Websocket from 'ws'


export function createWebsocketServer (server){
    const wss = new Websocket.Server({server})

    wss.on('connection',(ws)=>{
        ws.send(JSON.stringify({type:'connection'}))
    })

    return {
        send(payload){
            wss.clients.forEach(client=>{
                if(client.readyState === Websocket.OPEN){
                    client.send(JSON.stringify(payload))
                }
            })
        },
        close(){
            return new Promise((resolve,reject)=>{
                wss.close((err)=>{
                    if(err) reject(err)
                    else resolve()
                })
            })
        }
    }
}
