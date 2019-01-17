<?php declare(strict_types = 1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20171207034644 extends AbstractMigration
{
    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE project CHANGE cover_image_style_size cover_image_style_size INT DEFAULT NULL, CHANGE cover_image_url cover_image_url VARCHAR(255) DEFAULT NULL, CHANGE inner_image_url inner_image_url VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE project CHANGE cover_image_style_size cover_image_style_size INT NOT NULL, CHANGE cover_image_url cover_image_url VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, CHANGE inner_image_url inner_image_url VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci');
    }
}
