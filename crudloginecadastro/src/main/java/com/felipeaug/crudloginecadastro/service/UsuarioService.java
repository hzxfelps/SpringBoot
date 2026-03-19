package com.felipeaug.crudloginecadastro.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.felipeaug.crudloginecadastro.model.Usuario;
import com.felipeaug.crudloginecadastro.repository.UsuarioRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }
    /*
     * private final PasswordEncoder passwordEncoder;
     * 
     * public UserService(UserRepository userRepository,
     * PasswordEncoder passwordEncoder) {
     * 
     * this.userRepository = userRepository;
     * this.passwordEncoder = passwordEncoder;
     * }
     */

    // Method de puxar todos os usuarios
    public List<Usuario> getAll() {
        return usuarioRepository.findAll();
    }

    // Method de criar novos usuarios
    public Usuario save(Usuario usuario) {
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return usuarioRepository.save(usuario);
    }

    // SEarch by id
    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    // delete with boolean
    public boolean deletar(Long id) {
        if (!usuarioRepository.existsById(id)) {
            return false;
        }
        usuarioRepository.deleteById(id);
        return true;
    }

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
        u.setFoto(usuario.getFoto());

        return usuarioRepository.save(u);
    }

    // Login service
    public Usuario login(String email, String senha) {

        Usuario usuario = usuarioRepository.findByEmail(email);

        if (usuario == null) {
            return null;
        }

        if (!passwordEncoder.matches(senha, usuario.getSenha())) {
            return null; /*
                          * filho da puta essa porra de encoder nao faz sentido ao inves de ele
                          * criptografar e ter o proprio dicionario no sistema pra traduzir essa merda
                          * precisa que explique tudo verme do caralho
                          */
        }

        return usuario;
    }

    @Autowired
    private JavaMailSender mailSender; // VAI TOMAR NO CU CODIGO DO CARALHO

    public boolean enviarEmailRecuperacao(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario != null) {
            String link = "http://127.0.0.1:5500/redefinir-senha.html?email=" + email;
            SimpleMailMessage mensagem = new SimpleMailMessage();
            mensagem.setTo(email);
            mensagem.setSubject("Recuperação de Senha - DevSenai");
            mensagem.setText("Olá" + usuario.getNome() + ",\n\n" + "Clique no link abaixo para criar uma nova senha:\n" + link);

            mailSender.send(mensagem);

            System.out.println("Email enviado para: " + email);
            return true;
        }
        return false;
    }

    // Redefinir Senha
    public boolean redefinirSenha(String email, String novaSenha) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario != null) {
            // Aqui você pode aplicar hash na senha antes de salvar
            usuario.setSenha(new BCryptPasswordEncoder().encode(novaSenha));
            usuarioRepository.save(usuario);
            return true;
        }
        return false;
    }
}
