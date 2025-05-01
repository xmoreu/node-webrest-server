import http2 from 'http2'
import fs from 'fs'

const server = http2.createSecureServer(  {
    key:fs.readFileSync('./keys/server.key'),
    cert:fs.readFileSync('./keys/server.crt'),
} ,(req, res) => {
    console.log(req.url)
    //    res.writeHead(200,{'Content-type':'text/html'})
    //    res.write(`<h1>URL: ${req.url}</h1>`)
    //    res.end()

    // const data={name:'John Doe',age:30,city:'New york'}
    // res.writeHead(200,{'Content-Type':'application/json'})
    // //    res.write(`<h1>URL: ${req.url}</h1>`)
    //    res.end(JSON.stringify(data))
    // 

    if (req.url === '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
        const styles = fs.readFileSync('./public/styles.css', 'utf-8')


        res.writeHead(200, { 'Content-type': 'text/html' })
        res.end(htmlFile)
        return
    } 
    else if (req.url?.endsWith('css')) {
        res.writeHead(200, { 'Content-type': 'text/css' })
       
    } 
    else if (req.url?.endsWith('.js')) {
        res.writeHead(200, { 'Content-type': 'application/javascript' })
     
    } 
try {
     const responseContent=fs.readFileSync(`./public${req.url}`,'utf-8')
    res.end(responseContent)
} catch (error) {
    res.writeHead(404,{ 'Content-type': 'text/html' })
    res.end()
}
   
})

server.listen(8080, () => {
    console.log('Server running on 8080')


})