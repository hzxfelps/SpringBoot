package com.devsenai1a.Sistema.Login.service;

import com.devsenai1a.Sistema.Login.model.Usuario;
import com.devsenai1a.Sistema.Login.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private final UsuarioRepository usuarioRepository;

    public LoginService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public boolean autenticar(String email, String password) {
        Usuario usuario = usuarioRepository.findByEmail(email);

        if (usuario == null) return false;

        return usuario.getPassword().equals(password);
    }
}
