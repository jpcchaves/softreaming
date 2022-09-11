import { MigrationInterface, QueryRunner } from "typeorm";

export class default1662921826151 implements MigrationInterface {
    name = 'default1662921826151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "created_at" SET DEFAULT '2022-09-11 15:42:33.226941'`);
    }

}
