import { useEffect, useState } from "react";
import api from "../services/api";

function ListaTarefas() {
    const [tarefas, setTarefas] = useState([]);

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

    const getPrioridadeColor = (prioridade) => {
        if (prioridade === "ALTA") return "border-1-red-500";
        if (prioridade === "MEDIA") return "border-1-yellow-500";
        return "border-1-green-500";
    }

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

                    </div>
                    <p className="text-gray-600 text-sm mb-4">{tarefa.descricao}</p>
                    <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs">
                        <span className="text-blue-600 font-semibold italic">@{tarefa.usuario?.nome || 'Sem dono'}</span>
                        <span className="text-gray-400">{new Date(tarefa.dataCriacao).toLocaleDateString()}</span>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}

export default ListaTarefas;