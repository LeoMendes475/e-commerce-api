import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateTableOrder1718551259509 implements MigrationInterface {
    name = 'CreateTableOrder1718551259509';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'order',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        length: '36',
                        isPrimary: true,
                    },
                    {
                        name: 'userId',
                        type: 'varchar',
                        length: '36',
                    },
                    {
                        name: 'buyerName',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                    },
                    {
                        name: 'buyerPassport',
                        type: 'varchar',
                        length: '6',
                        isNullable: false,
                    },
                    {
                        name: 'buyerOrganization',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                    },
                    {
                        name: 'orderQuantity',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'productId',
                        type: 'varchar',
                        length: '36',
                        isNullable: false,
                    },
                    {
                        name: 'sellDate',
                        type: 'timestamp',
                        isNullable: false,
                    },
                    {
                        name: 'userCreatedId',
                        type: 'varchar',
                        length: '36',
                    },
                    {
                        name: 'userUpdatedId',
                        type: 'varchar',
                        length: '36',
                        isNullable: true,
                    },
                    {
                        name: 'userDeletedId',
                        type: 'varchar',
                        length: '36',
                        isNullable: true,
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        isNullable: false,
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'deletedAt',
                        type: 'timestamp',
                        isNullable: true,
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'order',
            new TableForeignKey({
                columnNames: ['productId'],
                referencedTableName: 'products',
                referencedColumnNames: ['id'],
            }),
        );

        await queryRunner.createForeignKey(
            'order',
            new TableForeignKey({
                columnNames: ['userId'],
                referencedTableName: 'user',
                referencedColumnNames: ['id'],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('order');
    }
}
