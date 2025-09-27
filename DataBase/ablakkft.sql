-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Sze 27. 23:11
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
-- Tábla szerkezet ehhez a táblához `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category` varchar(100) NOT NULL,
  `dimension` varchar(20) NOT NULL,
  `type_code` varchar(20) NOT NULL,
  `price` int(11) NOT NULL,
  `note` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `products`
--

INSERT INTO `products` (`id`, `category`, `dimension`, `type_code`, `price`, `note`) VALUES
(1, 'Egyszárnyas ablakok', '40x40', 'NY', 22500, 'Tavaszi akció: ajándék szúnyogháló'),
(2, 'Egyszárnyas ablakok', '40x60', 'NY', 24000, 'Tavaszi akció: ajándék szúnyogháló'),
(3, 'Egyszárnyas ablakok', '50x50', 'NY', 24000, 'Tavaszi akció: ajándék szúnyogháló'),
(4, 'Egyszárnyas ablakok', '50x60', 'NY', 28000, 'Tavaszi akció: ajándék szúnyogháló'),
(5, 'Egyszárnyas ablakok', '50x70', 'BNY', 29500, 'Tavaszi akció: ajándék szúnyogháló'),
(6, 'Egyszárnyas ablakok', '55x55', 'BNY', 28000, 'Tavaszi akció: ajándék szúnyogháló'),
(7, 'Egyszárnyas ablakok', '60x40', 'BNY', 24000, 'Tavaszi akció: ajándék szúnyogháló'),
(8, 'Egyszárnyas ablakok', '60x50', 'BNY', 28000, 'Tavaszi akció: ajándék szúnyogháló'),
(9, 'Egyszárnyas ablakok', '60x60', 'BNY', 29500, 'Tavaszi akció: ajándék szúnyogháló'),
(10, 'Egyszárnyas ablakok', '60x80', 'BNY', 33500, 'Tavaszi akció: ajándék szúnyogháló'),
(11, 'Egyszárnyas ablakok', '60x90', 'BNY', 36500, 'Tavaszi akció: ajándék szúnyogháló'),
(12, 'Egyszárnyas ablakok', '60x100', 'BNY', 40500, 'Tavaszi akció: ajándék szúnyogháló'),
(13, 'Egyszárnyas ablakok', '60x120', 'BNY', 45000, 'Tavaszi akció: ajándék szúnyogháló'),
(14, 'Egyszárnyas ablakok', '60x150', 'BNY', 51500, 'Tavaszi akció: ajándék szúnyogháló'),
(15, 'Egyszárnyas ablakok', '70x50', 'BNY', 29500, 'Tavaszi akció: ajándék szúnyogháló'),
(16, 'Egyszárnyas ablakok', '70x70', 'BNY', 35000, 'Tavaszi akció: ajándék szúnyogháló'),
(17, 'Egyszárnyas ablakok', '80x60', 'BNY', 33500, 'Tavaszi akció: ajándék szúnyogháló'),
(18, 'Egyszárnyas ablakok', '80x80', 'BNY', 42000, 'Tavaszi akció: ajándék szúnyogháló'),
(19, 'Egyszárnyas ablakok', '80x100', 'BNY', 46000, 'Tavaszi akció: ajándék szúnyogháló'),
(20, 'Egyszárnyas ablakok', '80x120', 'BNY', 52000, 'Tavaszi akció: ajándék szúnyogháló'),
(21, 'Kétszárnyas KF ablakok', '90x60', 'BNY', 36500, 'Tavaszi akció: ajándék szúnyogháló'),
(22, 'Kétszárnyas KF ablakok', '90x90', 'BNY', 45000, 'Tavaszi akció: ajándék szúnyogháló'),
(23, 'Kétszárnyas KF ablakok', '90x120', 'BNY', 54500, 'Tavaszi akció: ajándék szúnyogháló'),
(24, 'Kétszárnyas KF ablakok', '90x150', 'BNY', 63000, 'Tavaszi akció: ajándék szúnyogháló'),
(25, 'Kétszárnyas KF ablakok', '100x60', 'BNY', 40500, 'Tavaszi akció: ajándék szúnyogháló'),
(26, 'Kétszárnyas KF ablakok', '100x80', 'BNY', 46000, 'Tavaszi akció: ajándék szúnyogháló'),
(27, 'Kétszárnyas KF ablakok', '100x100', 'BNY', 53000, 'Tavaszi akció: ajándék szúnyogháló'),
(28, 'Kétszárnyas KF ablakok', '100x120', 'BNY', 59000, 'Tavaszi akció: ajándék szúnyogháló'),
(29, 'Kétszárnyas KF ablakok', '100x130', 'BNY', 63000, 'Tavaszi akció: ajándék szúnyogháló'),
(30, 'Kétszárnyas KF ablakok', '100x140', 'BNY', 66000, 'Tavaszi akció: ajándék szúnyogháló'),
(31, 'Kétszárnyas KF ablakok', '110x110', 'BNY', 59000, 'Tavaszi akció: ajándék szúnyogháló'),
(32, 'Kétszárnyas KF ablakok', '110x140', 'BNY', 70000, 'Tavaszi akció: ajándék szúnyogháló'),
(33, 'Kétszárnyas KF ablakok', '120x60', 'BNY', 45000, 'Tavaszi akció: ajándék szúnyogháló'),
(34, 'Kétszárnyas KF ablakok', '120x80', 'BNY', 52000, 'Tavaszi akció: ajándék szúnyogháló'),
(35, 'Kétszárnyas KF ablakok', '120x90', 'BNY', 54500, 'Tavaszi akció: ajándék szúnyogháló'),
(36, 'Kétszárnyas KF ablakok', '120x100', 'BNY', 59000, 'Tavaszi akció: ajándék szúnyogháló'),
(37, 'Kétszárnyas KF ablakok', '120x120', 'BNY', 66000, 'Tavaszi akció: ajándék szúnyogháló'),
(38, 'Kétszárnyas KF ablakok', '120x140', 'BNY', 73000, 'Tavaszi akció: ajándék szúnyogháló'),
(39, 'Kétszárnyas KF ablakok', '120x150', 'BNY', 77000, 'Tavaszi akció: ajándék szúnyogháló'),
(40, 'Kétszárnyas KF ablakok', '150x150', 'BNY', 90000, 'Tavaszi akció: ajándék szúnyogháló'),
(41, 'Kétszárnyas tokoszt ablakok', '150x150', 'BNY-BNY', 113500, 'Tavaszi akció: ajándék szúnyogháló'),
(42, 'Kétszárnyas tokoszt ablakok', '160x120', 'BNY-BNY', 105000, 'Tavaszi akció: ajándék szúnyogháló'),
(43, 'Kétszárnyas tokoszt ablakok', '160x130', 'BNY-BNY', 108000, 'Tavaszi akció: ajándék szúnyogháló'),
(44, 'Kétszárnyas tokoszt ablakok', '160x140', 'BNY-BNY', 113500, 'Tavaszi akció: ajándék szúnyogháló'),
(45, 'Kétszárnyas tokoszt ablakok', '170x130', 'BNY-BNY', 112000, 'Tavaszi akció: ajándék szúnyogháló'),
(46, 'Kétszárnyas tokoszt ablakok', '170x140', 'BNY-BNY', 116500, 'Tavaszi akció: ajándék szúnyogháló'),
(47, 'Kétszárnyas tokoszt ablakok', '180x120', 'BNY-BNY', 110500, 'Tavaszi akció: ajándék szúnyogháló'),
(48, 'Kétszárnyas tokoszt ablakok', '180x140', 'BNY-BNY', 119000, 'Tavaszi akció: ajándék szúnyogháló'),
(49, 'Kétszárnyas tokoszt ablakok', '180x150', 'BNY-BNY', 126000, 'Tavaszi akció: ajándék szúnyogháló'),
(50, 'Kétszárnyas tokoszt ablakok', '185x140', 'BNY-BNY', 122000, 'Tavaszi akció: ajándék szúnyogháló'),
(51, 'Kétszárnyas tokoszt ablakok', '200x120', 'BNY-BNY', 125000, 'Tavaszi akció: ajándék szúnyogháló'),
(52, 'Kétszárnyas tokoszt ablakok', '200x140', 'BNY-BNY', 130000, 'Tavaszi akció: ajándék szúnyogháló'),
(53, 'Kétszárnyas tokoszt ablakok', '200x150', 'BNY-BNY', 135000, 'Tavaszi akció: ajándék szúnyogháló');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
