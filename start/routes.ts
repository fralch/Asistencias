/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/usuarios', 'UsuariosController.getUsuarios')
Route.post('/usuarios', 'UsuariosController.setUsuarios')
Route.put('/usuarios', 'UsuariosController.updateUsuarios')
Route.delete('/usuarios', 'UsuariosController.deleteUsuarios')

Route.get('/horariosLaborales', 'HorariosLaboralesController.getHorariosLaborales')
Route.post('/horariosLaborales', 'HorariosLaboralesController.setHorariosLaborales')
Route.put('/horariosLaborales', 'HorariosLaboralesController.updateHorariosLaborales')
Route.delete('/horariosLaborales', 'HorariosLaboralesController.deleteHorariosLaborales')


Route.get('/permisos_vacaciones', 'PermisosVacacionesController.getPermisosVacaciones')
Route.post('/permisos_vacaciones', 'PermisosVacacionesController.setPermisosVacaciones')
Route.put('/permisos_vacaciones', 'PermisosVacacionesController.updatePermisosVacaciones')
Route.delete('/permisos_vacaciones', 'PermisosVacacionesController.deletePermisosVacaciones')

Route.get('/feriados_domingos',  'FeriadosDomingosController.getFeriadosDomingos')
Route.post('/feriados_domingos', 'FeriadosDomingosController.setFeriadosDomingos')
Route.put('/feriados_domingos', 'FeriadosDomingosController.updateFeriadosDomingos')
Route.delete('/feriados_domingos', 'FeriadosDomingosController.deleteFeriadosDomingos')


Route.post('/registro_asistencias', 'RegistroAsistenciasController.setRegistroAsistencias')
Route.post('/registrar_tardanzas_faltas', 'RegistarTardanzasFaltasController.registrarFalta')


