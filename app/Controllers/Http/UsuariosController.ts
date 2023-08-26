import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'

export default class UsuariosController {
  public async getUsuarios({response}: HttpContextContract) {
    const usuarios = await Usuario.all()
    return response.status(200).json(usuarios)
  }

  public async setUsuarios({request, response}: HttpContextContract) {
    const { dni, nombre, apellido, celular, cargo, area } = request.all()
    Usuario.create({ dni, nombre, apellido, celular, cargo, area })
    return response.status(200).json({ message: 'Usuario creado' })
  }
}
