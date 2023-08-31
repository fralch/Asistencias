import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public dni: number

  @column()
  public nombre: string

  @column()
  public apellido: string

  @column()
  public celular: number

  @column()
  public cargo: string

  @column()
  public area: string
  
  @column()
  public coord: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
