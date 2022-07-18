import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUseAddAvatar1658152146801 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
