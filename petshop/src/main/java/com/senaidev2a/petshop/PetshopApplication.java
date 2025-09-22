package com.senaidev2a.petshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class PetshopApplication {

	public static void main(String[] args) {
		SpringApplication.run(PetshopApplication.class, args);
	}
	//localhost:8080
	@RestController
	static class HelloWordController {
		@GetMapping("/")
		public String helloWorld() {
			return "Hello World!";
			
		}
	}

}
