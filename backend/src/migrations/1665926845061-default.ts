import { MigrationInterface, QueryRunner } from "typeorm";

export class default1665926845061 implements MigrationInterface {
    name = 'default1665926845061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "url"`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "movie_url" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "poster_url" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "poster_url"`);
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "movie_url"`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "url" text NOT NULL`);
    }

}
