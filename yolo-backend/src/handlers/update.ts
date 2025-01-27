import { prisma } from "@/services/prisma-service";
import { success, error } from "@/utils/response";
import { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        const id = event.pathParameters?.id;
        if (!id) return error("ID not provided", 400);

        const updates = JSON.parse(event.body || "{}");
        const updatedPerson = await prisma.person.update({
            where: { id },
            data: updates,
        });

        return success(updatedPerson);
    } catch (err) {
        return error((err as Error).message);
    }
};
