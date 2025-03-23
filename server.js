const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const template = require('art-template');

const wwwDir = 'www';
const port = 8080;
const phpPath = 'php'; // Caminho do PHP, altere se necessário

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
  '.php': 'text/html; charset=utf-8'
};

const server = http.createServer((req, res) => {
    let urlPath = req.url === '/' ? '/index.html' : req.url;
    let fullPath = path.join(wwwDir, decodeURIComponent(urlPath));
    
    fs.access(fullPath, fs.constants.F_OK, (err) => {
        if (err) {
            return sendErrorPage(res, 404, 'Arquivo não encontrado');
        }

        fs.stat(fullPath, (err, stats) => {
            if (err) {
                return sendErrorPage(res, 500, 'Erro interno do servidor');
            }

            if (stats.isDirectory()) {
                handleDirectory(fullPath, urlPath, res);
            } else {
                serveFile(fullPath, res);
            }
        });
    });
});

function serveFile(fullPath, res) {
    const ext = path.extname(fullPath);
    res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
    
    if (ext === '.php') {
        exec(`${phpPath} ${fullPath}`, (error, stdout, stderr) => {
            if (error) {
                return sendErrorPage(res, 500, 'Erro ao processar PHP');
            }
            res.end(stdout);
        });
    } else {
        fs.createReadStream(fullPath).pipe(res);
    }
}

function handleDirectory(fullPath, urlPath, res) {
    fs.readdir(fullPath, (err, files) => {
        if (err) {
            return sendErrorPage(res, 500, 'Erro ao ler diretório');
        }
        
        const indexFile = files.find(file => file.startsWith('index'));
        if (indexFile) {
            return serveFile(path.join(fullPath, indexFile), res);
        }

        fs.readFile('./template.html', (err, templateFile) => {
            if (err) {
                return sendErrorPage(res, 500, 'Erro ao carregar template');
            }

            const fileList = files.map(file => {
                const fileStat = fs.statSync(path.join(fullPath, file));
                return {
                    name: file,
                    size: fileStat.size,
                    created: fileStat.ctime.toLocaleString(),
                    modified: fileStat.mtime.toLocaleString()
                };
            });

            const htmlStr = template.render(templateFile.toString(), {
                path: urlPath,
                port: port,
                files: fileList
            });
            res.end(htmlStr);
        });
    });
}

function sendErrorPage(res, statusCode, message) {
    res.writeHead(statusCode, { 'Content-Type': 'text/html' });
    res.end(`<h1>${statusCode} - ${message}</h1>`);
}

server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
