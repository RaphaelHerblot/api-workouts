<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210221192122 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE exercices (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, instructions VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, thumbnail VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE exercices_muscles (exercices_id INT NOT NULL, muscles_id INT NOT NULL, INDEX IDX_935FD512192C7251 (exercices_id), INDEX IDX_935FD5122B48856B (muscles_id), PRIMARY KEY(exercices_id, muscles_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE workouts (id INT AUTO_INCREMENT NOT NULL, author_id INT NOT NULL, level_id INT NOT NULL, goal_id INT NOT NULL, training_place_id INT NOT NULL, title VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, thumbnail VARCHAR(255) DEFAULT NULL, equipements VARCHAR(255) NOT NULL, average_time INT NOT NULL, series INT NOT NULL, amount_likes INT NOT NULL, amount_favorites INT NOT NULL, INDEX IDX_A56140E0F675F31B (author_id), INDEX IDX_A56140E05FB14BA7 (level_id), INDEX IDX_A56140E0667D1AFE (goal_id), INDEX IDX_A56140E0EAC3B18E (training_place_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE workouts_exercices (workouts_id INT NOT NULL, exercices_id INT NOT NULL, INDEX IDX_BEB9196656F0BFE (workouts_id), INDEX IDX_BEB91966192C7251 (exercices_id), PRIMARY KEY(workouts_id, exercices_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE exercices_muscles ADD CONSTRAINT FK_935FD512192C7251 FOREIGN KEY (exercices_id) REFERENCES exercices (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE exercices_muscles ADD CONSTRAINT FK_935FD5122B48856B FOREIGN KEY (muscles_id) REFERENCES muscles (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE workouts ADD CONSTRAINT FK_A56140E0F675F31B FOREIGN KEY (author_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE workouts ADD CONSTRAINT FK_A56140E05FB14BA7 FOREIGN KEY (level_id) REFERENCES level (id)');
        $this->addSql('ALTER TABLE workouts ADD CONSTRAINT FK_A56140E0667D1AFE FOREIGN KEY (goal_id) REFERENCES goal (id)');
        $this->addSql('ALTER TABLE workouts ADD CONSTRAINT FK_A56140E0EAC3B18E FOREIGN KEY (training_place_id) REFERENCES training_places (id)');
        $this->addSql('ALTER TABLE workouts_exercices ADD CONSTRAINT FK_BEB9196656F0BFE FOREIGN KEY (workouts_id) REFERENCES workouts (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE workouts_exercices ADD CONSTRAINT FK_BEB91966192C7251 FOREIGN KEY (exercices_id) REFERENCES exercices (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE exercices_muscles DROP FOREIGN KEY FK_935FD512192C7251');
        $this->addSql('ALTER TABLE workouts_exercices DROP FOREIGN KEY FK_BEB91966192C7251');
        $this->addSql('ALTER TABLE workouts_exercices DROP FOREIGN KEY FK_BEB9196656F0BFE');
        $this->addSql('DROP TABLE exercices');
        $this->addSql('DROP TABLE exercices_muscles');
        $this->addSql('DROP TABLE workouts');
        $this->addSql('DROP TABLE workouts_exercices');
    }

    public function isTransactional(): bool
    {
        return false;
    }
}
