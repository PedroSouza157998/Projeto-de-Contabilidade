const XLSX = require('xlsx');

function onSearch() {
    const input_municipio = document.getElementById("input_municipio")
    const input_estado = document.getElementById("input_estado")

    alert(`${input_municipio.value} - ${input_estado.value}`)

    const workbook = XLSX.readFile('tabelaFinal.xlsx');
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const range = XLSX.utils.decode_range(sheet['!ref']);

    for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
        let rowData = {};
        for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
            const cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
            const cellData = sheet[cellAddress];
            if (cellData) {
                rowData[XLSX.utils.encode_col(colNum)] = cellData.v;
            }
        }
        console.log(rowData);
    }
}

// from js import alert

// # console.log("teste")


// def visualizar_tabela():
//     input_municipio = Element("input_municipio")
//     input_estado = Element("input_estado")
//     municipio = input_municipio.element.value
//     estado = input_municipio.element.value
//     alert("o municipio inserido foi " + municipio + " - " + estado)
//     input_municipio.element.value = ""
//     input_estado.element.value = ""
