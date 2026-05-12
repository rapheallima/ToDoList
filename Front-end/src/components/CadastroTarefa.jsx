import { useState, useEffect } from 'react';
import api from '../services/api';

function CadastroTarefa({ onTarefaCriada }) {
    const [usuarios, setUsuarios] = useState([]);
    const [tarefa, setTarefa] = useState({
        titulo: '',
        descricao: '',
        prioridade: 'BAIXA',
        status: 'PENDENTE',
        usuarioId: ''
    });


    useEffect(() => {
        console.log("Buscando usuários do banco...");
        api.get('/usuarios')
            .then(response => {
                console.log("Usuários encontrados:", response.data);
                setUsuarios(response.data);
            })
            .catch(err => console.error("Erro ao buscar usuários", err));
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setTarefa({ ...tarefa, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!tarefa.usuarioId || tarefa.usuarioId === "") {
            alert("ERRO: Você precisa selecionar um responsável na lista!");
            return;
        }

        const objetoParaEnviar = {
            titulo: tarefa.titulo,
            descricao: tarefa.descricao,
            prioridade: tarefa.prioridade,
            status: tarefa.status
        };

        try {
            await api.post(`/tarefas/usuarios/${tarefa.usuarioId}`, objetoParaEnviar);
            alert('Tarefa criada com sucesso!');
            if (onTarefaCriada) onTarefaCriada();
        } catch (error) {
            console.error("Erro detalhado:", error.response?.data);
            alert('Erro 400: Verifique se os nomes dos Enums no Java batem com o Front!');
        }
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-green-500 rounded-full"></span>
                Nova Tarefa
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Título */}
                <input
                    className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    type="text"
                    name="titulo"
                    placeholder="Título da Tarefa"
                    onChange={handleChange}
                    required
                />

                {/* Responsável */}
                <select
                    name="usuarioId"
                    className="w-full p-3 rounded-xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione o Responsável</option>
                    {usuarios.map(user => (
                        <option key={user.id} value={user.id}>{user.nome}</option>
                    ))}
                </select>

                {/* Descrição */}
                <textarea
                    name="descricao"
                    className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    placeholder="Descrição detalhada..."
                    rows="3"
                    onChange={handleChange}
                />

                {/* Rodapé do formulário: Prioridade, Status e Botão */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-400 ml-1">Prioridade</label>
                        <select
                            name="prioridade"
                            className="w-full p-3 rounded-xl border border-gray-200 bg-white"
                            onChange={handleChange}
                        >
                            <option value="BAIXA">Baixa</option>
                            <option value="MEDIA">Média</option>
                            <option value="ALTA">Alta</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-400 ml-1">Status</label>
                        <select
                            name="status"
                            className="w-full p-3 rounded-xl border border-gray-200 bg-white"
                            onChange={handleChange}
                        >
                            <option value="PENDENTE">Pendente</option>
                            <option value="EM_ANDAMENTO">Em Andamento</option>
                            <option value="CONCLUIDA">Concluída</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-md transition-all active:scale-95"
                    >
                        Criar Tarefa
                    </button>
                </div>
            </form>
        </div>
    );


}

export default CadastroTarefa;
