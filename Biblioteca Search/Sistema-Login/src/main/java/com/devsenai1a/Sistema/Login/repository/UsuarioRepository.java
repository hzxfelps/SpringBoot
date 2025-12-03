package com.devsenai1a.Sistema.Login.repository;

import com.devsenai1a.Sistema.Login.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByEmail(String email);
}
