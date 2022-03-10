import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FirebasebdService {

    constructor(private firestore: AngularFirestore,
        private storage: AngularFireStorage) { }

    async create(collection, dato) {
        try {
            return await this.firestore.collection(collection).add(dato);
        } catch (error) {
            console.log("error en: create ", error)
        }
    }

    async getAll(collection) {
        try {
            return await this.firestore.collection(collection).snapshotChanges();
        } catch (error) {
            console.log("error en: getAll ", error)
        }
    }


    async getById(collection, id) {
        try {
            return await this.firestore.collection(collection).doc(id).get();
        } catch (error) {
            console.log("error en: getById ", error)
        }
    }


    async delete(collection, id) {
        try {
            return await this.firestore.collection(collection).doc(id).delete();
        } catch (error) {
            console.log("error en: getAll ", error)
        }
    }


    async update(collection, id, dato) {

        try {
            return await this.firestore.collection(collection).doc(id).set(dato);
        } catch (error) {
            console.log("error en: getAll ", error)
        }
    }

    // uploadFile(file: any, path: string, nombre: string): Promise<string> {
    //     try {
    //         let respuesta = wait
    //     }catch(err){

    //     }
    //     // return new Promise(resolve => {
    //     //     const filePath = path + '/' + nombre;
    //     //     const ref = this.storage.ref(filePath);
    //     //     const task = ref.put(file);
           

    //     // });
    // }
}
