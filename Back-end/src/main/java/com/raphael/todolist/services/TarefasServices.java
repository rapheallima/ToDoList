package com.raphael.todolist.services;

import com.raphael.todolist.model.Tarefas;
import com.raphael.todolist.repository.TarefasRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TarefasServices {

    private TarefasRepository tarefasRepository;

    public Tarefas criarOuAtualizarTarefa(Tarefas tarefa) {
        return tarefasRepository.save(tarefa);
    }

    public List<Tarefas> buscarTarefas() {
        return tarefasRepository.findAll();
    }

    public Optional<Tarefas> buscarPorId(Long id) {
        return tarefasRepository.findById(id);
    }

    public void deletarPorId(Long id) {
        if (!tarefasRepository.existsById(id)) {
            throw new RuntimeException("Tarefa não encontrada");
        }
        tarefasRepository.deleteById(id);
    }

}
