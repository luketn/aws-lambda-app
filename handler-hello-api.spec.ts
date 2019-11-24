import {HelloApiHandler, HelloData} from "./handler-hello-api";
import {APIGatewayProxyEvent} from "aws-lambda";

describe("Hello API", () => {
    let helloApiHandler = new HelloApiHandler();

    it("should be handled on /hello-api", () => {
        expect(helloApiHandler.canHandleThis(<APIGatewayProxyEvent>{path: "/hello-api"})).toEqual(true);
    });
    it("should return an array of data for GET on /hello-api", async () => {
        let response = await helloApiHandler.handle(<APIGatewayProxyEvent>{httpMethod: "GET", path: "/hello-api"});
        expect(response.statusCode).toEqual(200);
        let bodyData: HelloData[] = JSON.parse(response.body);
        expect(bodyData.length).toBe(3);
        expect(bodyData[0].id).toBe(1);
        expect(bodyData[0].text).toBe("Hi there!");

    });
});