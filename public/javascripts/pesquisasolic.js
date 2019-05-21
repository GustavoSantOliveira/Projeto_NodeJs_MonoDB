$(function () {
    $("#btnpesquisa").click(verificaCampo);
});

function verificaCampo(){
    if($("#pesquisa").val()==""||$("#pesquisa").val()==null){
        alert("Campo de pesquisa vazio, por favor preencha")
        $("#pesquisa").focus()
    }else{
        mostrarDado();
    }
}

function mostrarDado(){
    window.location="/index2/result/"+$("#pesquisa").val()  
}