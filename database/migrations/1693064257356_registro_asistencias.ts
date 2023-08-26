import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'registro_asistencias'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.date("fecha")
      table.time("hora_entrada")
      table.time("hora_salida")
      table.string("foto", 255)  
      table.integer("horas_trabajadas")
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
