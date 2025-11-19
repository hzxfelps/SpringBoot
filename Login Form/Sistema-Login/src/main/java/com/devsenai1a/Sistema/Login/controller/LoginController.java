package com.devsenai1a.Sistema.Login.controller;

import com.devsenai1a.Sistema.Login.service.LoginService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/authlogin")
public class LoginController {

    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> dados) {

        String email = dados.get("email");
        String password = dados.get("password");

        boolean autenticado = loginService.autenticar(email, password);

        if (autenticado) {
            return ResponseEntity.ok("Login realizado com sucesso!");
        } else {
            return ResponseEntity.status(401).body("Usuário ou senha incorretos!");
        }
    }
}
