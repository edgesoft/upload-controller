# upload-controller

A simple upload controller to upload single files. Allow for uploads in React,
Angular components to continue even if the component is unmounted.

## install

npm install upload-controller

## Usage

```js
import uploadController from 'upload-controller';

uploadController(this.files, {
  url: '/upload',
  onProgress: onProgress,
  onEnd: onEnd
});

function onEnd () {
  console.log('The file is uploaded')
}

function onProgress ({percentComplete}) {
  console.log(percentComplete);
}

```

## server
Fire up your express server. The example below is for formidable but you
could use any multipart/upload server parser.

```js
var express = require('express');
var app = express();
var formidable = require('formidable');

app.post( '/upload' , function(req, res ){
     var form = new formidable.IncomingForm({
     	uploadDir: '/some/dir/',
        keepExtensions: true
     });
     form.on('progress', function(bytesReceived, bytesExpected) {
        var percent_complete = (bytesReceived / bytesExpected) * 100;
    });

    form.on('end', function(fields, files) {
        res.send({});
    });

    form.parse(req);
});
```

## Next
Anyone have need for multi upload? Add an issue. We need to discuss how callbacks
should be handled when having multiple files. Should we add support for additional parameters for the form
upload? Please add an issue if you have questions or want some features.
