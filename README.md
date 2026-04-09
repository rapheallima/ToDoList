# 📝 ToDoList Full Stack - Spring Boot & React

Bem-vindo ao meu projeto de gerenciamento de tarefas! Esta é uma aplicação **Full Stack** completa, desenvolvida para demonstrar competências em desenvolvimento de APIs robustas, relacionamentos entre entidades e interfaces modernas e responsivas.

## 🚀 Tecnologias Utilizadas

### **Back-end**
*   **Java 17** com **Spring Boot**
*   **Spring Data JPA** (Persistência de dados)
*   **H2 Database** (Banco de dados em memória para desenvolvimento)
*   **Lombok** (Produtividade no código Java)
*   **Bean Validation** (Garantia de integridade dos dados)

### **Front-end**
*   **React** (Vite)
*   **Tailwind CSS** (Estilização moderna e utilitária)
*   **Axios** (Consumo de API)
*   **React Hooks** (`useState`, `useEffect`)

---

## 🛠️ Funcionalidades Principais

*   **Gestão de Usuários:** Cadastro completo ocultando dados sensíveis através de **DTOs**.
*   **Relacionamento 1:N:** Cada tarefa é obrigatoriamente vinculada a um usuário responsável.
*   **Controle de Tarefas:** Definição de **Prioridade** (Baixa, Média, Alta) e **Status** (Pendente, Em Andamento, Concluída) via Enums.
*   **Design Responsivo:** Interface limpa e intuitiva construída com Tailwind CSS.
*   **Integração Full Stack:** Comunicação fluida entre Front e Back via CORS configurado.

---

## 📂 Estrutura do Monorepo

```text
├── Back-end/   # API RESTful em Spring Boot
└── Front-end/  # Interface Single Page Application em React (Vite)
````
## ⚙️ Como Executar o Projeto
*  **Pré-requisitos:**
*  JDK 17 ou superior
*  Node.js instalado
*  IntelliJ IDEA ou VS Code
## Passo a Passo
*  **Back-end:**
*  Abra a pasta Back-end no IntelliJ.
*  Aguarde o Maven baixar as dependências.
*  Execute a classe principal TodolistApplication.
*  A API estará disponível em http://localhost:8080.
*  **Front-end:**
*  Abra a pasta Front-end no VS Code.
*  No terminal, rode npm install para as dependências.
*  Inicie o servidor com npm run dev.
*  Acesse http://localhost:5173 no seu navegador.
##  🧠 Aprendizados Técnicos
*  Durante o desenvolvimento deste projeto, aprofundei conhecimentos em:
*  Configuração de CORS para comunicação segura entre domínios.
*  Mapeamento de Enums do Java para componentes de seleção no React.
*  Implementação de Design Systems com Tailwind para padronização visual.
*  Gerenciamento de estados complexos em formulários.
*  Desenvolvido por **Raphael de Lima 🚀**
