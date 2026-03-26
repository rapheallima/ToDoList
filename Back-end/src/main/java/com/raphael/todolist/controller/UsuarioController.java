package com.raphael.todolist.controller;

import com.raphael.todolist.DTO.UsuarioDTO;
import com.raphael.todolist.model.Usuario;
import com.raphael.todolist.services.UsuarioServices;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioServices usuarioServices;

    @PostMapping
    public ResponseEntity<UsuarioDTO> criar(@RequestBody Usuario usuario) {
        return ResponseEntity.ok(usuarioServices.salvar(usuario));
    }

    @GetMapping("/{usuarioId}")
    public ResponseEntity<UsuarioDTO> buscarUsuarioPorId(@PathVariable Long usuarioId) {
        return usuarioServices.buscarUsuarioPorId(usuarioId).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> listarTodos() {
        return ResponseEntity.ok(usuarioServices.listarTodos());
    }

    @DeleteMapping("/{usuarioId}")
    public ResponseEntity<UsuarioDTO> deletarPorId(@PathVariable Long usuarioId) {
        usuarioServices.deletarUsuarioPorId(usuarioId);
        return ResponseEntity.noContent().build();
    }

}
