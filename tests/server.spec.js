const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {

    it('Validar que GET de /cafes retorne un 200 como statusCode', async () => {
        const res = await request(server).get('/cafes').send();
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(1);
    })

    it('Validar que se obtiene un código 404 al intentar eliminar un café con un id inexistente', async () => {
        const res = await request(server).delete('/cafes').send('6')
        expect(res.statusCode).toBe(404);
    })

    it('Validar correcta creación de un producto', async () => {
        const newProduct = {
            id: 5,
            nombre: 'frapuccino'
        };

        const res = await request(server)
            .post('/cafes')
            .send(newProduct)
        expect(res.statusCode).toBe(201);
    })

    it('Validar un error 400 al intentar crear un cafe cuyo id no coincide con el payload ', async () => {
        const res = await request(server).put('/cafes/6').send('5')
        expect(res.statusCode).toBe(400);
    })

    


});
