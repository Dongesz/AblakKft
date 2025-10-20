-- Seed SQL for AblakKft Orders table
-- 4 inserts per county to give a dense dataset for testing
-- Adjust auto-increment behavior / Ids as needed for your DB

USE `ablakkft`;

INSERT INTO `Orders` (`UserId`, `ProductId`, `Quantity`, `Shipping_adress`, `Status`, `Order_date`) VALUES
(2, 5, 2, 'Budapest, V. kerület', 'New', '2025-10-20 08:30:00'),
(3, 1, 1, 'Budapest, III. kerület', 'in_progress', '2025-10-20 09:00:00'),
(4, 2, 3, 'Budapest, XII. kerület', 'ready', '2025-10-20 09:30:00'),
(5, 3, 1, 'Budapest, XVIII. kerület', 'delivered', '2025-10-20 10:00:00');

-- Bács-Kiskun
INSERT INTO `Orders` (`UserId`, `ProductId`, `Quantity`, `Shipping_adress`, `Status`, `Order_date`) VALUES
(6, 4, 2, 'Kecskemét, Bács-Kiskun', 'New', '2025-10-20 08:45:00'),
(7, 5, 1, 'Kiskunfélegyháza, Bács-Kiskun', 'in_progress', '2025-10-20 09:10:00'),
(8, 6, 5, 'Kiskunhalas, Bács-Kiskun', 'ready', '2025-10-20 09:40:00'),
(9, 7, 2, 'Baja, Bács-Kiskun', 'delivered', '2025-10-20 10:05:00');

-- Baranya
INSERT INTO `Orders` (`UserId`, `ProductId`, `Quantity`, `Shipping_adress`, `Status`, `Order_date`) VALUES
(10, 8, 1, 'Pécs, Baranya', 'New', '2025-10-20 08:50:00'),
(11, 9, 2, 'Komló, Baranya', 'in_progress', '2025-10-20 09:15:00'),
(12, 1, 3, 'Szigetvár, Baranya', 'ready', '2025-10-20 09:45:00'),
(13, 2, 1, 'Mohács, Baranya', 'delivered', '2025-10-20 10:10:00');

-- Békés
INSERT INTO `Orders` (`UserId`, `ProductId`, `Quantity`, `Shipping_adress`, `Status`, `Order_date`) VALUES
(14, 3, 2, 'Békéscsaba, Békés', 'New', '2025-10-20 08:55:00'),
(15, 4, 1, 'Orosháza, Békés', 'in_progress', '2025-10-20 09:20:00'),
(16, 5, 2, 'Gyula, Békés', 'ready', '2025-10-20 09:50:00'),
(17, 6, 1, 'Szeghalom, Békés', 'delivered', '2025-10-20 10:15:00');

-- Borsod-Abaúj-Zemplén
INSERT INTO `Orders` (`UserId`, `ProductId`, `Quantity`, `Shipping_adress`, `Status`, `Order_date`) VALUES
(18, 7, 2, 'Miskolc, Borsod-Abaúj-Zemplén', 'New', '2025-10-20 09:00:00'),
(19, 8, 1, 'Tiszaújváros, Borsod-Abaúj-Zemplén', 'in_progress', '2025-10-20 09:25:00'),
(20, 9, 3, 'Ózd, Borsod-Abaúj-Zemplén', 'ready', '2025-10-20 09:55:00'),
(21, 1, 1, 'Sátoraljaújhely, Borsod-Abaúj-Zemplén', 'delivered', '2025-10-20 10:20:00');

-- Csongrád-Csanád
INSERT INTO `Orders` (`UserId`, `ProductId`, `Quantity`, `Shipping_adress`, `Status`, `Order_date`) VALUES
(22, 2, 2, 'Szeged, Csongrád-Csanád', 'New', '2025-10-20 09:05:00'),
(23, 3, 1, 'Hódmezővásárhely, Csongrád-Csanád', 'in_progress', '2025-10-20 09:30:00'),
(24, 4, 4, 'Makó, Csongrád-Csanád', 'ready', '2025-10-20 10:00:00'),
(25, 5, 1, 'Csongrád, Csongrád-Csanád', 'delivered', '2025-10-20 10:25:00');

-- Fejér
INSERT INTO `Orders` (`UserId`, `ProductId`, `Quantity`, `Shipping_adress`, `Status`, `Order_date`) VALUES
(26, 6, 1, 'Székesfehérvár, Fejér', 'New', '2025-10-20 09:10:00'),
(27, 7, 2, 'Dunaújváros, Fejér', 'in_progress', '2025-10-20 09:35:00'),
(28, 8, 2, 'Mór, Fejér', 'ready', '2025-10-20 10:05:00'),
(29, 9, 1, 'Bicske, Fejér', 'delivered', '2025-10-20 10:30:00');

-- Győr-Moson-Sopron
INSERT INTO `Orders` (`UserId`, `ProductId`, `Quantity`, `Shipping_adress`, `Status`, `Order_date`) VALUES
(30, 1, 2, 'Győr, Győr-Moson-Sopron', 'New', '2025-10-20 09:15:00'),
(31, 2, 1, 'Mosonmagyaróvár, Győr-Moson-Sopron', 'in_progress', '2025-10-20 09:40:00'),
(32, 3, 3, 'Sopron, Győr-Moson-Sopron', 'ready', '2025-10-20 10:10:00'),
(33, 4, 1, 'Csorna, Győr-Moson-Sopron', 'delivered', '2025-10-20 10:35:00');

-- Hajdú-Bihar
INSERT INTO `Orders` (`UserId`, `ProductId`, `Quantity`, `Shipping_adress`, `Status`, `Order_date`) VALUES
(34, 5, 1, 'Debrecen, Hajdú-Bihar', 'New', '2025-10-20 09:20:00'),
(35, 6, 2, 'Hajdúszoboszló, Hajdú-Bihar', 'in_progress', '2025-10-20 09:45:00'),
(36, 7, 2, 'Nádudvar, Hajdú-Bihar', 'ready', '2025-10-20 10:15:00'),
(37, 8, 1, 'Berettyóújfalu, Hajdú-Bihar', 'delivered', '2025-10-20 10:40:00');

-- Heves
INSERT INTO `Orders` (`UserId`, `ProductId`, `Quantity`, `Shipping_adress`, `Status`, `Order_date`) VALUES
(38, 9, 2, 'Eger, Heves', 'New', '2025-10-20 09:25:00'),
(39, 1, 1, 'Gyöngyös, Heves', 'in_progress', '2025-10-20 09:50:00'),
(40, 2, 3, 'Hatvan, Heves', 'ready', '2025-10-20 10:20:00'),
(41, 3, 1, 'Tiszanána, Heves', 'delivered', '2025-10-20 10:45:00');

-- Jász-Nagykun-Szolnok
INSERT INTO `Orders` (`UserId`, `ProductId`, `Quantity`, `Shipping_adress`, `Status`, `Order_date`) VALUES
(42, 4, 2, 'Szolnok, Jász-Nagykun-Szolnok', 'New', '2025-10-20 09:30:00'),
(43, 5, 1, 'Jászberény, Jász-Nagykun-Szolnok', 'in_progress', '2025-10-20 09:55:00'),
(44, 6, 2, 'Túrkeve, Jász-Nagykun-Szolnok', 'ready', '2025-10-20 10:25:00'),
(45, 7, 1, 'Szászberek, Jász-Nagykun-Szolnok', 'delivered', '2025-10-20 10:50:00');

-- Komárom-Esztergom
INSERT INTO `Orders` (`UserId`, `ProductId`, `Quantity`, `Shipping_adress`, `Status`, `Order_date`) VALUES
(46, 8, 1, 'Tatabánya, Komárom-Esztergom', 'New', '2025-10-20 09:35:00'),
(47, 9, 2, 'Komárom, Komárom-Esztergom', 'in_progress', '2025-10-20 10:00:00'),
(48, 1, 1, 'Esztergom, Komárom-Esztergom', 'ready', '2025-10-20 10:30:00'),
(49, 2, 2, 'Oroszlány, Komárom-Esztergom', 'delivered', '2025-10-20 10:55:00');

-- Nógrád
INSERT INTO `Orders` (`UserId`, `ProductId`, `Quantity`, `Shipping_adress`, `Status`, `Order_date`) VALUES
(50, 3, 1, 'Salgótarján, Nógrád', 'New', '2025-10-20 09:40:00'),
(51, 4, 2, 'Bátonyterenye, Nógrád', 'in_progress', '2025-10-20 10:05:00'),
(52, 5, 3, 'Szécsény, Nógrád', 'ready', '2025-10-20 10:35:00'),
(53, 6, 1, 'Pásztó, Nógrád', 'delivered', '2025-10-20 11:00:00');

-- Pest
INSERT INTO `Orders` (`UserId`, `ProductId`, `Quantity`, `Shipping_adress`, `Status`, `Order_date`) VALUES
(54, 7, 2, 'Szentendre, Pest', 'New', '2025-10-20 09:45:00'),
(55, 8, 1, 'Dunakeszi, Pest', 'in_progress', '2025-10-20 10:10:00'),
(56, 9, 2, 'Gödöllő, Pest', 'ready', '2025-10-20 10:40:00'),
(57, 1, 1, 'Érd, Pest', 'delivered', '2025-10-20 11:05:00');

-- Somogy
INSERT INTO `Orders` (`UserId`, `ProductId`, `Quantity`, `Shipping_adress`, `Status`, `Order_date`) VALUES
(58, 2, 1, 'Kaposszekcső, Somogy', 'New', '2025-10-20 09:50:00'),
(59, 3, 2, 'Siófok, Somogy', 'in_progress', '2025-10-20 10:15:00'),
(60, 4, 1, 'Barcs, Somogy', 'ready', '2025-10-20 10:45:00'),
(61, 5, 2, 'Marcali, Somogy', 'delivered', '2025-10-20 11:10:00');

-- Szabolcs-Szatmár-Bereg
INSERT INTO `Orders` (`UserId`, `ProductId`, `Quantity`, `Shipping_adress`, `Status`, `Order_date`) VALUES
(62, 6, 3, 'Nyíregyháza, Szabolcs-Szatmár-Bereg', 'New', '2025-10-20 09:55:00'),
(63, 7, 1, 'Mátészalka, Szabolcs-Szatmár-Bereg', 'in_progress', '2025-10-20 10:20:00'),
(64, 8, 2, 'Csenger, Szabolcs-Szatmár-Bereg', 'ready', '2025-10-20 10:50:00'),
(65, 9, 1, 'Nagykálló, Szabolcs-Szatmár-Bereg', 'delivered', '2025-10-20 11:15:00');

-- Tolna
INSERT INTO `Orders` (`UserId`, `ProductId`, `Quantity`, `Shipping_adress`, `Status`, `Order_date`) VALUES
(66, 1, 2, 'Szekszárd, Tolna', 'New', '2025-10-20 10:00:00'),
(67, 2, 1, 'Dombóvár, Tolna', 'in_progress', '2025-10-20 10:25:00'),
(68, 3, 3, 'Bonyhád, Tolna', 'ready', '2025-10-20 10:55:00'),
(69, 4, 1, 'Tamási, Tolna', 'delivered', '2025-10-20 11:20:00');

-- Vas
INSERT INTO `Orders` (`UserId`, `ProductId`, `Quantity`, `Shipping_adress`, `Status`, `Order_date`) VALUES
(70, 5, 1, 'Szombathely, Vas', 'New', '2025-10-20 10:05:00'),
(71, 6, 2, 'Sárvár, Vas', 'in_progress', '2025-10-20 10:30:00'),
(72, 7, 2, 'Körmend, Vas', 'ready', '2025-10-20 11:00:00'),
(73, 8, 1, 'Celldömölk, Vas', 'delivered', '2025-10-20 11:25:00');

-- Veszprém
INSERT INTO `Orders` (`UserId`, `ProductId`, `Quantity`, `Shipping_adress`, `Status`, `Order_date`) VALUES
(74, 9, 2, 'Veszprém, Veszprém', 'New', '2025-10-20 10:10:00'),
(75, 1, 1, 'Balatonalmádi, Veszprém', 'in_progress', '2025-10-20 10:35:00'),
(76, 2, 2, 'Balatonfüred, Veszprém', 'ready', '2025-10-20 11:05:00'),
(77, 3, 1, 'Pápa, Veszprém', 'delivered', '2025-10-20 11:30:00');

-- Zala
INSERT INTO `Orders` (`UserId`, `ProductId`, `Quantity`, `Shipping_adress`, `Status`, `Order_date`) VALUES
(78, 4, 3, 'Zalaegerszeg, Zala', 'New', '2025-10-20 10:15:00'),
(79, 5, 1, 'Keszthely, Zala', 'in_progress', '2025-10-20 10:40:00'),
(80, 6, 2, 'Nagykanizsa, Zala', 'ready', '2025-10-20 11:10:00'),
(81, 7, 1, 'Letenye, Zala', 'delivered', '2025-10-20 11:35:00');
