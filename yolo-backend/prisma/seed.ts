import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
    try {
        // Excluindo todos os dados da tabela Person
        await prisma.person.deleteMany();

        // Resetando a sequência do ID
        await prisma.$executeRaw`TRUNCATE TABLE "Person" RESTART IDENTITY`;

        const API_URL = "https://3ji5haxzr9.execute-api.us-east-1.amazonaws.com/dev/caseYolo";
        const response = await axios.get(API_URL);

        const people = response.data.body ? JSON.parse(response.data.body).clientes : [];

        if (!Array.isArray(people)) {
            throw new Error("Data is not an array");
        }

        for (const person of people) {
            const existingPerson = await prisma.person.findUnique({
                where: {
                    email: person["E-mail"],
                },
            });

            if (!existingPerson) {
                await prisma.person.create({
                    data: {
                        name: person.Nome,
                        email: person["E-mail"],
                        phone: person["Telefone"],
                        type: person.Tipo,
                    },
                });
            } else {
                console.log(`Pessoa com e-mail ${person["E-mail"]} já existe. Pulando...`);
            }
        }

        console.log("Database seeded!");
    } catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        await prisma.$disconnect();
    }
};

seed().then(r => r);
