'use strict';

import {APIGatewayProxyHandler} from "aws-lambda";
import * as fs from "fs";

export const http: APIGatewayProxyHandler = async event => {
    //normalise the path no matter whether the request is on the API Gateway URL or the api.mycodefu.com URL
    if (event.path.startsWith("/aws-lambda-app")) {
        event.path = event.path.substr("/aws-lambda-app".length);
    }

    if (event.path === "/" || event.path === "/index.html") {
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

    } else {
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    message: 'Go Serverless v1.0! Your function executed successfully!',
                    input: event,
                },
                null,
                2
            ),
        };
    }
};
