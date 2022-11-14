const { chromium } = require('playwright');
const fs = require("fs");
// const pdfToImg = require("./pdftoimg")
const pdfToText=require('./fileOCR')

async function requestPauser(link, captchaHandling, time_now) {
  const browser = await chromium.launch({
    headless: false,
  });
  const browserContext = await browser.newContext();

  const page = await browserContext.newPage();
  // Create a new Chrome Devtools Protocol Session
  const client = await browserContext.newCDPSession(page);

  /*
    Fetch.enable
    https://chromedevtools.github.io/devtools-protocol/tot/Fetch/#method-enable
    Enables issuing of requestPaused events. A request will be paused until client calls one of failRequest, fulfillRequest or continueRequest/continueWithAuth.
  */
  await client.send('Fetch.enable', {
    patterns: [
      {
        urlPattern: '*',
        requestStage: 'Response',
      },
    ],
  });

  /*
    Fetch.requestPaused
    https://chromedevtools.github.io/devtools-protocol/tot/Fetch/#event-requestPaused
    
    Issued when the domain is enabled and the request URL matches the specified filter. The request is paused until the client responds with one of continueRequest, failRequest or fulfillRequest. The stage of the request can be determined by presence of responseErrorReason and responseStatusCode -- the request is at the response stage if either of these fields is present and in the request stage otherwise.
  */
  await client.on('Fetch.requestPaused', async (reqEvent) => {
    // Retrieve EventID
    const { requestId } = reqEvent;

    let responseHeaders = reqEvent.responseHeaders || [];
    let contentType = '';

    // Find and store 'content-type' header
    for (let elements of responseHeaders) {
      if (elements.name.toLowerCase() === 'content-type') {
        contentType = elements.value;
      }
    }

    if (contentType.includes('pdf')) {
      // Uncomment the line below to log response headers for debugging
      // console.log(reqEvent.responseHeaders);

      /*
        Fetch.getResponseBody
        https://chromedevtools.github.io/devtools-protocol/tot/Fetch/#method-getResponseBody
        Causes the body of the response to be received from the server and returned as a single string. May only be issued for a request that is paused in the Response stage and is mutually exclusive with takeResponseBodyForInterceptionAsStream. Calling other methods that affect the request or disabling fetch domain before body is received results in an undefined behavior.
      */
      const responseObj = await client.send('Fetch.getResponseBody', {
        requestId,
      });

      var buf = Buffer.from(responseObj.body, 'base64');
      // Your code to handle buffer
      fs.writeFile(`/home/ubuntu/pdfs/state-${time_now}.pdf`, buf, error => {
          if (error) {
              throw error;
          } else {
              console.log('Buffer Saved!');
          }
      });

      /*
        Fetch.fulfillRequest
        https://chromedevtools.github.io/devtools-protocol/tot/Fetch/#method-fulfillRequest
        Provides response to the request.
      */
      await client.send('Fetch.fulfillRequest', {
        requestId,
        responseCode: 200,
        responseHeaders,
        body: responseObj.body,
      });
    } else {
      // If the content-type is not what we're looking for, continue the request without modifying the response
      await client.send('Fetch.continueRequest', { requestId });
    }
  });
  
  await captchaHandling(page, link, time_now);

  /*
    Fetch.disable
    https://chromedevtools.github.io/devtools-protocol/tot/Fetch/#method-disable
    Disables the fetch domain.
  */
  await client.send('Fetch.disable');

  await browser.close();

  // await pdfToImg(`/home/ubuntu/pdfs/state-${time_now}.pdf`)
  return await pdfToText(`/home/ubuntu/pdfs/state-${time_now}.pdf`, time_now);
};

module.exports = requestPauser;