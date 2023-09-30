import React, { useState, useEffect} from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HomePage() {
  const navigate = useNavigate();

  const [pokemonList, setPokemonList] = useState([]);

  const [showModal, setShowModal] = useState(false); // Controla a exibição do modal
  const [selectedPokemon, setSelectedPokemon] = useState(''); // Guarda a opção selecionada no select
  const [inputValue, setInputValue] = useState(''); // Guarda o valor do input
  const [pokemonNames, setPokemonNames] = useState('');

  
  const openModal = () => {
    setInputValue('');
    setSelectedPokemon('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleButtonClick = () => {
    navigate("/");
  };

  useEffect(() => {
    // Função assíncrona para buscar os nomes dos Pokémons e atualizar o estado
    async function fetchPokemonNames() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const pokemonData = response.data.results;
        const pokemonNames = pokemonData.map((pokemon) => pokemon.name);
        console.log(pokemonNames);
        setPokemonNames(pokemonNames);
      } catch (error) {
        console.error('Erro ao buscar nomes de Pokémon:', error);
      }
    }

    fetchPokemonNames();
  }, []);


  const savePokemon = async () => {
    try {
      // Verifica se a opção selecionada ou input não estão vazios
      if (!selectedPokemon) {
        alert('Selecione um Pokémon antes de salvar!');
        return;
      }

      // Consulta a API PokeAPI para obter informações adicionais sobre o Pokémon selecionado
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon.toLowerCase()}`);
      const data = response.data;
      const indice = data.id;

      // Cria um novo Pokémon com os dados obtidos da API
      const newPokemon = {
        id: data.id,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${indice}.png`,
        name: capitalizeFirstLetter(data.name),
        type: data.types[0].type.name, // pego o primeiro tipo
        weight: data.weight,
        identification: inputValue === '' ? 'ND' : inputValue, // identificação fornecida pelo usuário
      };

      // Adiciona o novo Pokémon à lista pokemonList
      setPokemonList((prevList) => [...prevList, newPokemon]);

      closeModal();
      alert(`Pokémon ${newPokemon.name} incluído com sucesso!`);
    } catch (error) {
      console.error('Erro ao salvar o Pokémon:', error);
    }
  };

  // Função para formatar o texto com a primeira letra maiúscula
  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  
  return (
    <div className="home-page-container">
      <nav className="navbar">
        <h3>Menu</h3>
        <button className="menu-button" onClick={openModal} title="Cadastrar Pokémon">
        <img
            src={process.env.PUBLIC_URL + '/pikachu.png'}
            alt="Sair"
            width="70"
            height="70" 
          />
          <h4>Cadastrar</h4>

        </button>
        <button className="menu-button" onClick={handleButtonClick} title="sair">
          <img
            src={process.env.PUBLIC_URL + '/ballIcon.png'}
            alt="Sair"
            width="70"
            height="70"
          />
          <h4>Sair</h4>
        </button>
      </nav>

      <div className="content">
        <h2>Pokémons cadastrados</h2>
        <ul class="pokedex">
        {pokemonList.map((pokemon) => (
        <li key={pokemon.id} className={`card ${pokemon.type}`}>
          <img src={pokemon.imageUrl} alt={pokemon.name} className="card-image" />
          <h2 className="card-title">{`${pokemon.id} ${pokemon.name}`}</h2>
          <p className="card-subtitle">{`${pokemon.weight} | ${pokemon.identification}`}</p>
          <p className="card-subtitle">{`${pokemon.type}`} </p>
        </li>
      ))}
        </ul>
        
      </div>

      {showModal && (
        <div className="modal">
          <h2>Cadastrar Pokémon</h2>
          <select
            value={selectedPokemon}
            onChange={(e) => setSelectedPokemon(e.target.value)}
          >
          <option value="" disabled>
                Selecione um Pokémon
              </option>
              {pokemonNames.map((name) => (
                <option key={name} value={name}>
                    {capitalizeFirstLetter(name)}
                </option>
              ))}
        
          </select>
          <input
            type="text"
            id="ident"
            placeholder="Identificação"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={savePokemon}>Salvar</button>
          <button onClick={closeModal}>Cancelar</button>
        </div>
      )}
    </div>
  );
}

export default HomePage;