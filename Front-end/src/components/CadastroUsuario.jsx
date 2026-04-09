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
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mb-8 transition-all hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                Cadastro de Usuário
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    className="col-span-2 md:col-span-1 p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    type="text" name="nome" placeholder="Nome Completo" onChange={handleChange}
                />
                <input
                    className="col-span-2 md:col-span-1 p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    type="email" name="email" placeholder="E-mail" onChange={handleChange}
                />
                <input
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    type="text" name="cpf" placeholder="CPF" onChange={handleChange}
                />
                <input
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    type="password" name="senha" placeholder="Senha" onChange={handleChange}
                />

                <button
                    type="submit"
                    className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md shadow-blue-200 transition-all active:scale-95"
                >
                    Finalizar Cadastro
                </button>
            </form>
        </div>
    );



}

export default CadastroUsuario;