import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsuariosController {
  public async getUsuarios({}: HttpContextContract) {}

  public async setUsuarios({request, response}: HttpContextContract) {
    const { nombre, apellido, email, password } = request.all()
    return response.json({ nombre, apellido, email, password })
  }
}
