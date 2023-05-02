import openpyxl
from pyscript import document, Element

def visualizar_tabela():
    # Ler o arquivo xlsx
    wb = openpyxl.load_workbook("TabelaFinal.xlsx")
    ws = wb.active
    
    # Criar uma tabela HTML
    table = document.createElement("table")
    
    # Adicionar as linhas da tabela xlsx na tabela HTML
    for row in ws.iter_rows(values_only=True):
        tr = document.createElement("tr")
        for value in row:
            td = document.createElement("td")
            td.textContent = str(value)
            tr.appendChild(td)
        table.appendChild(tr)

    # Adicionar a tabela HTML na tag main do html
    main = Element("main")
    main.appendChild(table)