[![CircleCI](https://circleci.com/gh/luketn/aws-lambda-app.svg?style=svg)](https://circleci.com/gh/luketn/aws-lambda-app)
[![Coverage]( https://circleci.com/api/v1.1/project/github/luketn/aws-lambda-app/latest/artifacts/0/coverage.svg
)]( https://circleci.com/api/v1.1/project/github/luketn/aws-lambda-app/latest/artifacts/0/coverage/index.html
)

### About
This is a concept for a Lambda API with a built-in single page HTML UI.

The HTML UI is done in react, with the code embedded in the HTML and all dependencies loaded from CDNs. 

The API is just returning some hard-coded data. 

There is a neat little router which iterates over a list of 'handler' interfaces, and returns the first handler result which handles the path of the event.

Try it out here!

https://api.mycodefu.com/aws-lambda-app/

