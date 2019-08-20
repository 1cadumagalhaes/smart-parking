//banner
function grafTempo(){
    var dataTempo = {
        labels: ["Until 5 minutes", "10 to 30 minutes", "More than 40 minutes"],
        datasets: [
            {
                label: "Survey answers",
                backgroundColor:"rgba(76, 175, 80, 0.5)",
                data: [7,34,7]
            }
        ]
    };
    
    var ctxTempo = document.getElementById('grafico-tempo').getContext("2d");
    var myTempoChart = new Chart(ctxTempo,{
        type:'bar',
        data:dataTempo,
        options: {
            responsive: true,
            legend: {
                position: 'top',
            }
        }
    });
}

function grafAtraso(){
    var dataAtraso = {
        labels: ["Yes", "No"],
        datasets: [
            {
                label: "Survey answers",
                backgroundColor:["rgba(232, 73, 51, 1)","rgba(76, 175, 80, 0.5)"],
                data: [31,17]
            }
        ]
    };
    
    
    var ctxAtraso = document.getElementById('grafico-atraso').getContext("2d");
    
    var myAtrasoChart = new Chart(ctxAtraso,{
        type:'pie',
        data:dataAtraso,
        options: {
            responsive: true,
            legend: {
                position: 'top',
            }
        }
    });
}

function grafSaiu(){
    var dataSaiu = {
        labels: ["Yes", "No"],
        datasets: [
            {
                label: "Survey answers",
                backgroundColor:["rgba(232, 73, 51, 1)","rgba(76, 175, 80, 0.5)"],
                data: [36,12]
            }
        ]
    };
    
    var ctxSaiu = document.getElementById('grafico-saiu').getContext("2d");
    
    var mySaiuChart = new Chart(ctxSaiu,{
        type:'pie',
        data:dataSaiu,
        options: {
            responsive: true,
            legend: {
                position: 'top',
            }
        }
    });
}


function grafLembrar(){
    var dataLembrar = {
        labels: ["You get lost", "Remember where you parked","Take notes"],
        datasets: [
            {
                label: "Survey answers",
                backgroundColor:"rgba(76, 175, 80, 0.5)",
                data: [12,22,9]
            }
        ]
    };
    
    
    var ctxLembrar = document.getElementById('grafico-lembrar').getContext("2d");
    
    var myLembrarChart = new Chart(ctxLembrar,{
        type:'bar',
        data:dataLembrar,
        options: {
            responsive: true,
            legend: {
                position: 'top',
            }
        }
    });
}

function grafStress(){
    var dataStress = {
        labels: ["Yes", "No"],
        datasets: [
            {
                label: "Survey answers",
                backgroundColor:["rgba(232, 73, 51, 1)","rgba(76, 175, 80, 0.5)"],
                data: [38,10]
            }
        ]
    };
    
    
    var ctxStress = document.getElementById('grafico-stress').getContext("2d");
    
    var myStressChart = new Chart(ctxStress,{
        type:'pie',
        data:dataStress,
        options: {
            responsive: true,
            legend: {
                position: 'top',
            }
        }
    });
}
function grafVaga(){
    var dataVaga = {
        labels: ["Keep riding", "Wait","Give up","Go elsewhere"],
        datasets: [
            {
                label: "Survey answers",
                backgroundColor:"rgba(76, 175, 80, 0.5)",
                data: [35,5,2,6]
            }
        ]
    };
    
    
    var ctxVaga = document.getElementById('grafico-vaga').getContext("2d");
    
    var myVagaChart = new Chart(ctxVaga,{
        type:'bar',
        data:dataVaga,
        options: {
            responsive: true,
            legend: {
                position: 'top',
            }
        }
    });
}








//var lang = 'en';
var submitted = false;
$('#submit-btn').click(function (e) {
    e.preventDefault();
    if (validateForm()){
        $('#contact').submit();
        console.log('submit');
    }
})


$('#contact').on('submit', function (e) {
    //$('#contact *').fadeOut(2000);
    setTimeout(function(){
        M.toast({ html: 'Email sent' });
        $('#email').val("");
        $('#textarea1').val("");
    },1000)
    
});

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results != null)
        return results[1] || '';
    return '';
}

function validateForm() {
    var email = $('#email').val(),
        text = $('#textarea1').val(),
        regEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.([a-z]+))?$/i,
        regText = /(.+)/gi;
    if (regEmail.test(email) && regText.test(text))
        return true;
    if (!regEmail.test(email))
        M.toast({ html: 'Please fill the email correctly' });
    if (!regText.test(text))
        M.toast({ html: 'Please fill the message' });

    return false;
}

$('document').ready(function () {
    lang = $.urlParam('lang') || "en";
    if (lang == 'en'){
        $('#language1').prop('checked', true);
        $('#language2').prop('checked', true);
    }

    start();
    grafAtraso();
    grafLembrar();
    grafSaiu();
    grafStress();
    grafTempo();
    grafVaga();
});

function oncheckchange() {
    if ($(this).is(":checked")) {
        lang = "en";
    } else {
        lang = "pt";
    }
    start();
}

$('#language1').on('change', oncheckchange);
$('#language2').on('change', oncheckchange);
function start() {
    //$('#carregando').html(carregando);
    $.getJSON('src/data/site.json', function (data) {
        var dados = data[lang];
        var menu = dados['menu'],rodape=dados['rodape'];
        var bio=rodape['bio'],form = rodape['form'], formTitulo=form['titulo'], 
        formEmail=form['email'], formMessage=form['message'],formButton=form['button'];

        $('#company-bio').html(bio);
        $('#form-titulo').html(formTitulo);
        $('#form-email').html(formEmail);
        $('#form-message').html(formMessage);
        $('#form-button').html(formButton);
        menu.map(menuTeste);
        $('#language').on('change', oncheckchange);
    });


    $('#carregando').html('');
}

function menuTeste(menu) {
    var titulo = menu['titulo'], link = menu['link'];
    $('a[href="' + link + '"]').html(titulo);
}

