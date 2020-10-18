import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602625145524 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //realizar alteraçoes
        //criar tabela, criar um novo campo, deletar algum campo
        await queryRunner.createTable(new Table({
            name: 'orphanages',
            columns:[
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true, //define que seja um numero positivo
                    isPrimary: true, //define que será chave primaria
                    isGenerated: true, //define que será criada automaticamente
                    generationStrategy: 'increment', //define que será autoincremental
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'latitude',
                    type: 'decimal',
                    scale: 10, //numeros depois da virgula
                    precision: 2, //numeros depois da virgula
                },
                {
                    name: 'longitude',
                    type: 'decimal',
                    scale: 10, //numeros depois da virgula
                    precision: 2, //numeros depois da virgula
                },
                {
                    name: 'about',
                    type: 'text',
                },
                {
                    name:'instructions',
                    type: 'text',
                },
                {
                    name: 'opening_hours',
                    type: 'varchar'
                },
                {
                    name: 'open_on_weekends',
                    type: 'boolean',
                    default: false,
                }
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //desfazer o que foi feito pelo up
        await queryRunner.dropTable('orphanages')
    }

}
