#!/usr/bin/env python3
"""
COOPSEWA Local Development Server
Serves the web prototype on http://localhost:8080
"""
import http.server
import socketserver
import os
import sys

PORT = 8080

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and caching headers for local testing
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

if __name__ == '__main__':
    web_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(web_dir)
    
    # Allow port reuse to avoid 'Address already in use' errors
    socketserver.TCPServer.allow_reuse_address = True
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"================================================================")
        print(f"COOPSEWA Prototype Running at: http://localhost:{PORT}")
        print(f"Serving files from: {web_dir}")
        print(f"Press Ctrl+C to stop the server.")
        print(f"================================================================")
        sys.stdout.flush()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
