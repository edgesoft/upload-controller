# upload-controller

A simple upload controller to upload single files. Allow for uploads in React,
Angular components to continue even if the component is unmounted.

## install

npm install upload-controller

## Usage
The files passed to the uploadController is an instance of FileList. You can choose
to pass `onProgress`, `onEnd` if you want to track the file upload. `serverParams` is optional
and will posted to the server along with the file. The `serverParams` must be an array of key, value. `callbackParams` is optional and
will be passed to onProgress and onEnd.

- `onProgress`- object `{percentComplete, callbackParams}`  will be passed. `callbackParams` will contain undefined if not passed to uploadController
- `onEnd` - same as onProgress except that percentComplete will not be in the callback


```js
import uploadController from 'upload-controller';

uploadController(this.files, {
  url: '/upload',
  onProgress: onProgress,
  onEnd: onEnd,
  serverParams: [
    {
      key: 'param1',
      value: 'value1'
    }
  ],
  callbackParams: {
    // add whatever serializable data here
  }
});

function onEnd () {
  console.log('The file is uploaded')
}

function onProgress ({percentComplete}) {
  console.log(percentComplete);
}

```

### simple React version
```js
import React, {Component} from 'react'
import uploadController from 'uploadController'

class Upload extends Component {

  constructor (props) {
    super(props);
    this.files = [];
    this.onFilesChange = this.onFilesChange.bind(this);
    this.upload = this.upload.bind(this);
  }

  onFilesChange (event) {
  	let files = event.target.files;
    this.files = files;
  }

  upload () {
    uploadController(this.files, {
   	  url: '/upload',
      onProgress: () => {}, // make callback
      onEnd: () => {} // make callback
      serverParams: [
        {
          key: 'param1',
          value: 'value1'
        }
      ],
      callbackParams: {
        // add whatever serializable data here
      }
    });    
  }

  render () {
    return (
      <div>
          <h4>Please choose a file.</h4>
          <div>
            <input type={'file'} onChange={this.onFilesChange}/><br/><br/>
            <button disabled={this.files.length === 0} onClick={this.upload}>Upload</button>
          </div>
      </div>
    );
  }
}

export default Upload;
```

## server
Fire up your express server. The example below is for formidable but you
could use any multipart/upload server parser.

```js
var express = require('express');
var app = express();
var formidable = require('formidable');

app.post( '/upload', function(req, res ) {
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
