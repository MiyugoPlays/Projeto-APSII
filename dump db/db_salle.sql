-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 14-Nov-2024 às 00:47
-- Versão do servidor: 5.7.36
-- versão do PHP: 8.1.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `db_salle`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `espacos`
--

CREATE TABLE `espacos` (
  `id_espaco` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `foto` blob,
  `preco` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `espacos`
--

INSERT INTO `espacos` (`id_espaco`, `nome`, `foto`, `preco`) VALUES
(1, 'Espaço A', 0x63616d696e686f2f706172612f696d6167656d412e6a7067, '150.00'),
(2, 'Espaço B', 0x63616d696e686f2f706172612f696d6167656d422e6a7067, '200.50'),
(3, 'Espaço C', 0x63616d696e686f2f706172612f696d6167656d432e6a7067, '100.00');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `email`, `senha`) VALUES
(1, 'amigo@gmail.com', '123'),
(4, 'zzz@gmail.com', '123'),
(5, 'xxx@gmail.com', '123'),
(6, 'asd@gmail.com', '123'),
(7, 'zxc@gmail.com', '123'),
(8, 'CCC@gmail.com', '123');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `espacos`
--
ALTER TABLE `espacos`
  ADD PRIMARY KEY (`id_espaco`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `espacos`
--
ALTER TABLE `espacos`
  MODIFY `id_espaco` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
