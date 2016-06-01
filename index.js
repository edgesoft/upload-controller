/*global FormData, XMLHttpRequest, FileList*/function parseResponse (xhr) {  if (xhr.response) {    try {      return JSON.parse(xhr.response)    } catch (e) {}  }  return null}var uploadController = function (files, options) {  if (!options.url) {    console.warn('upload-controller: options must contain url')    return  }  if (files && files instanceof FileList) {    var formData = new FormData()    formData.append('file', files[0])    if (options.query && Array.isArray(options.query)) {      options.query.forEach(function (param) {        if (param.key && param.value) {          formData.append(param.key, param.value)        }      })    }    var xhr = new XMLHttpRequest()    xhr.onreadystatechange = function () {      if (xhr.readyState === 4 && xhr.status === 200) {        if (options.onEnd) {          options.onEnd(parseResponse(xhr))        }      }      if (xhr.status >= 400) {        if (options.onError) {          options.onError(parseResponse(xhr))        }      }    }    xhr.open('POST', options.url, true)    if (options.headers && Array.isArray(options.headers)) {      options.headers.forEach(function (header) {        if (header.key && header.value) {          xhr.setRequestHeader(header.key, header.value)        }      })    }    xhr.upload.onprogress = function (e) {      if (options.onProgress) {        var percentComplete = (e.loaded / e.total) * 100        options.onProgress({percentComplete: percentComplete.toFixed(0)})      }    }    xhr.send(formData)  }}module.exports = uploadController