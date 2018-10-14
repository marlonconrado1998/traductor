app.component('loader', {
    template: 
        '<div class="text-center d-flex align-items-center" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; background-color: #fcfcffe3;">' + 
            '<div class="col">' + 
                '<div class="lds-spinner">' + 
                    '<div></div>'+
                    '<div></div>'+
                    '<div></div>'+
                    '<div></div>'+
                    '<div></div>'+
                    '<div></div>'+
                    '<div></div>'+
                    '<div></div>'+
                    '<div></div>'+
                    '<div></div>'+
                    '<div></div>'+
                    '<div></div>'+
                '</div>' + 
                '<h5>Cargando...</h5>' + 
            '</div>' +
        '</div>'

});