import React, { useState } from 'react';
import './Login.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

  
function Login(){
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();     
        console.log(email,password);     
         
        try{
            const response = await axios.post('http://localhost:3000/login',
                JSON.stringify({email,password}),
                {
                  headers: {'Content-Type':'application/json'}
                }
              );
              navigate('/homepage');
              console.log('Login efetuado com sucesso ' + JSON.stringify(response.data.nome) +"!");
          }catch(error){
            if (!error?.response){
              setErro('Erro ao acessar o servidor');
              alert(error);
            }else if(error.response.status === 401){
              setErro('Usuário ou senha inválidos');
              alert(erro);
            }
          }

  
  };


    return (
        <>
        <div>
        <Header/>        
        </div>
        <div className="login-container">
        <h2 className="title">Acesso restrito</h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
      </>
    );
  };
  

export default Login;