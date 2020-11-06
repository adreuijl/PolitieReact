import React , { useState } from 'react';   
import ReactDOM, { render } from 'react-dom';
import axios from 'axios'; 
import './index.css';
import { ApolloClient, InMemoryCache, useMutation, createHttpLink } from '@apollo/client';
import { useQuery, gql } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
//import  { dossier_toevoeg_query } from './queries.js';
import {DossierInfo, DossierLijst, VoegDossierToe, VerwijderDossierLijst, VerwijderDossier} from  './functies.js' ;


// =========================Appolo direct ===
const link = createHttpLink({
  uri: 'http://localhost:8083/tbl/graphql/taxonomie',
  credentials: 'include'
});

const client = new ApolloClient({
  cache: new InMemoryCache() ,
  link
});



// =========================App ===
function App () {
  const [selectedDossier, setSelectedDossier] = useState(null) ;
  const [GeselecteerdDossierVoorVerwijdering, setGeselecteerdDossierVoorVerwijdering] = useState(null) ;

  function onDossierSelected({ target }) {setSelectedDossier(target.value);};
  function onGeselecteerdDossierVoorVerwijdering({ target }) {setGeselecteerdDossierVoorVerwijdering(target.value);};
    return (
    <ApolloProvider client={client}>
    <div>
        
        <h1 className = "header">SEMA OPP 3.0: We Rock</h1>
        <div className="topnav">
        <a className="active" href="#home">Home</a>
        <a href="#dossiers">Dossiers</a>
        <a href="#activiteiten">Activiteiten</a>
        </div>

        <div className="formulier"><VoegDossierToe /></div>
        <div className="formulier"><VerwijderDossierLijst onGeselecteerdDossierVoorVerwijdering={onGeselecteerdDossierVoorVerwijdering}/></div>
        <div className="formulier">
          <VerwijderDossier uri={GeselecteerdDossierVoorVerwijdering}/>
        </div>
        <div><DossierLijst onDossierSelected={onDossierSelected} /></div>
        
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
        <div className= "dossier_label">Label: {dossier.label}</div>
        <div className= "dossier_uri">Uri: {dossier.uri}</div>
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
  VoegDossierToe
}