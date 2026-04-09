import CadastroUsuario from "./components/CadastroUsuario";
import CadastroTarefa from "./components/CadastroTarefa";

function App() {
  return (
    <div className="App">
      <h1>Gerenciador de Tarefas - Full Stack</h1>
      <CadastroUsuario />
      <CadastroTarefa />
    </div>
  )
}

export default App;