package com.raphael.todolist.controller;

import com.raphael.todolist.model.Tarefas;
import com.raphael.todolist.services.TarefasServices;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@AllArgsConstructor
public class TarefasController {

    private TarefasServices tarefasServices;

    @GetMapping
    public List<Tarefas> buscar() {
        return tarefasServices.buscarTarefas();
    }

    @GetMapping("/{id}")
    public Tarefas buscarPorId(@PathVariable Long id) {
        return tarefasServices.buscarPorId(id).orElse(null);
    }

    @PostMapping
    public Tarefas criar(@RequestBody Tarefas tarefas) {
        return tarefasServices.criarOuAtualizarTarefa(tarefas);
    }

    @PutMapping("/{id}")
    public Tarefas atualizar(@PathVariable Long id, @RequestBody Tarefas tarefas) {
        tarefas.setId(id);
        return tarefasServices.criarOuAtualizarTarefa(tarefas);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        tarefasServices.deletarPorId(id);
    }

}
