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

  const dossier_filtered_query = gql`
  query dossiers($uri: ID)
  {
    dossiers(uri: $uri) 
    {
      uri
      rdfs_label
      prefLabel {string}
    }
  }
  `;

  const verwijder_dossier_query = gql`
  mutation verwijderDossier($uri: ID)
  {
    delete(uri: $uri) 
    report {
      deletedCount
    }
    commit
  }
  `;

  const pas_label_aan_dossier = gql`
  mutation pasLabelAan($uri: ID , $label: [String])
  {
    updateDossier(input: 
  {
    uri: $uri
    rdfs_label:$label
  })
    commit
  }
  `;

const dossier_toevoeg_query = gql`
mutation voegDossierToe($uri: ID, $label:[String],  $prefLabel: String!) 
{
  createDossier(input: {
    uri: $uri,
    type: {uri: "http://adser.nl/model/Dossier"},
    prefLabel: {string: $prefLabel},
    broadMatch: {uri: "http://example.org/taxonomies/Taxonomie#Signaaldossier456"},
    hidden: false,
    note: {string: ""},
    rdfs_label:  $label, 
    topConceptOf: {uri: "http://example.org/taxonomies/taxonomie#InstantiesTbvReactApp"}, 
})
commit
}
`;

/*
  const persoon_query = gql `
  {
    persoons
    {
      uri
      label
    }
  }`;
*/

//  commit (message: "dossier toegevoegd")

  export {
    dossier_filtered_query,
    dossier_query,
    dossier_toevoeg_query,
    verwijder_dossier_query,
    pas_label_aan_dossier
  }

  