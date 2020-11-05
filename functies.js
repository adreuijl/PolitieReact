import React from 'react';   //, { useState }
import { useQuery, gql } from '@apollo/client';
import  { dossier_filtered_query, persoon_query, dossier_query } from './queries.js';
import   {Dossier, Persoon} from './index.js' ;



function DossierLijst ({ onDossierSelected } ) {
    const { loading, error, data } = useQuery(dossier_query);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return(
    <div> <div className = "header_dossierlijst">Beschikbare dossiers</div>
    <div className = "dossierlijst_info" name="dossier" onChange = {onDossierSelected}>

     {data.dossiers.map(dossier => (
       <div> <button className="listbutton" key={dossier.uri} value={dossier.uri} onClick = {onDossierSelected}>
          {dossier.label}
        </button>
        </div>
      ))}
    </div>
    </div>
    )
  }
  


  /*
 <div className = "header_dossierlijst">Beschikbare dossiers</div>
    <div className = "dossierlijst_info">
       {data.dossiers.map(dossier => <Dossier key={data.uri} {...dossier}/>)}
    </div>



{data.dossiers.map(dossier =>(
        <button key={dossier.uri} value={dossier.label}>
        {dossier.label}
        </button>
       ))}
  */

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
        <div className="dossierinfo_box">{data.dossiers.uri} {data.dossiers.label}</div>
        {data.dossiers.map(dossier => <Dossier key={data.uri} {...dossier}/>)}
        <div className="refetchbutton"> <button onClick={() => refetch()}>Refetch</button> </div>
       </div>
      )
    
  };

 
  //{data.dossiers.map(dossierinfo => <DossierInfo key={data.uri} {...dossierinfo}/>)}

  export {
      DossierInfo,
      PersoonFunctie,
      DossierLijst
  }