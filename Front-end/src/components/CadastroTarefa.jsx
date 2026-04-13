import { useState, useEffect } from 'react';
import api from '../services/api';

function CadastroTarefa({ onTarefaCriada }) {
    const [usuarios, setUsuarios] = useState([]); // Para preencher o Select
    const [tarefa, setTarefa] = useState({
        titulo: '',
        descricao: '',
        prioridade: '',
        status: '',
        usuarioId: ''
    });

    // Busca os usuários no Back-end assim que a tela carrega
    useEffect(() => {
        api.get('/usuarios')
            .then(response => setUsuarios(response.data))
            .catch(err => console.error("Erro ao carregar usuários", err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTarefa({ ...tarefa, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            await api.post(`/tarefas/usuarios/${tarefa.usuarioId}`, {
                titulo: tarefa.titulo,
                descricao: tarefa.descricao,
                prioridade: tarefa.prioridade,
                status: tarefa.status
            });

            if (onTarefaCriada) {
                onTarefaCriada(); // Notifica o App para recarregar a lista
            }
            alert('Tarefa criada com sucesso!');
        } catch (error) {
            console.error("Erro ao criar tarefa", error);
            alert('Erro ao salvar tarefa. Verifique o console.');
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
                        className="p-3 rounded-xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-green-500 transition-all"
                        onChange={handleChange} required
                    >
                        <option value="">Selecione o Responsável</option>
                        {usuarios.map(user => (
                            <option key={user.id} value={user.id}>{user.nome}</option>
                        ))}
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
                    <select name="prioridade" className="flex-1 p-3 rounded-xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-green-500" onChange={handleChange}>
                        <option value="BAIXA">Prioridade: Baixa</option>
                        <option value="MEDIA">Prioridade: Média</option>
                        <option value="ALTA">Prioridade: Alta</option>
                    </select>

                    {/* Campo de Status */}
                    <select
                        name="status"
                        className="flex-1 p-3 rounded-xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-green-500"
                        onChange={handleChange}
                    >
                        <option value="PENDENTE">Status: Pendente</option>
                        <option value="EM_ANDAMENTO">Status: Em Andamento</option>
                        <option value="CONCLUIDA">Status: Concluída</option>
                    </select>


                    <button
                        type="submit"
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-md shadow-green-200 transition-all active:scale-95"
                    >
                        Criar Tarefa
                    </button>
                </div>
            </form>
        </div>
    );

}

export default CadastroTarefa;
