<?php declare(strict_types = 1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20171204221446 extends AbstractMigration
{
    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE experience (id INT AUTO_INCREMENT NOT NULL, freelancer_id INT DEFAULT NULL, date_range VARCHAR(255) NOT NULL, company VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, INDEX IDX_590C1038545BDF5 (freelancer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE education (id INT AUTO_INCREMENT NOT NULL, freelancer_id INT DEFAULT NULL, degree VARCHAR(255) NOT NULL, date_range VARCHAR(255) NOT NULL, university VARCHAR(255) NOT NULL, INDEX IDX_DB0A5ED28545BDF5 (freelancer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE experience ADD CONSTRAINT FK_590C1038545BDF5 FOREIGN KEY (freelancer_id) REFERENCES freelancer (id)');
        $this->addSql('ALTER TABLE education ADD CONSTRAINT FK_DB0A5ED28545BDF5 FOREIGN KEY (freelancer_id) REFERENCES freelancer (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE experience');
        $this->addSql('DROP TABLE education');
    }
}
