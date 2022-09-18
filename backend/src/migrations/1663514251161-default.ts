import { MigrationInterface, QueryRunner } from "typeorm";

export class default1663514251161 implements MigrationInterface {
    name = 'default1663514251161'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "role" text NOT NULL DEFAULT 'client'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    }

}
