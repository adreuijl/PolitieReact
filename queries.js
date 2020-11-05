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

  export {
    dossier_filtered_query,
    dossier_query,
    persoon_query
  }

  