import {HttpEventHandler} from "./interfaces";
import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import * as fs from "fs";

export class StaticContentHandler implements HttpEventHandler {
    canHandleThis(event: APIGatewayProxyEvent) {
        return event.path === "/" || event.path === "/index.html";
    }
    async handle(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        //serve index.html on the root / or /index.html
        let indexHtmlBuffer = fs.readFileSync("./index.html");
        let indexHtmlBase64 = new Buffer(indexHtmlBuffer).toString('base64');
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "text/html"
            },
            isBase64Encoded: true,
            body: indexHtmlBase64
        };
    }
}
