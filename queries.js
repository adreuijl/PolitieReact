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
mutation voegDossierToe($uri: ID) 
{
  createDossier(input: {
    uri: $uri,
    label: "test123",
    type: {uri: "http://adser.nl/model/Dossier"},
    broadMatch: {uri: "http://example.org/taxonomies/Taxonomie#Signaaldossier456"},
    hidden: false,
    note: {string: ""},
    prefLabel: {string: "Yesssssss"}, 
    rdfs_label:  "", 
    topConceptOf: {uri: "http://example.org/taxonomies/taxonomie#InstantiesTbvReactApp"}, 
})
commit
}
`;



//  commit (message: "dossier toegevoegd")

  export {
    dossier_filtered_query,
    dossier_query,
    persoon_query,
    dossier_toevoeg_query
  }

  