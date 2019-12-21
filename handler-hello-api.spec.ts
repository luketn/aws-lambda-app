import {APIGatewayProxyEvent} from "aws-lambda";
import {HelloApiHandler, HelloData} from "./handler-hello-api";

describe("Hello API", () => {
    const helloApiHandler = new HelloApiHandler();

    it("should be handled on /hello-api", () => {
        expect(helloApiHandler.canHandleThis({path: "/hello-api"} as APIGatewayProxyEvent)).toEqual(true);
    });
    it("should return an array of data for GET on /hello-api", async () => {
        const response = await helloApiHandler.handle({httpMethod: "GET", path: "/hello-api"} as APIGatewayProxyEvent);
        expect(response.statusCode).toEqual(200);
        const bodyData: HelloData[] = JSON.parse(response.body);
        expect(bodyData.length).toBe(3);
        expect(bodyData[0].id).toBe(1);
        expect(bodyData[0].text).toBe("Hi there!");

    });
    it("should return a 405 response for an unexpected method on /hello-api", async () => {
        const response = await helloApiHandler.handle({httpMethod: "DELETE", path: "/hello-api"} as APIGatewayProxyEvent);
        expect(response.statusCode).toEqual(405);
        const bodyData: string = response.body;
        expect(bodyData).toBe("Unsupported method 'DELETE'.");

    });
});
