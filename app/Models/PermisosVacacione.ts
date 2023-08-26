import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PermisosVacacione extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fecha_inicio : Date

  @column()
  public fecha_fin : Date

  @column()
  public motivo : string

  @column()
  public usuario_id : number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  
}
