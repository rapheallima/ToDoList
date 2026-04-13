import { useEffect, useState } from "react";
import api from "../services/api";

function ListaTarefas() {
    const [tarefas, setTarefas] = useState([]);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/tarefas/${id}`);
            carregarTarefas(); // Recarrega a lista após exclusão
        } catch (error) {
            console.error("Erro ao excluir tarefa:", error);
            alert("Erro ao excluir tarefa.");
        }
    };

    const carregarTarefas = async () => {
        try {
            const reponse = await api.get("/tarefas");
            setTarefas(reponse.data);
        } catch (error) {
            console.error("Erro ao carregar tarefas:", error);
            alert("Erro ao carregar tarefas.");
        }
    };

    useEffect(() => {
        carregarTarefas();
    }, []);

    const getPrioridadeColor = (prio) => {
        switch (prio) {
            case 'ALTA': return 'border-l-red-500';
            case 'MEDIA': return 'border-l-yellow-500';
            case 'BAIXA': return 'border-l-green-500';
            default: return 'border-l-gray-300';
        }
    };


    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Lista de Tarefas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tarefas.map(tarefa => (<div key={tarefa.id} className={`bg-white p-5 rounded-xl shadow-md border-l-8 ${getPrioridadeColor(tarefa.prioridade)} transition-transform hover:scale-105`}>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-gray-800">{tarefa.titulo}</h3>
                        <span className="text-xs font-bold px-2 py-1 rounded bg-gray-100 text-gray-600">
                            {tarefa.status ? tarefa.status.replace('_', ' ') : 'SEM STATUS'}
                        </span>
                        <button
                            onClick={() => handleDelete(tarefa.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors duration-300 p-1 rounded-lg hover:bg-red-50"
                            title="Excluir tarefa"
                        >
                            <svg xmlns="http://w3.org" className="h-5 w-5 hover:cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>

                    </div>
                    <p className="text-gray-600 text-sm mb-4">{tarefa.descricao}</p>
                    <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs">
                        <span className="text-blue-600 font-semibold italic">@{tarefa.usuario?.nome || 'Sem dono'}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-2 inline-block ${tarefa.prioridade === 'ALTA' ? 'bg-red-100 text-red-600' :
                            tarefa.prioridade === 'MEDIA' ? 'bg-yellow-100 text-yellow-600' :
                                'bg-green-100 text-green-600'
                            }`}>
                            {tarefa.prioridade}
                        </span>

                        <span className="text-gray-400">{new Date(tarefa.dataCriacao).toLocaleDateString()}</span>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}

export default ListaTarefas;