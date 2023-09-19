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
        const fecha_formateada = fecha.split('/')[2] + '-' + fecha.split('/')[1] + '-' + fecha.split('/')[0]
        const hora = now.toLocaleString("es-PE", options).split(' ')[1]
        const hora_entrada_m = "08:00"
        const hora_salida_m = "13:00"
        const hora_entrada_t = "14:00"
        const hora_salida_t = "18:00"

        function estaEnTurno(hora) {
            // Dividir la hora actual en hora y minutos
            const [horaActual] = hora.split(':'); // Ejemplo: '09:30' -> horaActual: '09', minutosActual: '30'

            // Dividir la hora de entrada en hora y minutos
            const [horaEntradaTurnoMañana] = hora_entrada_m.split(':'); // Ejemplo: '08:00' -> horaEntradaTurno: '08', minutosEntrada: '00'

            // Dividir la hora de salida en hora y minutos
            const [horaSalidaTurnoMañana] = hora_salida_m.split(':'); // Ejemplo: '13:00' -> horaSalidaTurno: '13', minutosSalida: '00'

            // Dividir la hora de entrada en hora y minutos
            const [horaEntradaTurnoTarde] = hora_entrada_t.split(':'); // Ejemplo: '14:00' -> horaEntradaTurno: '14', minutosEntrada: '00'

            // Dividir la hora de salida en hora y minutos
            const [horaSalidaTurnoTarde] = hora_salida_t.split(':'); // Ejemplo: '18:00' -> horaSalidaTurno: '18', minutosSalida: '00'

            // trabajar aqui para saber en que turno esta 
            if (horaActual >= horaEntradaTurnoMañana && horaActual <= horaSalidaTurnoMañana) {
                return 'mañana';
            }else if (horaActual >= horaEntradaTurnoTarde && horaActual <= horaSalidaTurnoTarde) {
                return 'tarde'; 
            }else {
                return 'desconocido';
            }            
        }

        let turno = estaEnTurno(hora)

        if (turno === 'desconocido') {
            return response.status(400).send({ error: 'Fuera de turno' })
        }else if (turno === 'mañana') {
            // minutos de tolerancia 
            const minutos = hora.split(':')[1]
            if (parseInt(minutos) > 15) {
                return response.status(400).send({ error: 'Fuera de hora' })
            }

            const usuario = await Usuario.findBy('dni', dni);
            if (usuario !== null) {
                const { id } = usuario;
                const registroAsistencia = await RegistroAsistencia.query().where('fecha', fecha_formateada).where('usuario_id', id).first()
                console.log(registroAsistencia?.hora_entrada && registroAsistencia?.hora_salida === null)
                if (registroAsistencia) {
                    return response.status(400).send({ error: 'Ya se registró la asistencia' })
                }else {
                    const registroAsistencia = new RegistroAsistencia()
                    registroAsistencia.fecha = fecha_formateada
                    registroAsistencia.hora_entrada = hora
                    registroAsistencia.foto = foto
                    registroAsistencia.usuario_id = usuario_id.id

                    await registroAsistencia.save()
                    return response.status(200).send({ message: 'Asistencia registrada' })
                }
            }
            
        } else if (turno === 'tarde') {
            // minutos de tolerancia 
            const minutos = hora.split(':')[1]
            if (parseInt(minutos) > 15) {
                return response.status(400).send({ error: 'Fuera de hora' })
            }

            const usuario = await Usuario.findBy('dni', dni);
            if (usuario !== null) {
                const { id } = usuario;
                const registroAsistencia = await RegistroAsistencia.query().where('fecha', fecha_formateada).where('usuario_id', id).first()
                if (registroAsistencia) {
                    return response.status(400).send({ error: 'Ya se registró la asistencia' })
                }else {
                    const registroAsistencia = new RegistroAsistencia()
                    registroAsistencia.fecha = fecha_formateada
                    registroAsistencia.hora_entrada = hora
                    registroAsistencia.foto = foto
                    registroAsistencia.usuario_id = usuario_id.id

                    await registroAsistencia.save()
                    return response.status(200).send({ message: 'Asistencia registrada' })
                }
            }        
        }
    }

    

}
