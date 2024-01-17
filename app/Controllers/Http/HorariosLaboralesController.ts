import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HorariosLaborale from 'App/Models/HorariosLaborale'

export default class HorariosLaboralesController {
    public async getHorariosLaborales({response}: HttpContextContract) {
        const horariosLaborales = await HorariosLaborale.all()
        return response.status(200).json(horariosLaborales)       
    }

    public async setHorariosLaborales({request, response}: HttpContextContract) {
        const { id, hora_entrada, hora_salida, usuario_id, turno } = request.all()

        const horarioLaboral = await HorariosLaborale.findBy('usuario_id', usuario_id)
        if (horarioLaboral) return response.status(400).json({ message: 'Ya existe un horario laboral para este usuario' })
        
        HorariosLaborale.create({ id, hora_entrada, hora_salida, usuario_id, turno })
        return response.status(200).json({ message: 'Horario laboral creado' })
    }

    public async updateHorariosLaborales({request, response}: HttpContextContract) {
        const { id, hora_entrada, hora_salida, usuario_id } = request.all()
        const horarioLaboral = await HorariosLaborale.findOrFail(id)
        if (hora_entrada !== undefined) horarioLaboral.hora_entrada = hora_entrada;
        if (hora_salida !== undefined) horarioLaboral.hora_salida = hora_salida;
        if (usuario_id !== undefined) horarioLaboral.usuario_id = usuario_id;
        await horarioLaboral.save()
        return response.status(200).json({ message: 'Horario laboral actualizado' })
    }

    public async deleteHorariosLaborales({request, response}: HttpContextContract) {
        const { id } = request.all()
        const horarioLaboral = await HorariosLaborale.findOrFail(id)
        await horarioLaboral.delete()
        return response.status(200).json({ message: 'Horario laboral eliminado' })
    }
}
