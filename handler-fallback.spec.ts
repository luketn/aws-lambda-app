import {FallbackHandler} from "./handler-fallback";
import {APIGatewayProxyEvent} from "aws-lambda";

describe("Fallback handler", ()=>{
    let fallbackHandler = new FallbackHandler();

    it("should return true to being handleable for all paths", async ()=>{
        expect(fallbackHandler.canHandleThis()).toEqual(true);
    });
    it("should return a 404 response", async ()=>{
        let response = await fallbackHandler.handle(<APIGatewayProxyEvent>{path: '/hello'});
        expect(response.statusCode).toEqual(404);
        expect(response.body).toContain("hello");
    });
});