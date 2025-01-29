/**
 * @file Script de seed para popular o banco de dados com dados de uma API externa.
 */

import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Popula o banco de dados com dados de uma API externa.
 *
 * @async
 * @function seed
 * @returns {Promise<void>} Resolve quando o processo de seed for concluído.
 */
const seed = async (): Promise<void> => {
    try {
        // Excluindo todos os dados da tabela Person
        await prisma.person.deleteMany();

        // Resetando a sequência do ID
        await prisma.$executeRaw`TRUNCATE TABLE "Person" RESTART IDENTITY`;

        const API_URL = "https://3ji5haxzr9.execute-api.us-east-1.amazonaws.com/dev/caseYolo";
        const response = await axios.get(API_URL);

        /** @type {Array<{ Nome: string, "E-mail": string, "Telefone": string, Tipo: string }>} */
        const people: Array<{ Nome: string; "E-mail": string; "Telefone": string; Tipo: string; }> = response.data.body ? JSON.parse(response.data.body).clientes : [];

        if (!Array.isArray(people)) {
            throw new Error("Os dados não estão em formato de array");
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
                console.log(`Person with an existing email address ${person["E-mail"]} already. Jumping...`);
            }
        }

        console.log("Database seeded!");
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await prisma.$disconnect();
    }
};

// Executa a função de seed
seed().then((r) => r);
