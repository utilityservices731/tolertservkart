-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 25, 2025 at 02:25 PM
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
-- Table structure for table `admin_settings`
--

CREATE TABLE `admin_settings` (
  `key` varchar(100) NOT NULL,
  `value` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `listings`
--

CREATE TABLE `listings` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `category` enum('clothing','property','appliance') NOT NULL,
  `subcategory` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `location` varchar(100) DEFAULT 'Lucknow'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `listings`
--

INSERT INTO `listings` (`id`, `title`, `description`, `price`, `category`, `subcategory`, `image`, `verified`, `created_at`, `location`) VALUES
(1, 'Wedding Lehenga', 'Beautiful red lehenga for rent, worn once.', 2500, 'clothing', 'bridal wear', 'https://media.shopkund.com/media/catalog/product/cache/e9efe8e5bd9b5cb30a9a5fcc8e49f953/a/c/act5264-1-pink-velvet-heavy-embroidery-with-hand-work-wedding-lehenga-choli-with-soft-net-dupatta-lc4360.jpg', 1, '2025-06-23 05:46:26', 'Lucknow'),
(2, '3BHK Flat for Rent', 'Spacious 3BHK near metro station.', 18000, 'property', 'residential', 'https://nagpurrental.com/wp-content/uploads/2023/05/3bhk-Luxurious-Flat-sale-Manewada-Road-Besa.jpeg', 1, '2025-06-23 05:46:26', 'Lucknow'),
(3, 'Microwave Oven', 'Good working condition, 1-year-old.', 2200, 'appliance', 'kitchen', 'https://www.lg.com/content/dam/channel/wcms/in/images/microwave-ovens/mc2886brum_dbkqiln_eail_in_c/gallery/MC2886BRUM-Microwave-ovens-Front-view-DZ-01.jpg', 1, '2025-06-23 05:46:26', 'Lucknow'),
(4, 'Designer Saree', 'Light pink designer saree with embroidery.', 1800, 'clothing', 'party wear', 'https://www.studio149fashion.com/cdn/shop/files/ATHUL-1-1.jpg?v=1714812817', 1, '2025-06-23 05:46:26', 'Lucknow'),
(5, 'Fridge for Sale', 'Double-door fridge, 4-star rating.', 6000, 'appliance', 'electronics', 'https://images-cdn.ubuy.co.in/65979c2cb910f53d2e6e34ae-3-5cu-ft-compact-refrigerator-mini.jpg', 1, '2025-06-23 05:46:26', 'Lucknow'),
(6, 'Men\'s Tuxedo Set', 'Classic black tuxedo available for parties and weddings.', 1500, 'clothing', 'men formal', 'https://images-cdn.ubuy.co.in/67abeb9bbba85e288553bb3e-mens-3-piece-tuxedo-suit-slim-fit.jpg', 1, '2025-06-23 05:48:40', 'Lucknow'),
(7, '1RK Studio Apartment', 'Furnished 1RK perfect for working professionals.', 9000, 'property', 'studio apartment', 'https://birdhouse.co.in/public/uploads/1746277067_2.png', 1, '2025-06-23 05:48:40', 'Lucknow'),
(8, 'Washing Machine', 'Fully automatic, 6kg capacity, excellent condition.', 4500, 'appliance', 'laundry', 'https://aws-obg-image-lb-4.tcl.com/content/dam/brandsite/region/in/blog/pc/detail/blog-march/washing-machine-dimensions/thumbnail.jpg', 1, '2025-06-23 05:48:40', 'Lucknow'),
(9, 'Party Gown', 'Elegant gown for evening parties, worn once.', 2000, 'clothing', 'party wear', 'https://pictures.kartmax.in/live/inside/800x800/sites/9s145MyZrWdIAwpU0JYS/product-images/beautiful_purple_net_gown_for_party_wear_1735806806as3183936.jpg', 1, '2025-06-23 05:48:40', 'Lucknow'),
(10, 'Bookshelf', 'Wooden 5-tier bookshelf, almost new.', 1200, 'appliance', 'furniture', 'https://cdn.shopify.com/s/files/1/2728/0804/files/6_e4dad2ab-2072-4cdc-8a6c-9e4861b604a8.jpg?v=1579277936', 1, '2025-06-23 05:48:40', 'Lucknow'),
(11, '2BHK Apartment', '2BHK flat with parking and lift facility.', 14000, 'property', 'residential', 'https://civillane.com/wp-content/uploads/2022/03/2BHK-Interior-Design-Cost-In-Pune.jpg', 1, '2025-06-23 05:48:40', 'Lucknow'),
(12, 'Bridal Jewelry Set', 'Complete bridal set (necklace, earrings, maang tikka).', 2800, 'clothing', 'jewelry', 'https://zevar.com/cdn/shop/products/zevar-bridal-necklace-premium-quality-kundan-pearl-bead-bridal-jewellery-set-by-zevar-39856109551849.jpg?v=1671795848&width=1445', 1, '2025-06-23 05:48:40', 'Lucknow'),
(13, 'Ceiling Fan', 'Energy-saving fan, working smoothly.', 800, 'appliance', 'home', 'https://ankurelectricals.com/cdn/shop/files/2_80bbea7a-c0d6-4b08-8d97-c01887cd1445.png?v=1729754079', 1, '2025-06-23 05:48:40', 'Lucknow'),
(14, 'Girls Lehenga Choli', 'Yellow lehenga with mirror work, 8-10 yr age.', 1000, 'clothing', 'kids wear', 'https://www.bhamadesigns.com/cdn/shop/files/TLHC081_1_da627b87-686e-470a-9205-0cf587d764ef.jpg?v=1748542701', 1, '2025-06-23 05:48:40', 'Lucknow'),
(15, 'Office Chair', 'Ergonomic mesh chair with wheels.', 1500, 'appliance', 'furniture', 'https://www.godrejinterio.com/imagestore/B2C/56101522SD04105/56101522SD04105_01_1500x1500.jpg', 1, '2025-06-23 05:48:40', 'Lucknow'),
(16, 'Floral Kurti Set', 'Pure cotton kurti with palazzo', 1200, 'clothing', 'kurti', 'https://stylejaipur.com/cdn/shop/files/21474dae-2c13-4f39-8fad-52a8c414a7b6.jpg?v=1728890097', 1, '2025-06-25 07:32:03', 'Lucknow'),
(17, 'Silk Saree', 'Traditional silk saree ideal for weddings.', 2200, 'clothing', 'saree', 'https://static.wixstatic.com/media/faf1ba_78c7a05c62a24c61a99d18980455fc89~mv2.jpg/v1/fill/w_526,h_692,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/faf1ba_78c7a05c62a24c61a99d18980455fc89~mv2.jpg', 1, '2025-06-25 07:32:03', 'Lucknow'),
(18, 'Party Dress', 'Elegant party wear gown for rent.', 1800, 'clothing', 'dress', 'https://5.imimg.com/data5/SELLER/Default/2022/6/JO/TJ/OW/12897161/glitter-semi-sheer-mesh-party-dress.jpg', 1, '2025-06-25 07:32:03', 'Lucknow'),
(19, '1BHK in Gomti Nagar', 'Fully furnished, metro nearby, ideal for working professionals.', 8000, 'property', 'residential', 'https://lscdn.blob.core.windows.net/property/rentalad//28_04_2025_11_59_10_WhatsApp_Image_2025_04_07_at_11_35_54_AM.jpeg', 1, '2025-06-25 07:32:36', 'Lucknow'),
(21, 'Induction Cooktop', '1 year old induction cooktop, energy efficient.', 1200, 'appliance', 'kitchen', 'https://m.media-amazon.com/images/I/714AgAXUBeL._UF350,350_QL80_.jpg', 1, '2025-06-25 07:32:52', 'Lucknow'),
(22, 'Smart TV 32 inch', 'With remote, smart features, good condition.', 4000, 'appliance', 'electronics', 'https://images.samsung.com/is/image/samsung/p6pim/in/ua32t4340akxxl/gallery/in-hd-tv-ua32t4340akxxl-front-black-537470101?$684_547_PNG$', 1, '2025-06-25 07:32:52', 'Lucknow'),
(23, 'Air Cooler', 'Summer ready air cooler with 30L tank.', 2200, 'appliance', 'home', 'https://images-cdn.ubuy.co.in/6350fad1476ca1256b24c916-portable-evaporative-air-cooler-outdoor.jpg', 1, '2025-06-25 07:32:52', 'Lucknow'),
(24, '2BHK Flat in Alambagh', 'Semi-furnished 2BHK flat near Alambagh metro station.', 12000, 'property', 'residential', 'https://imagecdn.99acres.com/media1/25092/12/501852815M-1741009803142.webp', 1, '2025-06-25 07:43:45', 'Lucknow'),
(25, 'Independent House for Rent', '3BHK independent house with garden and parking.', 16000, 'property', 'residential', 'https://is1-2.housingcdn.com/01c16c28/41ab24193a5a16557e09ba3f06880f73/v0/fs/2_bhk_independent_house-for-rent-gomti_nagar_1-Lucknow-others.jpg', 1, '2025-06-25 07:43:45', 'Lucknow'),
(26, 'Girls PG in Hazratganj', 'Safe and clean PG accommodation for girls with food.', 5000, 'property', 'pg', 'https://content.jdmagicbox.com/comp/lucknow/e1/0522px522.x522.170502161530.l8e1/catalogue/hari-om-girls-hostel-hazratganj-lucknow-hostels-for-women-asvmoczc9r.jpg', 1, '2025-06-25 07:43:45', 'Lucknow'),
(27, 'Office Space in Gomti Nagar', 'Commercial office space ideal for startups.', 25000, 'property', 'commercial', 'https://res.cloudinary.com/myhq/image/upload/q_auto/w_1920/f_auto/workspaces/mybranch-gomtinagar/dedicated/tpukpb.jpg', 1, '2025-06-25 07:43:45', 'Lucknow'),
(28, 'Boys Ethnic Kurta Set', 'Stylish cotton kurta with pajama for 6-8 years boys.', 900, 'clothing', 'kids wear', 'https://5.imimg.com/data5/ECOM/Default/2023/9/341599209/OX/UI/GF/159110959/tm8c-4-resized-500x500.jpg', 1, '2025-06-25 08:15:39', 'Lucknow'),
(29, 'Bluetooth Earbuds', 'Wireless earbuds with noise cancellation and case.', 1100, 'appliance', 'electronics', 'https://m.media-amazon.com/images/I/51h7CQTRJ1L._UF1000,1000_QL80_.jpg', 1, '2025-06-25 08:17:01', 'Lucknow'),
(30, 'Single Bed with Mattress', 'Wooden single bed with foam mattress, 6 months used.', 3200, 'appliance', 'furniture', 'https://m.media-amazon.com/images/I/8100Q7KG7aL.jpg', 1, '2025-06-25 08:18:00', 'Lucknow'),
(31, 'Fancy Dress Costume – Krishna', 'Ideal for school events and Janmashtami celebrations. Age 5-7.', 500, 'clothing', 'costume', 'https://itsmycostume.com/wp-content/uploads/A2-9.jpg', 1, '2025-06-25 08:18:49', 'Lucknow'),
(32, 'Vintage Wall Clock', 'Antique-style wall clock with brass finish.', 700, 'appliance', 'home decor', 'https://i.etsystatic.com/23639222/r/il/08a4d7/6038749338/il_fullxfull.6038749338_mz7e.jpg', 1, '2025-06-25 08:19:52', 'Lucknow');

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
  `available` tinyint(1) DEFAULT 1,
  `is_rentable` tinyint(1) DEFAULT 1,
  `owner_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `verified` tinyint(1) DEFAULT 1,
  `location` varchar(100) DEFAULT 'Lucknow'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `description`, `price`, `rent_price`, `category`, `image`, `condition`, `available`, `is_rentable`, `owner_id`, `created_at`, `verified`, `location`) VALUES
(1, '2BHK Apartment in Delhi', 'Spacious 2BHK apartment in central Delhi.', 5500000.00, 15000.00, 'property', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', 'Good', 1, 1, 1, '2025-06-18 05:42:15', 1, 'Lucknow'),
(2, '1BHK Flat in Mumbai', 'Affordable 1BHK with metro access.', 3000000.00, 10000.00, 'property', 'https://images.unsplash.com/photo-1570129477492-45c003edd2be', 'Excellent', 1, 1, 2, '2025-06-18 05:42:15', 1, 'Lucknow'),
(4, '3BHK in Noida', 'Fully furnished apartment in sector 62.', 7200000.00, 18000.00, 'property', 'https://images.unsplash.com/photo-1598928506311-c55ded7b9fb6', 'Excellent', 1, 1, 1, '2025-06-18 05:42:15', 1, 'Lucknow'),
(5, 'Flat for Girls in Jaipur', 'Safe and secure 1RK with CCTV.', 1800000.00, 7000.00, 'property', 'https://images.unsplash.com/photo-1597091208238-e27d93bc0b42', 'Good', 1, 1, 2, '2025-06-18 05:42:15', 1, 'Lucknow'),
(7, 'Luxury Villa in Goa', 'Sea-facing 3BHK with pool.', 9000000.00, 25000.00, 'property', 'https://images.unsplash.com/photo-1505691938895-1758d7feb511', 'Excellent', 1, 1, 4, '2025-06-18 05:42:15', 1, 'Lucknow'),
(8, '1RK in Patna', 'Budget-friendly room for students.', 900000.00, 4000.00, 'property', 'https://images.unsplash.com/photo-1588854337112-3e5dc4e9dcd4', 'Good', 1, 1, 5, '2025-06-18 05:42:15', 1, 'Lucknow'),
(9, 'Red Bridal Lehenga', 'Heavy embroidered bridal lehenga.', 9500.00, 1500.00, 'dress', 'https://images.unsplash.com/photo-1613545325784-b40ba4d9c83b', 'Like New', 1, 1, 1, '2025-06-18 05:42:27', 1, 'Lucknow'),
(10, 'Designer Saree', 'Elegant pink saree with zari border.', 6500.00, 1200.00, 'dress', 'https://images.unsplash.com/photo-1618354691261-cd09d6c1be5b', 'Good', 1, 1, 2, '2025-06-18 05:42:27', 1, 'Lucknow'),
(11, 'Sherwani Set', 'Cream sherwani with dupatta.', 8000.00, 1300.00, 'dress', 'https://images.unsplash.com/photo-1618832145378-bd107aece2c5', 'Very Good', 1, 1, 3, '2025-06-18 05:42:27', 1, 'Lucknow'),
(12, 'Reception Gown', 'Stylish navy blue gown.', 7000.00, 1000.00, 'dress', 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246', 'Excellent', 1, 1, 4, '2025-06-18 05:42:27', 1, 'Lucknow'),
(13, 'Party Wear Dress', 'Black dress with shimmer.', 4000.00, 700.00, 'dress', 'https://images.unsplash.com/photo-1583794502172-cadfe7f82f5e', 'Good', 1, 1, 5, '2025-06-18 05:42:27', 1, 'Lucknow'),
(14, 'Engagement Saree', 'Royal blue silk saree.', 5500.00, 1100.00, 'dress', 'https://images.unsplash.com/photo-1612152163335-3f695f84aee5', 'Excellent', 1, 1, 1, '2025-06-18 05:42:27', 1, 'Lucknow'),
(15, 'Kids Frock', 'Colorful frock for 6–8 yrs.', 12003.00, 399.00, 'dress', 'https://images.unsplash.com/photo-1581574732068-cc9b15e1e03e', 'Good', 1, 1, 2, '2025-06-18 05:42:27', 1, 'Lucknow'),
(16, 'Designer Blouse', 'Fancy embroidered blouse.', 1800.00, 250.00, 'dress', 'https://images.unsplash.com/photo-1591348272434-0f918cc0bcb2', 'Very Good', 1, 1, 3, '2025-06-18 05:42:27', 1, 'Lucknow'),
(17, 'LG Washing Machine', '6kg front load washing machine.', 18000.00, 1200.00, 'appliance', 'https://images.unsplash.com/photo-1581579185169-03f079416160', 'Very Good', 1, 1, 4, '2025-06-18 05:42:43', 1, 'Lucknow'),
(18, 'Samsung Refrigerator', '250L double door fridge.', 22000.00, 1400.00, 'appliance', 'https://images.unsplash.com/photo-1601290187423-c94b5c1e4e4a', 'Good', 1, 1, 5, '2025-06-18 05:42:43', 1, 'Lucknow'),
(19, 'Microwave Oven', '20L Solo microwave oven.', 8000.00, 500.00, 'appliance', 'https://images.unsplash.com/photo-1579632478553-4e4c58ed52b2', 'Good', 1, 1, 6, '2025-06-18 05:42:43', 1, 'Lucknow'),
(20, 'Water Purifier', 'RO+UV water purifier.', 10000.00, 700.00, 'appliance', 'https://images.unsplash.com/photo-1570197782432-56f9d4b4e8c8', 'Excellent', 1, 1, 1, '2025-06-18 05:42:43', 1, 'Lucknow'),
(21, 'Gas Stove', '2 burner gas stove.', 2500.00, 269.00, 'appliance', 'https://images.unsplash.com/photo-1609165283069-9f24b7c1a246', 'Very Good', 1, 1, 2, '2025-06-18 05:42:43', 1, 'Lucknow'),
(22, 'Mixer Grinder', '3-jar powerful mixer.', 4000.00, 350.00, 'appliance', 'https://images.unsplash.com/photo-1615484477650-509c2c1c87cf', 'Good', 1, 1, 3, '2025-06-18 05:42:43', 1, 'Lucknow'),
(23, 'Cooler', 'Symphony desert cooler 55L.', 9000.00, 600.00, 'appliance', 'https://images.unsplash.com/photo-1583394838336-acd977736f90', 'Average', 1, 1, 4, '2025-06-18 05:42:43', 1, 'Lucknow'),
(24, 'Iron', 'Philips dry iron.', 1500.00, 150.00, 'appliance', 'https://images.unsplash.com/photo-1598521473453-f04e10f29c0c', 'Very Good', 1, 1, 5, '2025-06-18 05:42:43', 1, 'Lucknow'),
(27, 'Mobile', 'dfsfsnflk dsnfksnklfnslnf', 555.00, 400.00, 'appliance', 'uploads\\product-1750409107008.jpg', 'new', 1, 1, 3, '2025-06-20 08:45:07', 1, 'Lucknow'),
(28, 'aaaaaaaaaa', 'edwbjhjcvb', 555.00, 402.00, 'property', 'uploads\\product-1750663378895.jpg', 'used', 1, 1, 2, '2025-06-23 07:22:58', 1, 'Lucknow'),
(29, 'aaaaaaaaaa', 'vgcvhbhg', 555.00, 400.00, 'dress', 'uploads\\product-1750679769344.jpg', 'used', 1, 1, 2, '2025-06-23 11:56:09', 1, 'Lucknow');

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
-- Indexes for table `admin_settings`
--
ALTER TABLE `admin_settings`
  ADD PRIMARY KEY (`key`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

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
