import {APIGatewayProxyEvent} from "aws-lambda";
import {HttpEventHandler} from "./interfaces";

export interface HelloData {
    id: number;
    text: string;
}

export class HelloApiHandler implements HttpEventHandler {
    private helloData: HelloData[] = [
        {id: 1, text: "Hi there!"},
        {id: 2, text: "Well, hello!"},
        {id: 3, text: "Bye I guess."},
    ];

    public canHandleThis(event: APIGatewayProxyEvent) {
        return event.path === "/hello-api";
    }

    public async handle(event: APIGatewayProxyEvent) {
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
    }
}
