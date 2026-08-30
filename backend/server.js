const http = require('http');

const PORT = 3000;

const students = [
    {name:"Olawale Olawunmi", grade:"A", major:"Computer Engineering"},
    {name:"Akande Oluwaseun", grade:"c", major:"Finance"},
    {name:"Zainab Yusuf", grade:"A", major:"Accounting"},
    {name:"Tunde Showunmi", grade:"B+", major:"Mechanical Engineering"},
    {name:"Ngozi Chibuzor", grade:"F", major:"Civil Engineering"},
    {name:"Nuhu Sahu", grade:"D", major:"Business Admin"},
];

const server = http.createServer((request, response) => {
    const url = request.url;
    const method = request.method;
    
    response.setHeader('Content-Type','application/json');

    if(method === 'GET'&& url ==='/students'){
        response.writeHead(200);
        return response.end(JSON.stringify(students));
    }

    if(method === 'GET'&& url ==='/about'){
        response.writeHead(200);
        return response.end(JSON.stringify({
            name:"Zainab",
            class:"Node.js"
        }));
    }

    response.writeHead(404);
    response.end(JSON.stringify({error:"Invalid Endpoint"}));

});

server.listen(3000,() => {
    console.log(`server running at http://localhost:3000`);
});
