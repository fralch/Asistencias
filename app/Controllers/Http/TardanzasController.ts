import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import db from '@ioc:Adonis/Lucid/Database' 


export default class TardanzasController {

  public async getTardanzas({ response }: HttpContextContract) {
    const tardanzas = await db.query()
                      .from('tardanzas')
                      .select('usuario_id', 'fecha', 'minutos', 'created_at')
                      .orderBy('created_at', 'desc')
    return response.status(200).json(tardanzas)
  } 

  public async getTardanza({ params, response }: HttpContextContract) {
    const usuario_id = await Usuario.findBy('dni', params.dni)
    // obtener todas tardanzas de usuario
    console.log(usuario_id?.id)
    
    if (usuario_id?.id) {
      const totalmin = await db.query()
                      .from('tardanzas')
                      .where('usuario_id', usuario_id.id)
                      .sum('minutos as minutos')
                      .orderBy('usuario_id', 'desc')
      return response.status(200).json(totalmin)
    } else {
      return response.status(404).json({ message: 'Usuario no encontrado' })
    }
  }

  public async postTardanzasByDateRange({ request, response }: HttpContextContract) {
    const { fechaInicio, fechaFin } = request.all()
    const tardanzas = await db.query()
                      .from('tardanzas')
                      .leftJoin('usuarios', 'tardanzas.usuario_id', 'usuarios.id')
                      .select('tardanzas.usuario_id', 'usuarios.nombre', 'tardanzas.fecha', 'tardanzas.minutos', 'tardanzas.created_at')
                      .whereBetween('fecha', [fechaInicio, fechaFin])
                      .orderBy('created_at', 'desc')
    return response.status(200).json(tardanzas)
  }

  public async postTardanzasByDateRangeAndDni({ request, response }: HttpContextContract) {
    const { fechaInicio, fechaFin, dni } = request.all()
    const usuario_id = await Usuario.findBy('dni', dni)
    if (usuario_id?.id) {
      const tardanzas = await db.query()
                        .from('tardanzas')
                        .leftJoin('usuarios', 'tardanzas.usuario_id', 'usuarios.id')
                        .select('tardanzas.usuario_id', 'usuarios.nombre', 'tardanzas.fecha', 'tardanzas.minutos', 'tardanzas.created_at')
                        .whereBetween('fecha', [fechaInicio, fechaFin])
                        .where('usuario_id', usuario_id.id)
                        .orderBy('created_at', 'desc')
      return response.status(200).json(tardanzas)
    } else {
      return response.status(404).json({ message: 'Usuario no encontrado' })
    }
  }
  
}
