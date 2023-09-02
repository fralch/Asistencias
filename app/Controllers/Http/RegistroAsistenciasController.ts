import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegistroAsistencia from 'App/Models/RegistroAsistencia'
import Usuario from 'App/Models/Usuario'

export default class RegistroAsistenciasController {
    public async getRegistroAsistencias({ }: HttpContextContract) {
        return { hello: 'world' }
    }
    public async setRegistroAsistencias({ request, response }: HttpContextContract) {
        const {  foto, dni } = request.all()

        // obteniendo usuario de dni 
        const usuario_id = await Usuario.findBy('dni', dni)
        
        if (!usuario_id) {
            return response.status(400).send({ error: 'Usuario no encontrado' })
        }



        const now = new Date()
        const options = { timeZone: 'America/Lima' }
        const fecha = now.toLocaleString("es-PE", options).split(' ')[0]
        const hora = now.toLocaleString("es-PE", options).split(' ')[1]
        const hora_entrada_m = "08:00"
        const hora_salida_m = "13:00"
        const hora_entrada_t = "14:00"
        const hora_salida_t = "18:00"

        function estaEnTurno(hora, horaEntrada, horaSalida) {
            // Dividir la hora actual en hora y minutos
            const [horaActual, minutosActual] = hora.split(':'); // Ejemplo: '09:30' -> horaActual: '09', minutosActual: '30'

            // Dividir la hora de entrada en hora y minutos
            const [horaEntradaTurno, minutosEntrada] = horaEntrada.split(':'); // Ejemplo: '08:00' -> horaEntradaTurno: '08', minutosEntrada: '00'

            // Dividir la hora de salida en hora y minutos
            const [horaSalidaTurno, minutosSalida] = horaSalida.split(':'); // Ejemplo: '13:00' -> horaSalidaTurno: '13', minutosSalida: '00'

            // Convertir las partes de hora y minutos a valores numéricos
            const horaActualNum = parseInt(horaActual, 10); // Ejemplo: '09' -> 9
            const minutosActualNum = parseInt(minutosActual, 10); // Ejemplo: '30' -> 30
            const horaEntradaNum = parseInt(horaEntradaTurno, 10); // Ejemplo: '08' -> 8
            const minutosEntradaNum = parseInt(minutosEntrada, 10); // Ejemplo: '00' -> 0
            const horaSalidaNum = parseInt(horaSalidaTurno, 10); // Ejemplo: '13' -> 13
            const minutosSalidaNum = parseInt(minutosSalida, 10); // Ejemplo: '00' -> 0

            if ( horaActualNum > horaEntradaNum || (horaActualNum === horaEntradaNum && minutosActualNum >= minutosEntradaNum)) {
                if ( horaActualNum < horaSalidaNum || (horaActualNum === horaSalidaNum && minutosActualNum <= minutosSalidaNum)) {
                    return true;
                }
            }

            return false;
        }

        let turno = '';
        if (estaEnTurno(hora, hora_entrada_m, hora_salida_m)) {
            turno = 'mañana';
        } else if (estaEnTurno(hora, hora_entrada_t, hora_salida_t)) {
            turno = 'tarde';
        } else {
            turno = 'desconocido';
        }

        if (turno === 'desconocido') {
            return response.status(400).send({ error: 'Fuera de turno' })
        }else if (turno === 'mañana') {
            const registroAsistencia = await RegistroAsistencia.query().where('fecha', fecha).where('usuario_id', 1).first()
            if (registroAsistencia) {
                return response.status(400).send({ error: 'Ya se registró la asistencia' })
            } else {
                const registroAsistencia = new RegistroAsistencia()
                registroAsistencia.fecha = fecha
                registroAsistencia.hora_entrada = hora
                registroAsistencia.foto = foto
                registroAsistencia.usuario_id = usuario_id.id

                await registroAsistencia.save()
                return response.status(200).send({ message: 'Asistencia registrada' })
            }
        } else if (turno === 'tarde') {
            const registroAsistencia = await RegistroAsistencia.query().where('fecha', fecha).where('usuario_id', 1).first()
            if (registroAsistencia) {
                registroAsistencia.hora_salida = hora
                await registroAsistencia.save()
                return response.status(200).send({ message: 'Asistencia registrada' })
            } else {
                return response.status(400).send({ error: 'No se registró la asistencia de la mañana' })
            }
        }


    }

}
