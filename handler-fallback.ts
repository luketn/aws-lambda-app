import {HttpEventHandler} from "./interfaces";
import {APIGatewayProxyEvent} from "aws-lambda";

export class FallbackHandler implements HttpEventHandler {
    canHandleThis() {
        return true;
    }

    async handle(event: APIGatewayProxyEvent) {
        return {
            statusCode: 404,
            headers: {
                "Content-Type": "text/plain"
            },
            body: `No handler found for event on path ${event.path}!`
        };
    }
}