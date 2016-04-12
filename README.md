# upload-controller

A simple upload controller to upload single files

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
