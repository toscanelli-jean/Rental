-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mer. 13 oct. 2021 à 23:36
-- Version du serveur : 10.4.21-MariaDB
-- Version de PHP : 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `Rental`
--

-- --------------------------------------------------------

--
-- Structure de la table `bikes`
--

CREATE TABLE `bikes` (
  `bike_id` int(11) NOT NULL,
  `bike_name` varchar(100) NOT NULL,
  `bike_price` int(11) NOT NULL,
  `bike_height` float NOT NULL,
  `bike_brand` varchar(100) NOT NULL,
  `bike_person` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `bikes`
--

INSERT INTO `bikes` (`bike_id`, `bike_name`, `bike_price`, `bike_height`, `bike_brand`, `bike_person`) VALUES
(1, 'SL7', 12500, 7.2, 'specialized', 1),
(2, 'aethos', 13000, 6.8, 'specialized', 2),
(3, 'V3rs', 12000, 7, 'colnago', 3),
(4, 'orca OMR', 6000, 7.4, 'orbea', 4),
(5, 'cento1', 6500, 7.3, 'wilier', 4),
(6, 'tcr advanced', 4000, 8, 'giant', 5),
(7, 'madone', 7500, 8.3, 'trek', 7),
(8, 'emonda', 2500, 8.1, 'trek', 8),
(9, 'filante', 12600, 7, 'wilier', 8),
(10, 'aeroad', 8400, 9, 'canyon', 9);

-- --------------------------------------------------------

--
-- Structure de la table `conn`
--

CREATE TABLE `conn` (
  `conn_id` int(11) NOT NULL,
  `conn_bike` int(11) NOT NULL,
  `conn_store` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `conn`
--

INSERT INTO `conn` (`conn_id`, `conn_bike`, `conn_store`) VALUES
(1, 1, 4),
(2, 2, 3),
(3, 3, 2),
(4, 3, 2),
(5, 3, 7),
(6, 4, 9),
(7, 5, 10),
(8, 6, 2),
(9, 6, 3),
(10, 7, 7),
(11, 8, 8),
(12, 8, 3),
(13, 8, 6),
(14, 9, 1),
(15, 9, 9),
(16, 9, 7),
(17, 9, 2),
(18, 10, 3);

-- --------------------------------------------------------

--
-- Structure de la table `persons`
--

CREATE TABLE `persons` (
  `person_id` int(11) NOT NULL,
  `person_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `persons`
--

INSERT INTO `persons` (`person_id`, `person_name`) VALUES
(1, 'Mathieu'),
(2, 'Kais'),
(3, 'Theo'),
(4, 'Jean'),
(5, 'Pierre'),
(6, 'Amelie'),
(7, 'Astryd'),
(8, 'Romane'),
(9, 'Cloe'),
(10, 'Imad');

-- --------------------------------------------------------

--
-- Structure de la table `stores`
--

CREATE TABLE `stores` (
  `store_id` int(11) NOT NULL,
  `store_name` varchar(100) DEFAULT NULL,
  `store_localisation` varchar(100) DEFAULT NULL,
  `store_size` int(11) NOT NULL,
  `store_stock` int(11) NOT NULL,
  `store_brandNb` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `stores`
--

INSERT INTO `stores` (`store_id`, `store_name`, `store_localisation`, `store_size`, `store_stock`, `store_brandNb`) VALUES
(1, 'unikbike', 'rodez', 300, 100, 4),
(2, 'kalao', 'paris', 150, 80, 2),
(3, 'verticalbike', 'budapest', 500, 200, 5),
(4, 'probikeshop', 'toulouse', 360, 160, 6),
(5, 'bikester', 'new-york', 250, 90, 2),
(6, 'AAA', 'budapest', 110, 65, 3),
(7, 'giantstore', 'zurich', 700, 250, 8),
(8, 'trocvelo', 'paris', 90, 25, 2),
(9, 'alltriks', 'monaco', 80, 35, 3),
(10, 'mybike', 'split', 210, 150, 6);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `bikes`
--
ALTER TABLE `bikes`
  ADD PRIMARY KEY (`bike_id`),
  ADD KEY `fk_bikes` (`bike_person`);

--
-- Index pour la table `conn`
--
ALTER TABLE `conn`
  ADD PRIMARY KEY (`conn_id`),
  ADD KEY `fk_conn_bike` (`conn_bike`),
  ADD KEY `fk_conn_store` (`conn_store`);

--
-- Index pour la table `persons`
--
ALTER TABLE `persons`
  ADD PRIMARY KEY (`person_id`);

--
-- Index pour la table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`store_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `bikes`
--
ALTER TABLE `bikes`
  MODIFY `bike_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `conn`
--
ALTER TABLE `conn`
  MODIFY `conn_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `persons`
--
ALTER TABLE `persons`
  MODIFY `person_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `stores`
--
ALTER TABLE `stores`
  MODIFY `store_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `bikes`
--
ALTER TABLE `bikes`
  ADD CONSTRAINT `fk_bikes` FOREIGN KEY (`bike_person`) REFERENCES `persons` (`person_id`);

--
-- Contraintes pour la table `conn`
--
ALTER TABLE `conn`
  ADD CONSTRAINT `fk_conn_bike` FOREIGN KEY (`conn_bike`) REFERENCES `bikes` (`bike_id`),
  ADD CONSTRAINT `fk_conn_store` FOREIGN KEY (`conn_store`) REFERENCES `stores` (`store_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
