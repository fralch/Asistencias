import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'horarios_laborales'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.time("hora_entrada")
      table.time("hora_salida")
      table.integer("usuario_id").unsigned().references("id").inTable("usuarios").onDelete("CASCADE")

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
