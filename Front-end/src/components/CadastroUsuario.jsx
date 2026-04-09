import { useState } from "react";
import api from "../services/api";

function CadastroUsuario() {
    const [usuario, setUsuario] = useState({ nome: "", email: "", cpf: "", senha: "" });

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/usuarios", usuario);
            alert("Usuário cadastrado com sucesso!");
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            alert("Erro ao cadastrar usuário.");
        }
    }
    return (
        <div style={{ padding: '20px', maxWidth: '400px' }}>
            <h2>Cadastro de Usuário</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nome" placeholder="Nome Completo" onChange={handleChange} />
                <input type="email" name="email" placeholder="E-mail" onChange={handleChange} />
                <input type="text" name="cpf" placeholder="CPF (Apenas números)" onChange={handleChange} />
                <input type="password" name="senha" placeholder="Senha" onChange={handleChange} />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );

}

export default CadastroUsuario;