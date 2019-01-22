<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190122222945 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE education');
        $this->addSql('DROP TABLE experience');
        $this->addSql('DROP TABLE project');
        $this->addSql('DROP TABLE skill');
        $this->addSql('DROP TABLE social_network');
        $this->addSql('ALTER TABLE post DROP cover_image_url, DROP page_views');
        $this->addSql('ALTER TABLE freelancer DROP title, DROP description, DROP address');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE education (id INT AUTO_INCREMENT NOT NULL, freelancer_id INT DEFAULT NULL, degree VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, date_range VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, university VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, INDEX IDX_DB0A5ED28545BDF5 (freelancer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE experience (id INT AUTO_INCREMENT NOT NULL, freelancer_id INT DEFAULT NULL, date_range VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, company VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, description LONGTEXT NOT NULL COLLATE utf8_unicode_ci, job_title VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, INDEX IDX_590C1038545BDF5 (freelancer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE project (id INT AUTO_INCREMENT NOT NULL, freelancer_id INT DEFAULT NULL, title VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, tag VARCHAR(65) NOT NULL COLLATE utf8_unicode_ci, short_description VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, description LONGTEXT DEFAULT NULL COLLATE utf8_unicode_ci, cover_image_style_size INT DEFAULT NULL, cover_image_url VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci, inner_image_url VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci, link VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci, update_at DATETIME DEFAULT NULL, INDEX IDX_2FB3D0EE8545BDF5 (freelancer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE skill (id INT AUTO_INCREMENT NOT NULL, freelancer_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, score INT NOT NULL, INDEX IDX_5E3DE4778545BDF5 (freelancer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('CREATE TABLE social_network (id INT AUTO_INCREMENT NOT NULL, freelancer_id INT DEFAULT NULL, icon VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, link VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, name VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci, INDEX IDX_EFFF52218545BDF5 (freelancer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE education ADD CONSTRAINT FK_DB0A5ED28545BDF5 FOREIGN KEY (freelancer_id) REFERENCES freelancer (id)');
        $this->addSql('ALTER TABLE experience ADD CONSTRAINT FK_590C1038545BDF5 FOREIGN KEY (freelancer_id) REFERENCES freelancer (id)');
        $this->addSql('ALTER TABLE project ADD CONSTRAINT FK_2FB3D0EE8545BDF5 FOREIGN KEY (freelancer_id) REFERENCES freelancer (id)');
        $this->addSql('ALTER TABLE skill ADD CONSTRAINT FK_5E3DE4778545BDF5 FOREIGN KEY (freelancer_id) REFERENCES freelancer (id)');
        $this->addSql('ALTER TABLE social_network ADD CONSTRAINT FK_EFFF52218545BDF5 FOREIGN KEY (freelancer_id) REFERENCES freelancer (id)');
        $this->addSql('ALTER TABLE freelancer ADD title VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, ADD description LONGTEXT NOT NULL COLLATE utf8_unicode_ci, ADD address VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci');
        $this->addSql('ALTER TABLE post ADD cover_image_url VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci, ADD page_views INT DEFAULT NULL');
    }
}
