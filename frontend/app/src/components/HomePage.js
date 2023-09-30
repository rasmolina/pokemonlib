import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HomePage() {
  const navigate = useNavigate();

  const [pokemonList, setPokemonList] = useState([
    { id: 1, name: 'Pikachu' },
    { id: 2, name: 'Charmander' },
    { id: 3, name: 'Squirtle' },
    ]);

  const [showModal, setShowModal] = useState(false); // Controla a exibição do modal
  const [selectedPokemon, setSelectedPokemon] = useState(''); // Guarda a opção selecionada no select
  const [inputValue, setInputValue] = useState(''); // Guarda o valor do input
  const [pokemonOptions, setPokemonOptions] = useState([]); // Guarda as opções do select
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
    // Função para buscar os nomes dos Pokémons e atualizar o estado
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


  const savePokemon = () => {
    // Implemente a lógica para salvar o novo Pokémon no array aqui
    // Atualize o estado do array com o novo Pokémon
    // Feche o modal
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
        <div className='table-container'>
        <table>
  <thead>
    <tr>
      <th>Id</th>
      <th>Nome</th>
      <th>Tipo</th>
      <th>Identificação</th>
    </tr>
  </thead>
  <tbody>
    {pokemonList.map((pokemon) => (
      <tr key={pokemon.id}>
        <td>{pokemon.id}</td>
        <td>{pokemon.name}</td>
        <td>{/* Adicione a lógica para o tipo aqui */}</td>
        <td>{/* Adicione a lógica para a identificação aqui */}</td>
      </tr>
    ))}
  </tbody>
</table>
</div>

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