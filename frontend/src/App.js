import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import tableData from './data/tabelData.json'
import tableDataUF from './data/table_Data.json'
import './App.css';


function App() {
  const [values, setValues] = useState([]);
  const [municipio, setMunicipio] = useState();
  const [selectedUF, setSelectedUF] = useState();



  const filtrar = () => {
    const rows = []
    // for (let i = 0; i < 100; i++) {
    if (selectedUF && !municipio) {
      console.log(tableDataUF)
      for (let i = 0; i < Object.keys(tableDataUF.Conta).length; i++) {
        console.log('teste')
        const row = {};

        // adiciona cada valor da linha no novo objeto
        Object.keys(tableDataUF).forEach((key) => {
          row[key] = tableDataUF[key][i];
        });
        if (selectedUF) {
          if (row['UF'] === selectedUF) rows.push(row)
        }
      }
    } else {

      // for (let i = 0; i < Object.keys(tableData.Conta).length; i++) {
      for (let i = 0; i < 100; i++) {
        console.log('teste')
        const row = {};

        // adiciona cada valor da linha no novo objeto
        Object.keys(tableData).forEach((key) => {
          row[key] = tableData[key][i];
        });
        // if (UF) {
        //   console.log(row)
        //   if (row['Instituição'].slice(-2) === UF) rows.push(row)
        // }
        // rows.push(row);
      }
    }
    setValues(rows);
  }

  React.useEffect(() => {
    console.log(tableData)
  }, []);


  return (
    <div>

      <header>

        <h2 className="h2-header">Contabilidade de Custos e Gerencial</h2>
        <h4 className="h4-header">Insira no input abaixo o município do qual deseja obter informações:</h4>
        <div className="form">
          <Dropdown value={selectedUF} onChange={(e) => setSelectedUF(e.value)} options={[
            'AC',
            'AL',
            'AP',
            'AM',
            'BA',
            'CE',
            'DF',
            'ES',
            'GO',
            'MA',
            'MT',
            'MS',
            'MG',
            'PA',
            'PB',
            'PR',
            'PE',
            'PI',
            'RR',
            'RO',
            'RJ',
            'RN',
            'RS',
            'SC',
            'SP',
            'SE',
            'TO']} placeholder="Selecione Estado"
            filter className="w-full md:w-14rem" />
          <input
            type="text"
            className="input-header"
            id="input_municipio"
            placeholder="Digite aqui o município..."
            value={municipio}
            onChange={(e) => { setMunicipio(e.target.value) }} />

          <button type="submit" className="button-header" id="button_municipio" onClick={filtrar}>Visualizar tabela</button>
        </div>

      </header>


      <main id="main">

        <div>
          {selectedUF && !municipio && <DataTable value={values} tableStyle={{ minWidth: '50rem', width: '100%' }}>
            <Column field="Conta" header="Conta" alignHeader='left'></Column>
            <Column field="UF" header="UF" alignHeader='left'></Column>
            <Column field="Valor" header="Valor" align="right" alignHeader='right' body={(el) => <div style={{ textAlign: 'right' }}>{Number(el.Valor).toFixed(2)}</div>}></Column>
          </DataTable>}
          {municipio &&
            <DataTable value={values} tableStyle={{ minWidth: '50rem', width: '100%' }}>
              <Column field="Conta" header="Conta" alignHeader='left'></Column>
              <Column field="Instituição" header="Instituição" alignHeader='left'></Column>
              <Column field="Valor" header="Valor" align="right" alignHeader='right' body={(el) => <div style={{ textAlign: 'right' }}>{Number(el.Valor).toFixed(2)}</div>}></Column>
            </DataTable>
          }
        </div>

      </main>

      <footer>
        <h4>
          Projeto desenvolvido por <a className="a-footer" href="https://github.com/geovannaadomingos"
            target="_blank">Geovanna
            Domingos</a>,
          <a className="a-footer" href="https://github.com/gustavo-ghcs" target="_blank">Gustavo de Hollanda</a>, <a
            className="a-footer" href="https://github.com/higorcunha1" target="_blank">Higor Cunha</a>, <a
              className="a-footer" href="https://github.com/Madu2018" target="_blank">Maria Eduarda</a> e <a
                className="a-footer" href="https://github.com/PedroSouza157998" target="_blank">Pedro Souza</a>.
        </h4>
      </footer>

    </div>
  );
}

export default App;
