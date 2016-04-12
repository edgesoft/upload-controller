# upload-controller

A simple upload controller to upload single files. Allow for uploads in React, Angular Components
to continue even if the component if unmounted.

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
