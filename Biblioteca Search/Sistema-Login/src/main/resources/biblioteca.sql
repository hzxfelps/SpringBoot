-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 19/11/2025 às 20:02
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `biblioteca`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `acervo`
--

CREATE TABLE `acervo` (
  `codigo` int(11) NOT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `autor` varchar(255) DEFAULT NULL,
  `outrosAutores` varchar(255) DEFAULT NULL,
  `anoEdicao` int(11) DEFAULT NULL,
  `tipoAcervo` varchar(50) DEFAULT NULL,
  `codEditora` int(11) DEFAULT NULL,
  `categoria` int(11) DEFAULT NULL,
  `numTombo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `acervo`
--

INSERT INTO `acervo` (`codigo`, `titulo`, `autor`, `outrosAutores`, `anoEdicao`, `tipoAcervo`, `codEditora`, `categoria`, `numTombo`) VALUES
(1001, 'Tokyo Ghoul', 'Sui Ishida', NULL, 2011, 'Manga', 1, 1, 1001),
(1002, 'Kagurabachi', 'Tatsuya Endo', NULL, 2023, 'Manga', 2, 1, 1002),
(1003, 'Blue Lock', 'Muneyuki Kaneshiro', NULL, 2018, 'Manga', 3, 1, 1003),
(1004, 'Naruto', 'Masashi Kishimoto', NULL, 1999, 'Manga', 4, 1, 1004),
(1005, 'Attack on Titan', 'Hajime Isayama', NULL, 2009, 'Manga', 5, 1, 1005);

-- --------------------------------------------------------

--
-- Estrutura para tabela `acervo_autor`
--

CREATE TABLE `acervo_autor` (
  `codAcervo` int(11) NOT NULL,
  `codAutor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `acervo_autor`
--

INSERT INTO `acervo_autor` (`codAcervo`, `codAutor`) VALUES
(1001, 1),
(1002, 2),
(1003, 3),
(1004, 5),
(1005, 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `autor`
--

CREATE TABLE `autor` (
  `codigo` int(11) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `numAutor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `autor`
--

INSERT INTO `autor` (`codigo`, `nome`, `numAutor`) VALUES
(1, 'Sui Ishida', 1),
(2, 'Tatsuya Endo', 2),
(3, 'Muneyuki Kaneshiro', 3),
(4, 'Hajime Isayama', 4),
(5, 'Masashi Kishimoto', 5);

-- --------------------------------------------------------

--
-- Estrutura para tabela `categoria`
--

CREATE TABLE `categoria` (
  `codigo` int(11) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `categoria`
--

INSERT INTO `categoria` (`codigo`, `descricao`) VALUES
(1, 'Manga'),
(2, 'Comic'),
(3, 'Novela'),
(4, 'Ficção'),
(5, 'Romance');

-- --------------------------------------------------------

--
-- Estrutura para tabela `clientes`
--

CREATE TABLE `clientes` (
  `codigo` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `observacao` text DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `coprolCliente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `clientes`
--

INSERT INTO `clientes` (`codigo`, `nome`, `endereco`, `cidade`, `estado`, `telefone`, `observacao`, `status`, `coprolCliente`) VALUES
(1, 'Cliente 1', 'Rua A, 123', 'São Paulo', 'SP', '11987654321', 'Observação 1', 'Ativo', 1),
(2, 'Cliente 2', 'Rua B, 456', 'Rio de Janeiro', 'RJ', '21987654321', 'Observação 2', 'Inativo', 2),
(3, 'Cliente 3', 'Rua C, 789', 'Curitiba', 'PR', '31987654321', 'Observação 3', 'Ativo', 3),
(4, 'Cliente 4', 'Rua D, 101', 'Belo Horizonte', 'MG', '41987654321', 'Observação 4', 'Ativo', 4),
(5, 'Cliente 5', 'Rua E, 202', 'Porto Alegre', 'RS', '51987654321', 'Observação 5', 'Inativo', 5);

-- --------------------------------------------------------

--
-- Estrutura para tabela `editora`
--

CREATE TABLE `editora` (
  `codigo` int(11) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `editora`
--

INSERT INTO `editora` (`codigo`, `descricao`, `telefone`) VALUES
(1, 'Shueisha', '123456789'),
(2, 'Kodansha', '987654321'),
(3, 'Viz Media', '564738291'),
(4, 'Shogakukan', '192837465'),
(5, 'Dark Horse', '112233445');

-- --------------------------------------------------------

--
-- Estrutura para tabela `emprestimo`
--

CREATE TABLE `emprestimo` (
  `codigo` int(11) NOT NULL,
  `dataEmprestimo` date DEFAULT NULL,
  `dataDevolucao` date DEFAULT NULL,
  `codCliente` int(11) DEFAULT NULL,
  `codItem` int(11) DEFAULT NULL,
  `codFuncionario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `emprestimo`
--

INSERT INTO `emprestimo` (`codigo`, `dataEmprestimo`, `dataDevolucao`, `codCliente`, `codItem`, `codFuncionario`) VALUES
(11, '2023-11-01', '2023-11-15', 1, 1001, 1),
(12, '2023-11-02', '2023-11-16', 2, 1002, 2),
(13, '2023-11-03', '2023-11-17', 3, 1003, 3),
(14, '2023-11-04', '2023-11-18', 4, 1004, 4),
(15, '2023-11-05', '2023-11-19', 5, 1005, 5);

-- --------------------------------------------------------

--
-- Estrutura para tabela `parametrobiblioteca`
--

CREATE TABLE `parametrobiblioteca` (
  `codigo` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `pais` varchar(100) DEFAULT NULL,
  `cep` varchar(20) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `valorMulta` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `codigo` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `tipoUsuario` varchar(50) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `login` varchar(50) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`codigo`, `nome`, `tipoUsuario`, `telefone`, `login`, `senha`) VALUES
(1, 'Usuario 1', 'Bibliotecário', '11987654321', 'usuario1', 'senha1'),
(2, 'Usuario 2', 'Admin', '21987654321', 'admin', 'admin123'),
(3, 'Usuario 3', 'Bibliotecário', '31987654321', 'usuario3', 'senha3'),
(4, 'Usuario 4', 'Admin', '41987654321', 'admin2', 'admin456'),
(5, 'Usuario 5', 'Bibliotecário', '51987654321', 'usuario5', 'senha5');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `acervo`
--
ALTER TABLE `acervo`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `codEditora` (`codEditora`),
  ADD KEY `categoria` (`categoria`);

--
-- Índices de tabela `acervo_autor`
--
ALTER TABLE `acervo_autor`
  ADD PRIMARY KEY (`codAcervo`,`codAutor`),
  ADD KEY `codAutor` (`codAutor`);

--
-- Índices de tabela `autor`
--
ALTER TABLE `autor`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `editora`
--
ALTER TABLE `editora`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `emprestimo`
--
ALTER TABLE `emprestimo`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `codCliente` (`codCliente`),
  ADD KEY `codItem` (`codItem`),
  ADD KEY `codFuncionario` (`codFuncionario`);

--
-- Índices de tabela `parametrobiblioteca`
--
ALTER TABLE `parametrobiblioteca`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`codigo`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `acervo`
--
ALTER TABLE `acervo`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1006;

--
-- AUTO_INCREMENT de tabela `autor`
--
ALTER TABLE `autor`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `categoria`
--
ALTER TABLE `categoria`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `editora`
--
ALTER TABLE `editora`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `emprestimo`
--
ALTER TABLE `emprestimo`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `parametrobiblioteca`
--
ALTER TABLE `parametrobiblioteca`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `acervo`
--
ALTER TABLE `acervo`
  ADD CONSTRAINT `acervo_ibfk_1` FOREIGN KEY (`codEditora`) REFERENCES `editora` (`codigo`),
  ADD CONSTRAINT `acervo_ibfk_2` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`codigo`);

--
-- Restrições para tabelas `acervo_autor`
--
ALTER TABLE `acervo_autor`
  ADD CONSTRAINT `acervo_autor_ibfk_1` FOREIGN KEY (`codAcervo`) REFERENCES `acervo` (`codigo`),
  ADD CONSTRAINT `acervo_autor_ibfk_2` FOREIGN KEY (`codAutor`) REFERENCES `autor` (`codigo`);

--
-- Restrições para tabelas `emprestimo`
--
ALTER TABLE `emprestimo`
  ADD CONSTRAINT `emprestimo_ibfk_1` FOREIGN KEY (`codCliente`) REFERENCES `clientes` (`codigo`),
  ADD CONSTRAINT `emprestimo_ibfk_2` FOREIGN KEY (`codItem`) REFERENCES `acervo` (`codigo`),
  ADD CONSTRAINT `emprestimo_ibfk_3` FOREIGN KEY (`codFuncionario`) REFERENCES `usuarios` (`codigo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
