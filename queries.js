import React from 'react';   //, { useState }
import {  gql } from '@apollo/client';

//Ophalen Actieve dossiers via graphql query
const dossier_query = gql`
 query GetDossiers{
    dossiers {
      uri
      label
    }
  }
  `;


  const persoon_query = gql `
  {
    persoons
    {
      uri
      label
    }
  }`;


  const dossier_filtered_query = gql`
  query dossiers($uri: ID)
  {
    dossiers(uri: $uri) 
    {
      uri
      label
    }
  }
  `;

  
  const dossier_toevoeg_query = gql`
  mutation  {
    createDossier (input: {
      topConceptOf: {uri:"http://example.org/taxonomies/Taxonomie#InstantiesTbvReactApp"}
      rdfs_label: "Voorbeeld toevoeging dossier"
      prefLabel: {string: "Voorbeeld toevoeging dossier" }
      uri: "http://example.org/taxonomies/Taxonomie#Werkstroomdossier999"
    
    }) 
      
    commit (message: "dossier toegevoegd")
  }
  
  
  `;

  export {
    dossier_filtered_query,
    dossier_query,
    persoon_query,
   
  }

  