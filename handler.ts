'use strict';

import {APIGatewayProxyHandler} from "aws-lambda";
import {HttpEventHandler} from "./interfaces";
import {IndexHtmlHandler} from "./handler-index-html";
import {FallbackHandler} from "./handler-fallback";

const fallbackHandler = new FallbackHandler();
const handlers: HttpEventHandler[] = [
    new IndexHtmlHandler()
];

export const http: APIGatewayProxyHandler = async event => {
    //normalise the path no matter whether the request is on the API Gateway URL or the api.mycodefu.com/aws-lambda-app URL
    if (event.path.startsWith("/aws-lambda-app")) {
        event.path = event.path.substr("/aws-lambda-app".length);
    }

    for (const handler of handlers) {
        if (handler.canHandleThis(event)) {
            return await handler.handle(event);
        }
    }

    return fallbackHandler.handle(event);
};
