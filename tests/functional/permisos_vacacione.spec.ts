import { test } from '@japa/runner'

test.group('Permisos vacaciones', () => {
  // Write your test here
  test('Obtener permisos vacaciones', async ({client}) => {
      const response = await client.get('/permisos_vacaciones')
      response.assertStatus(200)
  })
  test('Crear permiso vacaciones', async ({client}) => {
      const response = await client.post('/permisos_vacaciones').form({
        fecha_inicio: "2021-09-01", 
        fecha_fin: "2021-09-05", 
        motivo: "Vacaciones", 
        usuario_id: 3
      })
      response.assertStatus(200)
  })
  test('Actualizar permiso vacaciones', async ({client}) => {
      const response = await client.put('/permisos_vacaciones').json({
          "id": 1,
          "fecha_inicio": "2021-09-01", 
          "fecha_fin": "2021-09-05", 
          "motivo": "Vacaciones", 
          "usuario_id": 3
      })
      response.assertStatus(200)
  })
  test('Eliminar permiso vacaciones', async ({client}) => {
      const response = await client.delete('/permisos_vacaciones').json({
          "id": 1
      })
      response.assertStatus(200)
  })
})
