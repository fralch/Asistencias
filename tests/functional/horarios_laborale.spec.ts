import { test } from '@japa/runner'

test.group('Horarios laborales', () => {
  // Write your test here
  test('Obtener horarios laborales', async ({client}) => {
      const response = await client.get('/horariosLaborales')
      response.assertStatus(200)
  })
  test('Crear horario laboral', async ({client}) => {
      const response = await client.post('/horariosLaborales').json({
        "hora_entrada": "08:00:00", 
        "hora_salida": "11:00:00", 
        "usuario_id": 5
      })
      response.assertStatus(200)
  })
  test('Actualizar horario laboral', async ({client}) => {
      const response = await client.put('/horariosLaborales').json({
          "id": 14,
          "hora_entrada": "08:00:00", 
          "hora_salida": "18:00:00", 
          "usuario_id": 5
      })
      response.assertStatus(200)
  })
  test('Eliminar horario laboral', async ({client}) => {
      const response = await client.delete('/horariosLaborales').json({
          "id": 15
      })
      response.assertStatus(200)
  })
})
