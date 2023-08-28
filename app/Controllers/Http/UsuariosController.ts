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

  public async updateUsuarios({request, response}: HttpContextContract) {	
    const { id, dni, nombre, apellido, celular, cargo, area } = request.all()
    const usuario = await Usuario.findOrFail(id)
    if (dni !== undefined) usuario.dni = dni;
    if (nombre !== undefined) usuario.nombre = nombre;
    if (apellido !== undefined) usuario.apellido = apellido;
    if (celular !== undefined) usuario.celular = celular;
    if (cargo !== undefined) usuario.cargo = cargo;
    if (area !== undefined) usuario.area = area;
    await usuario.save()
    return response.status(200).json({ message: 'Usuario actualizado' })
  }

  public async deleteUsuarios({request, response}: HttpContextContract) {
    const { id } = request.all()
    const usuario = await Usuario.findOrFail(id)
    await usuario.delete()
    return response.status(200).json({ message: 'Usuario eliminado' })
  }
}
