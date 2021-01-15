-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.18 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para cotizacion
CREATE DATABASE IF NOT EXISTS `cotizacion` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `cotizacion`;

-- Volcando estructura para tabla cotizacion.clientes
CREATE TABLE IF NOT EXISTS `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) DEFAULT NULL,
  `tipo` varchar(30) DEFAULT NULL,
  `contacto` varchar(30) DEFAULT NULL,
  `ruc` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `correo` varchar(40) DEFAULT NULL,
  `direccion` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla cotizacion.clientes: ~10 rows (aproximadamente)
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` (`id`, `nombre`, `tipo`, `contacto`, `ruc`, `telefono`, `correo`, `direccion`) VALUES
	(12, 'Jose ', 'Agencia', 'Jose pruebas', 'rtes3244', 'erys567', '76gd6', '657'),
	(13, 'Arturo', 'Agencia', NULL, '123456', '3333-9876', '@test', 'david'),
	(14, 'Banistmo', 'Empresa', NULL, '123456', '5555-5433', 'banistmo@hotmail.com', 'David'),
	(15, 'Federal Mall', 'Agencia', 'Amir Pruebas', '234677', '3456-7959', 'amir@federal.com', 'David.Chirqui'),
	(16, 'Federal Mall', 'Cliente directo', 'Jarod Miranda', '', '6701-4132', 'jarod@hotmai.com', 'Dolega. chiriqui'),
	(17, 'test', 'Cliente directo', 'Amir Pruebas', '123456', '5555-5433', 'amir@federal.com', 'test'),
	(18, 'test2', 'Cliente directo', 'Jose pruebas', '123456', '5555-5433', 'banistmo@hotmail.com', ''),
	(19, 'froy test', 'Cliente directo', 'Amir Pruebas', 'test4', '3456-7959', 'banistmo@hotmail.com', 'tstest'),
	(20, 'test3', 'Agencia', 'Jose pruebas', '123456', '5555-5433', 'banistmo@hotmail.com', 'testing'),
	(21, 'gretna', 'Cliente directo', 'test', 'test', 'test', 'test', 'test');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;

-- Volcando estructura para tabla cotizacion.cotizacion
CREATE TABLE IF NOT EXISTS `cotizacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  `id_cliente` int(11) NOT NULL,
  `bonificacion` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_cliente` (`id_cliente`),
  CONSTRAINT `cotizacion_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla cotizacion.cotizacion: ~42 rows (aproximadamente)
/*!40000 ALTER TABLE `cotizacion` DISABLE KEYS */;
INSERT INTO `cotizacion` (`id`, `fecha`, `id_cliente`, `bonificacion`) VALUES
	(1, '2020-12-30 13:30:14', 12, NULL),
	(2, '2020-12-30 15:26:00', 12, NULL),
	(3, '2020-12-30 15:39:49', 13, NULL),
	(4, '2020-12-31 09:04:47', 13, NULL),
	(5, '2020-12-31 09:13:10', 14, NULL),
	(7, '2021-01-12 14:06:20', 17, NULL),
	(8, '2021-01-12 14:41:10', 13, NULL),
	(9, '2021-01-12 14:44:47', 13, NULL),
	(10, '2021-01-12 14:45:29', 13, NULL),
	(11, '2021-01-12 14:47:15', 15, NULL),
	(12, '2021-01-12 15:09:53', 13, NULL),
	(13, '2021-01-12 15:10:34', 13, NULL),
	(14, '2021-01-12 15:11:02', 13, NULL),
	(15, '2021-01-12 19:10:31', 16, NULL),
	(16, '2021-01-12 19:16:31', 16, NULL),
	(17, '2021-01-12 19:25:13', 21, NULL),
	(18, '2021-01-12 19:42:26', 12, NULL),
	(19, '2021-01-12 20:10:00', 16, NULL),
	(20, '2021-01-12 20:23:19', 13, NULL),
	(21, '2021-01-13 13:44:22', 14, NULL),
	(22, '2021-01-13 16:10:32', 14, NULL),
	(23, '2021-01-13 16:15:23', 13, NULL),
	(24, '2021-01-13 16:29:08', 13, NULL),
	(25, '2021-01-13 16:30:58', 13, NULL),
	(26, '2021-01-13 16:31:41', 15, NULL),
	(27, '2021-01-13 16:31:51', 21, NULL),
	(28, '2021-01-13 16:33:26', 13, NULL),
	(29, '2021-01-13 16:34:25', 13, NULL),
	(30, '2021-01-13 16:34:57', 13, NULL),
	(31, '2021-01-13 16:35:35', 13, NULL),
	(32, '2021-01-13 16:39:39', 13, NULL),
	(33, '2021-01-13 16:40:15', 13, NULL),
	(34, '2021-01-13 16:40:59', 13, NULL),
	(35, '2021-01-13 16:41:57', 13, NULL),
	(36, '2021-01-13 16:42:52', 13, NULL),
	(37, '2021-01-13 16:43:57', 13, NULL),
	(38, '2021-01-13 16:43:59', 13, NULL),
	(39, '2021-01-13 16:44:34', 13, NULL),
	(40, '2021-01-13 16:45:16', 14, NULL),
	(41, '2021-01-13 16:51:01', 15, NULL),
	(42, '2021-01-13 16:51:20', 14, NULL),
	(43, '2021-01-13 16:52:16', 14, NULL);
/*!40000 ALTER TABLE `cotizacion` ENABLE KEYS */;

-- Volcando estructura para tabla cotizacion.detalle
CREATE TABLE IF NOT EXISTS `detalle` (
  `id_producto` int(11) NOT NULL,
  `id_cotizacion` int(11) NOT NULL,
  `dias_pautados` int(11) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_final` date DEFAULT NULL,
  `detalles` varchar(250) DEFAULT NULL,
  KEY `id_producto` (`id_producto`),
  KEY `id_cotizacion` (`id_cotizacion`),
  CONSTRAINT `detalle_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`),
  CONSTRAINT `detalle_ibfk_2` FOREIGN KEY (`id_cotizacion`) REFERENCES `cotizacion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla cotizacion.detalle: ~22 rows (aproximadamente)
/*!40000 ALTER TABLE `detalle` DISABLE KEYS */;
INSERT INTO `detalle` (`id_producto`, `id_cotizacion`, `dias_pautados`, `fecha_inicio`, `fecha_final`, `detalles`) VALUES
	(1, 1, 15, '2020-12-30', '2021-01-28', NULL),
	(2, 1, 13, '2020-12-30', '2021-01-14', NULL),
	(1, 2, 30, '2020-12-30', '2021-03-28', NULL),
	(1, 3, 7, '2020-12-30', '2021-01-12', NULL),
	(2, 5, 13, '2020-12-31', '2021-01-15', NULL),
	(2, 7, 55, '2021-01-12', '2021-03-12', NULL),
	(2, 14, 22, '2021-01-12', '2021-01-14', 'testin'),
	(2, 14, 22, '2021-01-12', '2021-01-14', 'testin'),
	(2, 14, 22, '2021-01-12', '2021-01-14', 'testin'),
	(2, 16, 10, '2021-01-12', '2021-01-27', 'testing'),
	(2, 16, 10, '2021-01-12', '2021-01-27', 'testing'),
	(1, 16, 6, '2021-01-12', '2021-01-27', 'ESto es otra prueba'),
	(1, 17, 6, '2021-01-14', '2021-01-28', 'detakkes de porueba'),
	(1, 17, 20, '2021-01-19', '2021-01-28', 'otra descripcion dew prueba'),
	(1, 18, 3, '2021-01-13', '2021-01-20', 'test'),
	(1, 18, 3, '2021-01-13', '2021-01-20', 'test'),
	(1, 19, 23, '2021-01-13', '2021-01-28', 'Test'),
	(2, 20, 2, '2021-01-12', '2021-01-22', 'Froy es gay '),
	(2, 21, 5, '2021-01-13', '2021-01-21', 'ejemplo'),
	(1, 21, 44, '2021-01-06', '2021-01-08', 'prueba\r\n'),
	(1, 43, 9, '2021-01-13', '2021-01-28', 'test'),
	(2, 43, 8, '2021-01-14', '2021-01-15', 'testtt');
/*!40000 ALTER TABLE `detalle` ENABLE KEYS */;

-- Volcando estructura para tabla cotizacion.emisoras
CREATE TABLE IF NOT EXISTS `emisoras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) DEFAULT NULL,
  `frecuencias` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla cotizacion.emisoras: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `emisoras` DISABLE KEYS */;
INSERT INTO `emisoras` (`id`, `nombre`, `frecuencias`) VALUES
	(1, 'Blast', '104.1'),
	(2, 'Tipica', '97.7');
/*!40000 ALTER TABLE `emisoras` ENABLE KEYS */;

-- Volcando estructura para tabla cotizacion.productos
CREATE TABLE IF NOT EXISTS `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(30) DEFAULT NULL,
  `precio_dia` float DEFAULT NULL,
  `id_emisora` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_emisora` (`id_emisora`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_emisora`) REFERENCES `emisoras` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla cotizacion.productos: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` (`id`, `tipo`, `precio_dia`, `id_emisora`) VALUES
	(1, 'cuña', 14, 2),
	(2, 'ponche', 15, 2),
	(3, 'test', 11, 2),
	(4, 'Empresa', 55.5, 1);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;

-- Volcando estructura para tabla cotizacion.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(25) DEFAULT NULL,
  `pwd` varchar(255) DEFAULT NULL,
  `rol` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla cotizacion.usuarios: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`id`, `nombre`, `pwd`, `rol`) VALUES
	(2, 'root', '$2a$10$V4ziBkRucVXQCOHePvQKTeQA97aZysS0ItxBsixfoyVFeOA5enVJ.', 1),
	(3, 'froy', '$2a$10$8rkq/rok8MjFajQIHfxLoeVW0bI3Eck7JwlBU3TB3aapr.QVgRVdG', 0),
	(11, 'anali', '$2a$10$gDVmjiPpIbpsekbmhp7iVeuJ/MASIlNJUGPEA9l1MjvhGnSPMsA32', 0);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
