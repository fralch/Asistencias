import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class HorariosLaborale extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public entrada_manana : DateTime

  @column()
  public salida_manana : DateTime

  @column()
  public entrada_tarde : DateTime

  @column()
  public salida_tarde : DateTime

  @column()
  public usuario_id : number
  


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
