#!/usr/bin/env python3
"""
Simple static file server with a safe proxy endpoint at /proxy?url=<encoded_url>
Usage: python3 dev_server.py [port]

The proxy will fetch remote http(s) resources and return them with CORS headers.
"""
import http.server
import socketserver
import urllib.parse
import urllib.request
import sys
import io


class ProxyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == '/proxy':
            qs = urllib.parse.parse_qs(parsed.query)
            url = qs.get('url', [''])[0]
            if not url or not (url.startswith('http://') or url.startswith('https://')):
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b'Invalid or missing url parameter')
                return

            try:
                req = urllib.request.Request(url, headers={'User-Agent': 'dev-proxy/1.0'})
                with urllib.request.urlopen(req, timeout=15) as resp:
                    content = resp.read()
                    ctype = resp.headers.get_content_type() or 'application/octet-stream'
                    self.send_response(200)
                    self.send_header('Content-Type', ctype)
                    # forward content-length if present
                    if resp.headers.get('Content-Length'):
                        self.send_header('Content-Length', resp.headers.get('Content-Length'))
                    # CORS
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
                    self.end_headers()
                    self.wfile.write(content)
                    return
            except Exception as e:
                self.send_response(502)
                self.end_headers()
                self.wfile.write(('Proxy error: %s' % e).encode('utf-8'))
                return

        # fall back to static file serving
        return super().do_GET()


def run(port=8000):
    Handler = ProxyHTTPRequestHandler
    with socketserver.ThreadingTCPServer(('', port), Handler) as httpd:
        print('Serving with proxy on port', port)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print('\nShutting down')


if __name__ == '__main__':
    p = 8000
    if len(sys.argv) > 1:
        try:
            p = int(sys.argv[1])
        except Exception:
            pass
    run(p)
