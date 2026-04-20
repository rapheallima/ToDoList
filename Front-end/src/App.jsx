import { useState } from 'react';
import CadastroUsuario from "./components/CadastroUsuario";
import CadastroTarefa from "./components/CadastroTarefa";
import ListaTarefas from "./components/ListaTarefas";

function App() {
  const [atualizarLista, setAtualizarLista] = useState(0);
  const [atualizarUsuarios, setAtualizarUsuarios] = useState(0);

  const recarregarListagem = () => {
    setAtualizarLista(prev => prev + 1);
  };

  const recarregarUsuarios = () => {
    setAtualizarUsuarios(prev => prev + 1);
  };
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-900 tracking-tight">
        Gerenciador de Tarefas <span className="text-blue-500">Full Stack</span>
      </h1>
      <CadastroUsuario onUsuarioCriado={recarregarUsuarios} />
      <CadastroTarefa key={`user-${atualizarUsuarios}`} onTarefaCriada={recarregarListagem} />
      <ListaTarefas key={`task-${atualizarLista}`} />

    </div>

  )
}




export default App;