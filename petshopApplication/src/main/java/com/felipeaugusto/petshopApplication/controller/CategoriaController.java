package com.felipeaugusto.petshopApplication.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.felipeaugusto.petshopApplication.model.Categoria;
import com.felipeaugusto.petshopApplication.service.categoriaService;

import java.util.List;

@RestController
@RequestMapping("/categorias")
@CrossOrigin(origins = "*") // 🔥 importante pro frontend
public class CategoriaController {

    private final CategoriaService categoriaService;

    public CategoriaController(CategoriaService categoriaService) {
        this.categoriaService = categoriaService;
    }

    // 🔥 LISTAR
    @GetMapping
    public List<Categoria> getAll() {
        return categoriaService.getAll();
    }

    // 🔥 CRIAR
    @PostMapping
    public Categoria criar(@RequestBody Categoria categoria) {
        return categoriaService.save(categoria);
    }

    // 🔥 BUSCAR POR ID
    @GetMapping("/{id}")
    public ResponseEntity<Categoria> buscarPorId(@PathVariable Long id) {
        Categoria categoria = categoriaService.buscarPorId(id);

        if (categoria == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(categoria);
    }

    // 🔥 ATUALIZAR
    @PutMapping("/{id}")
    public ResponseEntity<Categoria> atualizar(@PathVariable Long id,
                                               @RequestBody Categoria categoria) {

        Categoria atualizada = categoriaService.atualizar(id, categoria);

        if (atualizada == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(atualizada);
    }

    // 🔥 DELETAR
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {

        boolean deletado = categoriaService.deletar(id);

        if (!deletado) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}