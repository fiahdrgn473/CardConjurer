# Python 3 server example
from http.server import SimpleHTTPRequestHandler, HTTPServer
import webbrowser
import os

NAME = "localhost"
PORT = 8080
DIRECTORY = os.getcwd()


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

if __name__ == "__main__":
    webServer = HTTPServer((NAME, PORT), Handler)
    print("Server started http://%s:%s" % (NAME, PORT))

    try:
        webbrowser.open('http://localhost:8080', new=2)
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")
