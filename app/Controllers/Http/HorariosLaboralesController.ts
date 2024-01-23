import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HorariosLaborale from 'App/Models/HorariosLaborale'

export default class HorariosLaboralesController {
    public async getHorariosLaborales({response}: HttpContextContract) {
        const horariosLaborales = await HorariosLaborale.all()
        return response.status(200).json(horariosLaborales)       
    }

    // horarios por id de usuario
    public async getHorarioLaboral({params, response}: HttpContextContract) {
        const horarioLaboral = await HorariosLaborale.findBy('usuario_id', params.id)
        return response.status(200).json(horarioLaboral)
    }

    public async setHorariosLaborales({request, response}: HttpContextContract) {
        const {id, entrada_manana, salida_manana, entrada_tarde, salida_tarde, usuario_id } = request.all()

        const horarioLaboral = await HorariosLaborale.findBy('usuario_id', usuario_id)
        if (horarioLaboral) return response.status(400).json({ message: 'Ya existe un horario laboral para este usuario' })
        
        HorariosLaborale.create({ id, entrada_manana, salida_manana, entrada_tarde, salida_tarde, usuario_id })
        return response.status(200).json({ message: 'Horario laboral creado' })
    }

    public async updateHorariosLaborales({request, response}: HttpContextContract) {
        const { id, entrada_manana, salida_manana, entrada_tarde, salida_tarde, usuario_id } = request.all()
        const horarioLaboral = await HorariosLaborale.findOrFail(id)
        if (entrada_manana !== undefined) horarioLaboral.entrada_manana = entrada_manana;
        if (salida_manana !== undefined) horarioLaboral.salida_manana = salida_manana;
        if (entrada_tarde !== undefined) horarioLaboral.entrada_tarde = entrada_tarde;
        if (salida_tarde !== undefined) horarioLaboral.salida_tarde = salida_tarde;
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
