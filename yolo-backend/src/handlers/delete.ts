import { prisma } from "@/services/prisma-service";
import { success, error } from "@/utils/response";
import { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        const id = event.pathParameters?.id ? parseInt(event.pathParameters.id) : null;
        if (!id) return error("ID not provided", 400);

        await prisma.person.delete({ where: { id } });
        return success({ message: "Person deleted successfully!" });
    } catch (err) {
        return error((err as Error).message);
    }
};
