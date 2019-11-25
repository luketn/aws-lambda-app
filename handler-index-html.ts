import {HttpEventHandler} from "./interfaces";
import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import * as fs from "fs";

/**
 * Serve index.html on the root / or /index.html.
 */
export class IndexHtmlHandler implements HttpEventHandler {
    canHandleThis(event: APIGatewayProxyEvent) {
        return event.path === "/" || event.path === "/index.html";
    }

    async handle(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        let indexHtmlBuffer = fs.readFileSync("./index.html");
        let indexHtmlBase64 = indexHtmlBuffer.toString('base64');
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
