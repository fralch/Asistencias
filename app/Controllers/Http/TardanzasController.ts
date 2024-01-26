import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tardanza from 'App/Models/Tardanza'
import Usuario from 'App/Models/Usuario'
import db from '@ioc:Adonis/Lucid/Database' 


export default class TardanzasController {

  public async getTardanzas({response}: HttpContextContract) {
    const tardanzas = await Tardanza.all()
    return response.status(200).json(tardanzas)
  }

  public async getTardanza({ params, response }: HttpContextContract) {
    const usuario_id = await Usuario.findBy('dni', params.dni)
    // obtener todas tardanzas de usuario
    console.log(usuario_id?.id)
    const totalmin = await db.query().from('tardanzas').where('usuario_id', 1).sum('minutos as minutos').orderBy('usuario_id', 'desc')

    return response.status(200).json(totalmin)
  }
  
}
