import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'photo-upload-handler',
        configureServer(server) {
          server.middlewares.use('/api/upload-photo', (req, res) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => (body += chunk));
              req.on('end', () => {
                try {
                  const { id, dataUrl } = JSON.parse(body);
                  if (dataUrl) {
                    const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
                    let fileName = 'coconvener-kandasamy-circle.png';
                    if (id === 'staff-0') fileName = 'staff-sivarama.png';
                    else if (id === 'staff-1') fileName = 'staff-manickam.png';
                    else if (id === 'student-0') fileName = 'student-athish.png';
                    else if (id === 'student-1') fileName = 'student-kishore.png';
                    else if (id) fileName = `coordinator-${id}.png`;

                    const targetPath = path.resolve(__dirname, 'public/brand', fileName);
                    fs.writeFileSync(targetPath, Buffer.from(base64Data, 'base64'));
                    const distPath = path.resolve(__dirname, 'dist/brand', fileName);
                    if (fs.existsSync(path.dirname(distPath))) {
                      fs.writeFileSync(distPath, Buffer.from(base64Data, 'base64'));
                    }
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true, fileName }));
                    return;
                  }
                } catch (e: any) {
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: e?.message || 'Upload failed' }));
                  return;
                }
              });
            } else {
              res.writeHead(405, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Method not allowed' }));
            }
          });
          server.middlewares.use('/api/upload-coconvener', (req, res) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => (body += chunk));
              req.on('end', () => {
                try {
                  const { dataUrl } = JSON.parse(body);
                  if (dataUrl) {
                    const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
                    const targetPath = path.resolve(__dirname, 'public/brand/coconvener-kandasamy-circle.png');
                    fs.writeFileSync(targetPath, Buffer.from(base64Data, 'base64'));
                    const distPath = path.resolve(__dirname, 'dist/brand/coconvener-kandasamy-circle.png');
                    if (fs.existsSync(path.dirname(distPath))) {
                      fs.writeFileSync(distPath, Buffer.from(base64Data, 'base64'));
                    }
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true }));
                    return;
                  }
                } catch (e: any) {
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: e?.message || 'Upload failed' }));
                  return;
                }
              });
            } else {
              res.writeHead(405, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Method not allowed' }));
            }
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
