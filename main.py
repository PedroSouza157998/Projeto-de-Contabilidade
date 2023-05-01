from js import alert
from js import console

# console.log("teste")


def visualizar_tabela(*ags, **kags):
    input_municipio = Element("input_municipio")
    municipio = input_municipio.element.value
    alert("o municipio inserido foi "+municipio)
    input_municipio.element.value = ""
