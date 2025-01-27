import { prisma } from "@/services/prisma-service";
import { success, error } from "@/utils/response";
import { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        const { name, email, phone, type } = JSON.parse(event.body || "{}");

        const person = await prisma.person.create({
            data: { name, email, phone, type },
        });

        return success(person);
    } catch (err) {
        return error((err as Error).message);
    }
};
