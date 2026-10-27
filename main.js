import {initializeApp} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
import {getDatabase, push, remove, onValue, ref, update } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-database.js";

 const firebaseConfig = {
    apiKey: "AIzaSyAD9nFTF61he8DpImr5TM_s265j4wlnvDM",
    authDomain: "lista5-a19e8.firebaseapp.com",
    projectId: "lista5-a19e8",
    storageBucket: "lista5-a19e8.firebasestorage.app",
    messagingSenderId: "819314876392",
    appId: "1:819314876392:web:9fc906f43d86d476d34e5d",
    measurementId: "G-B3MJV0T8LG"
  };
  

  const app = initializeApp({
    databaseURL: "https://lista5-a19e8-default-rtdb.firebaseio.com/"
  });

  const db = getDatabase(app);
  const coisas = ref(db, "coisas");

  const form = document.getElementById("form-coisas");
  const titulo = document.getElementById("titulo");
  const lista = document.getElementById("lista-coisas");

  form.onsubmit = (e) => {
    e.preventDefault();
    push(coisas, {titulo: titulo.value});
    form.reset();
  }

  onValue(coisas, (snap) => {
    lista.innerHTML = "";
    snap.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.val().titulo + " ";

        const editar = document.createElement("button");
        editar.textContent = "Editar"
        editar.onclick = () => {
            const novo = prompt("Novo nome:", item.val().titulo)
            if (novo) update(item.ref, {titulo: novo})
        };
    const excluir = document.createElement("button");
    excluir.textContent = "excluir";
    excluir.onclick = () => remove(item.ref);

    li.append(editar, excluir);
    lista.append(li);
    });
  });