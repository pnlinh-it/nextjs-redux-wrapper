import * as React from 'react';
import { useRouter } from 'next/router';
import { pokemonApi, useGetPokemonByNameQuery } from '@/src/api';
import { NextPageContext } from 'next';

function Pokemon() {
  const {query} = useRouter();

  // console.log('State on render', useStore().getState());
  const {data, isLoading} = useGetPokemonByNameQuery(query.pokemon as string); // data is undefined for the first render

  if (isLoading) return <span>Loading</span>

  if (!data) return <span>Error</span>


  return <div>Name: {data.name}</div>;
}

Pokemon.getInitialProps = async (context: NextPageContext) => {
  const pokemon = context.query?.pokemon;

  if (typeof pokemon === 'string') {
    context.store.dispatch(pokemonApi.endpoints?.getPokemonByName.initiate(pokemon,))
  }

  return {
    props: {},
  };
};

export default Pokemon
