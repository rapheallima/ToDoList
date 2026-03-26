package com.raphael.todolist.services;

import com.raphael.todolist.DTO.UsuarioDTO;
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

    public Optional<UsuarioDTO> buscarUsuarioPorId(Long id) {
        return usuarioRepository.findById(id).map(UsuarioDTO::fromEntity);
    }

    public ResponseEntity<UsuarioDTO> deletarUsuarioPorId(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuário não encontrado!");
        }
        usuarioRepository.deleteById(id);
        return null;
    }

}
