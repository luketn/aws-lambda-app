import {IndexHtmlHandler} from "./handler-index-html";
import {APIGatewayProxyEvent} from "aws-lambda";

describe("Index HTML Handler canHandleThis", () => {
    const staticContentHandler = new IndexHtmlHandler();

    it("should return true for '/' or '/index.html' paths", () => {
        expect(staticContentHandler.canHandleThis(<APIGatewayProxyEvent>{path: "/"})).toEqual(true);
        expect(staticContentHandler.canHandleThis(<APIGatewayProxyEvent>{path: "/index.html"})).toEqual(true);
    });
    it("should return false for other paths", () => {
        expect(staticContentHandler.canHandleThis(<APIGatewayProxyEvent>{path: "/other"})).toEqual(false);
        expect(staticContentHandler.canHandleThis(<APIGatewayProxyEvent>{path: "/services/test.json"})).toEqual(false);
    });
});

describe("Index HTML Handler handle", () => {
    const staticContentHandler = new IndexHtmlHandler();

    it("should return 200 response with index.html base64 data", async () => {
        let response = await staticContentHandler.handle(<APIGatewayProxyEvent>{path: "/"});
        expect(response.statusCode).toEqual(200);
        expect(response.isBase64Encoded).toEqual(true);
        expect(response.headers).toEqual({"Content-Type": "text/html"});

        let buffer = new Buffer(response.body, 'base64');
        let text = buffer.toString('ascii');
        expect(text).toContain("AWS Lambda App");
    });
});