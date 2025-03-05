-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 05, 2025 at 05:36 PM
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
-- Database: `blood_pressure`
--

-- --------------------------------------------------------

--
-- Table structure for table `measures`
--

CREATE TABLE `measures` (
                            `id` int(11) NOT NULL,
                            `user_id` int(11) NOT NULL,
                            `date` date NOT NULL,
                            `sys_high` int(11) NOT NULL,
                            `dia_low` int(11) NOT NULL,
                            `pulse` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `measures`
--

INSERT INTO `measures` (`id`, `user_id`, `date`, `sys_high`, `dia_low`, `pulse`) VALUES
                                                                                     (1, 1, '2025-03-04', 120, 80, 75),
                                                                                     (2, 2, '2025-03-04', 130, 85, 78),
                                                                                     (3, 3, '2025-03-04', 110, 70, 72),
                                                                                     (4, 4, '2025-03-04', 125, 82, 76),
                                                                                     (5, 5, '2025-03-04', 135, 88, 80),
                                                                                     (6, 6, '2025-03-04', 140, 90, 82),
                                                                                     (7, 7, '2025-03-04', 138, 87, 79),
                                                                                     (8, 8, '2025-03-04', 145, 92, 85),
                                                                                     (9, 9, '2025-03-04', 128, 84, 77),
                                                                                     (10, 10, '2025-03-04', 150, 95, 88),
                                                                                     (11, 3, '1111-10-10', 110, 120, 140),
                                                                                     (12, 9, '1111-11-11', 0, 0, 1),
                                                                                     (13, 9, '1111-11-11', 0, 0, 1),
                                                                                     (15, 1, '0044-04-04', 41, 14, 41);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
                         `id` int(11) NOT NULL,
                         `full_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`) VALUES
                                            (1, 'John Doe'),
                                            (2, 'Jane Smith'),
                                            (3, 'Michael Johnson'),
                                            (4, 'Emily Davis'),
                                            (5, 'David Brown'),
                                            (6, 'Sarah Wilson'),
                                            (7, 'James Miller'),
                                            (8, 'Olivia Martinez'),
                                            (9, 'Daniel Anderson'),
                                            (10, 'Sophia Thomas');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `measures`
--
ALTER TABLE `measures`
    ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
    ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `measures`
--
ALTER TABLE `measures`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `measures`
--
ALTER TABLE `measures`
    ADD CONSTRAINT `measures_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
