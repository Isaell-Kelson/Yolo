import { prisma } from "@/services/prisma-service";
import { success, error } from "@/utils/response";
import { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async () => {
    try {
        const people = await prisma.person.findMany();
        return success(people);
    } catch (err) {
        return error((err as Error).message);
    }
};
