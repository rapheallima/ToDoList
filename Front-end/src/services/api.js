import axios from "axios";
import { mockApi } from "./mockApi";

const IS_MOCK = true; // Mudar para false para usar a API real


const realApi = axios.create({
    baseURL: 'http://localhost:8080'
});

// Objeto que "imita" o axios, mas decide qual usar
const api = {
    get: (url) => IS_MOCK ? (url === '/usuarios' ? mockApi.getUsuarios() : mockApi.getTarefas()) : realApi.get(url),

    post: (url, data) => {
        if (IS_MOCK) {
            // Correção: Verifica se a URL COMEÇA com /usuarios, e não apenas se "inclui"
            if (url.startsWith('/usuarios')) {
                return mockApi.postUsuario(data);
            }

            // Se a URL incluir /tarefas/usuarios/ID, cai aqui perfeitamente
            if (url.includes('/tarefas')) {
                const parts = url.split('/');
                const userId = parts[parts.length - 1];
                return mockApi.postTarefa(data, userId);
            }
        }
        return realApi.post(url, data);
    },


    put: (url, data) => {
        if (IS_MOCK) {
            const id = parseInt(url.split('/')[2]);
            return mockApi.putTarefa(id, data);
        }
        return realApi.put(url, data);
    },

    delete: (url) => {
        if (IS_MOCK) {
            const id = parseInt(url.split('/')[2]);
            return mockApi.deleteTarefa(id);
        }
        return realApi.delete(url);
    }
};

export default api;