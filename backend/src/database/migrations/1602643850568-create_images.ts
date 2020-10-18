import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602643850568 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({

            name: 'images',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true, //define que seja um numero positivo
                    isPrimary: true, //define que será chave primaria
                    isGenerated: true, //define que será criada automaticamente
                    generationStrategy: 'increment', //define que será autoincremental
                },
                {
                    name: 'path',
                    type: 'varchar',
                },
                {
                    name: 'orphanage_id',
                    type: 'integer',
                }
            ],
            foreignKeys: [
                {
                    name: 'ImageOrphanage',
                    columnNames: ['orphanage_id'],
                    referencedTableName: 'orphanages',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images');
    }

}
