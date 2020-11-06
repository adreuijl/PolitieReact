import React from 'react';   //, { useState }
import { useQuery, useMutation } from '@apollo/client';
import  { dossier_filtered_query, persoon_query, dossier_query,dossier_toevoeg_query, verwijder_dossier_query } from './queries.js';
import   {Dossier, Persoon} from './index.js' ;



function DossierLijst ({ onDossierSelected } ) {
    const { loading, error, data } = useQuery(dossier_query);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return(
    <div> <div className = "header_dossierlijst">Beschikbare dossiers</div>
    <div className = "dossierlijst_info" >
      {data.dossiers.map(
          dossier => (
            <div key={dossier.uri}> 
              <button type="button" className="listbutton" key={dossier.uri} value={dossier.uri} onClick = {onDossierSelected}>
                  {dossier.label}
              </button>
            </div>
          )
        )
      }
    </div>
    </div>
    )
  }

function PersoonFunctie() {
    const { loading, error, data } = useQuery(persoon_query);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
      return(
        <div>
  
           {data.persoons.map(persoon => <Persoon key={data.uri} {...persoon}/>)}
        </div>
        
        )
  }

function DossierInfo ({ uri }) {
    const { loading, error, data, refetch, networkStatus } = useQuery(
        dossier_filtered_query, 
        {
         variables: { uri },
         notifyOntNetworkStatusChange: true 
        }
    );
    
    if (networkStatus === 4) return <p>Refetch</p> ;
    if (loading) return null;
    if (error) return `Error! ${error}`;
  
      return (
       <div>
        {data.dossiers.map(dossier => <Dossier key={dossier.uri} {...dossier}/>)}
        <div className="refetchbutton"> 
          <button className ="refetchbutton" onClick={() => refetch()}>
          Refetch
          </button> 
        </div>

       </div>
      )
    
  };


function VerwijderDossierLijst( { onGeselecteerdDossierVoorVerwijdering } ) {
    const { loading, error, data } = useQuery(dossier_query);
    if (loading) return null;
    if (error) return `Error! ${error}`;
    
  return (
    <div > 
     <select onChange={onGeselecteerdDossierVoorVerwijdering}>
     {data.dossiers.map(
          dossier => (
            <option key={dossier.uri} value={dossier.uri} >
                  {dossier.uri}
            </option>
          )
        )
      }
     </select>
     </div>
  )
  };

  // onchange={onGeselecteerdDossierVoorVerwijdering}


  function VerwijderDossier( { uri } ) {
    const [ verwijderDossier,{data}] = useMutation(verwijder_dossier_query);
  return (
      <div>
         <form onSubmit= {e => {
        e.preventDefault();
        verwijderDossier(
          { variables: { uri }  }
        );
        console.log({uri});
        uri= ""
      }}>
        <button type="submit">Verwijder Dossier</button>
        </form>
      </div>
   )
  };

 

function VoegDossierToe () {
    let input;
    const [voegDossierToe, { data }] = useMutation(dossier_toevoeg_query);
  
    function camelCase(value) { 
      return value.toLowerCase().replace(/\s+(.)/g, function(match, group1) {
          return group1.toUpperCase();
      });
  }

    return (
    <div>  
      <form onSubmit= {e => {
        e.preventDefault();
        voegDossierToe({ variables: {label:input.value,  uri: ("https://adser.nl/model/Dossier#"+camelCase(input.value)) } });
        console.log(input.value);
        console.log(("https://adser.nl/model/Dossier#"+input.value));
        input.value= ""
      }}>
        <input 
          placeholder="naam dossier" 
          required
          ref={node => {
            input = node;
          }}
         />
        <button type="submit">Maak dossier</button>
      </form>
      </div>
      
    )
  } ;
  
  //{data.dossiers.map(dossierinfo => <DossierInfo key={data.uri} {...dossierinfo}/>)}

  export {
      DossierInfo,
      PersoonFunctie,
      DossierLijst,
      VoegDossierToe,
      VerwijderDossierLijst,
      VerwijderDossier
  }