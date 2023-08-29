import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PermisosVacacione from 'App/Models/PermisosVacacione'

export default class PermisosVacacionesController {
    public async getPermisosVacaciones({response}: HttpContextContract) {
        const permisosVacaciones = await PermisosVacacione.all()
        return response.status(200).json(permisosVacaciones)
    }

    public async setPermisosVacaciones({request, response}: HttpContextContract) {
        const { fecha_inicio, fecha_fin, motivo, usuario_id } = request.all()

        PermisosVacacione.create({ fecha_inicio, fecha_fin, motivo, usuario_id })
        return response.status(200).json({ message: 'Permiso de vacaciones creado' })       
    }

    public async updatePermisosVacaciones({request, response}: HttpContextContract) {
        const { id, fecha_inicio, fecha_fin, motivo, usuario_id } = request.all()
        const permisosVacacione = await PermisosVacacione.findOrFail(id)
        if (fecha_inicio !== undefined) permisosVacacione.fecha_inicio = fecha_inicio;
        if (fecha_fin !== undefined) permisosVacacione.fecha_fin = fecha_fin;
        if (motivo !== undefined) permisosVacacione.motivo = motivo;
        if (usuario_id !== undefined) permisosVacacione.usuario_id = usuario_id;
        await permisosVacacione.save()
        return response.status(200).json({ message: 'Permiso de vacaciones actualizado' })
    }

    public async deletePermisosVacaciones({request, response}: HttpContextContract) {
        const { id } = request.all()
        const permisosVacacione = await PermisosVacacione.findOrFail(id)
        await permisosVacacione.delete()
        return response.status(200).json({ message: 'Permiso de vacaciones eliminado' })
    }
}
