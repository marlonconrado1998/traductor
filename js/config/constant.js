app.constant("FUNCION", {});

app.constant("GeneralURL", "http://localhost:8080");

app.constant("printFile", {
    print: function(elemento) {
        var contenido = document.getElementById(elemento).innerHTML;
        var contenidoOriginal = document.body.innerHTML;

        document.body.innerHTML = contenido;

        window.print();

        document.body.innerHTML = contenidoOriginal;
    }
});