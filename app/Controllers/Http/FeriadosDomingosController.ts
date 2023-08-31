import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FeriadosDomingo from 'App/Models/FeriadosDomingo'

export default class FeriadosDomingosController {
    public async getFeriadosDomingos({response}: HttpContextContract) {
        const feriadosDomingos = await FeriadosDomingo.all()
        return response.status(200).json(feriadosDomingos)
    }

    public async setFeriadosDomingos({request, response}: HttpContextContract) {
        const { nombre, fecha } = request.all()

        const feriadoDomingo = await FeriadosDomingo.findBy('fecha', fecha)
        if (feriadoDomingo) return response.status(400).json({ message: 'Ya existe un feriado para esta fecha' })
        
        FeriadosDomingo.create({ nombre, fecha })
        return response.status(200).json({ message: 'Feriado creado' })
    }

    public async updateFeriadosDomingos({request, response}: HttpContextContract) {
        const { nombre, fecha } = request.all()
        const feriadoDomingo = await FeriadosDomingo.findByOrFail('fecha', fecha)
        if (nombre !== undefined) feriadoDomingo.nombre = nombre;
        if (fecha !== undefined) feriadoDomingo.fecha = fecha;
        await feriadoDomingo.save()
        return response.status(200).json({ message: 'Feriado actualizado' })
    }

    public async deleteFeriadosDomingos({request, response}: HttpContextContract) {
        const { fecha } = request.all()
        const feriadoDomingo = await FeriadosDomingo.findByOrFail('fecha', fecha)
        await feriadoDomingo.delete()
        return response.status(200).json({ message: 'Feriado eliminado' })
    }
}
