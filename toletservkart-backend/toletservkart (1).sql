-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 23, 2025 at 10:14 AM
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
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `category` enum('clothing','property','appliance') NOT NULL,
  `subcategory` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `listings`
--

INSERT INTO `listings` (`id`, `title`, `description`, `price`, `location`, `category`, `subcategory`, `image`, `verified`, `created_at`) VALUES
(1, 'Wedding Lehenga', 'Beautiful red lehenga for rent, worn once.', 2500, 'Delhi', 'clothing', 'bridal wear', 'uploads/wedding-lehenga.jpg', 1, '2025-06-23 05:46:26'),
(2, '3BHK Flat for Rent', 'Spacious 3BHK near metro station.', 18000, 'Mumbai', 'property', 'residential', 'uploads/3bhk-flat.jpg', 1, '2025-06-23 05:46:26'),
(3, 'Microwave Oven', 'Good working condition, 1-year-old.', 2200, 'Bangalore', 'appliance', 'kitchen', 'uploads/microwave.jpg', 1, '2025-06-23 05:46:26'),
(4, 'Designer Saree', 'Light pink designer saree with embroidery.', 1800, 'Kolkata', 'clothing', 'party wear', 'uploads/designer-saree.jpg', 1, '2025-06-23 05:46:26'),
(5, 'Fridge for Sale', 'Double-door fridge, 4-star rating.', 6000, 'Pune', 'appliance', 'electronics', 'uploads/fridge.jpg', 1, '2025-06-23 05:46:26'),
(6, 'Men\'s Tuxedo Set', 'Classic black tuxedo available for parties and weddings.', 1500, 'Jaipur', 'clothing', 'men formal', 'uploads/tuxedo.jpg', 1, '2025-06-23 05:48:40'),
(7, '1RK Studio Apartment', 'Furnished 1RK perfect for working professionals.', 9000, 'Hyderabad', 'property', 'studio apartment', 'uploads/1rk.jpg', 1, '2025-06-23 05:48:40'),
(8, 'Washing Machine', 'Fully automatic, 6kg capacity, excellent condition.', 4500, 'Chennai', 'appliance', 'laundry', 'uploads/washing-machine.jpg', 1, '2025-06-23 05:48:40'),
(9, 'Party Gown', 'Elegant gown for evening parties, worn once.', 2000, 'Ahmedabad', 'clothing', 'party wear', 'uploads/party-gown.jpg', 1, '2025-06-23 05:48:40'),
(10, 'Bookshelf', 'Wooden 5-tier bookshelf, almost new.', 1200, 'Lucknow', 'appliance', 'furniture', 'uploads/bookshelf.jpg', 1, '2025-06-23 05:48:40'),
(11, '2BHK Apartment', '2BHK flat with parking and lift facility.', 14000, 'Indore', 'property', 'residential', 'uploads/2bhk-flat.jpg', 1, '2025-06-23 05:48:40'),
(12, 'Bridal Jewelry Set', 'Complete bridal set (necklace, earrings, maang tikka).', 2800, 'Patna', 'clothing', 'jewelry', 'uploads/jewelry-set.jpg', 1, '2025-06-23 05:48:40'),
(13, 'Ceiling Fan', 'Energy-saving fan, working smoothly.', 800, 'Ranchi', 'appliance', 'home', 'uploads/fan.jpg', 1, '2025-06-23 05:48:40'),
(14, 'Girls Lehenga Choli', 'Yellow lehenga with mirror work, 8-10 yr age.', 1000, 'Bhopal', 'clothing', 'kids wear', 'uploads/kids-lehenga.jpg', 1, '2025-06-23 05:48:40'),
(15, 'Office Chair', 'Ergonomic mesh chair with wheels.', 1500, 'Nagpur', 'appliance', 'furniture', 'uploads/office-chair.jpg', 1, '2025-06-23 05:48:40');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender` enum('user','admin') NOT NULL,
  `text` text NOT NULL,
  `timestamp` datetime DEFAULT current_timestamp(),
  `user_id` int(11) NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `delivered` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `zip` varchar(20) DEFAULT NULL,
  `payment_method` varchar(20) DEFAULT NULL,
  `cart_items` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`cart_items`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(50) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `name`, `email`, `address`, `city`, `zip`, `payment_method`, `cart_items`, `created_at`, `status`) VALUES
(1, 1, 'Ranjana', 'ranjana@example.com', '123 Street', 'Bhopal', '462001', 'card', '[{\"id\":1,\"title\":\"Red Dress\",\"price\":\"1500\"}]', '2025-06-18 12:11:52', 'pending'),
(2, 3, 'Priya Pandey', 'priya@gmail.com', 'Lucknow', 'Lucknow', '226010', 'upi', '[{\"id\":\"undefined\",\"title\":\"IFB Microwave Oven\",\"image\":\"https://images.unsplash.com/photo-1598525260343-4e5d8530a13b\",\"price\":1200,\"months\":1,\"total\":1200}]', '2025-06-19 06:57:16', 'pending'),
(3, 3, 'Priya Pandey', 'priya@gmail.com', 'Lucknow', 'Lucknow', '226010', 'cod', '[{\"id\":\"undefined\",\"title\":\"3BHK Villa in Pune\",\"image\":\"https://images.unsplash.com/photo-1570129477492-45c003edd2be\",\"price\":42000,\"months\":1,\"total\":42000}]', '2025-06-19 06:58:11', 'pending'),
(4, 3, 'Priya Pandey', 'priya@gmail.com', 'Lucknow', 'Lucknow', '226010', 'cod', '[{\"id\":\"undefined\",\"title\":\"Men’s Wedding Kurta\",\"image\":\"https://images.unsplash.com/photo-1618354691362-94cdeddb406d\",\"price\":950,\"months\":1,\"total\":950}]', '2025-06-19 07:06:30', 'pending'),
(5, 3, 'Priya Pandey', 'priya@gmail.com', 'Lucknow', 'Lucknow', '226010', 'upi', '[{\"id\":\"undefined\",\"title\":\"Bajaj Room Heater\",\"image\":\"https://images.unsplash.com/photo-1616627782994-064c3f8d7d88\",\"price\":500,\"months\":1,\"total\":500}]', '2025-06-19 07:08:48', 'pending'),
(6, 3, 'Priya Pandey', 'priya@gmail.com', 'Lucknow', 'Lucknow', '226010', 'upi', '[{\"id\":\"undefined\",\"title\":\"Bajaj Room Heater\",\"image\":\"https://images.unsplash.com/photo-1616627782994-064c3f8d7d88\",\"price\":500,\"months\":1,\"total\":500}]', '2025-06-19 07:14:25', 'pending'),
(7, 3, 'Priya Pandey', 'priya@gmail.com', 'Lucknow', 'Lucknow', '226010', 'upi', '[{\"id\":\"undefined\",\"title\":\"Electric Kettle\",\"image\":\"https://images.unsplash.com/photo-1603190288316-df06aa1baf17\",\"price\":400,\"months\":1,\"total\":400}]', '2025-06-19 07:18:17', 'pending'),
(8, 3, 'Priya Pandey', 'priya@gmail.com', 'Lucknow', 'Lucknow', '226010', 'upi', '[{\"id\":\"undefined\",\"title\":\"IFB Microwave Oven\",\"image\":\"https://images.unsplash.com/photo-1598525260343-4e5d8530a13b\",\"price\":1200,\"months\":1,\"total\":1200}]', '2025-06-19 07:19:30', 'pending'),
(9, 2, 'Sanya', 'sanya123@gmail.com', 'Lucknow', 'Lucknow', '226010', 'upi', '[{\"id\":\"undefined\",\"title\":\"Bajaj Room Heater\",\"image\":\"https://images.unsplash.com/photo-1616627782994-064c3f8d7d88\",\"price\":500,\"months\":1,\"total\":500}]', '2025-06-20 06:51:55', 'pending'),
(10, 2, 'Sanya', 'sanya123@gmail.com', 'Lucknow', 'Lucknow', '226010', 'upi', '[{\"title\":\"Sherwani Set\",\"price\":8000,\"image\":\"https://images.unsplash.com/photo-1618832145378-bd107aece2c5\",\"location\":\"Delhi\"}]', '2025-06-20 10:46:08', 'pending'),
(11, 2, 'Sanya', 'sanya123@gmail.com', 'Lucknow', 'Lucknow', '226010', 'upi', '[{\"title\":\"Designer Blouse\",\"price\":1800,\"image\":\"https://images.unsplash.com/photo-1591348272434-0f918cc0bcb2\",\"location\":\"Nagpur\"}]', '2025-06-20 10:51:45', 'pending'),
(12, 2, 'Sanya', 'sanya123@gmail.com', 'Lucknow', 'Lucknow', '226010', 'upi', '[{\"product_id\":\"11\",\"title\":\"Sherwani Set\",\"price\":8000,\"image\":\"https://images.unsplash.com/photo-1618832145378-bd107aece2c5\",\"location\":\"Delhi\",\"source\":\"products\"}]', '2025-06-20 11:02:27', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `owners`
--

CREATE TABLE `owners` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `verified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `owners`
--

INSERT INTO `owners` (`id`, `name`, `email`, `password`, `status`, `created_at`, `verified`) VALUES
(1, 'Ranjana Chaurasiya', 'ranjanabarai10000@bbdu.ac.in', '$2b$10$SrBc3GYSmAjMQ60pE5Cc6unFuJN3/eUeH244Y3zcEOCOO1BzKPXve', 'active', '2025-06-21 07:43:25', 0),
(2, 'Sanya', 'sanya123@gmail.com', 'sanya@123', 'active', '2025-06-21 07:43:25', 0);

-- --------------------------------------------------------

--
-- Table structure for table `owner_requests`
--

CREATE TABLE `owner_requests` (
  `request_id` int(11) NOT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `property_name` varchar(255) DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `requested_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `rent_price` decimal(10,2) DEFAULT NULL,
  `category` enum('property','dress','appliance') NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `condition` varchar(100) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `available` tinyint(1) DEFAULT 1,
  `is_rentable` tinyint(1) DEFAULT 1,
  `owner_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `verified` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `description`, `price`, `rent_price`, `category`, `image`, `condition`, `location`, `available`, `is_rentable`, `owner_id`, `created_at`, `verified`) VALUES
(1, '2BHK Apartment in Delhi', 'Spacious 2BHK apartment in central Delhi.', 5500000.00, 15000.00, 'property', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', 'Good', 'Delhi', 1, 1, 1, '2025-06-18 05:42:15', 1),
(2, '1BHK Flat in Mumbai', 'Affordable 1BHK with metro access.', 3000000.00, 10000.00, 'property', 'https://images.unsplash.com/photo-1570129477492-45c003edd2be', 'Excellent', 'Mumbai', 1, 1, 2, '2025-06-18 05:42:15', 1),
(4, '3BHK in Noida', 'Fully furnished apartment in sector 62.', 7200000.00, 18000.00, 'property', 'https://images.unsplash.com/photo-1598928506311-c55ded7b9fb6', 'Excellent', 'Noida', 1, 1, 1, '2025-06-18 05:42:15', 1),
(5, 'Flat for Girls in Jaipur', 'Safe and secure 1RK with CCTV.', 1800000.00, 7000.00, 'property', 'https://images.unsplash.com/photo-1597091208238-e27d93bc0b42', 'Good', 'Jaipur', 1, 1, 2, '2025-06-18 05:42:15', 1),
(7, 'Luxury Villa in Goa', 'Sea-facing 3BHK with pool.', 9000000.00, 25000.00, 'property', 'https://images.unsplash.com/photo-1505691938895-1758d7feb511', 'Excellent', 'Goa', 1, 1, 4, '2025-06-18 05:42:15', 1),
(8, '1RK in Patna', 'Budget-friendly room for students.', 900000.00, 4000.00, 'property', 'https://images.unsplash.com/photo-1588854337112-3e5dc4e9dcd4', 'Good', 'Patna', 1, 1, 5, '2025-06-18 05:42:15', 1),
(9, 'Red Bridal Lehenga', 'Heavy embroidered bridal lehenga.', 9500.00, 1500.00, 'dress', 'https://images.unsplash.com/photo-1613545325784-b40ba4d9c83b', 'Like New', 'Lucknow', 1, 1, 1, '2025-06-18 05:42:27', 1),
(10, 'Designer Saree', 'Elegant pink saree with zari border.', 6500.00, 1200.00, 'dress', 'https://images.unsplash.com/photo-1618354691261-cd09d6c1be5b', 'Good', 'Kolkata', 1, 1, 2, '2025-06-18 05:42:27', 1),
(11, 'Sherwani Set', 'Cream sherwani with dupatta.', 8000.00, 1300.00, 'dress', 'https://images.unsplash.com/photo-1618832145378-bd107aece2c5', 'Very Good', 'Delhi', 1, 1, 3, '2025-06-18 05:42:27', 1),
(12, 'Reception Gown', 'Stylish navy blue gown.', 7000.00, 1000.00, 'dress', 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246', 'Excellent', 'Mumbai', 1, 1, 4, '2025-06-18 05:42:27', 1),
(13, 'Party Wear Dress', 'Black dress with shimmer.', 4000.00, 700.00, 'dress', 'https://images.unsplash.com/photo-1583794502172-cadfe7f82f5e', 'Good', 'Indore', 1, 1, 5, '2025-06-18 05:42:27', 1),
(14, 'Engagement Saree', 'Royal blue silk saree.', 5500.00, 1100.00, 'dress', 'https://images.unsplash.com/photo-1612152163335-3f695f84aee5', 'Excellent', 'Hyderabad', 1, 1, 1, '2025-06-18 05:42:27', 1),
(15, 'Kids Frock', 'Colorful frock for 6–8 yrs.', 12003.00, 399.00, 'dress', 'https://images.unsplash.com/photo-1581574732068-cc9b15e1e03e', 'Good', 'Chennai', 1, 1, 2, '2025-06-18 05:42:27', 1),
(16, 'Designer Blouse', 'Fancy embroidered blouse.', 1800.00, 250.00, 'dress', 'https://images.unsplash.com/photo-1591348272434-0f918cc0bcb2', 'Very Good', 'Nagpur', 1, 1, 3, '2025-06-18 05:42:27', 1),
(17, 'LG Washing Machine', '6kg front load washing machine.', 18000.00, 1200.00, 'appliance', 'https://images.unsplash.com/photo-1581579185169-03f079416160', 'Very Good', 'Hyderabad', 1, 1, 4, '2025-06-18 05:42:43', 1),
(18, 'Samsung Refrigerator', '250L double door fridge.', 22000.00, 1400.00, 'appliance', 'https://images.unsplash.com/photo-1601290187423-c94b5c1e4e4a', 'Good', 'Bangalore', 1, 1, 5, '2025-06-18 05:42:43', 1),
(19, 'Microwave Oven', '20L Solo microwave oven.', 8000.00, 500.00, 'appliance', 'https://images.unsplash.com/photo-1579632478553-4e4c58ed52b2', 'Good', 'Delhi', 1, 1, 6, '2025-06-18 05:42:43', 1),
(20, 'Water Purifier', 'RO+UV water purifier.', 10000.00, 700.00, 'appliance', 'https://images.unsplash.com/photo-1570197782432-56f9d4b4e8c8', 'Excellent', 'Chandigarh', 1, 1, 1, '2025-06-18 05:42:43', 1),
(21, 'Gas Stove', '2 burner gas stove.', 2500.00, 269.00, 'appliance', 'https://images.unsplash.com/photo-1609165283069-9f24b7c1a246', 'Very Good', 'Varanasi', 1, 1, 2, '2025-06-18 05:42:43', 1),
(22, 'Mixer Grinder', '3-jar powerful mixer.', 4000.00, 350.00, 'appliance', 'https://images.unsplash.com/photo-1615484477650-509c2c1c87cf', 'Good', 'Indore', 1, 1, 3, '2025-06-18 05:42:43', 1),
(23, 'Cooler', 'Symphony desert cooler 55L.', 9000.00, 600.00, 'appliance', 'https://images.unsplash.com/photo-1583394838336-acd977736f90', 'Average', 'Kanpur', 1, 1, 4, '2025-06-18 05:42:43', 1),
(24, 'Iron', 'Philips dry iron.', 1500.00, 150.00, 'appliance', 'https://images.unsplash.com/photo-1598521473453-f04e10f29c0c', 'Very Good', 'Raipur', 1, 1, 5, '2025-06-18 05:42:43', 1),
(27, 'Mobile', 'dfsfsnflk dsnfksnklfnslnf', 555.00, 400.00, 'appliance', 'uploads\\product-1750409107008.jpg', 'new', 'Kanpur', 1, 1, 3, '2025-06-20 08:45:07', 1),
(28, 'aaaaaaaaaa', 'edwbjhjcvb', 555.00, 402.00, 'property', 'uploads\\product-1750663378895.jpg', 'used', 'Lucknow', 1, 1, 2, '2025-06-23 07:22:58', 1);

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
(1, 'Ranjana Chaursiya', 'ranjana@gmail.com', 'ranjana@123', 'user', '2025-06-04 08:57:46'),
(2, 'Sanya', 'sanya123@gmail.com', 'sanya@123', 'user', '2025-06-09 12:30:12'),
(3, 'Priya Pandey', 'priya@gmail.com', 'Priya123', 'user', '2025-06-18 11:54:32');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `wishlist_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` varchar(50) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `price` varchar(50) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `source` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`wishlist_id`, `user_id`, `product_id`, `title`, `image`, `price`, `location`, `created_at`, `source`) VALUES
(10, 3, '3', 'Studio Apartment in Pune', 'https://images.unsplash.com/photo-1554995207-c18c203602cb', '2200000', 'Pune', '2025-06-19 09:20:57', 'products'),
(11, 1, '15', 'Office Chair', 'uploads/office-chair.jpg', '1500', 'Nagpur', '2025-06-23 07:02:08', 'listings'),
(12, 1, '15', 'Office Chair', 'uploads/office-chair.jpg', '1500', 'Nagpur', '2025-06-23 07:18:29', 'listings');

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
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `owners`
--
ALTER TABLE `owners`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `owner_requests`
--
ALTER TABLE `owner_requests`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`wishlist_id`),
  ADD KEY `user_id` (`user_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `owners`
--
ALTER TABLE `owners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `owner_requests`
--
ALTER TABLE `owner_requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `wishlist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `owner_requests`
--
ALTER TABLE `owner_requests`
  ADD CONSTRAINT `owner_requests_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `owners` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
