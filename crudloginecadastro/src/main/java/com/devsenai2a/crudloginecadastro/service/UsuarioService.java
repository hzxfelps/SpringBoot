package com.devsenai2a.crudloginecadastro.service;

import com.devsenai2a.crudloginecadastro.model.Usuario;
import org.springframework.stereotype.Service;
import java.util.List;
import com.devsenai2a.crudloginecadastro.repository.UsuarioRepository;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    //Method de puxar todos os usuarios
    public List<Usuario> getAll() {return usuarioRepository.findAll();}
    //Method de criar novos usuarios
    public Usuario save(Usuario usuario) {return usuarioRepository.save(usuario);}
    //Method de  DELETE

    // SEarch by id
    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    //delete with boolean
    public boolean deletar(Long id) {
        if (!usuarioRepository.existsById(id)) {
            return false;
        }
        usuarioRepository.deleteById(id);
        return true;
    }

    // Att usuario
    public Usuario atualizar(Long id, Usuario usuario) {

        Optional<Usuario> usuarioExistente = usuarioRepository.findById(id);

        if (usuarioExistente.isEmpty()) {
            return null;
        }

        Usuario u = usuarioExistente.get();

        u.setNome(usuario.getNome());
        u.setEmail(usuario.getEmail());
        u.setSenha(usuario.getSenha());
        u.setPerfil(usuario.getPerfil());
        u.setEndereco(usuario.getEndereco());
        u.setBairro(usuario.getBairro());
        u.setComplemento(usuario.getComplemento());
        u.setCep(usuario.getCep());
        u.setCidade(usuario.getCidade());
        u.setEstado(usuario.getEstado());

        return usuarioRepository.save(u);
    }

    // Login service
    public Usuario login(String email, String senha) {

        Usuario usuario = usuarioRepository.findByEmail(email);

        if (usuario == null) {
            return null;
        }

        if (!usuario.getSenha().equals(senha)) {
            return null;
        }

        return usuario;
    }
}
