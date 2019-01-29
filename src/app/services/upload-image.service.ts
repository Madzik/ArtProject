import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class UploadImageService {

  filesAdded : Array<File>;
  selectedFile : any;

  constructor(private http: HttpClient) { 
    this.filesAdded = [];
  }

  onFileChange (event : any) {
      this.filesAdded = <Array<File>> event.target.files;
      //const file = event.target.files[0];
      //this.selectedFile = file;
      //this.filesAdded.push(file);
  }

  makeFileRequest (url : string, params : Array<string>, files : Array<File>) {
      return new Promise((resolve, reject) => {
        var formData = new FormData();
        var request = new XMLHttpRequest();

        for (var i = 0; i < files.length; i++) {
          formData.append("upload[]", files[i], files[i].name);
        }
        request.open("POST", url, true);
        request.setRequestHeader("x-auth-token", localStorage.getItem("xAuthToken"));

        request.onreadystatechange = function() {
          if(request.readyState == 4) {
            if(request.status == 200) {
              console.log("Image uploaded.");
            }
            else {
              reject(request.response);
            }
          }
        }
        request.send(formData);
      });
  }

  upload (itemId : number) {
    this.makeFileRequest("http://localhost:8081/item/add/image?id=" + itemId, [], this.filesAdded).then(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      });
  }

  modify (itemId : number) {
    if(this.filesAdded.length > 0) {
      this.makeFileRequest("http://localhost:8081/item/update/image?id=" + itemId, [], this.filesAdded).then(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      });
    }
  }
  // onUpload (itemId : number) {
  //   const uploadData = new FormData();
  //   uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
  //   this.http.post('http://localhost:8081/item/add/image?id=' + itemId, uploadData)
  //   .subscribe(
  //   (res) => {
  //     console.log(res);
  //   },
  //   (error) => {
  //     console.log(error);
  //   });
  // }
}
