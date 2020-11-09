import React from 'react';   //, { useState }
import { useQuery, useMutation } from '@apollo/client';
import  { dossier_filtered_query, persoon_query, dossier_query,dossier_toevoeg_query, verwijder_dossier_query, pas_label_aan_dossier } from './queries.js';
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

function DossierInfo ({ uri, label }) {
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
          <table className= "dossier_info">
          <tbody>
            <tr className="dossierinfo_table_header">
              <th>Eigenschap</th>
              <th>Waarde</th>
              <th>Wijzig</th>
            </tr>
            <tr className= "dossier_uri">
              <td>Uri </td>
              <td>{dossier.uri}</td>
            </tr>
            <tr className= "dossier_label">
              <td>Label </td>
              <td> {dossier.label}</td>
              <td>
                <form className="dossierinfo_table_form'" onSubmit = {e => {
          e.preventDefault();
          pasLabelAan(
            { variables: {label:input.value,  uri }  }
          );
          console.log({uri});
          uri= ""
        }}>
                  <input placeholder="nieuw label" 
          required
          ref={node => {
            input = node;
          }} >
                  </input>
                  <button type="submit"  onClick={() => refetch()}>pas aan</button>
                </form>
              </td>
            </tr> 
          </tbody>
       </table>
        )
        )
        }
        <div className="refetchbutton"> 
          <button className ="refetchbutton" onClick={() => refetch()}>
          Refetch
          </button> 
        </div>
       </div>

      )
    
  };


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
      VerwijderDossier
  }