import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import PokemonColection from './components/PokemonColection';

function App() {

  const [pokemon, setPokemon] = useState([])
  const [nextUrl, setNextUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [viewDetail, setViewDetail] = useState({
    id: 0,
    isOpen: false
  })
  useEffect(() => {
    const getPokemon = async() => {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=20')
      setNextUrl(res.data.next)
      res.data.results.forEach(async(pokemon) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        setPokemon((p) => [...p, poke.data])
      });
    }
    getPokemon()
    setLoading(false)
  },[])

  const nextPage = async() => {
    setLoading(true)
    const res = await axios.get(nextUrl)
    setNextUrl(res.data.next)
    res.data.results.forEach(async(pokemon) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      setPokemon((p) => [...p, poke.data])
      setLoading(false)
    })
  }

  return (
    <div className="App">
      <div className='container'>
        <div className='pokemon-header'>Pokemon</div>
        <PokemonColection pokemons={pokemon} viewDetail={viewDetail} setViewDetail={setViewDetail}/>
        {!viewDetail.isOpen && (
          <div className='btn'>
            <button onClick={nextPage}>{loading  ? "Loading" : "Load more"}</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
