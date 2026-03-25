import { MigrationInterface, QueryRunner, TableColumn, TableIndex } from 'typeorm';

export class AddIdempotencyKeyToTips1769950000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tips',
      new TableColumn({
        name: 'idempotencyKey',
        type: 'varchar',
        length: '128',
        isNullable: true,
        isUnique: true,
      }),
    );

    await queryRunner.createIndex(
      'tips',
      new TableIndex({
        name: 'IDX_tips_idempotencyKey',
        columnNames: ['idempotencyKey'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('tips', 'IDX_tips_idempotencyKey');
    await queryRunner.dropColumn('tips', 'idempotencyKey');
  }
}
