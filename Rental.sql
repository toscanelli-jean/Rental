CREATE DATABASE if not exists Rental;
USE Rental;

DROP TABLE if exists conn;
DROP TABLE if exists stores;
DROP TABLE if exists bikes;
DROP TABLE if exists persons;

CREATE TABLE persons (
	person_id int auto_increment primary key, 
    person_name varchar(100)
);
CREATE TABLE bikes (
	bike_id int auto_increment primary key,
    bike_name varchar(100) NOT NULL,
    bike_price int NOT NULL,
    bike_height float NOT NULL,
    bike_brand varchar(100) NOT NULL,
    bike_person int NOT NULL,
    CONSTRAINT fk_bikes FOREIGN KEY (bike_person) REFERENCES persons(person_id)
);
CREATE TABLE stores (
	store_id int auto_increment primary key,
	store_name varchar(100),
    store_localisation varchar(100),
    store_size int NOT NULL,
    store_stock int NOT NULL,
    store_brandNb int NOT NULL
);
CREATE TABLE conn (
	conn_id int auto_increment primary key,
    conn_bike int NOT NULL,
    conn_store int NOT NULL,
    CONSTRAINT fk_conn_bike FOREIGN KEY (conn_bike) REFERENCES bikes(bike_id),
    CONSTRAINT fk_conn_store FOREIGN KEY (conn_store) REFERENCES stores(store_id)
);

INSERT INTO persons VALUES 
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

INSERT INTO bikes VALUES 
(1,	'SL7', 12500,	7.2,	'specialized',	1),
(2,	'aethos',	13000,	6.8,	'specialized',	2),
(3,	'V3rs',	12000,	7,	'colnago',	3),
(4,	'orca OMR',	6000,	7.4,	'orbea',	4),
(5,	'cento1',	6500,	7.3,	'wilier',	4),
(6,	'tcr advanced',	4000,	8,	'giant',	5),
(7,	'madone',	7500,	8.3,	'trek',	7),
(8,	'emonda',	2500,	8.1,	'trek',	8),
(9,	'filante',	12600,	7,	'wilier',	8),
(10,	'aeroad',	8400,	9,	'canyon',	9);
    
INSERT INTO stores VALUES
(1,	'unikbike',	'rodez',	300,	100,	4),
(2,	'kalao',	'paris',	150,	80,	2),
(3,	'verticalbike',	'budapest',	500,	200,	5),
(4,	'probikeshop',	'toulouse',	360,	160,	6),
(5, 	'bikester',	'new-york',	250,	90,	2),
(6,	'AAA',	'budapest',	110,	65,	3),
(7,	'giantstore',	'zurich',	700,	250,	8),
(8,	'trocvelo',	'paris',	90,	25,	2),
(9,	'alltriks',	'monaco',	80,	35,	3),
(10,	'mybike',	'split',	210,	150,	6);
    
INSERT INTO conn (conn_bike, conn_store) VALUES
	(1, 4), (2, 3), (3, 2), (3, 2), (3, 7), (4, 9), (5, 10), (6, 2), (6, 3), (7, 7),(8, 8), (8, 3), (8, 6), (9, 1), (9, 9), (9, 7), (9, 2), (10, 3);
