from urllib.parse import urlparse

import socket

url = "https://alunos.cefet-rj.br/aluno/login.action?error="

parsed =urlparse(url)

host = parsed.hostname

ip = socket.gethostbyname(host)

print(ip)

