import {APIGatewayEventRequestContext, APIGatewayProxyEvent, APIGatewayProxyResult, Context} from "aws-lambda";
import {addOriginResponseHeader, http} from "./handler";

describe("Handler", () => {
    it("should return a positive response for index.html on root", async () => {
        let response = await http(<APIGatewayProxyEvent>{path: '/index.html'});
        expect(response.statusCode).toBe(200);
    });
    it("should return a positive response for index.html on subpath", async () => {
        let response = await http(<APIGatewayProxyEvent>{path: '/aws-lambda-app/index.html'});
        expect(response.statusCode).toBe(200);
    });
    it("should return a 404 for an unknown path", async () => {
        let response = await http(<APIGatewayProxyEvent>{path: '/unknown-path'});
        expect(response.statusCode).toBe(404);
    });
    it("should add CORS response", async () => {
        let response = await http(<APIGatewayProxyEvent>{
            path: '/index.html',
            headers: {origin: 'xyz'},
            body: null,
            httpMethod: 'GET',
            isBase64Encoded:false,
            multiValueHeaders: {},
            multiValueQueryStringParameters: {},
            pathParameters: {},
            queryStringParameters: {},
            requestContext: <APIGatewayEventRequestContext>{},
            resource: '',
            stageVariables: {}
        });
        expect(response.statusCode).toBe(200);
        expect(response.headers).toEqual({
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "xyz"
        });
    });
    it("should not add CORS response when there are no headers in event", async () => {
        let response = <APIGatewayProxyResult>{};
        await addOriginResponseHeader(<APIGatewayProxyEvent>{}, response);
        expect(response.headers).not.toEqual({
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "xyz"
        });
    });
    it("should add CORS response when there is an origin header in event but not in response", async () => {
        let response = <APIGatewayProxyResult>{};
        await addOriginResponseHeader(<APIGatewayProxyEvent>{
            path: '/index.html',
            headers: {origin: 'xyz'},
            body: null,
            httpMethod: 'GET',
            isBase64Encoded:false,
            multiValueHeaders: {},
            multiValueQueryStringParameters: {},
            pathParameters: {},
            queryStringParameters: {},
            requestContext: <APIGatewayEventRequestContext>{},
            resource: '',
            stageVariables: {}
        }, response);
        expect(response.headers).toEqual({
            "Access-Control-Allow-Origin": "xyz"
        });
    });
    it("should not add CORS response when there is no origin header in event but not in response", async () => {
        let response = <APIGatewayProxyResult>{};
        await addOriginResponseHeader(<APIGatewayProxyEvent>{
            path: '/index.html',
            headers: {},
            body: null,
            httpMethod: 'GET',
            isBase64Encoded:false,
            multiValueHeaders: {},
            multiValueQueryStringParameters: {},
            pathParameters: {},
            queryStringParameters: {},
            requestContext: <APIGatewayEventRequestContext>{},
            resource: '',
            stageVariables: {}
        }, response);
        expect(response.headers).toBeUndefined();
    });
});