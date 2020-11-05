import React , { useState } from 'react';   
import ReactDOM, { render } from 'react-dom';
import axios from 'axios'; 
import './index.css';
import { ApolloClient, InMemoryCache } from '@apollo/client';
//import { useQuery, gql } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
//import  { dossier_filtered_query, persoon_query, dossier_query } from './queries.js';
import {DossierInfo, DossierLijst} from  './functies.js' ;


// =========================Appolo direct ===
const client = new ApolloClient({
  uri: 'http://localhost:8083/tbl/graphql/taxonomie',
  cache: new InMemoryCache()
});

// =========================App ===
function App () {
  const [selectedDossier, setSelectedDossier] = useState(null) ;
  function onDossierSelected({ target }) {setSelectedDossier(target.value);};
    return (
    <ApolloProvider client={client}>
    <div>
      
      <h1 className = "header">Opp 3.0</h1>
      <div className="topnav">
      <a className="active" href="#home">Home</a>
      <a href="#dossiers">Dossiers</a>
      <a href="#activiteiten">Activiteiten</a>
      </div>
      <div className="formulier"><DossierFormulier /></div>
      <DossierLijst onDossierSelected={onDossierSelected} />
      <div>
          {selectedDossier && <DossierInfo uri={selectedDossier} />}
        </div>
    </div>
    </ApolloProvider>
    )
};

class Dossier extends React.Component {

  render(
  ) {
    const dossier = this.props ; 
    return (
      <div className= "dossier_info">
        <div className= "dossier_label">{dossier.label}</div>
        <div className= "dossier_uri">{dossier.uri}</div>
      </div>
    )
  }
};

//{testData.map(dossier => <Dossier key={testData.uri} {...dossier}/>)}
// Je geeft in de klasse dossier de properties mee, die kunnen als input dienen in dossier dus: <Dossier uri={testData[0].uri} label={testData[0].label}/>  etc etc..
// als je niet alle properties van een data object wilt uitschrijven dan gebruik je een 'spread' dus:  <Dossier {...testData[0]}/> 
// steeds als de klasse wordt aangeroepen creeerd react in instantie van die klasse
// {data.dossiers.map(dossier => <Dossier key={data.uri} {...dossier}/>)}
//{data.dossiers.map(dossierinfo => <DossierInfo key={data.uri} {...dossierinfo}/>)}

class DossierFormulier extends React.Component {
render()
{
  return (
    <form>
      <input placeholder="voer naam in">
      </input>
      <button>Maak dossier</button>
    </form>
  )
}

} ;

class Persoon extends React.Component {

  render(
  ) {
    const persoon = this.props ; 
    return (
      <div className= "persoon_info">
        <div className= "persoon_info_button">{persoon.label}</div>
      </div>
    )
  }
};

// =======MAIN=================================

ReactDOM.render(
  <App title = "OPP 3.0" />,
  document.getElementById('root')
)

export {
  Dossier,
  Persoon,

}