-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: za-ticketing-db
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `event_id` varchar(255) NOT NULL,
  `event_name` varchar(255) NOT NULL,
  `event_date` date DEFAULT NULL,
  `event_time` time DEFAULT NULL,
  `event_location` varchar(255) DEFAULT NULL,
  `event_description` text,
  `banner_url` text,
  `rank_score` int DEFAULT NULL,
  PRIMARY KEY (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES ('ev1','Concert Anh trai vượt ngàn chông gai - D6','2025-06-28','20:00:00','Hà Nội','Đỉnh nóc kịch trần bay phấp phới, hãy đến với concert ATVNCG D6.','https://salt.tkbcdn.com/ts/ds/23/f2/8c/da6aee269301e6142fafc511a801be51.jpg',10),('ev10','BURNING SOUND #3: SOOBIN','2025-07-07','20:00:00','Hà Nội','Burning Sound #3 hứa hẹn sẽ là đêm nhạc bùng nổ với sự tham gia của Soobin, một trong những nghệ sĩ hàng đầu tại Việt Nam.','https://salt.tkbcdn.com/ts/ds/15/eb/b6/79f4f5bd0c7e3d0f5ec704be2b1fd317.png',9),('ev2','EXID 2025 FANCON IN VIET NAM','2025-07-10','21:00:00','TP. Hồ Chí Minh','EXID trở lại Việt Nam với fan concert đầy sôi động và cuồng nhiệt, nơi bạn sẽ gặp lại các cô gái tài năng của nhóm.','https://salt.tkbcdn.com/ts/ds/f0/56/d6/66e53d7f3faaff7b62f88df2882fc934.jpg',7),('ev3','Những Thành Phố Mơ Màng Summer 2025','2025-06-28','16:30:00','TP. Hồ Chí Minh','Một chương trình âm nhạc với chủ đề Những Thành Phố Mơ Màng, mang đến những trải nghiệm nghệ thuật và âm nhạc đầy cảm hứng.','https://salt.tkbcdn.com/ts/ds/e5/8b/6e/26498e22f3f398614a542dc847ebb45d.png',6),('ev4','Lễ hội âm nhạc & sáng tạo Tràng An - Ninh Bình \"FORESTIVAL\" 2025','2025-07-22','20:30:00','TP. Ninh Bình','FORESTIVAL là sự kiện âm nhạc và sáng tạo tại Tràng An, nơi hội tụ những tài năng nghệ sĩ với không gian thiên nhiên tuyệt đẹp của Ninh Bình.','https://salt.tkbcdn.com/ts/ds/54/89/88/8514f83803c10102dd8b61658602431a.jpg',5),('ev5','HARMONY SHOW \"MÙA HÈ TRỞ LẠI\" | DALAB - BẢO ANH - KAI ĐINH','2025-05-08','18:00:00','Hạ Long','HARMONY SHOW mang đến mùa hè sôi động với sự tham gia của những nghệ sĩ nổi tiếng như Dalab, Bảo Anh, và Kai Đinh.','https://salt.tkbcdn.com/ts/ds/8a/a3/1f/ed4eaf99be013c372e9521c26067d852.jpg',2),('ev6','LEGEND FEST 2025 IN DONG HOI','2025-07-17','18:30:00','Đồng Hới','Legend Fest sẽ mang đến cho bạn những màn trình diễn âm nhạc đỉnh cao trong không gian huyền bí của Đồng Hới.','https://salt.tkbcdn.com/ts/ds/e1/2e/e4/d44ef776f3273453a872ac80ab5aa540.jpg',3),('ev7','GAI CONCERT IN HANOI','2025-07-24','22:00:00','Hà Nội','Cùng gặp gỡ và thưởng thức những bản hit sôi động của GAI tại Hà Nội trong một đêm nhạc không thể bỏ qua.','https://salt.tkbcdn.com/ts/ds/9d/d2/9f/43bceb9318f0a34e981ad3b6d424aada.jpg',6),('ev8','The “Traditional Water Puppet Show” - Múa rối nước','2025-06-17','19:00:00','Hà Nội','Chương trình Múa rối nước truyền thống sẽ mang lại những giây phút thú vị và hấp dẫn cho khán giả, đặc biệt là du khách quốc tế.','https://salt.tkbcdn.com/ts/ds/03/21/08/2aff26681043246ebef537f075e2f861.png',4),('ev9','\"REQUIEM WORLD TOUR\" FEATURING KESHI','2025-06-30','10:00:00','TP. Hồ Chí Minh','Keshi trở lại với tour diễn Requiem World Tour, mang đến cho bạn những giai điệu nhẹ nhàng nhưng đầy cảm xúc.','https://salt.tkbcdn.com/ts/ds/95/cf/d9/1ac481c86518d985464819d6248630a4.png',8);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-13 10:01:07
