package com.felipeaug.crudloginecadastro.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.felipeaug.crudloginecadastro.model.Usuario;
import com.felipeaug.crudloginecadastro.service.UsuarioService;

import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<Usuario> getAll() {
        return usuarioService.getAll();
    }

    @PostMapping
    public Usuario create(@RequestBody Usuario usuario) {
        return usuarioService.save(usuario);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        Usuario usuario = usuarioService.buscarPorId(id);
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(usuario);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        boolean removido = usuarioService.deletar(id);
        if (!removido) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        Usuario usuarioAtualizado = usuarioService.atualizar(id, usuario);
        if (usuarioAtualizado == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(usuarioAtualizado);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> dados) {
        String email = dados.get("email");
        String senha = dados.get("senha");

        Usuario usuario = usuarioService.login(email, senha);

        if (usuario == null) {
            return ResponseEntity.status(401).body("Email ou senha inválidos");
        }

        return ResponseEntity.ok(usuario);
    }

    @PostMapping("/solicitar-recuperacao")
public ResponseEntity<Void> solicitarRecuperacao(@RequestParam String email)
{
boolean enviado = usuarioService.enviarEmailRecuperacao(email);
if (enviado) {
return ResponseEntity.ok().build(); // Retorna 200 OK
} else {
return ResponseEntity.notFound().build(); // Retorna 404 se o e-mail não existir
}
}

@PostMapping("/redefinir-senha")
public ResponseEntity<String> redefinirSenha(@RequestBody Map<String, String>
payload) {
String email = payload.get("email");
String novaSenha = payload.get("novaSenha");
boolean sucesso = usuarioService.redefinirSenha(email, novaSenha);
if (sucesso) {
return ResponseEntity.ok("Senha redefinida com sucesso!");
} else {
return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado");
}
}
}