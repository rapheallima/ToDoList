import { useState, useEffect } from 'react';
import api from '../services/api';

function CadastroTarefa({ onTarefaCriada }) {
    const [usuarios, setUsuarios] = useState([]); // Para preencher o Select
    const [tarefa, setTarefa] = useState({
        titulo: '',
        descricao: '',
        prioridade: 'BAIXA',
        status: 'PENDENTE',
        usuarioId: ''
    });

    // Busca os usuários no Back-end assim que a tela carrega
    useEffect(() => {
        console.log("Buscando usuários do banco...");
        api.get('/usuarios')
            .then(response => {
                console.log("Usuários encontrados:", response.data);
                setUsuarios(response.data);
            })
            .catch(err => console.error("Erro ao buscar usuários", err));
    }, []); // O array vazio aqui está certo porque a KEY no App.jsx já cuida do refresh


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
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mt-10 transition-all hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-green-500 rounded-full"></span>
                Nova Tarefa
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 transition-all"
                        type="text" name="titulo" placeholder="Título da Tarefa" onChange={handleChange} required
                    />

                    <select
                        name="usuarioId"
                        className="p-3 rounded-xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-green-500 transition-all hover:cursor-pointer"
                        value={tarefa.usuarioId}
                        onChange={handleChange} required
                    >
                        <option value="">Selecione o Responsável</option>
                        {usuarios && usuarios.map((user) => {
                            if (user.id) {
                                return (
                                    <option key={user.id} value={user.id}>
                                        {user.nome}
                                    </option>
                                );
                            }
                            return null;
                        })}
                    </select>
                </div>

                <textarea
                    name="descricao"
                    className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    placeholder="Descrição detalhada da tarefa..."
                    rows="3"
                    onChange={handleChange}
                />

                <div className="flex gap-4">
                    <select name="prioridade" className="flex-1 p-3 rounded-xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-green-500 hover:cursor-pointer" onChange={handleChange}>
                        <option value="BAIXA">Prioridade: Baixa</option>
                        <option value="MEDIA">Prioridade: Média</option>
                        <option value="ALTA">Prioridade: Alta</option>
                    </select>

                    <select
                        name="status"
                        className="flex-1 p-3 rounded-xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-green-500 hover:cursor-pointer"
                        onChange={handleChange}
                    >
                        <option value="PENDENTE">Status: Pendente</option>
                        <option value="EM_ANDAMENTO">Status: Em Andamento</option>
                        <option value="CONCLUIDA">Status: Concluída</option>
                    </select>


                    <button
                        type="submit"
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-md shadow-green-200 transition-all active:scale-95 hover:cursor-pointer"
                    >
                        Criar Tarefa
                    </button>
                </div>
            </form>
        </div>
    );

}

export default CadastroTarefa;
