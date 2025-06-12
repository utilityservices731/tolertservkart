-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 12, 2025 at 08:43 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `toletservkart`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `name`, `email`, `password`) VALUES
(1, 'Ranjana Chaurasiya', 'ranjanabarai10000@bbdu.ac.in', 'Ranjana@123');

-- --------------------------------------------------------

--
-- Table structure for table `listings`
--

CREATE TABLE `listings` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` varchar(50) NOT NULL,
  `location` varchar(100) DEFAULT 'Lucknow',
  `image` varchar(100) DEFAULT NULL,
  `category` varchar(50) NOT NULL,
  `verified` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `listings`
--

INSERT INTO `listings` (`id`, `title`, `price`, `location`, `image`, `category`, `verified`) VALUES
(1, '1BHK Flat', '₹8000/month', 'Lucknow', 'flat', 'property', 1),
(2, '2BHK Apartment', '₹12000/month', 'Lucknow', 'apartment', 'property', 1),
(3, 'PG for Girls', '₹5000/month', 'Lucknow', 'pg', 'property', 1),
(4, 'PG for Boys', '₹4500/month', 'Lucknow', 'hostel', 'property', 1),
(5, 'Commercial Shop', '₹15000/month', 'Lucknow', 'shop', 'property', 1),
(6, 'Office Space', '₹20000/month', 'Lucknow', 'office', 'property', 1),
(7, 'Shared Room', '₹3000/month', 'Lucknow', 'room', 'property', 1),
(8, 'Studio Apartment', '₹7000/month', 'Lucknow', 'studio', 'property', 1),
(9, 'Refrigerator (200L)', '₹7000', 'Lucknow', 'fridge', 'appliances', 1),
(10, 'Washing Machine (LG)', '₹5000', 'Lucknow', 'washingmachine', 'appliances', 1),
(11, 'Microwave Oven', '₹3000', 'Lucknow', 'microwave', 'appliances', 1),
(12, 'AC 1.5 Ton', '₹12000', 'Lucknow', 'airconditioner', 'appliances', 1),
(13, 'Water Purifier', '₹2000', 'Lucknow', 'purifier', 'appliances', 1),
(14, 'Vacuum Cleaner', '₹2500', 'Lucknow', 'vacuum', 'appliances', 1),
(15, 'Smart TV 32 inch', '₹8000', 'Lucknow', 'tv', 'appliances', 1),
(16, 'Geyser', '₹3000', 'Lucknow', 'geyser', 'appliances', 1),
(17, 'Designer Lehenga', '₹2500', 'Lucknow', 'lehenga', 'dresses', 1),
(18, 'Wedding Sherwani', '₹2000', 'Lucknow', 'sherwani', 'dresses', 1),
(19, 'Party Wear Gown', '₹1800', 'Lucknow', 'gown', 'dresses', 1),
(20, 'Blazer on Rent', '₹1200', 'Lucknow', 'blazer', 'dresses', 1),
(21, 'Cocktail Dress', '₹1700', 'Lucknow', 'cocktaildress', 'dresses', 1),
(22, 'Ethnic Kurta Set', '₹1000', 'Lucknow', 'kurta', 'dresses', 1),
(23, 'Designer Saree', '₹1500', 'Lucknow', 'saree', 'dresses', 1),
(24, 'Tuxedo Suit', '₹2200', 'Lucknow', 'tuxedo', 'dresses', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `zip` varchar(20) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `owners`
--

CREATE TABLE `owners` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `owners`
--

INSERT INTO `owners` (`id`, `name`, `email`, `password`) VALUES
(1, 'Ranjana Chaurasiya', 'ranjanabarai10000@bbdu.ac.in', '$2b$10$SrBc3GYSmAjMQ60pE5Cc6unFuJN3/eUeH244Y3zcEOCOO1BzKPXve'),
(2, 'Sanya', 'sanya123@gmail.com', 'sanya@123');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `images` text DEFAULT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'Ranajan Chaurasiya', 'ranjana@gmail.com', 'ranjana@123', 'user', '2025-06-04 08:57:46'),
(2, 'Sanya', 'sanya123@gmail.com', 'sanya@123', 'user', '2025-06-09 12:30:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `listings`
--
ALTER TABLE `listings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `owners`
--
ALTER TABLE `owners`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `listings`
--
ALTER TABLE `listings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `owners`
--
ALTER TABLE `owners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
