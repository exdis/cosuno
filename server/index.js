const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');

http.createServer((req, res) => {
    switch (true) {
        case req.url === '/':
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            fs.createReadStream(path.join('static', 'index.html')).pipe(res);
            break;
        case req.url.startsWith('/static'):
            const filename = req.url.replace('/static', '');

            try {
                res.setHeader('Content-Type', `${mime.getType(filename)}; charset=utf-8`);
                fs.createReadStream(path.join('dist', filename)).pipe(res);
            } catch (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain; charset=utf-8'
                });
                res.write('Error', err.message);
                res.end();
            }
            break;
        case req.url === '/api/companies': 
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            fs.createReadStream(path.join(__dirname, 'fixture.json')).pipe(res);
            break;
        default:
            res.writeHead(404, {
                'Content-Type': 'text/plain; charset=utf-8'
            });
            res.write('Not found');
            res.end();
    }
}).listen(3000);