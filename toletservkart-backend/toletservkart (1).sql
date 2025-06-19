-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2025 at 01:53 PM
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
  `verified` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `listings`
--

INSERT INTO `listings` (`id`, `title`, `description`, `price`, `location`, `category`, `subcategory`, `image`, `verified`) VALUES
(1, 'Red Bridal Lehenga', 'Beautiful red lehenga with embroidery', 1200, 'Delhi', 'clothing', 'bridal lehenga', 'https://images.unsplash.com/photo-1613545325784-b40ba4d2982e', 1),
(2, 'Black Party Gown', 'Elegant black gown for evening parties', 950, 'Mumbai', 'clothing', 'party gown', 'https://images.unsplash.com/photo-1618354691211-624d6b7231f4', 1),
(3, 'Traditional Sherwani', 'Royal sherwani for weddings and functions', 1100, 'Lucknow', 'clothing', 'sherwani', 'https://images.unsplash.com/photo-1578357078586-491adf1aa4fa', 1),
(4, 'Saree with Zari Border', 'Designer saree with heavy border', 750, 'Kolkata', 'clothing', 'saree', 'https://images.unsplash.com/photo-1602810317312-090b0ef4b7b3', 1),
(5, 'Blue Anarkali Suit', 'Stylish and comfy Anarkali for parties', 850, 'Hyderabad', 'clothing', 'anarkali suit', 'https://images.unsplash.com/photo-1589820296154-c0d36e3d29cf', 1),
(6, '2BHK Flat in Noida', 'Spacious flat in sector 62', 18000, 'Noida', 'property', '2BHK Flat', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', 1),
(7, '3BHK Villa in Pune', 'Luxurious villa in Koregaon Park', 42000, 'Pune', 'property', '3BHK Villa', 'https://images.unsplash.com/photo-1570129477492-45c003edd2be', 1),
(8, 'Studio Apartment in Bangalore', 'Ideal for bachelors or couples', 10000, 'Bangalore', 'property', 'Studio Apartment', 'https://images.unsplash.com/photo-1600585153934-a3f09f3c938b', 1),
(9, '1RK Room in Jaipur', 'Budget-friendly room in city center', 6500, 'Jaipur', 'property', '1RK Room', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914', 1),
(10, 'PG for Girls in Chennai', 'Safe and secure PG accommodation', 8500, 'Chennai', 'property', 'PG for Girls', 'https://images.unsplash.com/photo-1554995207-c18c203602cb', 1),
(11, 'Samsung 40-inch Smart TV', 'Full HD LED TV with smart features', 1800, 'Delhi', 'appliance', 'TV', 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7', 1),
(12, 'LG Refrigerator 260L', 'Double door fridge with inverter compressor', 2200, 'Mumbai', 'appliance', 'refrigerator', 'https://images.unsplash.com/photo-1581578017425-6b0633ab4664', 1),
(13, 'Whirlpool Washing Machine', 'Top load 6.5kg washing machine', 1500, 'Lucknow', 'appliance', 'washing machine', 'https://images.unsplash.com/photo-1616627782864-0c91c1b0bbf1', 1),
(14, 'Daikin 1.5 Ton AC', 'Split AC with inverter technology', 2500, 'Chandigarh', 'appliance', 'air conditioner', 'https://images.unsplash.com/photo-1582395765110-77d42974899b', 1),
(15, 'Microwave Oven Samsung', 'Solo microwave for quick heating', 800, 'Hyderabad', 'appliance', 'microwave', 'https://images.unsplash.com/photo-1627936332427-77dca21576b2', 1),
(16, 'Green Lehenga Choli', 'Stylish green lehenga with dupatta', 1050, 'Ahmedabad', 'clothing', 'lehenga choli', 'https://images.unsplash.com/photo-1640791938191-dc8c40facc5c', 1),
(17, 'Silk Saree', 'Pure silk saree from south India', 900, 'Chennai', 'clothing', 'silk saree', 'https://images.unsplash.com/photo-1603398938378-e57b14f6f2c7', 1),
(18, 'Men’s Wedding Kurta', 'Heavy embroidered kurta for wedding', 950, 'Patna', 'clothing', 'wedding kurta', 'https://images.unsplash.com/photo-1618354691362-94cdeddb406d', 1),
(19, 'Kids Party Dress', 'Colorful party dress for kids', 450, 'Bhopal', 'clothing', 'kids dress', 'https://images.unsplash.com/photo-1607734647233-769d2610a6c8', 1),
(20, 'Men’s Indo-Western', 'Trendy indo-western for groom', 1200, 'Indore', 'clothing', 'indo-western', 'https://images.unsplash.com/photo-1581577898346-4358b86cfb6e', 1),
(21, 'Philips Air Fryer', 'Healthy oil-free cooking', 850, 'Surat', 'appliance', 'air fryer', 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f', 1),
(22, 'Sony Bluetooth Speaker', 'Portable speaker with deep bass', 600, 'Delhi', 'appliance', 'speaker', 'https://images.unsplash.com/photo-1602526218850-300f3c3e8a53', 1),
(23, 'IFB Microwave Oven', 'Convection microwave with grill', 1200, 'Nagpur', 'appliance', 'microwave', 'https://images.unsplash.com/photo-1598525260343-4e5d8530a13b', 1),
(24, 'Bajaj Room Heater', 'Perfect for winters', 500, 'Shimla', 'appliance', 'heater', 'https://images.unsplash.com/photo-1616627782994-064c3f8d7d88', 1),
(25, 'Electric Kettle', '1.8L stainless steel electric kettle', 400, 'Amritsar', 'appliance', 'kettle', 'https://images.unsplash.com/photo-1603190288316-df06aa1baf17', 1);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `sender_name` varchar(100) DEFAULT NULL,
  `sender_email` varchar(100) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `sent_at` timestamp NOT NULL DEFAULT current_timestamp()
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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `name`, `email`, `address`, `city`, `zip`, `payment_method`, `cart_items`, `created_at`) VALUES
(1, 1, 'Ranjana', 'ranjana@example.com', '123 Street', 'Bhopal', '462001', 'card', '[{\"id\":1,\"title\":\"Red Dress\",\"price\":\"1500\"}]', '2025-06-18 12:11:52'),
(2, 3, 'Priya Pandey', 'priya@gmail.com', 'Lucknow', 'Lucknow', '226010', 'upi', '[{\"id\":\"undefined\",\"title\":\"IFB Microwave Oven\",\"image\":\"https://images.unsplash.com/photo-1598525260343-4e5d8530a13b\",\"price\":1200,\"months\":1,\"total\":1200}]', '2025-06-19 06:57:16'),
(3, 3, 'Priya Pandey', 'priya@gmail.com', 'Lucknow', 'Lucknow', '226010', 'cod', '[{\"id\":\"undefined\",\"title\":\"3BHK Villa in Pune\",\"image\":\"https://images.unsplash.com/photo-1570129477492-45c003edd2be\",\"price\":42000,\"months\":1,\"total\":42000}]', '2025-06-19 06:58:11'),
(4, 3, 'Priya Pandey', 'priya@gmail.com', 'Lucknow', 'Lucknow', '226010', 'cod', '[{\"id\":\"undefined\",\"title\":\"Men’s Wedding Kurta\",\"image\":\"https://images.unsplash.com/photo-1618354691362-94cdeddb406d\",\"price\":950,\"months\":1,\"total\":950}]', '2025-06-19 07:06:30'),
(5, 3, 'Priya Pandey', 'priya@gmail.com', 'Lucknow', 'Lucknow', '226010', 'upi', '[{\"id\":\"undefined\",\"title\":\"Bajaj Room Heater\",\"image\":\"https://images.unsplash.com/photo-1616627782994-064c3f8d7d88\",\"price\":500,\"months\":1,\"total\":500}]', '2025-06-19 07:08:48'),
(6, 3, 'Priya Pandey', 'priya@gmail.com', 'Lucknow', 'Lucknow', '226010', 'upi', '[{\"id\":\"undefined\",\"title\":\"Bajaj Room Heater\",\"image\":\"https://images.unsplash.com/photo-1616627782994-064c3f8d7d88\",\"price\":500,\"months\":1,\"total\":500}]', '2025-06-19 07:14:25'),
(7, 3, 'Priya Pandey', 'priya@gmail.com', 'Lucknow', 'Lucknow', '226010', 'upi', '[{\"id\":\"undefined\",\"title\":\"Electric Kettle\",\"image\":\"https://images.unsplash.com/photo-1603190288316-df06aa1baf17\",\"price\":400,\"months\":1,\"total\":400}]', '2025-06-19 07:18:17'),
(8, 3, 'Priya Pandey', 'priya@gmail.com', 'Lucknow', 'Lucknow', '226010', 'upi', '[{\"id\":\"undefined\",\"title\":\"IFB Microwave Oven\",\"image\":\"https://images.unsplash.com/photo-1598525260343-4e5d8530a13b\",\"price\":1200,\"months\":1,\"total\":1200}]', '2025-06-19 07:19:30');

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
(3, 'Studio Apartment in Pune', 'Compact studio for working professionals.', 2200000.00, 8000.00, 'property', 'https://images.unsplash.com/photo-1554995207-c18c203602cb', 'Very Good', 'Pune', 1, 1, 3, '2025-06-18 05:42:15', 1),
(4, '3BHK in Noida', 'Fully furnished apartment in sector 62.', 7200000.00, 18000.00, 'property', 'https://images.unsplash.com/photo-1598928506311-c55ded7b9fb6', 'Excellent', 'Noida', 1, 1, 1, '2025-06-18 05:42:15', 1),
(5, 'Flat for Girls in Jaipur', 'Safe and secure 1RK with CCTV.', 1800000.00, 7000.00, 'property', 'https://images.unsplash.com/photo-1597091208238-e27d93bc0b42', 'Good', 'Jaipur', 1, 1, 2, '2025-06-18 05:42:15', 1),
(6, 'PG Room in Bangalore', 'Boys PG room with WiFi & food.', 1000000.00, 6000.00, 'property', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71', 'Average', 'Bangalore', 1, 1, 3, '2025-06-18 05:42:15', 1),
(7, 'Luxury Villa in Goa', 'Sea-facing 3BHK with pool.', 9000000.00, 25000.00, 'property', 'https://images.unsplash.com/photo-1505691938895-1758d7feb511', 'Excellent', 'Goa', 1, 1, 4, '2025-06-18 05:42:15', 1),
(8, '1RK in Patna', 'Budget-friendly room for students.', 900000.00, 4000.00, 'property', 'https://images.unsplash.com/photo-1588854337112-3e5dc4e9dcd4', 'Good', 'Patna', 1, 1, 5, '2025-06-18 05:42:15', 1),
(9, 'Red Bridal Lehenga', 'Heavy embroidered bridal lehenga.', 9500.00, 1500.00, 'dress', 'https://images.unsplash.com/photo-1613545325784-b40ba4d9c83b', 'Like New', 'Lucknow', 1, 1, 1, '2025-06-18 05:42:27', 1),
(10, 'Designer Saree', 'Elegant pink saree with zari border.', 6500.00, 1200.00, 'dress', 'https://images.unsplash.com/photo-1618354691261-cd09d6c1be5b', 'Good', 'Kolkata', 1, 1, 2, '2025-06-18 05:42:27', 1),
(11, 'Sherwani Set', 'Cream sherwani with dupatta.', 8000.00, 1300.00, 'dress', 'https://images.unsplash.com/photo-1618832145378-bd107aece2c5', 'Very Good', 'Delhi', 1, 1, 3, '2025-06-18 05:42:27', 1),
(12, 'Reception Gown', 'Stylish navy blue gown.', 7000.00, 1000.00, 'dress', 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246', 'Excellent', 'Mumbai', 1, 1, 4, '2025-06-18 05:42:27', 1),
(13, 'Party Wear Dress', 'Black dress with shimmer.', 4000.00, 700.00, 'dress', 'https://images.unsplash.com/photo-1583794502172-cadfe7f82f5e', 'Good', 'Indore', 1, 1, 5, '2025-06-18 05:42:27', 1),
(14, 'Engagement Saree', 'Royal blue silk saree.', 5500.00, 1100.00, 'dress', 'https://images.unsplash.com/photo-1612152163335-3f695f84aee5', 'Excellent', 'Hyderabad', 1, 1, 1, '2025-06-18 05:42:27', 1),
(15, 'Kids Frock', 'Colorful frock for 6–8 yrs.', 1200.00, 300.00, 'dress', 'https://images.unsplash.com/photo-1581574732068-cc9b15e1e03e', 'Good', 'Chennai', 1, 1, 2, '2025-06-18 05:42:27', 1),
(16, 'Designer Blouse', 'Fancy embroidered blouse.', 1800.00, 250.00, 'dress', 'https://images.unsplash.com/photo-1591348272434-0f918cc0bcb2', 'Very Good', 'Nagpur', 1, 1, 3, '2025-06-18 05:42:27', 1),
(17, 'LG Washing Machine', '6kg front load washing machine.', 18000.00, 1200.00, 'appliance', 'https://images.unsplash.com/photo-1581579185169-03f079416160', 'Very Good', 'Hyderabad', 1, 1, 4, '2025-06-18 05:42:43', 1),
(18, 'Samsung Refrigerator', '250L double door fridge.', 22000.00, 1400.00, 'appliance', 'https://images.unsplash.com/photo-1601290187423-c94b5c1e4e4a', 'Good', 'Bangalore', 1, 1, 5, '2025-06-18 05:42:43', 1),
(19, 'Microwave Oven', '20L Solo microwave oven.', 8000.00, 500.00, 'appliance', 'https://images.unsplash.com/photo-1579632478553-4e4c58ed52b2', 'Good', 'Delhi', 1, 1, 6, '2025-06-18 05:42:43', 1),
(20, 'Water Purifier', 'RO+UV water purifier.', 10000.00, 700.00, 'appliance', 'https://images.unsplash.com/photo-1570197782432-56f9d4b4e8c8', 'Excellent', 'Chandigarh', 1, 1, 1, '2025-06-18 05:42:43', 1),
(21, 'Gas Stove', '2 burner gas stove.', 2500.00, 250.00, 'appliance', 'https://images.unsplash.com/photo-1609165283069-9f24b7c1a246', 'Very Good', 'Varanasi', 1, 1, 2, '2025-06-18 05:42:43', 1),
(22, 'Mixer Grinder', '3-jar powerful mixer.', 4000.00, 350.00, 'appliance', 'https://images.unsplash.com/photo-1615484477650-509c2c1c87cf', 'Good', 'Indore', 1, 1, 3, '2025-06-18 05:42:43', 1),
(23, 'Cooler', 'Symphony desert cooler 55L.', 9000.00, 600.00, 'appliance', 'https://images.unsplash.com/photo-1583394838336-acd977736f90', 'Average', 'Kanpur', 1, 1, 4, '2025-06-18 05:42:43', 1),
(24, 'Iron', 'Philips dry iron.', 1500.00, 150.00, 'appliance', 'https://images.unsplash.com/photo-1598521473453-f04e10f29c0c', 'Very Good', 'Raipur', 1, 1, 5, '2025-06-18 05:42:43', 1);

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
(9, 3, '24', 'Bajaj Room Heater', 'https://images.unsplash.com/photo-1616627782994-064c3f8d7d88', '500', 'Shimla', '2025-06-19 09:20:42', 'listings'),
(10, 3, '3', 'Studio Apartment in Pune', 'https://images.unsplash.com/photo-1554995207-c18c203602cb', '2200000', 'Pune', '2025-06-19 09:20:57', 'products');

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
  ADD PRIMARY KEY (`message_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `owners`
--
ALTER TABLE `owners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `owner_requests`
--
ALTER TABLE `owner_requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `wishlist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
