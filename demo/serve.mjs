import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../demo-dist/', import.meta.url));
const port = Number(process.env.DEMO_PORT || 4180);
const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.woff2':'font/woff2', '.woff':'font/woff', '.ico':'image/x-icon', '.json':'application/json' };
try { await stat(resolve(root, 'index.html')); } catch { console.error('Demo build missing. Run npm run demo:build first.'); process.exit(1); }
const server = createServer(async (req, res) => {
  if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
  try {
    const host = req.headers.host ?? '';
    if (![`127.0.0.1:${port}`, `localhost:${port}`].includes(host)) { res.writeHead(403); res.end(); return; }
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = resolve(root, '.' + (path === '/' ? '/index.html' : path));
    if (!file.startsWith(root.endsWith(sep) ? root : root + sep)) { res.writeHead(403); res.end(); return; }
    const bytes = await readFile(file);
    res.writeHead(200, { 'Content-Type':mime[extname(file)] || 'application/octet-stream', 'X-Content-Type-Options':'nosniff', 'Cache-Control':'no-store' });
    res.end(req.method === 'HEAD' ? undefined : bytes);
  } catch { res.writeHead(404); res.end('Not found'); }
});
server.on('error', e => { console.error(e.code === 'EADDRINUSE' ? `Port ${port} is busy. Close the other demo or set DEMO_PORT to another port.` : e.message); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => console.log(`BrainServe client demo: http://127.0.0.1:${port}\nKeep this window open. Press Ctrl+C to stop.`));
