package com.raphael.todolist.controller;

import com.raphael.todolist.model.Tarefas;
import com.raphael.todolist.services.TarefasServices;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/tarefas")
@AllArgsConstructor
public class TarefasController {

    private final TarefasServices tarefasServices;

    @GetMapping
    public List<Tarefas> buscar() {
        return tarefasServices.buscarTarefas();
    }

    @GetMapping("/{id}")
    public Tarefas buscarPorId(@PathVariable Long id) {
        return tarefasServices.buscarPorId(id);
    }

    @PostMapping("/usuarios/{usuarioId}")
    public ResponseEntity<Tarefas> criar(@Valid @RequestBody Tarefas tarefa, @PathVariable Long usuarioId) {
        return ResponseEntity.status(201).body(tarefasServices.criarTarefaVinculada(tarefa, usuarioId));
    }

    @PutMapping("/{id}/usuarios/{usuarioId}")
    public Tarefas atualizar(@PathVariable Long id,@Valid @RequestBody Tarefas tarefa, @PathVariable Long usuarioId) {
        tarefa.setId(id);
        return tarefasServices.criarTarefaVinculada(tarefa, usuarioId);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        tarefasServices.deletarPorId(id);
    }

}
