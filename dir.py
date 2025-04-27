import json 
import subprocess 
import requests

url = input("Informe uma URL que o SQLMap irá atuar (https:exemplo.com)")

cmd = [
	"sqlmap",
	"-u", url,
	"--batch"
]

resultado = subprocess.run(cmd, capture_output=True, text = True)
