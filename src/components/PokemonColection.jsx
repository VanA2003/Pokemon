import React from 'react'
import PokemonList from './PokemonList'
import './pokemon.css'
export default function PokemonColection(props) {
   const {pokemons, viewDetail, setViewDetail} = props
   const selectPokemon = (id) => {
        if(!viewDetail.isOpen){
            setViewDetail({
                id: id,
                isOpen: true
            })
        }
   }
  return (
    <>
        <section className={viewDetail.isOpen ? 'collection-container-active' : 'collection-container'}>
            {viewDetail.isOpen ? <div className='overlay'></div> : <div></div>}
            {pokemons?.map((pokemon,index) => {
                return(
                    <div onClick={() => selectPokemon(pokemon.id)}>
                        <PokemonList 
                        viewDetail={viewDetail}
                        setViewDetail={setViewDetail}
                        key={index}
                        name={pokemon.name}
                        id={pokemon.id}
                        abilities={pokemon.abilities}
                        image={pokemon.sprites.front_default}
                    />
                    </div>
                )
            })}
        </section>
    </>
  )
}
