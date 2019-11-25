import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import * as fs from "fs";
import {HttpEventHandler} from "./interfaces";

/**
 * Serve index.html on the root / or /index.html.
 */
export class IndexHtmlHandler implements HttpEventHandler {
    public canHandleThis(event: APIGatewayProxyEvent) {
        return event.path === "/" || event.path === "/index.html";
    }

    public async handle(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        const indexHtmlBuffer = fs.readFileSync("./index.html");
        const indexHtmlBase64 = indexHtmlBuffer.toString("base64");
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "text/html",
            },
            isBase64Encoded: true,
            body: indexHtmlBase64,
        };
    }
}
