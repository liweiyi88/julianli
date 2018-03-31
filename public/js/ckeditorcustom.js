$(document).ready(function () {

    document.querySelectorAll( '.awesome-ckeditor textarea' )
        .forEach(function(el){
            el.removeAttribute('required');
            ClassicEditor
                .create( el , {
                    ckfinder: {
                        uploadUrl: '/api/uploads'
                    }
                })
                .then( function (editor) {
                    console.log( editor );
                    var div = el.parentNode.querySelector('.ck-editor__editable');
                    div.style.backgroundColor = 'white';
                    div.style.minHeight = '300px';
                } )
                .catch( function (error) {
                    console.error( error );
                } );
        });

});