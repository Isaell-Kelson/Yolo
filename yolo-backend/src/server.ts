import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { prisma } from "@/services/prisma-service";

const fastify = Fastify();

fastify.register(fastifyCors, {
    origin: "*",
});

/**
 * Rota para obter todas as pessoas cadastradas.
 * @route GET /
 * @returns {Promise<Array>} Retorna um array de pessoas.
 */
fastify.get("/", async (request, reply) => {
    try {
        const people = await prisma.person.findMany();
        reply.send(people);
    } catch (err) {
        reply.status(500).send({ error: (err instanceof Error ? err.message : "Unknown error") });
    }
});

/**
 * Rota para obter pessoas filtradas por tipo.
 * @route GET /:type
 * @param {Object} request - Objeto da requisição.
 * @param {Object} request.params - Parâmetros da requisição.
 * @param {string} request.params.type - Tipo de pessoa a ser filtrado.
 * @returns {Promise<Array|Object>} Retorna um array de pessoas ou um erro caso não haja correspondências.
 */
fastify.get<{ Params: { type: string } }>("/:type", async (request, reply) => {
    try {
        const { type } = request.params;
        const people = await prisma.person.findMany({
            where: { type },
        });

        if (people.length === 0) {
            reply.status(404).send({ error: "No people found with the given type" });
            return;
        }

        reply.send(people);
    } catch (err) {
        reply.status(500).send({ error: (err instanceof Error ? err.message : "Unknown error") });
    }
});

/**
 * Rota para criar uma nova pessoa.
 * @route POST /
 * @param {Object} request - Objeto da requisição.
 * @param {Object} request.body - Corpo da requisição.
 * @param {string} request.body.name - Nome da pessoa.
 * @param {string} request.body.email - E-mail da pessoa.
 * @param {string} request.body.phone - Telefone da pessoa.
 * @param {string} request.body.type - Tipo da pessoa.
 * @returns {Promise<Object>} Retorna a pessoa criada.
 */
fastify.post("/", async (request, reply) => {
    try {
        const { name, email, phone, type } = request.body as {
            name: string;
            email: string;
            phone: string;
            type: string;
        };

        const person = await prisma.person.create({
            data: { name, email, phone, type },
        });

        reply.status(201).send(person);
    } catch (err) {
        reply.status(500).send({ error: (err instanceof Error ? err.message : "Unknown error") });
    }
});

/**
 * Rota para atualizar os dados de uma pessoa.
 * @route PUT /:id
 * @param {Object} request - Objeto da requisição.
 * @param {Object} request.params - Parâmetros da requisição.
 * @param {string} request.params.id - ID da pessoa a ser atualizada.
 * @param {Object} request.body - Corpo da requisição com os campos a serem atualizados.
 * @returns {Promise<Object>} Retorna os dados atualizados da pessoa.
 */
fastify.put<{ Params: { id: string } }>("/:id", async (request, reply) => {
    try {
        const { id } = request.params;
        const updates = request.body as Partial<{
            name: string;
            email: string;
            phone: string;
        }>;

        const updatedPerson = await prisma.person.update({
            where: { id: Number(id) },
            data: updates,
        });

        reply.send(updatedPerson);
    } catch (err) {
        reply.status(500).send({ error: (err instanceof Error ? err.message : "Unknown error") });
    }
});

/**
 * Rota para deletar uma pessoa pelo ID.
 * @route DELETE /:id
 * @param {Object} request - Objeto da requisição.
 * @param {Object} request.params - Parâmetros da requisição.
 * @param {string} request.params.id - ID da pessoa a ser deletada.
 * @returns {Promise<Object>} Retorna uma mensagem de sucesso ou erro.
 */
fastify.delete<{ Params: { id: string } }>("/:id", async (request, reply) => {
    try {
        const { id } = request.params;
        await prisma.person.delete({
            where: { id: Number(id) },
        });
        reply.send({ message: "Person deleted successfully!" });
    } catch (err) {
        reply.status(500).send({ error: (err instanceof Error ? err.message : "Unknown error") });
    }
});

const PORT = 3001;
fastify.listen({ port: PORT }, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server running at http://localhost:${PORT}`);
});
