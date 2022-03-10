import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { environment } from 'src/environments/environment';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

firebase.initializeApp(environment.firebaseConfig);



@Injectable({
    providedIn: 'root'
})
export class StorageService {
    storageRef = firebase.app().storage().ref();
    constructor() { }
    async uploadFile(file: any, path: string, nombre: string) {
        console.log('file', file)
        if (file.type == "image/jpeg" || file.type == "image/png"  || file.type == "image/jpg") {
            const metadata = {
                contentType: 'image/jpeg'
            };
            const storage = getStorage();
            const storageRef = ref(storage, path + '/img/' + nombre);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        // ...

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                    });
                }
            );
        } else {
            const metadata = {
                contentType: 'application/pdf'
            };
            const storage = getStorage();
            const storageRef = ref(storage, path + '/pdf/' + nombre);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        // ...

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                    });
                }
            );
        }

        // try {
        //     console.log('file', file)
        //     console.log('nombre', nombre)
        //     console.log('path', path)
        //     let res = await this.storageRef.child(path + '/' + nombre).putString(file, 'data_url');
        //     console.log('res', res)

        // } catch (err) {
        //     console.log('err', err)

        // }
        // Listen for state changes, errors, and completion of the upload.


    }
}