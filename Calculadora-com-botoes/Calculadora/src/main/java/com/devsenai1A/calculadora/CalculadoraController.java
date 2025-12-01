package com.devsenai1A.calculadora;

import java.util.HashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CalculadoraController {

    @PostMapping("/calcular")
    public Map<String, String> calcular(@RequestBody String expressao) {
        Map<String, String> resposta = new HashMap<>();

        try {
            expressao = expressao.replaceAll("\\s+", ""); 

            double resultado = calcularExpressao(expressao);

            resposta.put("resultado", String.valueOf(resultado));
            resposta.put("erro", "");

        } catch (Exception e) {
            resposta.put("resultado", "");
            resposta.put("erro", "Erro: Expressão inválida!"); 
        }

        return resposta;
    }


    private double calcularExpressao(String expressao) {
 
        expressao = calcularOperacoes(expressao, new String[]{"*", "/"});


        expressao = calcularOperacoes(expressao, new String[]{"+", "-"});


        return Double.parseDouble(expressao); 
    }


    private String calcularOperacoes(String expressao, String[] operadores) {
        boolean houveOperacao = true;


        while (houveOperacao) {
            houveOperacao = false;


            for (int i = 0; i < expressao.length(); i++) {
                char c = expressao.charAt(i);
                String operadorAtual = String.valueOf(c);

                boolean ehOperador = false;
                for (String op : operadores) {
                    if (operadorAtual.equals(op)) {
                        ehOperador = true;
                        break;
                    }
                }


                if (ehOperador && i > 0 && i < expressao.length() - 1) {

                    int inicioAntes = i - 1;
                    while (inicioAntes > 0 &&
                            (Character.isDigit(expressao.charAt(inicioAntes - 1)) ||
                                    expressao.charAt(inicioAntes - 1) == '.')) {
                        inicioAntes--;
                    }
                    double num1 = Double.parseDouble(expressao.substring(inicioAntes, i));

                    int fimDepois = i + 1;
                    while (fimDepois < expressao.length() - 1 &&
                            (Character.isDigit(expressao.charAt(fimDepois + 1)) ||
                                    expressao.charAt(fimDepois + 1) == '.')) {
                        fimDepois++;
                    }
                    double num2 = Double.parseDouble(expressao.substring(i + 1, fimDepois + 1));

                    double resultado = 0;
                    switch (c) {
                        case '+':
                            resultado = num1 + num2;
                            break;
                        case '-':
                            resultado = num1 - num2;
                            break;
                        case '*':
                            resultado = num1 * num2;
                            break;
                        case '/':
                            if (num2 != 0) {
                                resultado = num1 / num2;
                            } else {
                                throw new ArithmeticException("Divisão por zero");
                            }
                            break;
                    }

                    String antes = expressao.substring(0, inicioAntes);
                    String depois = expressao.substring(fimDepois + 1);
                    expressao = antes + resultado + depois;

                    houveOperacao = true;
                    break;
                }
            }
        }

        return expressao; 
    }
}
