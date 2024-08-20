-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 19 Agu 2024 pada 13.53
-- Versi server: 8.0.30
-- Versi PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jwp`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `ekskul`
--

CREATE TABLE `ekskul` (
  `uuid` varchar(36) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `deskripsi` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `status` enum('Open Recruitment','Close Recruitment') NOT NULL,
  `jadwal` varchar(255) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `ekskul`
--

INSERT INTO `ekskul` (`uuid`, `nama`, `deskripsi`, `status`, `jadwal`, `is_deleted`) VALUES
('49ee04ef-9c32-44e7-8dc8-422a82e6e3d9', 'anggar', 'anggar', 'Close Recruitment', 'selasa dan rabu, 17.00 wib s.d. 21.00 WIB', 1),
('5b72a379-c0e7-4073-96c6-166cdb498d2b', 'aa', 'a', 'Open Recruitment', 'a', 1),
('9476e02b-2878-4ea8-aaed-a383e48fb6a5', 'Drum Band', 'Drum band adalah sekelompok pemain musik yang memainkan berbagai instrumen perkusi dan alat musik tiup untuk menciptakan harmoni ritmis yang energik dan dinamis.\n', 'Open Recruitment', 'Senin dan Kamis, 17.00 s.d. 21.00 WIB', 0),
('9d3da279-7ed0-4b43-8a05-a12d78c053b1', 'a', 'aaa', 'Open Recruitment', 'ax', 1),
('a1d0ffca-934b-451e-aa91-0b5ea16e3a77', 'Basket', 'Ekskul basket menyambut semua siswa, baik yang baru memulai maupun yang sudah berpengalaman. Program kami dirancang untuk mengenalkan teknik dasar bermain basket.\n', 'Open Recruitment', 'Senin dan Kamis, 17.00 s.d. 21.00 WIB', 0),
('b2a8326d-c2e8-4de5-b5d8-f3fd962651b6', 'aadadkanl', 'a', 'Open Recruitment', 'aa', 1),
('d3a58be8-2a60-485f-96f7-1f252caa941f', 'Futsal', 'Apakah Anda ingin meningkatkan keterampilan dan kepercayaan diri Anda di lapangan? Ekskul futsal adalah tempat yang tepat untuk mengembangkan kemampuan fisik. ', 'Close Recruitment', 'Senin dan Kamis, 17.00 s.d. 21.00 WIB', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `pendaftaran`
--

CREATE TABLE `pendaftaran` (
  `uuid` varchar(36) NOT NULL,
  `deskripsi` longtext,
  `status` varchar(10) DEFAULT NULL,
  `id_user` varchar(36) DEFAULT NULL,
  `id_ekskul` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `pendaftaran`
--

INSERT INTO `pendaftaran` (`uuid`, `deskripsi`, `status`, `id_user`, `id_ekskul`) VALUES
('2711d764-b8e8-4483-9cef-6c3071b1ce07', 'adwaasdwadad', 'Diterima', '5d9e6f7a-ca70-4fb8-ac75-e6fbfa93d6e0', 'd3a58be8-2a60-485f-96f7-1f252caa941f'),
('4b475257-613d-4d82-aef0-91c071d6704d', 'a', 'Ditolak', '5d9e6f7a-ca70-4fb8-ac75-e6fbfa93d6e0', '9476e02b-2878-4ea8-aaed-a383e48fb6a5'),
('8b5ec30e-1bb2-4cd7-b91c-8af990e0fb84', 'dawdadasadwa', 'Ditolak', '5d9e6f7a-ca70-4fb8-ac75-e6fbfa93d6e0', 'a1d0ffca-934b-451e-aa91-0b5ea16e3a77'),
('c934e3c9-2e65-4011-80b8-8922de183395', 'karena saya jago', 'Ditolak', '5d9e6f7a-ca70-4fb8-ac75-e6fbfa93d6e0', '49ee04ef-9c32-44e7-8dc8-422a82e6e3d9');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `uuid` varchar(36) NOT NULL,
  `username` varchar(75) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `photo` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `kelas` varchar(75) NOT NULL,
  `is_admin` tinyint(1) DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL,
  `created_At` datetime DEFAULT NULL,
  `updated_At` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`uuid`, `username`, `password`, `photo`, `kelas`, `is_admin`, `is_deleted`, `created_At`, `updated_At`) VALUES
('063f241d-fd59-4263-965d-0b6c9da3a502', 'admin', '$2b$10$V70W0QMUgXw.jXlrWupVkORFdOw83ikHLG3qFq0tKsxIBJGKITIzC', '1723963052833DSC06414.JPG', 'admin', 1, 0, '2024-08-13 10:16:37', '2024-08-13 10:16:37'),
('5d9e6f7a-ca70-4fb8-ac75-e6fbfa93d6e0', 'budiprayoga', '$2b$10$v/jzV3Ng7r.ooNN1kX5sS.pgMNORJMN3lLeuwtZuh0NYG6oYqbjRC', '172396045364629652926413687e197594b72d6c7eff7.jpg', '6A', 0, 0, '2024-08-13 11:21:38', '2024-08-13 11:21:38'),
('d46c0a96-fbaf-4ec0-92f2-7580ac062972', 'a', '$2b$10$3dXAoyFWkzRWfFUuvuH3..uZNMumA7V0jnNUytObg0QQfGjNnw0qO', NULL, 'a', 0, 1, '2024-08-19 17:50:06', '2024-08-19 17:50:06');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `ekskul`
--
ALTER TABLE `ekskul`
  ADD PRIMARY KEY (`uuid`);

--
-- Indeks untuk tabel `pendaftaran`
--
ALTER TABLE `pendaftaran`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_ekskul` (`id_ekskul`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uuid`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `pendaftaran`
--
ALTER TABLE `pendaftaran`
  ADD CONSTRAINT `pendaftaran_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`uuid`),
  ADD CONSTRAINT `pendaftaran_ibfk_2` FOREIGN KEY (`id_ekskul`) REFERENCES `ekskul` (`uuid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
