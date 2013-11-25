--
-- Table structure for table `cf_{{moduleplural}}_{{moduleplural}}`
--

DROP TABLE IF EXISTS `cf_{{moduleplural}}_{{moduleplural}}`;
CREATE TABLE IF NOT EXISTS `cf_{{moduleplural}}_{{moduleplural}}` (
  `model_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`model_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `go_links_{{moduleplural}}_{{moduleplural}}`
--

DROP TABLE IF EXISTS `go_links_{{moduleplural}}_{{moduleplural}}`;
CREATE TABLE IF NOT EXISTS `go_links_{{moduleplural}}_{{moduleplural}}` (
  `id` int(11) NOT NULL,
  `folder_id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `model_type_id` int(11) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `ctime` int(11) NOT NULL,
  KEY `link_id` (`model_id`,`model_type_id`),
  KEY `id` (`id`,`folder_id`),
  KEY `ctime` (`ctime`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------


--
-- Table structure for table `{{moduleplural}}_categories`
--

DROP TABLE IF EXISTS `{{moduleplural}}_categories`;
CREATE TABLE IF NOT EXISTS `{{moduleplural}}_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `acl_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `files_folder_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `{{moduleplural}}_{{moduleplural}}`
--

DROP TABLE IF EXISTS `{{moduleplural}}_{{moduleplural}}`;
CREATE TABLE IF NOT EXISTS `{{moduleplural}}_{{moduleplural}}` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `ctime` int(11) NOT NULL DEFAULT '0',
  `mtime` int(11) NOT NULL DEFAULT '0',
	`muser_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(100) DEFAULT NULL,
  `content` text,
  `files_folder_id` int(11) NOT NULL DEFAULT '0',
	`password` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `category_id` (`category_id`),
  FULLTEXT KEY `content` (`content`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------
