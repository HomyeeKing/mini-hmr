import { createServer } from './index.mjs'

const isHTML = (path)=>/.html$/.test(path)
const isEnvFile = (path)=>path.includes('package.json')

export async function handleHMR(file,server){
    const {ws} = server
    if(isHTML(file)){
        ws.send({
            type:'html'
        })
    }
    if(isEnvFile(file)){
       await restartServer(server)
    }
}

export async function restartServer(server){
    let newServer = null
    try {
        newServer = await createServer()
    } catch (error) {
        throw error
    }

    await server.close()
    newServer.listen(3333,true)
}