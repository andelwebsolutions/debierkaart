<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221201114426 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE brewery CHANGE location_lat location_lat DOUBLE PRECISION NOT NULL, CHANGE location_lng location_lng DOUBLE PRECISION NOT NULL, CHANGE open_on_days open_on LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE brewery CHANGE location_lat location_lat VARCHAR(255) NOT NULL, CHANGE location_lng location_lng VARCHAR(255) NOT NULL, CHANGE open_on open_on_days LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\'');
    }
}
