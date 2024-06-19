-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: May 10, 2024 at 01:55 AM
-- Server version: 11.3.2-MariaDB-1:11.3.2+maria~ubu2204
-- PHP Version: 8.2.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sexavenueekaterinburg`
--
CREATE DATABASE IF NOT EXISTS `sexavenueekaterinburg` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `sexavenueekaterinburg`;

-- --------------------------------------------------------

--
-- Table structure for table `blacklist`
--

CREATE TABLE `blacklist` (
  `id` int(11) NOT NULL,
  `agency_id` int(11) NOT NULL,
  `country_id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `phone_number` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blacklist_access`
--

CREATE TABLE `blacklist_access` (
  `id` int(11) NOT NULL,
  `agency_id` int(11) NOT NULL,
  `access_to` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blocked_countries`
--

CREATE TABLE `blocked_countries` (
  `id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `country_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `breast_sizes`
--

CREATE TABLE `breast_sizes` (
  `id` int(11) NOT NULL,
  `breast_size` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `breast_sizes`
--

INSERT INTO `breast_sizes` (`id`, `breast_size`) VALUES
(1, '0 (AA)'),
(2, '1 (A)'),
(3, '2 (B)'),
(4, '3 (C)'),
(5, '4 (D)'),
(6, '5 (E)'),
(7, '6 (F)'),
(8, '7 (F)+');

-- --------------------------------------------------------

--
-- Table structure for table `breast_types`
--

CREATE TABLE `breast_types` (
  `id` int(11) NOT NULL,
  `breast_type` varchar(250) NOT NULL,
  `breast_type_eng` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `breast_types`
--

INSERT INTO `breast_types` (`id`, `breast_type`, `breast_type_eng`) VALUES
(1, 'Естественная', 'Natural'),
(2, 'Силиконовая', 'Silicone');

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `country_id` int(11) NOT NULL,
  `city` varchar(500) NOT NULL,
  `city_eng` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `country_id`, `city`, `city_eng`) VALUES
(1, 1, 'Москва', 'Moscow'),
(2, 1, 'Санкт-Петербург', 'St. Petersburg'),
(3, 1, 'Новосибирск', 'Novosibirsk'),
(4, 1, 'Екатеринбург', 'Ekaterinburg'),
(5, 1, 'Казань', 'Kazan'),
(6, 1, 'Нижний Новгород', 'Nizhny Novgorod'),
(7, 1, 'Красноярск', 'Krasnoyarsk'),
(8, 1, 'Уфа', 'Ufa'),
(9, 2, 'Лондон', 'London'),
(10, 2, 'Бирмингем', 'Birmingham'),
(11, 2, 'Кардифф', 'Cardiff'),
(12, 2, 'Лидс', 'Leeds'),
(13, 2, 'Манчестер', 'Manchester'),
(14, 2, 'Глазго', 'Glazgow'),
(15, 2, 'Шеффилд', 'Sheffield'),
(16, 1, 'Челябинск', 'Chelyabinsk'),
(17, 1, 'Самара', 'Samara'),
(18, 1, 'Ростов-на-Дону', 'Rostov-on-Don'),
(19, 1, 'Краснодар', 'Krasnodar'),
(20, 1, 'Омск', 'Omsk'),
(21, 1, 'Воронеж', 'Voronezh'),
(22, 1, 'Пермь', 'Perm'),
(23, 1, 'Волгоград', 'Volgograd'),
(24, 1, 'Саратов', 'Saratov'),
(25, 1, 'Тюмень', 'Tyumen'),
(26, 1, 'Тольятти', 'Tolyatti'),
(27, 1, 'Барнаул', 'Barnaul'),
(28, 1, 'Махачкала', 'Makhachkala'),
(29, 1, 'Ижевск', 'Izhevsk'),
(30, 1, 'Хабаровск', 'Khabarovsk'),
(31, 1, 'Ульяновск', 'Ulyanovsk'),
(32, 1, 'Иркутск', 'Irkutsk'),
(33, 1, 'Владивосток', 'Vladivostok'),
(34, 1, 'Ярославль', 'Yaroslavl'),
(35, 1, 'Севастополь', 'Sevastopol'),
(36, 1, 'Томск', 'Tomsk'),
(37, 1, 'Ставрополь', 'Stavropol'),
(38, 1, 'Кемерово', 'Kemerovo'),
(39, 1, 'Набережные Челны', 'Naberezhnye Chelny'),
(40, 1, 'Оренбург', 'Orenburg'),
(41, 1, 'Новокузнецк', 'Novokuznetsk'),
(42, 1, 'Балашиха', 'Balashikha'),
(43, 1, 'Рязань', 'Ryazan'),
(44, 1, 'Чебоксары', 'Cheboksary'),
(45, 1, 'Пенза', 'Penza'),
(46, 1, 'Липецк', 'Lipetsk'),
(47, 1, 'Калининград', 'Kaliningrad'),
(48, 1, 'Киров', 'Kirov'),
(49, 1, 'Астрахань', 'Astrakhan'),
(50, 1, 'Тула', 'Tula'),
(51, 1, 'Сочи', 'Sochi'),
(52, 1, 'Улан-Удэ', 'Ulan-Ude'),
(53, 1, 'Курск', 'Kursk'),
(54, 1, 'Тверь', 'Tver'),
(55, 1, 'Магнитогорск', 'Magnitogorsk'),
(56, 1, 'Сургут', 'Surgut'),
(57, 1, 'Брянск', 'Bryansk'),
(58, 1, 'Якутск', 'Yakutsk'),
(59, 1, 'Иваново', 'Ivanovo'),
(60, 1, 'Владимир', 'Vladimir'),
(61, 1, 'Симферополь', 'Simferopol'),
(62, 1, 'Нижний Тагил', 'Nizhny Tagil'),
(63, 1, 'Калуга', 'Kaluga'),
(64, 1, 'Белгород', 'Belgorod'),
(65, 1, 'Чита', 'Chita'),
(66, 1, 'Грозный', 'Grozny'),
(67, 1, 'Волжский', 'Volzhsky'),
(68, 1, 'Смоленск', 'Smolensk'),
(69, 1, 'Подольск', 'Podolsk'),
(70, 1, 'Саранск', 'Saransk'),
(71, 1, 'Вологда', 'Vologda'),
(72, 1, 'Курган', 'Kurgan'),
(73, 1, 'Череповец', 'Cherepovets'),
(74, 1, 'Архангельск', 'Arkhangelsk'),
(75, 1, 'Орел', 'Orel'),
(76, 1, 'Владикавказ', 'Vladikavkaz'),
(77, 1, 'Нижневартовск', 'Nizhnevartovsk'),
(78, 1, 'Йошкар-Ола', 'Yoshkar-Ola'),
(79, 1, 'Стерлитамак', 'Sterlitamak'),
(80, 1, 'Мурманск', 'Murmansk'),
(81, 1, 'Мытищи', 'Mytishchi'),
(82, 1, 'Кострома', 'Kostroma'),
(83, 1, 'Новороссийск', 'Novorossiysk'),
(84, 1, 'Тамбов', 'Tambov'),
(85, 1, 'Химки', 'Khimki'),
(86, 1, 'Нальчик', 'Nalchik'),
(87, 1, 'Таганрог', 'Taganrog'),
(88, 1, 'Нижнекамск', 'Nizhnekamsk'),
(89, 1, 'Благовещенск', 'Blagoveshchensk'),
(90, 1, 'Комсомольск-на-Амуре', 'Komsomolsk-on-Amur'),
(91, 1, 'Петрозаводск', 'Petrozavodsk'),
(92, 1, 'Люберцы', 'Lyubertsy'),
(93, 1, 'Королев', 'Korolev'),
(94, 1, 'Энгельс', 'Engels'),
(95, 1, 'Великий Новгород', 'Veliky Novgorod'),
(96, 1, 'Шахты', 'Mines'),
(97, 1, 'Братск', 'Bratsk'),
(98, 1, 'Сывтывкар', 'Syktyvkar'),
(99, 1, 'Ангарск', 'Angarsk'),
(100, 1, 'Старый Оскол', 'Stary Oskol'),
(101, 1, 'Дзержинск', 'Dzerzhinsk'),
(102, 1, 'Псков', 'Pskov'),
(103, 1, 'Красногорск', 'Krasnogorsk'),
(104, 1, 'Орск', 'Orsk'),
(105, 1, 'Одинцово', 'Odintsovo'),
(106, 1, 'Абакан', 'Abakan'),
(107, 1, 'Армавир', 'Armavir');

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `phone_number` varchar(50) NOT NULL,
  `is_telegram_enable` tinyint(1) NOT NULL DEFAULT 0,
  `is_whatsapp_enable` tinyint(1) NOT NULL DEFAULT 0,
  `is_wechat_enable` tinyint(1) NOT NULL DEFAULT 0,
  `is_botim_enable` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `country` varchar(250) NOT NULL,
  `is_enable` tinyint(1) NOT NULL,
  `flag` text NOT NULL,
  `country_eng` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `country`, `is_enable`, `flag`, `country_eng`) VALUES
(1, 'Россия', 1, '/images/flags/russia.svg', 'Russia'),
(2, 'Великобритания', 0, '/images/flags/great_britain.svg', 'Great Britain'),
(3, 'Испания', 0, '/images/flags/spain.svg', 'Spain'),
(4, 'ОАЭ', 0, '/images/flags/arab.svg', 'United Arab Emirates'),
(5, 'Саудовская Аравия', 0, '/images/flags/saudi_arabia.svg', 'Saudi Arabia');

-- --------------------------------------------------------

--
-- Table structure for table `currencies`
--

CREATE TABLE `currencies` (
  `id` int(11) NOT NULL,
  `symbol` varchar(10) NOT NULL,
  `currency` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `currencies`
--

INSERT INTO `currencies` (`id`, `symbol`, `currency`) VALUES
(1, '₽', 'RUB'),
(2, '$', 'USD'),
(3, '€', 'EUR'),
(4, 'د.إ', 'AED'),
(5, '¥', 'CNY');

-- --------------------------------------------------------

--
-- Table structure for table `days_of_week`
--

CREATE TABLE `days_of_week` (
  `id` int(11) NOT NULL,
  `day_of_week` varchar(50) NOT NULL,
  `day_of_week_eng` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `days_of_week`
--

INSERT INTO `days_of_week` (`id`, `day_of_week`, `day_of_week_eng`) VALUES
(1, 'Понедельник', 'Monday'),
(2, 'Вторник', 'Tuesday'),
(3, 'Среда', 'Wednesday'),
(4, 'Четверг', 'Thursday'),
(5, 'Пятница', 'Friday'),
(6, 'Суббота', 'Saturday'),
(7, 'Воскресенье', 'Sunday');

-- --------------------------------------------------------

--
-- Table structure for table `deleted_profiles`
--

CREATE TABLE `deleted_profiles` (
  `id` int(11) NOT NULL,
  `agency_id` int(11) NOT NULL,
  `delete_date` datetime NOT NULL DEFAULT '1900-01-01 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `districts`
--

CREATE TABLE `districts` (
  `id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `district` varchar(500) NOT NULL,
  `district_eng` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `districts`
--

INSERT INTO `districts` (`id`, `city_id`, `district`, `district_eng`) VALUES
(1, 1, 'Внуково', 'Vnukovo'),
(2, 1, 'Кунцево', 'Kuntsevo'),
(3, 1, 'Солнцево', 'Solntsevo'),
(4, 10, 'Центр', 'Center'),
(5, 4, 'Академический', 'Academic'),
(6, 4, 'Верх-Исетский', 'Verkh-Isetsky'),
(7, 4, 'Железнодорожный', 'Railway'),
(8, 4, 'Кировский', 'Kirovsky'),
(9, 4, 'Ленинский', 'Leninsky'),
(10, 4, 'Октябрьский', 'October'),
(11, 4, 'Орджоникидзевский', 'Ordzhonikidze'),
(12, 4, 'Чкаловский', 'Chkalovsky');

-- --------------------------------------------------------

--
-- Table structure for table `ethnic_groups`
--

CREATE TABLE `ethnic_groups` (
  `id` int(11) NOT NULL,
  `ethnic_group` varchar(250) NOT NULL,
  `ethnic_group_eng` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `ethnic_groups`
--

INSERT INTO `ethnic_groups` (`id`, `ethnic_group`, `ethnic_group_eng`) VALUES
(1, 'Арабская', 'Arabian'),
(2, 'Азиатская', 'Asian'),
(3, 'Негроидная', 'Ebony (black)'),
(4, 'Европеец (белый)', 'Caucasian (white)'),
(6, 'Индийская', 'Indian'),
(7, 'Латинская', 'Latin'),
(9, 'Смешанная раса', 'Mixed race');

-- --------------------------------------------------------

--
-- Table structure for table `ethnic_groups_full`
--

CREATE TABLE `ethnic_groups_full` (
  `id` int(11) NOT NULL,
  `ethnic_group` varchar(250) NOT NULL,
  `ethnic_group_eng` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `ethnic_groups_full`
--

INSERT INTO `ethnic_groups_full` (`id`, `ethnic_group`, `ethnic_group_eng`) VALUES
(1, 'Арабская', 'Arabian'),
(2, 'Азиатская', 'Asian'),
(3, 'Негроидная', 'Ebony (black)'),
(4, 'Европеец (белый)', 'Caucasian (white)'),
(5, 'Испаноязычный', 'Hispanic'),
(6, 'Индийская', 'Indian'),
(7, 'Латинская', 'Latin'),
(8, 'Монголия', 'Mongolia'),
(9, 'Смешанная раса', 'Mixed race');

-- --------------------------------------------------------

--
-- Table structure for table `eyes_colors`
--

CREATE TABLE `eyes_colors` (
  `id` int(11) NOT NULL,
  `eyes_color` varchar(250) NOT NULL,
  `eyes_color_eng` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `eyes_colors`
--

INSERT INTO `eyes_colors` (`id`, `eyes_color`, `eyes_color_eng`) VALUES
(1, 'Черные', 'Black'),
(2, 'Голубые', 'Blue'),
(3, 'Сине-зеленые', 'Blue-green'),
(4, 'Карий', 'Brown'),
(5, 'Зеленые', 'Green'),
(6, 'Серые', 'Grey'),
(7, 'Смешанные', 'Hazel');

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `question_eng` text NOT NULL,
  `answer` text NOT NULL,
  `answer_eng` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `faqs`
--

INSERT INTO `faqs` (`id`, `question`, `question_eng`, `answer`, `answer_eng`) VALUES
(1, 'Размещение объявлений бесплатно?', 'Is advertising for free?', 'Да, вы можете бесплатно размещать объявления в нашем каталоге. Для лучшей видимости вы можете активировать премиум-рекламу в любое время.', 'Yes, you can advertise for free on our directory. To reach better visibility you can activate premium advertising any time you want.'),
(2, 'Что означает статус \"Не проверено\"?', 'What does Unverified sign mean?', 'Это означает, что мы не можем подтвердить подлинность объявления, поскольку верификация не была пройдена. Непроверенные объявления менее популярны и отображаются после проверенных объявлений.', 'It means that we are not able to confirm the authenticity of the Ad because verification was not provided. Unverified Ads are less popular and appear under verified Ads.'),
(3, 'Могу ли я отключить отзывы в своем объявлении?', 'Can I disable reviews on my Ad?', 'Вы не можете отключить данную функцию, т.к. она всегда включена. Вы всегда можете опубликовать ответ на каждый отзыв.', 'it is not possible to disable this function, it is always enabled. You can always post a reply to each review.'),
(4, 'Вы организуете встречи клиентов с эскорт-моделями?', 'Do you arrange meetings with Escorts?', '<p>Мы – каталог эскорт-моделей (рекламная платформа), а не эскорт-агентство. Если вы хотите заказать себе девушку, необходимо связаться с ней напрямую. Вы можете найти контактную форму в ее профиле или в профиле эскорт-агентства. Мы не устраиваем встречи девушек с клиентами! Мы выступаем только в роли каталога эскорт-моделей.</p>', '<p>We are an escort directory (an advertising platform), not an escort agency. If you want to book the girl, it is necessary to contact her directly. You can find a contact form on her or escort agency profiles. We don`t arrange meetings between the girls and clients! We are the escort directory website only.</p>');

-- --------------------------------------------------------

--
-- Table structure for table `hair_colors`
--

CREATE TABLE `hair_colors` (
  `id` int(11) NOT NULL,
  `hair_color` varchar(250) NOT NULL,
  `hair_color_eng` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `hair_colors`
--

INSERT INTO `hair_colors` (`id`, `hair_color`, `hair_color_eng`) VALUES
(1, 'Блонд', 'Blonde'),
(2, 'Шатен', 'Brown'),
(3, 'Рыжий', 'Red'),
(4, 'Чёрный', 'Black');

-- --------------------------------------------------------

--
-- Table structure for table `hair_sizes`
--

CREATE TABLE `hair_sizes` (
  `id` int(11) NOT NULL,
  `hair_size` varchar(250) NOT NULL,
  `hair_size_eng` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `hair_sizes`
--

INSERT INTO `hair_sizes` (`id`, `hair_size`, `hair_size_eng`) VALUES
(1, 'Короткие', 'Short'),
(2, 'Средней длины', 'Medium long'),
(3, 'Длинные', 'Long');

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `id` int(11) NOT NULL,
  `language` varchar(250) NOT NULL,
  `language_eng` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`id`, `language`, `language_eng`) VALUES
(3, 'Английский', 'English'),
(11, 'Грузинский', 'Georgian'),
(14, 'Испанский', 'Spainish'),
(15, 'Итальянский', 'Italian'),
(16, 'Китайский', 'Chinese'),
(18, 'Немецкий', 'German'),
(21, 'Русский', 'Russian'),
(29, 'Французский', 'French');

-- --------------------------------------------------------

--
-- Table structure for table `languages_full`
--

CREATE TABLE `languages_full` (
  `id` int(11) NOT NULL,
  `language` varchar(250) NOT NULL,
  `language_eng` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `languages_full`
--

INSERT INTO `languages_full` (`id`, `language`, `language_eng`) VALUES
(2, 'Азербайджанский', 'Azerbaijani'),
(3, 'Английский', 'English'),
(4, 'Арабский', 'Arabic'),
(5, 'Армянский', 'Armenian'),
(6, 'Африкаанс', 'Afrikaans'),
(7, 'Баскский', 'Basque'),
(8, 'Белорусский', 'Belarussian'),
(9, 'Бенгальский', 'Bengali'),
(10, 'Греческий', 'Greek'),
(11, 'Грузинский', 'Georgian'),
(12, 'Иврит', 'Hebrew'),
(13, 'Индонезийский', 'Indonesian'),
(14, 'Испанский', 'Spainish'),
(15, 'Итальянский', 'Italian'),
(16, 'Китайский', 'Chinese'),
(17, 'Корейский', 'Korean'),
(18, 'Немецкий', 'German'),
(19, 'Нидерландский', 'Dutch'),
(20, 'Польский', 'Polish'),
(21, 'Русский', 'Russian'),
(22, 'Сербский', 'Serbian'),
(23, 'Словацкий', 'Slovak'),
(24, 'Словенскиий', 'Slovenian'),
(25, 'Сомалийский', 'Somali'),
(26, 'Тайский', 'Thai'),
(27, 'Турецкий', 'Turkish'),
(28, 'Украинский', 'Ukrainian'),
(29, 'Французский', 'French'),
(30, 'Хорватский', 'Croatian'),
(31, 'Чешский', 'Czech'),
(32, 'Шведский', 'Swedish'),
(33, 'Эстонский', 'Estonian'),
(34, 'Японский', 'Japanese');

-- --------------------------------------------------------

--
-- Table structure for table `meetings`
--

CREATE TABLE `meetings` (
  `id` int(11) NOT NULL,
  `meeting` varchar(250) NOT NULL,
  `meeting_eng` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `meetings`
--

INSERT INTO `meetings` (`id`, `meeting`, `meeting_eng`) VALUES
(1, 'Мужчина', 'Man'),
(2, 'Женщина', 'Woman'),
(3, 'Пары', 'Couples'),
(4, 'Оба (мужчина + женщина)', 'Both (male + female)');

-- --------------------------------------------------------

--
-- Table structure for table `meeting_places`
--

CREATE TABLE `meeting_places` (
  `id` int(11) NOT NULL,
  `meeting_place` varchar(250) NOT NULL,
  `meeting_place_eng` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `meeting_places`
--

INSERT INTO `meeting_places` (`id`, `meeting_place`, `meeting_place_eng`) VALUES
(1, 'Аппартаменты', 'Incall'),
(2, 'Выезд', 'Outcall'),
(3, 'Аппартаменты + Выезд', 'Incall + Outcall');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `models`
--

CREATE TABLE `models` (
  `id` int(11) NOT NULL,
  `agency_id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `about_self` varchar(5000) NOT NULL,
  `age` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `weight` int(11) NOT NULL,
  `country_id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `district_id` int(11) NOT NULL,
  `underground_id` int(11) NOT NULL,
  `orientation_id` int(11) NOT NULL,
  `is_vip` tinyint(1) NOT NULL DEFAULT 0,
  `meeting_id` int(11) NOT NULL,
  `ethnic_group_id` int(11) NOT NULL,
  `hair_color_id` int(11) NOT NULL,
  `hair_size_id` int(11) NOT NULL,
  `breast_size_id` int(11) NOT NULL,
  `breast_type_id` int(11) NOT NULL,
  `meeting_place_id` int(11) NOT NULL,
  `nationality_id` int(11) NOT NULL,
  `trip_id` int(11) NOT NULL,
  `tatoo_id` int(11) NOT NULL,
  `smooker_id` int(11) NOT NULL,
  `eyes_color_id` int(11) NOT NULL,
  `pubis_hair_id` int(11) NOT NULL,
  `is_pornstar` tinyint(1) NOT NULL DEFAULT 0,
  `is_enable` tinyint(1) NOT NULL DEFAULT 0,
  `is_enable_by_moderator` tinyint(1) NOT NULL DEFAULT 1,
  `currency_id` int(11) NOT NULL DEFAULT -1,
  `time_zone` int(11) NOT NULL DEFAULT -100,
  `last_online` datetime NOT NULL DEFAULT '2023-12-01 00:00:00',
  `is_verified` tinyint(1) NOT NULL DEFAULT 0,
  `create_date` datetime NOT NULL DEFAULT '2023-12-01 00:00:00',
  `is_payed` tinyint(1) NOT NULL DEFAULT 1,
  `last_position_update` datetime NOT NULL DEFAULT '2023-12-01 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_feedbacks`
--

CREATE TABLE `model_feedbacks` (
  `id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `is_from_model` tinyint(1) NOT NULL,
  `name` varchar(500) NOT NULL,
  `rate` int(11) NOT NULL,
  `text` text NOT NULL,
  `is_photo_real` int(11) NOT NULL,
  `is_only_one` int(11) NOT NULL,
  `create_date` date NOT NULL,
  `status` int(11) NOT NULL,
  `parent_id` int(11) NOT NULL DEFAULT -1,
  `is_viewed` tinyint(1) NOT NULL DEFAULT 0,
  `user_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`user_data`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_languages`
--

CREATE TABLE `model_languages` (
  `id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_piercings`
--

CREATE TABLE `model_piercings` (
  `id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `piercing_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_proposal_places`
--

CREATE TABLE `model_proposal_places` (
  `id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `place_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_services`
--

CREATE TABLE `model_services` (
  `id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_types`
--

CREATE TABLE `model_types` (
  `id` int(11) NOT NULL,
  `type` varchar(250) NOT NULL,
  `type_eng` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `model_types`
--

INSERT INTO `model_types` (`id`, `type`, `type_eng`) VALUES
(1, 'Женщина', 'Woman'),
(2, 'Мужчина', 'Man'),
(3, 'Пара (м+ж)', 'Couple'),
(4, 'Дуэт женщин', 'Duo with girls'),
(5, 'Трансгендерная женщина', 'Transgender woman'),
(6, 'Трансгендерный мужчина', 'Transgender man');

-- --------------------------------------------------------

--
-- Table structure for table `model_views`
--

CREATE TABLE `model_views` (
  `id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `view_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nationalities`
--

CREATE TABLE `nationalities` (
  `id` int(11) NOT NULL,
  `nationality` varchar(250) NOT NULL,
  `nationality_eng` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `nationalities`
--

INSERT INTO `nationalities` (`id`, `nationality`, `nationality_eng`) VALUES
(1, 'Американская', 'American'),
(2, 'Английская', 'English'),
(3, 'Аргентинская', 'Argentinian'),
(4, 'Армянская', 'Armenian'),
(5, 'Барбадосская', 'Barbadian'),
(6, 'Белорусская', 'Belarussian'),
(7, 'Бразильская', 'Brazilian'),
(8, 'Британская', 'British'),
(9, 'Ганская', 'Ghanaian'),
(10, 'Греческая', 'Greek'),
(11, 'Грузинская', 'Georgian'),
(12, 'Израильская', 'Israeli'),
(13, 'Индийская', 'Indian'),
(14, 'Индонезийская', 'Indonesian'),
(15, 'Испанская', 'Spanish'),
(16, 'Итальянская', 'Italian'),
(17, 'Казахская', 'Kazakh'),
(18, 'Китайская', 'Chinese'),
(19, 'Колумбийская', 'Colombian'),
(20, 'Корейская', 'Korean'),
(21, 'Кубинская', 'Cuban'),
(22, 'Латышская', 'Latvian'),
(23, 'Литовская', 'Lithuanian'),
(24, 'Малазийская', 'Malaysian'),
(25, 'Марокканская', 'Moroccan'),
(26, 'Молдавская', 'Moldavian'),
(27, 'Немецкая', 'German'),
(28, 'Нидерландская', 'Dutch'),
(29, 'Польская', 'Polish'),
(30, 'Румынская', 'Romanian'),
(31, 'Русская', 'Russian'),
(32, 'Сингапурская', 'Singaporean'),
(33, 'Словацкая', 'Slovak'),
(34, 'Словенская', 'Slovenian'),
(35, 'Тайвань', 'Thai'),
(36, 'Турецкая', 'Turkish'),
(37, 'Украинская', 'Ukrainian'),
(38, 'Филиппинская', 'Filipino'),
(39, 'Французская', 'French'),
(40, 'Чешская', 'Czech'),
(41, 'Швейцарская', 'Swiss'),
(42, 'Эстонская', 'Estonian'),
(43, 'Южноафриканская', 'South african'),
(44, 'Японская', 'Japanese');

-- --------------------------------------------------------

--
-- Table structure for table `nationalities_full`
--

CREATE TABLE `nationalities_full` (
  `id` int(11) NOT NULL,
  `nationality` varchar(250) NOT NULL,
  `nationality_eng` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `nationalities_full`
--

INSERT INTO `nationalities_full` (`id`, `nationality`, `nationality_eng`) VALUES
(1, 'Американская', 'American'),
(2, 'Английская', 'English'),
(3, 'Аргентинская', 'Argentinian'),
(4, 'Армянская', 'Armenian'),
(5, 'Барбадосская', 'Barbadian'),
(6, 'Белорусская', 'Belarussian'),
(7, 'Бразильская', 'Brazilian'),
(8, 'Британская', 'British'),
(9, 'Ганская', 'Ghanaian'),
(10, 'Греческая', 'Greek'),
(11, 'Грузинская', 'Georgian'),
(12, 'Израильская', 'Israeli'),
(13, 'Индийская', 'Indian'),
(14, 'Индонезийская', 'Indonesian'),
(15, 'Испанская', 'Spanish'),
(16, 'Итальянская', 'Italian'),
(17, 'Казахская', 'Kazakh'),
(18, 'Китайская', 'Chinese'),
(19, 'Колумбийская', 'Colombian'),
(20, 'Корейская', 'Korean'),
(21, 'Кубинская', 'Cuban'),
(22, 'Латышская', 'Latvian'),
(23, 'Литовская', 'Lithuanian'),
(24, 'Малазийская', 'Malaysian'),
(25, 'Марокканская', 'Moroccan'),
(26, 'Молдавская', 'Moldavian'),
(27, 'Немецкая', 'German'),
(28, 'Нидерландская', 'Dutch'),
(29, 'Польская', 'Polish'),
(30, 'Румынская', 'Romanian'),
(31, 'Русская', 'Russian'),
(32, 'Сингапурская', 'Singaporean'),
(33, 'Словацкая', 'Slovak'),
(34, 'Словенская', 'Slovenian'),
(35, 'Тайвань', 'Thai'),
(36, 'Турецкая', 'Turkish'),
(37, 'Украинская', 'Ukrainian'),
(38, 'Филиппинская', 'Filipino'),
(39, 'Французская', 'French'),
(40, 'Чешская', 'Czech'),
(41, 'Швейцарская', 'Swiss'),
(42, 'Эстонская', 'Estonian'),
(43, 'Южноафриканская', 'South african'),
(44, 'Японская', 'Japanese');

-- --------------------------------------------------------

--
-- Table structure for table `orientations`
--

CREATE TABLE `orientations` (
  `id` int(11) NOT NULL,
  `orientation` varchar(250) NOT NULL,
  `orientation_eng` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `orientations`
--

INSERT INTO `orientations` (`id`, `orientation`, `orientation_eng`) VALUES
(1, 'Гетеро', 'Straight'),
(2, 'Би', 'Bisexual'),
(3, 'Лесби', 'Lesbian'),
(4, 'Гомо', 'Homosexual');

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `title_eng` text NOT NULL,
  `content` text NOT NULL,
  `content_eng` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `title`, `title_eng`, `content`, `content_eng`) VALUES
(1, 'Конфиденциальность', 'Confidentiality', '<p>Наш сайт уделяет большое внимание Вашей конфиденциальности, поэтому мы ответственно и серьезно относимся к защите той информации, которую Вы нам предоставляете в процессе взаимодействия с нашим сайтом. В связи с этим мы разработали общую политику конфиденциальности для того, чтобы дать Вам четкое представление о том, какую информацию мы запрашиваем и каким образом ее используем.</p><p>&nbsp;</p><p><strong>Информация о клиенте:</strong></p><p>Информация клиентского аккаунта, которую Вы предоставляете (такая как адрес электронной почты, пароли, имя, местонахождение, номера кошельков электронных платёжных систем и т.п.) является исключительно конфиденциальной, не продается и не разглашается третьим сторонам, но будет использована для предоставления Вам услуг, описанных на нашем сайте.</p><p>&nbsp;</p><p><strong>Конфиденциальность Email-адреса:</strong></p><p>Формы подписки на оповещения и информационные бюллетени. Наш сайт использует формы подписки для пользователей, которые запрашивают информацию, подписываясь на email-оповещения или информационные бюллетени по заинтересовавшим их темам. Мы запрашиваем контактную информацию (такую как Ваше имя и/или email-адрес среди прочих сведений) для того, чтобы предоставить Вам информацию, которую Вы запросили. Мы не продаем и не разглашаем email-адреса третьим сторонам.</p><p><br></p><p><strong>Подтверждение подписки на рассылку.</strong> Мы предоставляем возможность подтверждения подписки для любых рассылок, которые Вы хотите получать. Мы используем Ваш email-адрес для подтверждения Вашей подписки и для проверки правильности указанного email-адреса. Ваш ответ на этот email необходим для завершения Вашей подписки на любые рассылки и информационные бюллетени. Вы можете изменить указанный email-адрес, используя форму «Управление подписками», либо же Вы можете отказаться от подписки на email, который Вы указали ранее, а потом снова подписаться на нее с нового email-адреса.</p><p><br></p><p><strong>Отмена подписки.</strong> Вы можете отменить подписку или отказаться от любых рассылок, на которые Вы подписались ранее. Электронное письмо, которое Вы получите, будет содержать информацию, необходимую для отмены подписки.</p><p><br></p><p><strong>Общение с пользователями, членами и клиентами.</strong> Когда Вы присылаете нам Ваш email-адрес либо другую контактную информацию, мы можем сохранить эту информацию для обработки Ваших запросов и для улучшения качества предоставляемых нами услуг.</p><p>Деловые отношения. Считается, что клиенты, члены и/или пользователи сайта находятся в деловых отношениях с Наш сайт, поэтому нам может понадобиться Ваш email-адрес для того, чтобы связываться с Вами время от времени для предоставления наших услуг.</p><p>&nbsp;&nbsp;</p><p><strong>Личная информация и другие запрашиваемые нами данные:</strong></p><p>Наш сайт запрашивает личную информацию, такую как Ваше имя, email-адрес, местонахождение и т.п., когда Вы регистрируетесь для получения различных предоставляемых нами услуг (например, создание членского аккаунта). Мы можем объединять полученную от Вас информацию с информацией с других сервисов Наш сайт или с информацией третьих сторон для того, чтобы обеспечить Вам наиболее полноценное пользование нашими услугами.</p><p>Наш сайт использует куки-файлы (фрагменты данных, хранящиеся на компьютере пользователя) и другие технологии с целью предоставить Вам высококачественные услуги и узнать, каким образом Вы используете наши услуги, чтобы мы могли постоянно их обновлять и совершенствовать.</p><p>Сервера Наш сайт могут автоматически записывать/сохранять информацию каждый раз, когда Вы посещаете сайт либо пользуетесь какими-либо из наших продуктов или услуг. Это может быть такая информация, как Ваш IP-адрес, URL, тип браузера, имя домена, дата и время доступа, операционная система, исходная страна, язык, просмотренные страницы и сессии пользователя для помощи в определении проблем и/или предоставлении Вам наших услуг.</p><p>&nbsp;</p><p><strong>Пути использования полученной информации:</strong></p><p>Мы можем использовать указанную Вами личную информацию для предоставления заказанных Вами услуг и для наших собственных исследований и разработок, чтобы производить и совершенствовать предлагаемые нами услуги и продукты, а также разрабатывать новые услуги и продукты.</p><p>Мы можем делиться статистической, не персонализированной информацией с третьими сторонами, не входящими в Наш сайт.</p><p>Когда мы привлекаем третьи стороны к помощи в обработке Вашей личной информации (например, поставщика услуги «корзина» и др.), мы требуем от них соблюдения нашей политики конфиденциальности, неразглашения личной информации и мер безопасности.</p><p>Мы можем предоставлять информацию третьим сторонам в ограниченном числе случаев, таких как содействие в судебных разбирательствах, предотвращение предполагаемого мошенничества или неизбежного вреда, а также обеспечение безопасности наших сетей и услуг.</p><p>Мы можем использовать Ваш почтовый и электронный адреса для того, чтобы присылать Вам информацию, касающуюся Вашего пользования нашими услугами.</p><p>Мы можем проводить опросы среди членов и/или пользователей с целью улучшить качество наших услуг.</p><p>&nbsp;</p><p><strong>Ссылки:</strong></p><p>Данный сайт содержит ссылки на сторонние сайты, на которые не распространяется наша политика конфиденциальности. Мы стараемся обеспечить активность этих ссылок, но не несем ответственности за содержание этих сайтов. Мы настоятельно рекомендуем ознакомиться с политикой конфиденциальности и этих сайтов тоже.</p><p>&nbsp;</p><p><strong>Контроль безопасности и сохранность данных:</strong></p><p>Сайт Наш сайт предпринимает разумные меры безопасности на соответствующем уровне для предотвращения утери, злоупотребления или искажения подконтрольной нам информации, среди которых контрольные процедуры и специальное обучение для сотрудников, работающих непосредственно с нашими базами данных. Мы предпринимаем меры защиты от незаконного доступа к личным данным, включая соображения физической сохранности хранящихся у нас данных. Мы ограничиваем доступ к личной информации сотрудниками Наш сайт, подрядчиками и агентами, которым необходима эта информация для обеспечения, обновления и предоставления наших услуг.</p><p>&nbsp;&nbsp;</p><p><strong>Информация о партнерах Наш сайт:</strong></p><p>Вся информация, касающаяся партнеров Наш сайт, включая почтовые адреса, номера телефонов, адреса электронной почты, номера кошельков электронных платёжных систем и т.д. строго конфиденциальна. Эта информация запрашивается с целью оформления комиссионных платежей в соответствии с налоговым законодательством и для обеспечения наших услуг.</p><p>&nbsp;&nbsp;</p><p><strong>Уведомление об изменениях:</strong></p><p>Время от времени Наш сайт будет обновлять положения политики конфиденциальности. В том случае, если мы будем вносить значительные изменения в способы использования Вашей личной информации, Вы получите уведомление по email с возможностью отказаться от услуг до того, как будут произведены существенные изменения. Однако, если Вы отказались от всех возможных уведомлений от Наш сайт, Вы не получите уведомления, равно как Ваша личная информация не будет использоваться по новым правилам. Наш сайт рекомендует периодически пересматривать положения политики конфиденциальности, чтобы быть в курсе того, как мы обеспечиваем Вашу конфиденциальность.</p><p>&nbsp;&nbsp;</p><p><strong>Ваш выбор:</strong></p><p>Вы можете отказаться от предоставления личной информации для получения наших услуг. В этом случае Наш сайт может оказаться не в состоянии предоставить Вам эти услуги.</p><p>&nbsp;&nbsp;</p><p><strong>Правовая оговорка:</strong></p><p>Несмотря на то, что мы прикладываем все возможные усилия для обеспечения Вашей конфиденциальности, мы можем быть вынуждены предоставить Вашу личную информацию по требованию закона или по нашему искреннему убеждению, что подобное действие необходимо для следования букве закона, либо для помощи в юридических разбирательствах, касающихся нашего сайта, либо для установления и пользования нашими законными правами, либо для защиты от правовых обвинений.</p><p>&nbsp;&nbsp;</p><p><strong>Материалы сайта:</strong></p><p>Все материалы, опубликованные на этом сайте принадлежат Администрации сайта. Любое копирование материалов с сайта возможно только при условии явного указания&nbsp;источника со ссылкой на сайт Наш сайт в качестве автора материалов со ссылкой на сайт Наш сайт. Ссылки на указанные сайты должны быть выполнены в виде четко видимой гиперссылки без применения каких-либо технических приемов запрещающих индексацию ссылок поисковыми системами либо мешающих прочтению ссылок посетителями.</p><p>Все отступления от данного порядка возможны лишь при наличии письменного согласия Администрации сайта Наш сайт.&nbsp;</p><p>&nbsp;</p><p><strong>Связаться с администрацией сайта:</strong></p><p>Если у Вас возникли какие-либо вопросы по вышеприведенным положениям, по работе сайта или по Вашим взаимодействиям с сайтом, Вы можете связаться с нами через&nbsp;форму обратной связи</p>', '<p>Info</p>'),
(2, 'Пользовательское соглашение', 'User agreement', '<p><strong>&nbsp;1. Общие положения&nbsp;</strong></p><p>1.1. Настоящее пользовательское соглашение (далее – «Соглашение») определяет условия использования Сайта {вставьте название сайта} (далее - «Сайт») и означает, что пользователь выражает свое согласие со всеми условиями использования ресурса.</p><p>1.2. Если Пользователь не согласен с условиями Соглашения в полной мере, он не имеет права использовать данный ресурс.</p><p>&nbsp;</p><p><strong>2. Термины и определения&nbsp;</strong></p><p>2.1. «Сайт» - Интернет-ресурс, который представляет из себя совокупность содержащихся в интернете веб-страниц, объединенных в домене {вставьте название сайта}</p><p>2.2. «Пользователь» - лицо, использующее Сайт.</p><p>2.3. «Содержание» - охраняемые результаты интеллектуальной деятельности, включающие текстовые, графические, аудиовизуальные материалы, которые представлены на Сайте.</p><p>&nbsp;</p><p><strong>3. Ограничения</strong>&nbsp;</p><p>3.1. Сайт предназначен только для лиц, достигших 18 лет.</p><p>3.2. Сайт предназначен исключительно для предоставления информации о законных эскорт услугах, он не поддерживает и препятствует любым формам незаконной деятельности, включая, но не ограничиваясь проституцией, торговлей людьми или другим незаконными сексуальными деятельностями.</p><p>&nbsp;</p><p><strong>4. Права и обязательства&nbsp;</strong></p><p>4.1. Пользователь обязуется не нарушать национальное и международное законодательство при использовании Сайта.</p><p>4.2. Пользователи могут размещать информацию строго в рамках положений законодательства о рекламе, защите персональных данных и интеллектуальной собственности.</p><p>4.3. Сайт обладает правом изменять условия Соглашения, отключать и оставлять доступ к услугам Сайта без предварительного уведомления и объяснения причин.</p><p>&nbsp;</p><p><strong>5. Ответственность&nbsp;</strong></p><p>5.1. Сайт не несет ответственности за возможные последствия, связанные с использованием или невозможностью использования Сайта, вплоть до потери возможности входа в Интернет.</p><p>5.2. Сайт не несет ответственности за любые убытки и ущерб, возникшие в рамках предоставления услуг на Сайте.</p><p>&nbsp;</p><p><strong>6. Заключительные положения&nbsp;</strong></p><p>6.1. Настоящее Соглашение составлено в соответствии с законодательством страны регистрации Сайта и международным законодательством в интернете.</p><p>6.2. Все вопросы и предложения должны быть направлены на электронный адрес, указанный на Сайте.</p><p>&nbsp;</p><p><strong>7. Помощь и поддержка пользователей&nbsp;</strong></p><p>7.1. Пользователи могут обратиться за поддержкой или получить ответы на свои вопросы, связанные с использованием Сайта, путем обращения через форму обратной связи на Сайте или по указанному электронному адресу поддержки.</p><p>7.2. Все запросы поддержки обрабатываются в порядке очередности, в коммерчески разумные сроки.</p><p>&nbsp;</p><p><strong>8. Конфиденциальность&nbsp;</strong></p><p>8.1. Сайт уважает и признает важность конфиденциальности пользователей. Ответственное обращение с персональной информацией осуществляется в соответствии с Политикой конфиденциальности Сайта.</p><p>8.2. Данные пользователя не передаются третьим лицам за исключением случаев, прямо предусмотренных законодательством.</p><p>&nbsp;</p><p><strong>9. Прочие условия&nbsp;</strong></p><p>9.1. В случае если одно из условий данного Соглашения окажется недействительным или неприменимым, это не повлияет на действительность или способность к применению остальных условий.</p><p>9.2. Отсутствие действий со стороны Сайта в случае нарушения Пользователем условий Соглашения не отменяет право Сайта предпринять соответствующие действия за защиту своих интересов позднее.</p><p>9.3. Все права на Сайт и его содержание принадлежат владельцу Сайта, если не указано иное.</p><p>&nbsp;</p><p><strong>10. Авторское право&nbsp;</strong></p><p>10.1. Пользователь признает и соглашается, что все материалы Сайта (видео, аудио, тексты и прочее) защищены законами об авторских правах, товарных знаках, патентах и других правах собственности и охранных знаках в соответствии с международным законодательством и законами {вставьте название страны}.</p><p>&nbsp;</p><p><strong>11. Приемлемость условий&nbsp;</strong></p><p>11.1. Использование Пользователем данного Сайта означает его полное и безоговорочное согласие с условиями данного Соглашения.</p><p>11.2. Если Пользователь не согласен с данным Соглашением или его любой частью, он обязан прекратить использование Сайта.</p>', '<p>Info</p>'),
(3, 'Как поднять позицию анкеты?', 'How to raise the position of the questionnaire?', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `photo_url` varchar(500) NOT NULL,
  `type` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 2,
  `is_main` tinyint(1) NOT NULL DEFAULT 0,
  `update_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `piercings`
--

CREATE TABLE `piercings` (
  `id` int(11) NOT NULL,
  `piercing` varchar(250) NOT NULL,
  `piercing_eng` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `piercings`
--

INSERT INTO `piercings` (`id`, `piercing`, `piercing_eng`) VALUES
(1, 'Нет', 'No'),
(2, 'Живот', 'Belly'),
(3, 'Брови', 'Eyebrow'),
(4, 'Гениталии', 'Genitals'),
(5, 'Рот', 'Mouth area'),
(6, 'Нос', 'Nose'),
(7, 'Соски', 'Nipples'),
(8, 'Язык', 'Tongue');

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` int(11) NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `balance` int(11) NOT NULL,
  `is_confirmed` tinyint(1) NOT NULL DEFAULT 0,
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `proposals`
--

CREATE TABLE `proposals` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `place` varchar(500) NOT NULL,
  `min_price` int(11) NOT NULL,
  `max_price` int(11) NOT NULL,
  `description` text NOT NULL,
  `contact` varchar(250) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `proposal_places`
--

CREATE TABLE `proposal_places` (
  `id` int(11) NOT NULL,
  `place` varchar(250) NOT NULL,
  `place_eng` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `proposal_views`
--

CREATE TABLE `proposal_views` (
  `id` int(11) NOT NULL,
  `proposal_id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pubis_hairs`
--

CREATE TABLE `pubis_hairs` (
  `id` int(11) NOT NULL,
  `pubis_hair` varchar(250) NOT NULL,
  `pubis_hair_eng` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `pubis_hairs`
--

INSERT INTO `pubis_hairs` (`id`, `pubis_hair`, `pubis_hair_eng`) VALUES
(1, 'Бритый', 'Shaved'),
(2, 'Подстриженный', 'Trimmed'),
(3, 'Естественный', 'Natural');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `service` varchar(500) NOT NULL,
  `service_category_id` int(11) NOT NULL,
  `service_eng` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `service`, `service_category_id`, `service_eng`) VALUES
(1, 'Классический', 1, 'Classic vaginal sex'),
(2, 'Анальный', 1, 'Anal'),
(3, 'Лесбийский', 1, 'Lesbian sex'),
(4, 'Групповой (МЖМ)', 1, 'Group sex MFM'),
(5, 'Групповой (ЖМЖ)', 1, 'Group sex FMF'),
(6, 'С игрушками', 1, 'Sex toys'),
(7, 'В авто', 1, 'Sex in a car'),
(8, 'Минет в презервативе', 2, 'Oral with condom'),
(9, 'Минет без презерватива', 2, 'Oral without condom'),
(10, 'Глубокий минет', 2, 'Deepthroat'),
(11, 'Минет в авто', 2, 'Oral in a car'),
(12, 'Анилингус', 2, 'Analysis'),
(13, 'Фистинг', 2, 'Fisting'),
(14, 'Поцелуи', 2, 'French kissing'),
(15, 'Куннилингус', 3, 'Cunnilingus'),
(16, 'Анилингус', 3, 'Analysis'),
(17, 'Фистинг вагинальный', 3, 'Vaginal fisting'),
(18, 'Фистинг анальный', 3, 'Anal fisting'),
(19, 'В рот', 4, 'Cum in mouth'),
(20, 'На грудь', 4, 'Cum on body'),
(21, 'На лицо', 4, 'Cum in face'),
(22, 'Легкая доминация', 5, 'Domination'),
(23, 'Госпожа', 5, 'Mistress'),
(24, 'Порка', 5, 'Spanking'),
(25, 'Трамплинг', 5, 'Trampling'),
(26, 'Фейсситтинг', 5, 'Facesitting'),
(27, 'Страпон', 5, 'Strapon service'),
(28, 'Бондаж', 5, 'Bondage'),
(29, 'Рабыня', 5, 'A slave'),
(30, 'Ролевые игры', 5, 'Role-play'),
(31, 'Фут-фетиш', 5, 'Foot fetish'),
(32, 'Зол.дождь выдача', 5, 'Golden shower give'),
(33, 'Зол.дождь прием', 5, 'Golden shower receive'),
(34, 'Копро выдача', 5, 'Copro give'),
(35, 'Копро прием', 5, 'Copro receive'),
(36, 'Клизма', 5, 'Enema'),
(37, 'Расслабляющий', 6, 'Relaxing massage'),
(38, 'Профессиональный', 6, 'Professional massage'),
(39, 'Массаж телом', 6, 'Body massage'),
(40, 'Массаж лингамо (члена)', 6, 'Penis massage'),
(41, 'В четыре руки', 6, '4-hand massage'),
(42, 'Урологический', 6, 'Urological massage'),
(43, 'Стриптиз профи', 7, 'Professional striptease'),
(44, 'Стриптиз любительский', 7, 'Amateur striptease'),
(45, 'Танец живота', 7, 'Belly dancing'),
(46, 'Тверк', 7, 'Twerking'),
(47, 'Лесби-шоу', 7, 'Lesbian shows'),
(48, 'Секс-чат', 8, 'Sex chat'),
(49, 'Секс по телефону', 8, 'Phone sex'),
(50, 'Секс по видео', 8, 'Video with sex'),
(51, 'Отправка фото/видео', 8, 'Sending photos/videos'),
(52, 'Подругу', 9, 'Girlfirend'),
(53, 'Друга', 9, 'Friend'),
(54, 'Эскорт', 10, 'Escort'),
(55, 'Фотосъемка', 10, 'Photography'),
(56, 'Сквирт', 10, 'Squirting');

-- --------------------------------------------------------

--
-- Table structure for table `service_categories`
--

CREATE TABLE `service_categories` (
  `id` int(11) NOT NULL,
  `service_category` varchar(250) NOT NULL,
  `service_category_eng` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `service_categories`
--

INSERT INTO `service_categories` (`id`, `service_category`, `service_category_eng`) VALUES
(1, 'Секс', 'Sex'),
(2, 'Ласки клиенту', 'Petting the client'),
(3, 'Ласки путане', 'Petting a prostitute'),
(4, 'Окончание', 'Ending'),
(5, 'BDSM и фетиш', 'BDSM and fetish'),
(6, 'Эротический массаж', 'Erotic massage'),
(7, 'Шоу', 'Show'),
(8, 'Вирт', 'Virtual'),
(9, 'Могу позвать', 'I can call a'),
(10, 'Дополнительно', 'Additionally');

-- --------------------------------------------------------

--
-- Table structure for table `site_languages`
--

CREATE TABLE `site_languages` (
  `id` int(11) NOT NULL,
  `language` varchar(25) NOT NULL,
  `flag` text NOT NULL,
  `is_enable` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `site_languages`
--

INSERT INTO `site_languages` (`id`, `language`, `flag`, `is_enable`) VALUES
(1, 'RU', '/images/flags/russia.svg', 1),
(2, 'EN', '/images/flags/great_britain.svg', 1),
(3, 'ES', '/images/flags/spain.svg', 0),
(4, 'CH', '/images/flags/china.svg', 0),
(5, 'FR', '/images/flags/france.svg', 0),
(6, 'AR', '/images/flags/arab.svg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `smookers`
--

CREATE TABLE `smookers` (
  `id` int(11) NOT NULL,
  `smooker` varchar(50) NOT NULL,
  `smooker_eng` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `smookers`
--

INSERT INTO `smookers` (`id`, `smooker`, `smooker_eng`) VALUES
(1, 'Да', 'Yes'),
(2, 'Нет', 'No'),
(3, 'Редко', 'Sometimes');

-- --------------------------------------------------------

--
-- Table structure for table `tarifs`
--

CREATE TABLE `tarifs` (
  `id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `work_duration_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `meeting_place_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tatoos`
--

CREATE TABLE `tatoos` (
  `id` int(11) NOT NULL,
  `tatoo` varchar(50) NOT NULL,
  `tatoo_eng` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `tatoos`
--

INSERT INTO `tatoos` (`id`, `tatoo`, `tatoo_eng`) VALUES
(1, 'Да', 'Yes'),
(2, 'Нет', 'No');

-- --------------------------------------------------------

--
-- Table structure for table `trips`
--

CREATE TABLE `trips` (
  `id` int(11) NOT NULL,
  `trip` varchar(250) NOT NULL,
  `trip_eng` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `trips`
--

INSERT INTO `trips` (`id`, `trip`, `trip_eng`) VALUES
(1, 'Нет', 'No'),
(2, 'Европа', 'Europe'),
(3, 'По России', 'Countrywide'),
(4, 'Всемирный', 'Worldwide'),
(5, 'Азия', 'Asia');

-- --------------------------------------------------------

--
-- Table structure for table `undergrounds`
--

CREATE TABLE `undergrounds` (
  `id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `underground` varchar(500) NOT NULL,
  `underground_eng` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `undergrounds`
--

INSERT INTO `undergrounds` (`id`, `city_id`, `underground`, `underground_eng`) VALUES
(1, 1, 'Московское', 'Moscow'),
(2, 9, 'Лондонское', 'London'),
(3, 4, 'Проспект Космонавтов', 'Cosmonauts Avenue'),
(4, 4, 'Уралмаш', 'Uralmash'),
(5, 4, 'Машиностроителей', 'Machine builders'),
(6, 4, 'Уральская', 'Uralskaya'),
(7, 4, 'Динамо', 'Dynamo'),
(8, 4, 'Верх-Исетская', 'Verkh-Isetskaya'),
(9, 4, 'Площадь 1905', 'Area 1905'),
(10, 4, 'Волгоградская', 'Volgograd'),
(11, 4, 'Калиновская', 'Kalinovskaya'),
(12, 4, 'Геологическая', 'Geological'),
(13, 4, 'Чкаловская', 'Chkalovskaya'),
(14, 4, 'Ботаническая', 'Botanical');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `login` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `type`) VALUES
(100000000, 'admin', 'y6f70n2f4f', 0),
(200000000, 'content-maker', 'lbKLGHU5_X', 1);

-- --------------------------------------------------------

--
-- Table structure for table `verification`
--

CREATE TABLE `verification` (
  `id` int(11) NOT NULL,
  `agency_id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `verification_key` varchar(100) DEFAULT NULL,
  `attempts_number` int(11) NOT NULL DEFAULT 5,
  `last_try` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `video_url` varchar(500) NOT NULL,
  `status` int(11) DEFAULT 2
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `work_durations`
--

CREATE TABLE `work_durations` (
  `id` int(11) NOT NULL,
  `work_duration` varchar(250) NOT NULL,
  `work_duration_eng` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Dumping data for table `work_durations`
--

INSERT INTO `work_durations` (`id`, `work_duration`, `work_duration_eng`) VALUES
(1, '30 минут', '30 minutes'),
(2, '1 час', '1 hour'),
(3, '2 часа', '2 hours'),
(4, '12 часов', '12 hours'),
(5, '24 часа', '24 hours');

-- --------------------------------------------------------

--
-- Table structure for table `work_times`
--

CREATE TABLE `work_times` (
  `id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `time_start` varchar(5) NOT NULL,
  `time_end` varchar(5) NOT NULL,
  `is_all_day` tinyint(1) NOT NULL DEFAULT 0,
  `day_of_week_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blacklist`
--
ALTER TABLE `blacklist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blacklist_access`
--
ALTER TABLE `blacklist_access`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blocked_countries`
--
ALTER TABLE `blocked_countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `breast_sizes`
--
ALTER TABLE `breast_sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `breast_types`
--
ALTER TABLE `breast_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `currencies`
--
ALTER TABLE `currencies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `days_of_week`
--
ALTER TABLE `days_of_week`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deleted_profiles`
--
ALTER TABLE `deleted_profiles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `districts`
--
ALTER TABLE `districts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ethnic_groups`
--
ALTER TABLE `ethnic_groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ethnic_groups_full`
--
ALTER TABLE `ethnic_groups_full`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `eyes_colors`
--
ALTER TABLE `eyes_colors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hair_colors`
--
ALTER TABLE `hair_colors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hair_sizes`
--
ALTER TABLE `hair_sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `languages_full`
--
ALTER TABLE `languages_full`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `meetings`
--
ALTER TABLE `meetings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `meeting_places`
--
ALTER TABLE `meeting_places`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `models`
--
ALTER TABLE `models`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_feedbacks`
--
ALTER TABLE `model_feedbacks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_languages`
--
ALTER TABLE `model_languages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_piercings`
--
ALTER TABLE `model_piercings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_proposal_places`
--
ALTER TABLE `model_proposal_places`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_services`
--
ALTER TABLE `model_services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_types`
--
ALTER TABLE `model_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_views`
--
ALTER TABLE `model_views`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nationalities`
--
ALTER TABLE `nationalities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nationalities_full`
--
ALTER TABLE `nationalities_full`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orientations`
--
ALTER TABLE `orientations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `piercings`
--
ALTER TABLE `piercings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `proposals`
--
ALTER TABLE `proposals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `proposal_places`
--
ALTER TABLE `proposal_places`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `proposal_views`
--
ALTER TABLE `proposal_views`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pubis_hairs`
--
ALTER TABLE `pubis_hairs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service_categories`
--
ALTER TABLE `service_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `site_languages`
--
ALTER TABLE `site_languages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `smookers`
--
ALTER TABLE `smookers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tarifs`
--
ALTER TABLE `tarifs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tatoos`
--
ALTER TABLE `tatoos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trips`
--
ALTER TABLE `trips`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `undergrounds`
--
ALTER TABLE `undergrounds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `verification`
--
ALTER TABLE `verification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `work_durations`
--
ALTER TABLE `work_durations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `work_times`
--
ALTER TABLE `work_times`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blacklist`
--
ALTER TABLE `blacklist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blacklist_access`
--
ALTER TABLE `blacklist_access`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blocked_countries`
--
ALTER TABLE `blocked_countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `breast_sizes`
--
ALTER TABLE `breast_sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `breast_types`
--
ALTER TABLE `breast_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `currencies`
--
ALTER TABLE `currencies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `days_of_week`
--
ALTER TABLE `days_of_week`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `deleted_profiles`
--
ALTER TABLE `deleted_profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `districts`
--
ALTER TABLE `districts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `ethnic_groups`
--
ALTER TABLE `ethnic_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `ethnic_groups_full`
--
ALTER TABLE `ethnic_groups_full`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `eyes_colors`
--
ALTER TABLE `eyes_colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `hair_colors`
--
ALTER TABLE `hair_colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hair_sizes`
--
ALTER TABLE `hair_sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `languages_full`
--
ALTER TABLE `languages_full`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `meetings`
--
ALTER TABLE `meetings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `meeting_places`
--
ALTER TABLE `meeting_places`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `models`
--
ALTER TABLE `models`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `model_feedbacks`
--
ALTER TABLE `model_feedbacks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `model_languages`
--
ALTER TABLE `model_languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `model_piercings`
--
ALTER TABLE `model_piercings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `model_proposal_places`
--
ALTER TABLE `model_proposal_places`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `model_services`
--
ALTER TABLE `model_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `model_types`
--
ALTER TABLE `model_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `model_views`
--
ALTER TABLE `model_views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nationalities`
--
ALTER TABLE `nationalities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `nationalities_full`
--
ALTER TABLE `nationalities_full`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `orientations`
--
ALTER TABLE `orientations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `piercings`
--
ALTER TABLE `piercings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `proposals`
--
ALTER TABLE `proposals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `proposal_places`
--
ALTER TABLE `proposal_places`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `proposal_views`
--
ALTER TABLE `proposal_views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pubis_hairs`
--
ALTER TABLE `pubis_hairs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `service_categories`
--
ALTER TABLE `service_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `site_languages`
--
ALTER TABLE `site_languages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `smookers`
--
ALTER TABLE `smookers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tarifs`
--
ALTER TABLE `tarifs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tatoos`
--
ALTER TABLE `tatoos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `trips`
--
ALTER TABLE `trips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `undergrounds`
--
ALTER TABLE `undergrounds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483648;

--
-- AUTO_INCREMENT for table `verification`
--
ALTER TABLE `verification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `work_durations`
--
ALTER TABLE `work_durations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `work_times`
--
ALTER TABLE `work_times`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
