import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegistroAsistencia from 'App/Models/RegistroAsistencia'

export default class RegistroAsistenciasController {
    public async getRegistroAsistencias({ }: HttpContextContract) {
        return { hello: 'world' }
    }
    public async setRegistroAsistencias({request, response }: HttpContextContract) {
        const { fecha, hora_entrada, hora_salida, foto, horas_trabajadas, usuario_id } = request.all()
        RegistroAsistencia.create({ fecha, hora_entrada, hora_salida, foto, horas_trabajadas, usuario_id })
        return response.status(200).json({ message: 'RegistroAsistencia creado' })
    }
   
}
