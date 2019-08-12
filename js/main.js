//banner

//var lang = 'en';

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results != null)
        return results[1] || '';
    return '';
}

$('document').ready(function () {
    lang = $.urlParam('lang') || "en";
    if (lang == 'en')
        $('#language').prop('checked', true);
    start();
});

function oncheckchange() {
    if ($(this).is(":checked")) {
        lang = "en";
    } else {
        lang = "pt";
    }
    start();
}

$('#language').on('change',oncheckchange);

function start() {
    $.getJSON('src/data/site.json', function (data) {
        var dados = data[lang];
        var banner = dados['banner'], menu = dados['menu'];
        var titulo = banner['titulo'],
            resumo = banner['resumo'];
        $('#banner-titulo').html(titulo);
        $('#banner-resumo').html(resumo);
        //createMenu(menu);
        $('#language').on('change',oncheckchange);
        menu.map(menuTeste);
    });

    $.getJSON('src/data/desafios.json', function (data) {
        var dados = data[lang];
        var titulo = dados['titulo'],
            conteudo = dados['conteudo'], desafiosHtml = '';
        $('#desafios-titulo').html(titulo);
        $.each(conteudo, function (key, value) {
            var content = {
                "titulo": value['titulo'],
                "conteudo": value['conteudo'],
                "icone": value['icone'] || 'adb'
            }
            desafiosHtml += challengeCard(content);
        });

        if (desafiosHtml)
            $('#desafios-conteudo').html(desafiosHtml);


    });

    $.getJSON('src/data/comoajudar.json', function (data) {
        var dados = data[lang];
        var titulo = dados['titulo'],
            conteudo = dados['conteudo'],
            subtitulo = dados['subtitulo'],
            comoAjudarHtml = '';//lista
        $('#ajuda-titulo').html(titulo);
        $('#ajuda-subtitulo').html(subtitulo);
        $.each(conteudo, function (k, v) {
            var content = {
                "titulo": v['titulo'],
                "conteudo": v['conteudo'],
                "icone": v['icone'] || 'adb'
            }
            comoAjudarHtml += ajudaConteudo(content);
        });
        if (comoAjudarHtml)
            $('#ajuda-conteudo').html(comoAjudarHtml);

    });

    $.getJSON('src/data/impactoambiental.json', function (data) {
        var dados = data[lang];
        var titulo = dados['titulo'],
            conteudo = dados['conteudo'],
            saude = conteudo['saude'], gases = conteudo['gases'];
        var cardSaude = '', cardGases = '';


        $('#impacto-titulo').html(titulo);
        cardSaude = cardImpactoSaude(saude);
        cardGases = cardImpactoGases(gases);
        if (cardSaude)
            $('#impacto-saude').html(cardSaude);
        if (cardGases)
            $('#impacto-gas').html(cardGases);


    });
    
    $.getJSON('src/data/solucao.json', function (data){
        var dados = data[lang];
        var titulo = dados['titulo'],
            descricao = dados['descricao'],
            estacionamento = dados['estacionamento']['conteudo'],
            usuario = dados['usuario']['conteudo'];

        $('#solucao-titulo').html(titulo);
        $('#solucao-descricao').html(descricao);
        $('#solucao-estacionamento').html(estacionamento);
        $('#solucao-usuario').html(usuario);
        

    })
}


function menuTeste(menu){
    var titulo=menu['titulo'],link=menu['link'];
    $('a[href="'+link+'"]').html(titulo);
}

function cardImpactoSaude(content){
    var titulo=content['titulo'],conteudo=content['conteudo'],collection=content['collection'];
    function itemlista(item){
        return '<li class="collection-item transparent"><span>'+item+'</span></li>'
    };
    var header = collection['header'], items=collection['items']
    var lista = items.map(itemlista).join('');

    var card = '<div class="card transparent">'
                +'<div class="card-content" >'
                    +'<div class="card-title">'
                        +'<h4 class="green-text"><b>'+titulo+'</b></h4> '
                    +'</div>'
                    +'<p>'+conteudo+'</p>'
                    +'<ul class="collection" id="lista-saude">'
                        +'<li class="collection-header center green-text"><h4>'+header+'</h4></li>'
                    +lista
                    +'</ul>'
                +'</div>'
            +'</div>';
return card;
}

function cardImpactoGases(content){
    var titulo=content['titulo'],conteudo=content['conteudo'],table=content['table'];
        var head = table['head'], body=table['body'];
    
        var tableTitulo = head.map(tableHead).join('');
        var tableBody = body.map(tableBodyRow).join('');
    var card = '<div class="card transparent">'
                            +'<div class="card-content">'
                                +'<div class="card-title">'
                                    +'<h4 class="green-text"><b>'+titulo+'</b></h4> '
                                +'</div>'
                                +'<p>'+conteudo+'</p>'
                                +'<table class="responsive-table highlight">'
                                    +'<thead>'
                                        +'<tr>'
                            +tableTitulo
                                        +'</tr>'
                                    +'</thead>'
                                    +'<tbody>'
                        +tableBody
                                    +'</tbody>'
                                +'</table>'
                            +'</div>'
                        +'</div>'
return card;
}

function ajudaConteudo(content){
    var titulo=content['titulo'],conteudo=content['conteudo'],icone=content['icone'],subtitulo=conteudo['titulo'],descricao=conteudo['conteudo'];
    var item = '<li>'
                    +'<div class="collapsible-header"><i class="material-icons">'+icone+'</i>'+titulo+'</div>'
                    +'<div class="collapsible-body white">'
                        +'<h5 class="green-text">'+subtitulo+'</h5>'
                        +'<span>'+descricao+'</span>'
                    +'</div>'
                +'</li>';
return item;
}

function challengeCard(content){
    var titulo=content['titulo'],conteudo=content['conteudo'],icone=content['icone']
    var card = '<div class="col s12 m6 l3">'
                    +'<div class="card blue-grey darken-2">'
                        +'<div class="card-content activator white-text">'
                            +'<div class="icon-block">'
                                +'<h2 class="center "><i class="material-icons">'+icone+'</i><br><br></h2>'
                                +'<h5 class="center">'+titulo+'</h5>'
                            +'</div>'
                        +'</div>'
                        +'<div class="card-reveal">'
                            +'<span class="card-title grey-text text-darken-4">'+titulo+''
                            +'<i class="material-icons right">close</i></span>'
                            +'<p>'+conteudo+'</p>'
                        +'</div>'
                    +'</div>'
                +'</div>';
                return card;
}

function tableHead(item){
    return '<th><span>'+item+'</span></th>'
            }
            
function tableBodyItem(item){
    return '<td><span>'+item+'</span></td>'
            }
            
function tableBodyRow(item){
    return '<tr>'+item.map(tableBodyItem).join('')+'</tr>'
}


function mapMenu(item){
    var titulo = item['titulo'],link=item['link'];
    return menuItem = '<li><a class="white-text text-darken-2" href="'+link+'">'+titulo+'</a></li>';
}

function createMenu(menu){
    var checked='false';
    if(lang=='pt') checked=false;
    var checkboxLang = '<li>'
                +'<a class="white-text text-darken-2">'
                    +'<div class="switch">'
                        +'<label>'
                        +'Pt<input type="checkbox" checked="'+checked+'" id="language"><span class="lever"></span>En'
                        +'</label>'
                    +'</div>'
                +'</a>'
            +'</li>';
    console.log(checkboxLang);
    var menuDesktop=menu.filter(function(item){return item['desktop']}).map(mapMenu).join('');
    var menuMobile=menu.map(mapMenu).join('');
    //$('#nav-desktop').append(menuDesktop);
    //$('#nav-mobile').append(menuMobile);
    $('#language').on('change',oncheckchange);
}