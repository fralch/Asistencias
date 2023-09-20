import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegistroAsistencia from 'App/Models/RegistroAsistencia'
import Usuario from 'App/Models/Usuario'
import Falta from 'App/Models/Falta'
import Tardanza from 'App/Models/Tardanza'
import Database from '@ioc:Adonis/Lucid/Database'

export default class RegistarTardanzasFaltasController {

    public async registrarFalta({ response }: HttpContextContract) {
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
             } else if (horaActual >= horaEntradaTurnoTarde && horaActual <= horaSalidaTurnoTarde) {
                 return 'tarde';
             } else {
                 return 'desconocido';
             }
        }

        let turno = estaEnTurno(hora)

        if (turno === 'desconocido') {
            return response.status(400).send({ error: 'Fuera de turno' })
        }

        const usuarios = await Usuario.all()
        const faltas = await Falta.all()

       if(turno === 'mañana'){
        for (let i = 0; i < usuarios.length; i++) {
            const usuario = usuarios[i];
            let falta = faltas.find((falta) => falta.usuario_id === usuario.id && falta.fecha === fecha_formateada && falta.turno === 'mañana')
            if (!falta) {
                await Falta.create({
                    usuario_id: usuario.id,
                    fecha: fecha_formateada,
                    turno: 'mañana'
                })
            }
        }
       }
         else if(turno === 'tarde'){
          for (let i = 0; i < usuarios.length; i++) {
                const usuario = usuarios[i];
                let falta = faltas.find((falta) => falta.usuario_id === usuario.id && falta.fecha === fecha_formateada && falta.turno === 'tarde')
                if (!falta) {
                 await Falta.create({
                      usuario_id: usuario.id,
                      fecha: fecha_formateada,
                      turno: 'tarde'
                 })
                }
          }
         }
    
          return response.status(200).send({ message: 'Faltas registradas' })
    
    }

}
