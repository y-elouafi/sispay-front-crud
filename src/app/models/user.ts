export class User {
    prenom: string;
    nom: string;
    email: string;
    telephone: string;
    toJson(){
        return {
            "prenom": this.prenom,
            "nom": this.nom,
            "email": this.email,
            "telephone": this.telephone,
        }
    }
}
