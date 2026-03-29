package com.raphael.todolist.services;

import com.raphael.todolist.DTO.UsuarioDTO;
import com.raphael.todolist.exception.RecursoNaoEncontradoException;
import com.raphael.todolist.model.Usuario;
import com.raphael.todolist.repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UsuarioServices {

    private UsuarioRepository usuarioRepository;

    public UsuarioDTO salvar(Usuario usuario) {

        Usuario salvo = usuarioRepository.save(usuario);

        return UsuarioDTO.fromEntity(salvo);
    }

    public List<UsuarioDTO> listarTodos() {
        List<Usuario> usuarios = usuarioRepository.findAll();

        return usuarios.stream().map(UsuarioDTO::fromEntity).toList();
    }

    public UsuarioDTO buscarUsuarioPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id).orElseThrow(() -> new RecursoNaoEncontradoException("Usuário com ID " + id + " não encontrado!"));
        return UsuarioDTO.fromEntity(usuario);
    }

    public void deletarUsuarioPorId(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RecursoNaoEncontradoException("Usuário não encontrado!");
        }
        usuarioRepository.deleteById(id);
    }


}
