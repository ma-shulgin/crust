const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class statemine1640805309216 {
    name = 'statemine1640805309216'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "work_report" ("id" character varying NOT NULL, "added_files" jsonb, "deleted_files" jsonb, "extrinisic_id" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "block_hash" text NOT NULL, "block_num" integer NOT NULL, "account_id" character varying NOT NULL, CONSTRAINT "PK_d3963847f6d836c01111b720a9a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_009fa77c8c70a39a67a25f3f56" ON "work_report" ("account_id") `);
        await queryRunner.query(`CREATE TABLE "account" ("id" character varying NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "work_report" ADD CONSTRAINT "FK_009fa77c8c70a39a67a25f3f567" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "work_report" DROP CONSTRAINT "FK_009fa77c8c70a39a67a25f3f567"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_009fa77c8c70a39a67a25f3f56"`);
        await queryRunner.query(`DROP TABLE "work_report"`);
    }
}
