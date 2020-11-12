import {  gql } from '@apollo/client';

const dossier_soort_query = gql`
query GetClasses ($uri: ID = "http://ontologie.politie.nl/def/dossier#Dossier") 
{
  classes (subClassOf: $uri) 
  {
    subClassOf {label, uri}
    label
    uri
  }
}
`;

const dossier_soort_filtered_query = gql`
query classesFiltered($uri: ID)
{
  classes(subClassOf: $uri) 
  {
    subClassOf {label, uri}
    label
    uri
  }
}
`;

//Ophalen Actieve dossiers via graphql query
const dossier_query = gql`
query GetDossiers{
  dossiers {
    uri
    label
  }
}
`;

// Ophalen dossierinformatie op basis van geselecteerd dossier
const dossier_filtered_query = gql`
query dossiers($uri: ID)
{
  dossiers(uri: $uri) 
  {
    uri
    rdfs_label {string}
    prefLabel
    activiteit {label, uri}
  }
}
`;

// Ophalen activiteitinformatie op basis van geselecteerde activiteit
const activiteiten_filtered_query = gql`
query activiteiten($uri: ID)
{
  activiteits(uri: $uri) 
  {
    uri
    label
  }
}
`;

// Verwijder een dossier op basis van de uri
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

// pas rdfs label aan
const pas_label_aan_dossier = gql`
mutation pasLabelAan($uri: ID , $label: String!)
{
  updateDossier(input: 
{
  uri: $uri
  rdfs_label: {string:$label}
})
  commit
}
`;

// Aanmaken van een dossier op basis van het label
const dossier_toevoeg_query = gql`
mutation voegDossierToe($uri: ID, $label: String!, $type: ID)
{
  createDossier(input: {
    uri: $uri,
    rdf_type: {uri: $type},
    rdfs_label:  {string:$label}, 
    topConceptOf: {uri: "http://data.politie.nl/politie/id/InstantiedataFirstOffender"}, 
})
commit
}
`;

//  commit (message: "dossier toegevoegd")

  export {
    dossier_filtered_query,
    dossier_query,
    dossier_toevoeg_query,
    verwijder_dossier_query,
    pas_label_aan_dossier,
    activiteiten_filtered_query,
    dossier_soort_query,
    dossier_soort_filtered_query
  }

  