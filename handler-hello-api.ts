import {HttpEventHandler} from "./interfaces";
import {APIGatewayProxyEvent} from "aws-lambda";

export interface HelloData {
    id: number;
    text: string;
}

export class HelloApiHandler implements HttpEventHandler {
    canHandleThis(event: APIGatewayProxyEvent) {
        return event.path==="/hello-api";
    }

    async handle(event: APIGatewayProxyEvent) {
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(<HelloData[]>[
                {"id": 1, "text": "Hi there!"},
                {"id": 2, "text": "Well, hello!"},
                {"id": 3, "text": "Bye I guess."}
            ])
        };
    }
}