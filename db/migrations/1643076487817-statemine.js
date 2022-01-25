const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class statemine1643076487817 {
    name = 'statemine1643076487817'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "work_report" ("id" character varying NOT NULL, "added_files" jsonb, "deleted_files" jsonb, "extrinisic_id" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "block_hash" text NOT NULL, "block_num" integer NOT NULL, "account_id" character varying NOT NULL, CONSTRAINT "PK_d3963847f6d836c01111b720a9a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_009fa77c8c70a39a67a25f3f56" ON "work_report" ("account_id") `);
        await queryRunner.query(`CREATE TABLE "join_group" ("id" character varying NOT NULL, "owner" text NOT NULL, "extrinisic_id" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "block_hash" text NOT NULL, "block_num" integer NOT NULL, "member_id" character varying NOT NULL, CONSTRAINT "PK_2a7b1ecdc60d0cdaa81236728e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f47a3dffdbfc9ae668a9896fe8" ON "join_group" ("member_id") `);
        await queryRunner.query(`CREATE TABLE "storage_order" ("id" character varying NOT NULL, "file_cid" text NOT NULL, "extrinisic_id" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "block_hash" text NOT NULL, "block_num" integer NOT NULL, "account_id" character varying NOT NULL, CONSTRAINT "PK_06e664dc46461836b7750a53b28" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_285777e79378f75ad4645c8c8d" ON "storage_order" ("account_id") `);
        await queryRunner.query(`CREATE TABLE "account" ("id" character varying NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "work_report" ADD CONSTRAINT "FK_009fa77c8c70a39a67a25f3f567" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "join_group" ADD CONSTRAINT "FK_f47a3dffdbfc9ae668a9896fe8b" FOREIGN KEY ("member_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "storage_order" ADD CONSTRAINT "FK_285777e79378f75ad4645c8c8dd" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "storage_order" DROP CONSTRAINT "FK_285777e79378f75ad4645c8c8dd"`);
        await queryRunner.query(`ALTER TABLE "join_group" DROP CONSTRAINT "FK_f47a3dffdbfc9ae668a9896fe8b"`);
        await queryRunner.query(`ALTER TABLE "work_report" DROP CONSTRAINT "FK_009fa77c8c70a39a67a25f3f567"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_285777e79378f75ad4645c8c8d"`);
        await queryRunner.query(`DROP TABLE "storage_order"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f47a3dffdbfc9ae668a9896fe8"`);
        await queryRunner.query(`DROP TABLE "join_group"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_009fa77c8c70a39a67a25f3f56"`);
        await queryRunner.query(`DROP TABLE "work_report"`);
    }
}
