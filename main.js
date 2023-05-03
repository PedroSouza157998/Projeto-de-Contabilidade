// const XLSX = require('xlsx');

function carregar() {
    var url = readTextFile('/home/pedro/Projeto-de-Contabilidade/TabelaFinal.xlsx');
    console.log(url)
    // var xhr = new XMLHttpRequest();
    // xhr.open('GET', url, true);
    // xhr.responseType = 'arraybuffer';
    // xhr.onload = function () {
    //     var data = new Uint8Array(xhr.response);
    //     var workbook = XLSX.read(data, { type: 'array' });
    //     var sheet_name_list = workbook.SheetNames;
    //     var sheet_data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], { header: 1 });
    //     var container = document.getElementById('tabela');
    //     var tabela = new Handsontable(container, {
    //         data: sheet_data,
    //         rowHeaders: true,
    //         colHeaders: true
    //     });
    //     console.log(tabela)
    // };
    // xhr.send();
}
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}

function onSearch() {
    const input_municipio = document.getElementById("input_municipio")
    const input_estado = document.getElementById("input_estado")
    const inputFile = document.getElementById('input-file');

    const reader = new FileReader();
    reader.readAsBinaryString(inputFile.files[0]);
    reader.onload = () => {
        const workbook = XLSX.read(reader.result, { type: 'binary' });
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
    };

    alert(`${input_municipio.value} - ${input_estado.value}`)

    // const workbook = XLSX.readFile('TabelaFinal.xlsx');
    // const sheetName = workbook.SheetNames[0];
    // const sheet = workbook.Sheets[sheetName];
    // const range = XLSX.utils.decode_range(sheet['!ref']);

    // for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
    //     let rowData = {};
    //     for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
    //         const cellAddress = XLSX.utils.encode_cell({ r: rowNum, c: colNum });
    //         const cellData = sheet[cellAddress];
    //         if (cellData) {
    //             rowData[XLSX.utils.encode_col(colNum)] = cellData.v;
    //         }
    //     }
    //     console.log(rowData);
    // }
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
