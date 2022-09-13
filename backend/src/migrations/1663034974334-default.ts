import { MigrationInterface, QueryRunner } from "typeorm";

export class default1663034974334 implements MigrationInterface {
  name = "default1663034974334";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "movies" ("id" SERIAL NOT NULL, "movieName" text NOT NULL, "category" text NOT NULL, "description" text NOT NULL, "duration" text NOT NULL, "releaseDate" text NOT NULL, "url" text NOT NULL, CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "movies"`);
  }
}
