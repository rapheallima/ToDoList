// Dados iniciais para o site não abrir vazio

import { parse } from "postcss";

let usuarios = [
    { id: 1, nome: "Raphael Lima", email: "raphael@demo.com" },
    { id: 2, nome: "Maria Silva", email: "maria@demo.com" },
    { id: 3, nome: "Carlos Souza", email: "carlos@demo.com" },
    { id: 4, nome: "Ana Pereira", email: "ana@demo.com" }
];

let tarefas = [
    { id: 101, titulo: "Estudar React", descricao: "Finalizar o modo demo", prioridade: "ALTA", status: "PENDENTE", usuario: usuarios[0] },
    { id: 102, titulo: "Estudar JavaScript", descricao: "Completar o curso", prioridade: "MEDIA", status: "EM ANDAMENTO", usuario: usuarios[1] },
    { id: 103, titulo: "Estudar Python", descricao: "Iniciar o curso de Python", prioridade: "BAIXA", status: "PENDENTE", usuario: usuarios[2] },
    { id: 104, titulo: "Estudar Node.js", descricao: "Completar o tutorial", prioridade: "MEDIA", status: "EM ANDAMENTO", usuario: usuarios[3] }
];

// Simulador das funções que o Axios fazia

export const mockApi = {
    getUsuarios: () => Promise.resolve({ data: usuarios }),
    postUsuario: (novoUsuario) => {
        const usuarioCompleto = { ...novoUsuario, id: Date.now() };
        usuarios.push(usuarioCompleto);
        return Promise.resolve({ data: usuarioCompleto });
    },

    getTarefas: () => Promise.resolve({ data: tarefas }),
    postTarefa: (novaTarefa, usuarioId) => {
        const dono = usuarios.find(u => u.id === parseInt(usuarioId));
        const tarefaCompleta = { ...novaTarefa, id: Date.now(), usuario: dono };
        tarefas.push(tarefaCompleta);
        return Promise.resolve({ data: tarefaCompleta });
    },

    putTarefa: (id, tarefaAtualizada) => {
        tarefas = tarefas.map(t => t.id === id ? { ...t, ...tarefaAtualizada } : t);
        return Promise.resolve({ data: tarefaAtualizada });
    },

    deleteTarefa: (id) => {
        tarefas = tarefas.filter(t => t.id !== id);
        return Promise.resolve({ data: { success: true } });
    }
};