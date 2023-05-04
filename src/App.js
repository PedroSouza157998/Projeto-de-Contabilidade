import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { InputSwitch } from 'primereact/inputswitch'
import tableDataMun from './data/tableDataMun.json'
import tableDataUF from './data/table_Data.json'
import './App.css';


function App() {
  const [values, setValues] = useState([]);
  const [municipio, setMunicipio] = useState();
  const [selectedUF, setSelectedUF] = useState();
  const [checked, setChecked] = useState(false);
  

  function transformToObjectArray(data) {
    const array = [];
  
    for (let municipio in data) {
      for (let conta in data[municipio]) {
        const valor = data[municipio][conta];
        array.push({ municipio, conta, valor });
      }
    }
  
    return array.map((item) => {
      return {
        municipio: item.municipio,
        conta: item.conta,
        valor: item.valor,
      };
    });
  }
  
  function transformarObjeto(objeto) {
    const municipio = objeto.conta;
    const contaValor = [];
  
    for (const [conta, valor] of Object.entries(objeto.valor)) {
      contaValor.push({ municipio, conta, valor });
    }
  
    return contaValor;
  }

  const filtrar = () => {
    const rows = []
    // for (let i = 0; i < 100; i++) {
    if (selectedUF && checked) {
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
    } else if (selectedUF && !checked) {
      console.log(tableDataMun)
      console.log(tableDataMun[selectedUF])

      console.log(transformToObjectArray({[selectedUF]: tableDataMun[selectedUF]}))

      transformToObjectArray({[selectedUF]: tableDataMun[selectedUF]}).map(e => {
        // console.log(e)
        transformarObjeto(e).map(row => {
          rows.push(row)
          console.log(row)
        })
        rows.push(...transformarObjeto(e));
      })

      // for (let i = 0; i < Object.keys(tableDataMun[selectedUF]).length; i++) {
      //   const row = {};

      //   Object.keys(tableDataMun).forEach((key) => {
      //     row[key] = tableDataMun[key][i];
      //   });
      //   // if (UF) {
      //   //   console.log(row)
      //   //   if (row['Instituição'].slice(-2) === UF) rows.push(row)
      //   // }
      //   rows.push(row);
      // }
    }
    setValues(rows);
  }

  React.useEffect(() => {
    console.log(tableDataMun.RS)
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
          {/* <input
            type="text"
            className="input-header"
            id="input_municipio"
            placeholder="Digite aqui o município..."
            value={municipio}
            onChange={(e) => { setMunicipio(e.target.value) }} /> */}

            <div style={{display: 'flex', flexDirection: 'row'}}>
              <InputSwitch checked={checked} onChange={(e) => {
                setValues([])
                setChecked(e.value)
              }} />
              <label style={{paddingTop: 5, paddingLeft: 10}}>Mostrar apenas UF</label>
            </div>

          <button type="submit" className="button-header" id="button_municipio" onClick={filtrar}>Visualizar tabela</button>
        </div>

      </header>


      <main id="main">

        <div>
          {checked ? <DataTable value={values} tableStyle={{ minWidth: '50rem', width: '100%' }}>
            <Column field="Conta" header="Conta" alignHeader='left'></Column>
            <Column field="UF" header="UF" alignHeader='left'></Column>
            <Column field="Valor" header="Valor" align="right" alignHeader='right' body={(el) => <div style={{ textAlign: 'right' }}>{Number(el.Valor).toFixed(2)}</div>}></Column>
          </DataTable> :
            <DataTable value={values} tableStyle={{ minWidth: '50rem', width: '100%' }}>
              <Column field="conta" header="Conta" alignHeader='left'></Column>
              <Column field="municipio" filter filterPlaceholder="Pesquisar pelo Município" header="Município" alignHeader='left'></Column>
              <Column field="valor" header="Valor" align="right" alignHeader='right' body={(el) => <div style={{ textAlign: 'right' }}>{el.valor.toFixed(2)}</div>}></Column>
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
              className="a-footer" href="https://github.com/Madu218" target="_blank">Maria Melo</a> e <a
                className="a-footer" href="https://github.com/PedroSouza157998" target="_blank">Pedro Souza</a>.
        </h4>
      </footer>

    </div>
  );
}

export default App;
