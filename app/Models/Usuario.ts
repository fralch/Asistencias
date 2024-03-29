import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public nombre: string

  @column()
  public cargo: string

  @column()
  public celular: number

  @column()
  public correo: string

  @column()
  public direccion: string
  
  @column()
  public dni: number

  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  usuario_id: number
}
