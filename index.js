import React , { useState } from 'react';   
import ReactDOM, { render } from 'react-dom';
import './index.css';
import { ApolloClient, InMemoryCache, useMutation, createHttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import {DossierInfo, DossierLijst, VoegDossierToe, ActiviteitInfo} from  './functies.js' ;


// =========================Appolo direct connector===
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
  const [selectedActiviteit, setSelectedActiviteit] = useState(null) ;
  //const [GeselecteerdDossierVoorVerwijdering, setGeselecteerdDossierVoorVerwijdering] = useState(null) ;

  function onDossierSelected({ target }) {
    setSelectedDossier(target.value);
    setSelectedActiviteit(null);
  };
  function onActiviteitSelected({ target }) {
    setSelectedActiviteit(target.value);
  };

    
  return (
    <ApolloProvider client={client}>
    <div>
        
        <h1 className = "app_header">SEMA OPP 3.0: We Rock</h1>
        <div className="topnav">
          <a className="active" href="#home">Home</a>
          <a href="#dossiers">Dossiers</a>
          <a href="#activiteiten">Activiteiten</a>
        </div>
        <div className="app_maak_dossier"><VoegDossierToe /></div>
        <div className="app_beschikbare_dossiers"><DossierLijst onDossierSelected={onDossierSelected} /></div>
        <div className="app_dossierinfo">{selectedDossier && <DossierInfo uri={selectedDossier} onActiviteitSelected={onActiviteitSelected}/>}</div>
        <div className="app_activiteitinfo"> {selectedActiviteit && <ActiviteitInfo uri={selectedActiviteit}/>}</div>
    </div>
    </ApolloProvider>
    )
};

// {selectedActiviteit && <ActiviteitInfo uri={selectedActiviteit}/>} het && teken zorgt ervoor dat de selectedActiviteit eerst gekozen moet zijn voordat er iets getoont wordt
// =======MAIN=================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

// <div className="app_verwijder_dossier"><VerwijderDossier uri={GeselecteerdDossierVoorVerwijdering} onGeselecteerdDossierVoorVerwijdering={onGeselecteerdDossierVoorVerwijdering}/></div>

//{testData.map(dossier => <Dossier key={testData.uri} {...dossier}/>)}
// Je geeft in de klasse dossier de properties mee, die kunnen als input dienen in dossier dus: <Dossier uri={testData[0].uri} label={testData[0].label}/>  etc etc..
// als je niet alle properties van een data object wilt uitschrijven dan gebruik je een 'spread' dus:  <Dossier {...testData[0]}/> 
// steeds als de klasse wordt aangeroepen creeerd react een instantie van die klasse
// {data.dossiers.map(dossier => <Dossier key={data.uri} {...dossier}/>)}
//{data.dossiers.map(dossierinfo => <DossierInfo key={data.uri} {...dossierinfo}/>)}

/*
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
*/

