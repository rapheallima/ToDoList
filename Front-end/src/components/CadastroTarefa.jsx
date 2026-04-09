import { useState, useEffect } from 'react';
import api from '../services/api';

function CadastroTarefa() {
    const [usuarios, setUsuarios] = useState([]); // Para preencher o Select
    const [tarefa, setTarefa] = useState({
        titulo: '',
        descricao: '',
        prioridade: '', // Valor padrão do seu Enum
        status: '',    // Valor padrão do seu Enum
        usuarioId: ''        // O ID do dono
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
            // No seu Service do Back, você configurou para receber (tarefa, usuarioId)
            // Vamos enviar o usuarioId como parâmetro na URL ou no corpo, dependendo do seu Controller
            await api.post(`/tarefas/usuarios/${tarefa.usuarioId}`, {
                titulo: tarefa.titulo,
                descricao: tarefa.descricao,
                prioridade: tarefa.prioridade,
                status: tarefa.status
            });
            alert('Tarefa criada com sucesso!');
        } catch (error) {
            console.error("Erro ao criar tarefa", error);
            alert('Erro ao salvar tarefa. Verifique o console.');
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', marginTop: '20px' }}>
            <h2>Nova Tarefa</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="titulo" placeholder="Título da Tarefa" onChange={handleChange} required />
                <textarea name="descricao" placeholder="Descrição" onChange={handleChange} />

                <select name="prioridade" onChange={handleChange}>
                    <option value="BAIXA">Baixa</option>
                    <option value="MEDIA">Média</option>
                    <option value="ALTA">Alta</option>
                </select>

                <select name="status" onChange={handleChange}>
                    <option value="PENDENTE">Pendente</option>
                    <option value="EM_ANDAMENTO">Em Andamento</option>
                    <option value="CONCLUIDA">Concluída</option>
                </select>

                <select name="usuarioId" onChange={handleChange} required>
                    <option value="">Selecione o Responsável</option>
                    {usuarios.map(user => (
                        <option key={user.id} value={user.id}>{user.nome}</option>
                    ))}
                </select>

                <button type="submit">Criar Tarefa</button>
            </form>
        </div>
    );
}

export default CadastroTarefa;
