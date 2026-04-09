package com.raphael.todolist.controller;

import com.raphael.todolist.DTO.UsuarioDTO;
import com.raphael.todolist.model.Usuario;
import com.raphael.todolist.services.UsuarioServices;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    private final UsuarioServices usuarioServices;

    @PostMapping
    public ResponseEntity<UsuarioDTO> criar(@Valid @RequestBody Usuario usuario) {
        return ResponseEntity.ok(usuarioServices.salvar(usuario));
    }

    @GetMapping("/{usuarioId}")
    public ResponseEntity<UsuarioDTO> buscarUsuarioPorId(@PathVariable Long usuarioId) {
        UsuarioDTO dto = usuarioServices.buscarUsuarioPorId(usuarioId);
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> listarTodos() {
        return ResponseEntity.ok(usuarioServices.listarTodos());
    }

    @DeleteMapping("/{usuarioId}")
    public ResponseEntity<Void> deletarPorId(@PathVariable Long usuarioId) {
        usuarioServices.deletarUsuarioPorId(usuarioId);
        return ResponseEntity.noContent().build();
    }

}
