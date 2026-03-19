package com.felipeaug.crudloginecadastro.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.felipeaug.crudloginecadastro.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long > {
    Usuario findByEmail(String email);
}
