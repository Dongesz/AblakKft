-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Sze 28. 00:27
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `ablakkft`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orders`
--

CREATE TABLE `orders` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `quantity` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `shipping_addr` varchar(255) NOT NULL,
  `status` enum('NEW','IN_PROGRESS','READY','DELIVERED') NOT NULL DEFAULT 'NEW',
  `order_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `product_id`, `quantity`, `shipping_addr`, `status`, `order_date`) VALUES
(1, 1, 1, 2, '3300 Eger, Széchenyi u. 10.', 'NEW', '2025-09-27 23:39:12'),
(7, 8, 3, 1, '3300 Eger, Széchenyi u. 10.', 'IN_PROGRESS', '2025-09-27 23:46:16'),
(8, 8, 8, 3, '3300 Eger, Széchenyi u. 10.', 'READY', '2025-09-27 23:46:16'),
(9, 1, 12, 1, '1111 Budapest, Teszt utca 1.', 'DELIVERED', '2025-09-27 23:46:16'),
(10, 8, 2, 5, '3300 Eger, Széchenyi u. 10.', 'NEW', '2025-09-27 23:46:16');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `category` varchar(80) NOT NULL,
  `dimension` varchar(20) NOT NULL,
  `type_code` varchar(20) NOT NULL,
  `price` int(10) UNSIGNED NOT NULL,
  `note` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `products`
--

INSERT INTO `products` (`id`, `category`, `dimension`, `type_code`, `price`, `note`) VALUES
(1, 'Egyszárnyas ablakok', '40x40', 'NY', 22500, 'Tavaszi akció: ajándék szúnyogháló'),
(2, 'Egyszárnyas ablakok', '50x60', 'NY', 28000, 'Tavaszi akció: ajándék szúnyogháló'),
(3, 'Egyszárnyas ablakok', '60x80', 'BNY', 33500, 'Tavaszi akció: ajándék szúnyogháló'),
(4, 'Egyszárnyas ablakok', '60x100', 'BNY', 40500, 'Tavaszi akció: ajándék szúnyogháló'),
(5, 'Egyszárnyas ablakok', '60x150', 'BNY', 51500, 'Tavaszi akció: ajándék szúnyogháló'),
(6, 'Kétszárnyas KF ablakok', '90x60', 'BNY', 36500, 'Tavaszi akció: ajándék szúnyogháló'),
(7, 'Kétszárnyas KF ablakok', '120x100', 'BNY', 59000, 'Tavaszi akció: ajándék szúnyogháló'),
(8, 'Kétszárnyas KF ablakok', '120x150', 'BNY', 77000, 'Tavaszi akció: ajándék szúnyogháló'),
(9, 'Kétszárnyas KF ablakok', '150x150', 'BNY', 90000, 'Tavaszi akció: ajándék szúnyogháló'),
(10, 'Kétszárnyas tokoszt ablakok', '150x150', 'BNY-BNY', 113500, 'Tavaszi akció: ajándék szúnyogháló'),
(11, 'Kétszárnyas tokoszt ablakok', '180x140', 'BNY-BNY', 119000, 'Tavaszi akció: ajándék szúnyogháló'),
(12, 'Kétszárnyas tokoszt ablakok', '200x150', 'BNY-BNY', 135000, 'Tavaszi akció: ajándék szúnyogháló');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `full_name` varchar(120) NOT NULL,
  `email` varchar(120) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `role` enum('customer','worker','admin') NOT NULL DEFAULT 'customer',
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `username`, `password_hash`, `full_name`, `email`, `phone`, `role`, `created_at`) VALUES
(1, 'admin', '$2y$10$REPLACE_ME_WITH_BCRYPT_HASH___________', 'Rendszer Admin', 'admin@example.com', '+36 30 000 0000', 'admin', '2025-09-27 23:39:12'),
(8, 'jancsi', '$2y$10$HASHCUSTOM', 'Kiss János', 'jancsi@teszt.hu', '+36 20 123 4567', 'customer', '2025-09-27 23:41:18'),
(9, 'pista', '$2y$10$HASHWORKER', 'Nagy István', 'pista@ceg.hu', '+36 70 765 4321', 'worker', '2025-09-27 23:41:18');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ix_orders_user` (`user_id`),
  ADD KEY `ix_orders_product` (`product_id`),
  ADD KEY `ix_orders_status` (`status`),
  ADD KEY `ix_orders_date` (`order_date`);

--
-- A tábla indexei `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ix_products_cat` (`category`),
  ADD KEY `ix_products_dim` (`dimension`),
  ADD KEY `ix_products_type` (`type_code`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_users_username` (`username`),
  ADD UNIQUE KEY `uq_users_email` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
