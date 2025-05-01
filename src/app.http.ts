import http from 'http'
import fs from 'fs'

const server = http.createServer((req, res) => {
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

    const responseContent=fs.readFileSync(`./public${req.url}`,'utf-8')
    res.end(responseContent)
})

server.listen(8080, () => {
    console.log('Server running on 8080')


})