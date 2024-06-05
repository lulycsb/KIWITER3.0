const firebaseConfig = {

    apiKey: "AIzaSyDceOenELVNLoKmhVs3EI6K_CFcmG2o_n8",
    authDomain: "kwitter-bf076.firebaseapp.com",
    databaseURL: "https://kwitter-bf076-default-rtdb.firebaseio.com",
    projectId: "kwitter-bf076",
    storageBucket: "kwitter-bf076.appspot.com",
    messagingSenderId: "101381136866",
    appId: "1:101381136866:web:5d4c18c8968064007319bb",
    measurementId: "G-30WC1EMY5S"
  };

firebase.initializeApp(firebaseConfig);

inicializar();

function inicializar() {
    const nomeUsuario = localStorage.getItem("nomeUsuario");
    // console.log(nomeUsuario);
    document.getElementById("nomeUsuario").textContent = "Olá, " + nomeUsuario + "!";

    getData();
}

function addSala() {
    const nomeSala = document.getElementById("nomeSala").value;
    console.log(nomeSala);
    if (nomeSala) {
        firebase.database().ref('/').child(nomeSala).set({
             // '/'--> significa acessar a raiz do meu firebase, que é uma barra,é topo da estrutura de dados do meu Firebase, usamos para add o nome de usuario do BD ;
            purpose: "sala criada"
        });

        carregaSala(nomeSala);
    }
}

function getData() {
    firebase.database().ref('/').on("value", snapshot => {
        let salas = [];
        snapshot.forEach(childSnapshot => {
            const childKey = childSnapshot.key;
            const html = '<div class="nomeSala" id="'
                + childKey
                + '" onclick="carregaSala(this.id)">#'
                + childKey
                + '</div>'
            salas.push(html);
        });
        document.getElementById("output").innerHTML = salas.join("");
        // const output = document.getElementById("output");
        // output.innerHTML = salas.join("");
    });
}

function carregaSala(sala) {
    localStorage.setItem("nomeSala", sala);
    location = "chat.html";
}