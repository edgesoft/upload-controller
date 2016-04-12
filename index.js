/*global FormData, XMLHttpRequest, FileList*/
var UploadService = function (files, options) {
  if (!options.url) {
    console.warn('UploadService: options must contain url')
    return
  }

  if (files && files instanceof FileList) {
    var formData = new FormData()
    formData.append('file', files[0])
    var xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        if (options.onEnd) {
          options.onEnd()
        }
      }
    }

    xhr.open('POST', options.url, true)

    xhr.upload.onprogress = function (e) {
      if (options.onProgress) {
        var percentComplete = (e.loaded / e.total) * 100
        options.onProgress({percentComplete: percentComplete.toFixed(0)})
      }
    }

    xhr.send(formData)
  }
}

module.exports = UploadService
