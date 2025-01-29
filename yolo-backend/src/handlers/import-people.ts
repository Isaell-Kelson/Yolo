// import axios from "axios";
// import {prisma} from "@/services/prisma-service";
// import {error, success} from "@/utils/response";
// import {APIGatewayProxyHandler} from "aws-lambda";
//
// const API_URL = "https://3ji5haxzr9.execute-api.us-east-1.amazonaws.com/dev/caseYolo";
//
// export const handler: APIGatewayProxyHandler = async () => {
//     try {
//
//         const {data} = await axios.get(API_URL);
//
//
//         for (const person of data) {
//             await prisma.person.upsert({
//                 where: {email: person.email},
//                 update: {},
//                 create: {
//                     name: person.name,
//                     email: person.email,
//                     phone: person.phone,
//                     type: person.type,
//                     createdAt: new Date().toISOString(),
//                 },
//             });
//         }
//
//
//         return success({message: "People imported successfully!"});
//     } catch (err) {
//         return error((err as Error).message);
//     }
// };
