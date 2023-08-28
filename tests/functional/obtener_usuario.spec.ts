import { test } from '@japa/runner'

test.group('Obtener usuarios', () => {
  // Write your test here
  test('Obtener usuarios', async ({client}) => {
      const response = await client.get('/usuarios')
      response.assertStatus(200)
  })
  test('Crear usuario', async ({client}) => {
      const response = await client.post('/usuarios').form({
        dni: 45530278, 
        nombre: "Frank", 
        apellido: "Cairampoma", 
        celular: 961610362, 
        cargo: "Vendedor", 
        area: "Huancayo"
      })
      response.assertStatus(200)
  })
  test('Actualizar usuario', async ({client}) => {
      const response = await client.put('/usuarios').json({
          "id": 9,
          "nombre": "Alex", 
          "apellido": "Cairampoma"        
      })
      response.assertStatus(200)
  })
  test('Eliminar usuario', async ({client}) => {
      const response = await client.delete('/usuarios').json({
          "id": 15
      })
      response.assertStatus(200)
  })
})
