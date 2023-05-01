from js import alert
from js import console

# console.log("teste")


def visualizar_tabela():
    input_municipio = Element("input_municipio")
    input_estado = Element("input_estado")
    municipio = input_municipio.element.value
    estado = input_municipio.element.value
    alert("o municipio inserido foi " + municipio + " - " + estado)
    input_municipio.element.value = ""
    input_estado.element.value = ""
