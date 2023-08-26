import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class RegistroAsistencia extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fecha : Date

  @column()
  public hora_entrada : DateTime

  @column()
  public hora_salida : DateTime

  @column()
  public foto : string

  @column()
  public horas_trabajadas : number

  @column()
  public usuario_id : number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  
}
