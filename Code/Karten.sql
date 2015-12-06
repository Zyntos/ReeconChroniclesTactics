-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 23. November 2015 um 20:06
-- Server Version: 5.5.27
-- PHP-Version: 5.3.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `Karten`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `card`
--

CREATE TABLE IF NOT EXISTS `card` (
  `ID` int(10) unsigned NOT NULL,
  `name` varchar(128) NOT NULL,
  `mana` int(11) NOT NULL,
  `range` int(11) NOT NULL,
  `direction` varchar(16) NOT NULL DEFAULT 'linear',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `card`
--

INSERT INTO `card` (`ID`, `name`, `mana`, `range`, `direction`) VALUES
(1, 'Feuerball', 2, 2, 'diagonal'),
(2, 'Geschenk des Himmels', 1, 0, ''),
(3, 'Eisball', 3, 2, 'radial'),
(4, 'Zauberl&auml;hmung', 3, 2, 'linear'),
(5, 'Donnerschuss', 4, 2, 'linear'),
(6, 'Tobendes Inferno', 4, 2, 'radial'),
(7, 'Segnung', 3, 0, ''),
(8, 'Topf der Gier', 4, 0, ''),
(9, 'Wiederholen', 8, 0, ''),
(10, 'Zauberreproduktion', 5, 0, ''),
(11, 'Schneller Einfall', 3, 0, ''),
(12, 'Hammerschlag', 6, 2, 'linear'),
(13, 'Eispfeil', 1, 4, 'linear'),
(14, 'Grollendes Heulen', 3, 8, 'radial'),
(15, 'Axthieb', 4, 4, 'linear'),
(16, 'Ausbluten', 8, 2, 'linear'),
(17, 'Elektrischer Schock', 5, 4, 'diagonal'),
(18, 'Zauberrecycling', 1, 0, ''),
(19, 'Apollos', 9, 6, 'radial'),
(20, 'Ragnar&ouml;k', 10, 0, ''),
(21, 'Kriegswissenschaft', 6, 0, '');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `cardeffect`
--

CREATE TABLE IF NOT EXISTS `cardeffect` (
  `cardID` int(11) NOT NULL,
  `effectID` int(11) NOT NULL,
  `value` varchar(128) NOT NULL,
  `target` varchar(16) NOT NULL,
  `duration` int(11) NOT NULL,
  `callback` varchar(1024) NOT NULL,
  `condition` varchar(1024) NOT NULL,
  `trigger` varchar(128) NOT NULL,
  `timerevent` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `cardeffect`
--

INSERT INTO `cardeffect` (`cardID`, `effectID`, `value`, `target`, `duration`, `callback`, `condition`, `trigger`, `timerevent`) VALUES
(1, 1, '3', 'enemy', 0, '', '', '', ''),
(2, 2, '3', 'self', 0, '', '', '', ''),
(3, 3, 'freeze', 'enemy', 1, '', '', '', 'player_phase_move'),
(4, 3, 'silence', 'enemy', 1, '', '', '', 'player_phase_end'),
(5, 1, '2', 'enemy', 0, '', '', '', ''),
(5, 4, '2', 'enemy', 0, '', '', '', ''),
(6, 1, '3', 'self', 0, '', '', '', ''),
(6, 1, '5', 'enemy', 0, '', '', '', ''),
(7, 2, '2', 'self', 0, '', '', '', ''),
(7, 5, '3', 'self', 0, '', '', '', ''),
(7, 6, '', 'self', 1, 'function(player){destroyShield(player, 3);}', '', '', 'player_phase_draw'),
(8, 7, '2', 'self', 0, '', '', '', ''),
(9, 8, '3', 'self', 0, '', '', '', ''),
(9, 8, '3', 'enemy', 0, '', '', '', ''),
(9, 7, '1', 'self', 0, '', '', '', ''),
(9, 7, '1', 'enemy', 0, '', '', '', ''),
(12, 1, '4', 'enemy', 0, '', '', '', ''),
(12, 9, '1-6', 'enemy', 0, '', '', '', ''),
(10, 8, '2', 'self', 0, '', 'function(player,enemy,phase,player_target,card_target){return card_target[''mana''] <= 4;}', '', ''),
(11, 10, '1', 'self', 0, '', '', '', ''),
(13, 1, '1', 'enemy', 0, '', '', '', ''),
(13, 1, '2', 'enemy', 0, '', 'function(player,enemy,phase,player_target,card_target){return hasBuff(player, ''freeze'');}', '', ''),
(14, 3, 'fear', 'enemy', 1, '', '', '', 'player_phase_draw'),
(15, 1, '2', 'enemy', 0, '', '', '', ''),
(16, 1, '6', 'enemy', 0, '', 'function(player,enemy,phase,player_target,card_target){return player_target[''life''] > 15;}', '', ''),
(16, 1, '4', 'enemy', 0, '', '', '', ''),
(17, 1, '3', 'enemy', 0, '', '', '', ''),
(17, 3, 'paralyze', 'enemy', 2, '', '', '', 'player_phase_end'),
(18, 11, '', 'self', 0, '', '', '', ''),
(19, 9, '5-12', 'enemy', 0, '', '', '', ''),
(20, 1, '6', 'enemy', 0, '', '', '', ''),
(20, 12, '3', 'enemy', 0, '', '', '', ''),
(21, 3, 'trigger', 'self', 2, '', '', '"after_damage_enemy",7,1,"self",0', 'player_phase_draw');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `deck`
--

CREATE TABLE IF NOT EXISTS `deck` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `playerID` int(11) NOT NULL,
  `name` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Daten für Tabelle `deck`
--


-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `deckcard`
--

CREATE TABLE IF NOT EXISTS `deckcard` (
  `deckID` int(11) NOT NULL,
  `cardID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `deckcard`
--


-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `effect`
--

CREATE TABLE IF NOT EXISTS `effect` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(128) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Daten für Tabelle `effect`
--

INSERT INTO `effect` (`ID`, `type`) VALUES
(1, 'damage'),
(2, 'heal'),
(3, 'status'),
(4, 'knockback'),
(5, 'shield'),
(6, 'timerevent'),
(7, 'card_draw'),
(8, 'card_graveyard_to_deck'),
(9, 'damage_random'),
(10, 'card_deck_to_hand'),
(11, 'manarecycle'),
(12, 'card_hand_to_graveyard_random');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
