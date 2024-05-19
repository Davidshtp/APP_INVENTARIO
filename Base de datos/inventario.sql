/*
SQLyog Ultimate v12.4.3 (64 bit)
MySQL - 10.4.32-MariaDB : Database - inventario
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`inventario` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `inventario`;

/*Table structure for table `categorias` */

DROP TABLE IF EXISTS `categorias`;

CREATE TABLE `categorias` (
  `categoria_id` int(11) NOT NULL AUTO_INCREMENT,
  `categoria_color` varchar(100) NOT NULL,
  `categoria_status` varchar(11) DEFAULT NULL,
  `categoria_nombre` varchar(20) DEFAULT NULL,
  KEY `categoria_id` (`categoria_id`),
  KEY `categoria_color` (`categoria_color`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `categorias` */

insert  into `categorias`(`categoria_id`,`categoria_color`,`categoria_status`,`categoria_nombre`) values 
(66,'verde','Activo','husqvarna');

/*Table structure for table `productos` */

DROP TABLE IF EXISTS `productos`;

CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `producto_nombre` varchar(30) NOT NULL,
  `producto_precio` varchar(11) DEFAULT NULL,
  `producto_cantidad` varchar(11) DEFAULT NULL,
  `producto_status` varchar(20) DEFAULT NULL,
  `producto_categoria` varchar(20) DEFAULT NULL,
  `producto_categoria_color` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`producto_nombre`),
  KEY `Fproductos_status` (`producto_status`),
  KEY `Fproductos_categorias` (`producto_categoria`),
  KEY `id` (`id`),
  KEY `actualizacion` (`producto_categoria_color`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `productos` */

/*Table structure for table `rol` */

DROP TABLE IF EXISTS `rol`;

CREATE TABLE `rol` (
  `rol_id` int(11) NOT NULL,
  `rol_text` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`rol_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `rol` */

insert  into `rol`(`rol_id`,`rol_text`) values 
(1,'administrador');

/*Table structure for table `status` */

DROP TABLE IF EXISTS `status`;

CREATE TABLE `status` (
  `status_id` int(11) NOT NULL,
  `status_text` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `status` */

insert  into `status`(`status_id`,`status_text`) values 
(1,'activo'),
(10,'inactivo');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `usuario_nombre` varchar(30) DEFAULT NULL,
  `usuario_apellido` varchar(30) DEFAULT NULL,
  `usuario_correo` varchar(30) DEFAULT NULL,
  `usuario_contrasena` varchar(8) DEFAULT NULL,
  `usuario_status` int(1) DEFAULT NULL,
  `usuario_rol` int(1) DEFAULT NULL,
  `usuario_identificacion` varchar(12) DEFAULT NULL,
  KEY `fereig_user_status` (`usuario_status`),
  KEY `foreig_user_rol` (`usuario_rol`),
  CONSTRAINT `fereig_user_status` FOREIGN KEY (`usuario_status`) REFERENCES `status` (`status_id`),
  CONSTRAINT `foreig_user_rol` FOREIGN KEY (`usuario_rol`) REFERENCES `rol` (`rol_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `users` */

insert  into `users`(`usuario_nombre`,`usuario_apellido`,`usuario_correo`,`usuario_contrasena`,`usuario_status`,`usuario_rol`,`usuario_identificacion`) values 
('David ','Medina','davidtrujillo2207@ggmail.com','40781889',NULL,NULL,'1118366640'),
('Valentina','Rodriguez','valen@gmail.com','12',NULL,NULL,'123456'),
('David','NIcolas','david@gmailcom','123',NULL,NULL,'1234'),
('dasd','sad','asdsad','2323',NULL,NULL,'2323');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
