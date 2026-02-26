package com.devsenai2a.crudloginecadastro.repository;

import com.devsenai2a.crudloginecadastro.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long > {
    Usuario findByEmail(String email);
}
