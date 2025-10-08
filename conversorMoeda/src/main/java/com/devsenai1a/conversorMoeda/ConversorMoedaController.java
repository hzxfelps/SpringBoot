package com.devsenai1a.conversorMoeda;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ConversorMoedaController {
	@PostMapping("/conversor")
	@ResponseBody
	public Map<String , Object> conversorJson(
			@RequestParam double valor,
			@RequestParam String de,
			@RequestParam String para){
		
		double resultado = 0;
		String erro = null;
		
		
		switch(de + para) {
		case "Real" +  "Dólar": resultado = valor / 5.36; break;
		case "Real"  + "Euro": resultado = valor / 6.23; break;
		case "Euro" + "Dólar": resultado = valor * 1.16 ; break; 
		case "Euro" + "Real": resultado = valor * 6.23; break;
		case "Dólar" + "Real": resultado = valor * 5.36; break;
		case "Dólar"+ "Euro": resultado = valor / 1.16 ; break;
		default: erro = "unidade invalida";	
			}
		
		
		Map<String, Object> resp = new HashMap<>();
		resp.put("resultado", resultado);
		resp.put("errou", erro);
		return resp;
	}
	
}
