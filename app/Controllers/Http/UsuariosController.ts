import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'

export default class UsuariosController {
  public async getUsuarios({response}: HttpContextContract) {
    const usuarios = await Usuario.all()
    return response.status(200).json(usuarios)
  }

  public async getUsuario({params, response}: HttpContextContract) {
    const usuario = await Usuario.findOrFail(params.id)
    return response.status(200).json(usuario)

  }


  public async setUsuarios({request, response}: HttpContextContract) {
    const { nombre, cargo, celular, correo, direccion, dni} = request.all()
    const validar_usuario = await Usuario.findBy('dni', dni)
    if (validar_usuario) {
      return response.status(400).json({ message: 'Usuario ya existe' })
    }
    Usuario.create({ nombre, cargo, celular, correo, direccion, dni })
    return response.status(200).json({ message: 'Usuario creado' })
  }


  public async updateUsuarios({request, response}: HttpContextContract) {	
    const { id, nombre, cargo, celular, correo, direccion, dni } = request.all()
    const usuario = await Usuario.findOrFail(id)
    if (nombre !== undefined) usuario.nombre = nombre;
    if (cargo !== undefined) usuario.cargo = cargo;
    if (celular !== undefined) usuario.celular = celular;
    if (correo !== undefined) usuario.correo = correo;
    if (direccion !== undefined) usuario.direccion = direccion;
    if (dni !== undefined) usuario.dni = dni;
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
