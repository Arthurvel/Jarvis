import json 
import subprocess 


url = input("Informe uma URL que o SQLMap irá atuar (https:exemplo.com)");

cmd = [
	"sqlmap",
	"-u", url,
	"--batch"
]

#ajustar script para cuspir os resultados juntos em json 

resultado = subprocess.run(cmd, capture_output=True, text = True)

output_json = {
    "resultado": resultado.stdout
}

with open("sqlmap_result.json", "w", encoding="utf-8") as f:
    json.dump(output_json, f, indent=4, ensure_ascii=False)
