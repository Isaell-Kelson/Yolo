import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { prisma } from "@/services/prisma-service";


const fastify = Fastify();

fastify.register(fastifyCors, {
    origin: "*",
});

// Get
fastify.get("/", async (request, reply) => {
    try {
        const people = await prisma.person.findMany();
        reply.send(people);
    } catch (err) {
        reply.status(500).send({ error: (err instanceof Error ? err.message : "Unknown error") });
    }
});

// Get by type
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

// Post
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

// Put
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






// Delete
fastify.delete<{ Params: { type: string } }>("/:type", async (request, reply) => {
    try {
        const { type } = request.params;
        const deletedPeople = await prisma.person.deleteMany({
            where: { type },
        });

        if (deletedPeople.count === 0) {
            reply.status(404).send({ error: "No people found with the given type to delete" });
            return;
        }

        reply.send({ message: "People deleted successfully!" });
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
