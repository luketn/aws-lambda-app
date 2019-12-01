import {APIGatewayEventRequestContext, APIGatewayProxyEvent, APIGatewayProxyResult, Context} from "aws-lambda";
import {addOriginResponseHeader, http} from "./handler";

describe("Handler", () => {
    it("should return a positive response for index.html on root", async () => {
        const response = await http({path: "/index.html"} as APIGatewayProxyEvent);
        expect(response.statusCode).toBe(200);
    });
});
