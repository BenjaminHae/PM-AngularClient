import { CryptedObject } from './cryptedObject';

export class Account {
    public index: number;
    public name: string;
    public enpassword: CryptedObject;
    public other: object;
    public file;

    constructor(index: number, name: string, enpassword: CryptedObject) {
        this.index = index;
        this.name = name;
        this.enpassword = enpassword;
        this.other = {};
        this.file = null;
    }

    clearOther() {
        this.other = {};
    }
    clearVisibleOther() {
        for (let item in this.other) {
            if (item.substring(0,1) != "_") {
                delete this.other[item];
            }
        }
    }
    get availableOthers() {
        let availableOthers = [];
        for (let otherName in this.other) {
            availableOthers.push(otherName);
        }
        return availableOthers;
    }
    setOther(name, value) {
        this.other[name] = value;
    }
    getOther(name) {
        return this.other[name];
    }
    getOtherJSON() {
        return JSON.stringify(this.other);
    }
    addEncryptedFile(name, fkey) {
        var self = this;
        self.file = { "name":"", "key": fkey };
        //return self.encryptionWrapper.decryptChar(name)
        //    .then(function(decryptedName) {
        //        self.file.name = decryptedName;
        //        return self.file;
        //    });
    }
    hasFile() {
        return 'file' in this;
    }
}
