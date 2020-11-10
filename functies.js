import React from 'react';   //, { useState }
import { useQuery, useMutation } from '@apollo/client';
import  { dossier_filtered_query, activiteiten_filtered_query, dossier_query,dossier_toevoeg_query, verwijder_dossier_query, pas_label_aan_dossier } from './queries.js';

function DossierLijst ({ onDossierSelected }, { onActiviteitDeSelected } ) {
    const [verwijderDossier] = useMutation(verwijder_dossier_query);
    const { loading, error, data } = useQuery(dossier_query);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return(
    <div className = "dossierlijst"> 
    <div className = "dossierlijst_header">Beschikbare dossiers</div>
    <div className = "dossierlijst_inhoud" >
      {data.dossiers.map(
          dossier => (
            <div key={dossier.uri}>
              <form 
                   className="dossierlijst_inhoud_formulier" 
                  onSubmit = {e => {
                  e.preventDefault();
                  if (window.confirm ('Je verwijderd een dossier: Weet je het zeker?'))
                  verwijderDossier({ variables: { uri:dossier.uri }  });
                  
                  }}
                  >
              <button 
              type="button" 
              className="dossierlijst_inhoud_listbutton" 
              key={dossier.uri} 
              value={dossier.uri} 
              onClick = {onDossierSelected}>
                  {dossier.label} ({dossier.uri})
              </button>
              <button
                type =  "submit"
                className="dossierlijst_inhoud_verwijderbutton" >
                verwijder
              </button>
              </form> 
            </div>
          )
        )
      }
    </div>
    </div>
    )
  }

function DossierInfo ({ uri, onActiviteitSelected }) {

  let input;  

  const { loading, error, data, refetch, networkStatus } = useQuery(
        dossier_filtered_query, 
        {
         variables: { uri },
         notifyOntNetworkStatusChange: true 
        }
    );
    
    const [pasLabelAan] = useMutation(pas_label_aan_dossier);

    if (networkStatus === 4) return <p>Refetch</p> ;
    if (loading) return null;
    if (error) return `Error! ${error}`;
  
      return (
       <div>
        {data.dossiers.map(dossier => (
          <table  key={dossier.uri} className= "dossierinfo">
            <thead>
              <tr className="dossierinfo_header">
                <th>Eigenschap</th>
                <th>Waarde</th>
                <th>Wijzig</th>
              </tr>
            </thead>
            <tbody  className= "dossierinfo_body">
            <tr className= "dossierinfo_uri">
              <td>uri</td>
              <td>{dossier.uri}</td>
            </tr>
            <tr className= "dossierinfo_label">
              <td>rdfs label</td>
              <td> {dossier.rdfs_label}</td>
              <td>
                <form className="dossierinfo_table_form'" onSubmit = {e => {
                  e.preventDefault();
                  pasLabelAan(
                    { variables: {label:input.value,  uri }  }
                  );
                  console.log({uri});
                  uri= ""
                  }}
                  >
                    <input 
                    placeholder="nieuw label" 
                    required
                    ref={node => {input = node;}}
                    >
                    </input>
                  <button  type="submit" >pas aan</button>
                </form>
              </td>
            </tr>
            <tr className= "dossierinfo_preflabel">
              <td>prefLabel </td>
              <td> {dossier.prefLabel.map(prefLabel =>(<div>{prefLabel.string} </div>))}</td>
            </tr> 

            <tr className= "dossierinfo_activiteiten" key= {dossier.activiteit.label}>
              <td>activiteit </td>
              <td> {dossier.activiteit? dossier.activiteit.map(activiteit =>(<button value={activiteit.uri} onClick={onActiviteitSelected}> {activiteit.label} </button>)) : 'geen activiteiten'}</td>
              <td></td>
            </tr> 
          </tbody>
       </table>
        )
        )
        }

        <div className="refetchbutton"> 
          <button className ="dossierinfo_refetchbutton" onClick={() => refetch()}>
          Refetch
          </button> 
        </div>
        
      </div>

      )
  };


function ActiviteitInfo ( { uri } ) {

  const { loading, error, data, networkStatus } = useQuery(
    activiteiten_filtered_query, 
    {
     variables: { uri },
     notifyOntNetworkStatusChange: true 
    }
);

if (networkStatus === 4) return <p>Refetch</p> ;
if (loading) return null;
if (error) return `Error! ${error}`;

  return(
  <div>

  {data.activiteits.map(activiteit => (
    <table  key={activiteit.uri} className= "activiteitinfo">
    <thead>
        <tr className="activiteitinfo_header">
          <th>Eigenschap</th>
          <th>Waarde</th>
          <th>Wijzig</th>
        </tr>
      </thead>
      <tbody  className= "activiteitinfo_body"></tbody>
      <tr >
        <td>uri</td>
        <td>{activiteit.uri}</td>
        <td></td>
      </tr>
      <tr className= "activiteitinfo_preflabel">
      <td>label</td>
        <td>{activiteit.label}</td>
        <td></td>
      </tr>
    </table>
  ))}

  </div>
  )
}


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
        voegDossierToe({ variables: {label:input.value,  uri: ("https://adser.nl/model/Dossier#"+camelCase(input.value)), prefLabel:input.value } });
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
  
  
  /*
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


  

  function VerwijderDossier( {uri, onGeselecteerdDossierVoorVerwijdering} ) {

    const { loading, error, data } = useQuery(dossier_query);
    const [verwijderDossier] = useMutation(verwijder_dossier_query);

    if (loading) return null;
    if (error) return `Error! ${error}`;
  

    return (
      <div className="verwijder_dossier">
        <form onSubmit= {e => {
          e.preventDefault();
          verwijderDossier(
            { variables: { uri }  }
          );
          console.log({uri});
          uri= ""
        }}>
          <select onChange={onGeselecteerdDossierVoorVerwijdering}>
            {data.dossiers.map
              (
                dossier => (
                  <option key={dossier.uri} value={dossier.uri} >
                    {dossier.uri}
                  </option>
                )
              )
            }
          </select>
          <button type="submit">
            Verwijder Dossier
          </button>

          </form>
      </div>
   )
  };
  */


  export {
      DossierInfo,
      DossierLijst,
      VoegDossierToe,
      ActiviteitInfo
  }