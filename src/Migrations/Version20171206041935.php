<?php declare(strict_types = 1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20171206041935 extends AbstractMigration
{
    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE freelancer ADD email VARCHAR(255) NOT NULL, ADD username VARCHAR(25) NOT NULL, ADD password VARCHAR(64) NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_4C2ED1E8F85E0677 ON freelancer (username)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP INDEX UNIQ_4C2ED1E8F85E0677 ON freelancer');
        $this->addSql('ALTER TABLE freelancer DROP email, DROP username, DROP password');
    }
}
