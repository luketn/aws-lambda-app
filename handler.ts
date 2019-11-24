'use strict';

import {APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult} from "aws-lambda";
import {HttpEventHandler} from "./interfaces";
import {IndexHtmlHandler} from "./handler-index-html";
import {FallbackHandler} from "./handler-fallback";
import {HelloApiHandler} from "./handler-hello-api";

const fallbackHandler = new FallbackHandler();
const handlers: HttpEventHandler[] = [
    new IndexHtmlHandler(),
    new HelloApiHandler()
];

export const http: APIGatewayProxyHandler = async event => {
    //normalise the path no matter whether the request is on the API Gateway URL or the api.mycodefu.com/aws-lambda-app URL
    if (event.path.startsWith("/aws-lambda-app")) {
        event.path = event.path.substr("/aws-lambda-app".length);
    }

    let result: APIGatewayProxyResult | undefined;
    for (const handler of handlers) {
        if (handler.canHandleThis(event)) {
            result = await handler.handle(event);
            break;
        }
    }

    if (!result) {
        result = await fallbackHandler.handle(event);
    }

    addOriginResponseHeader(event, result);

    return result;
};

export const addOriginResponseHeader = (event: APIGatewayProxyEvent, result: APIGatewayProxyResult) => {
    try {
        if (event.headers && result.headers) {
            let origin = event.headers.origin;
            if (origin && result.headers) {
                result.headers['Access-Control-Allow-Origin'] = origin;
            }
        }
    } catch {/*ignore*/}
};