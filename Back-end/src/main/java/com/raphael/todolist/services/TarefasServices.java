package com.raphael.todolist.services;

import com.raphael.todolist.exception.RecursoNaoEncontradoException;
import com.raphael.todolist.model.Tarefas;
import com.raphael.todolist.model.Usuario;
import com.raphael.todolist.repository.TarefasRepository;
import com.raphael.todolist.repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TarefasServices {

    private final TarefasRepository tarefasRepository;
    private final UsuarioRepository usuarioRepository;
    ;

    public Tarefas criarTarefaVinculada(Tarefas tarefa, Long usuarioId) {

        Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow(() -> new RuntimeException("Usuário dono da tarefa não encontrado!"));

        tarefa.setUsuario(usuario);

        return tarefasRepository.save(tarefa);
    }

    public List<Tarefas> buscarTarefas() {
        return tarefasRepository.findAll();
    }

    public Tarefas buscarPorId(Long id) {
        return tarefasRepository.findById(id).orElseThrow(() -> new RecursoNaoEncontradoException("Tarefa com ID "+ id +" não encontrada!"));
    }

    public void deletarPorId(Long id) {
        if (!tarefasRepository.existsById(id)) {
            throw new RecursoNaoEncontradoException("Tarefa com ID "+ id +" não encontrada!");
        }
        tarefasRepository.deleteById(id);
    }

}
