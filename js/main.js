//banner

var lang = 'en';

$.getJSON('src/data/banner.json',function(data){
    var dados = data[lang];
    var titulo = dados['titulo'],
    resumo = dados['resumo'];
    $('#banner-titulo').html(titulo);
    $('#banner-resumo').html(resumo);
});

//desafios
$.getJSON('src/data/desafios.json',function(data){
    var dados = data[lang];
    var titulo = dados['titulo'],
    conteudo = dados['conteudo'],desafiosHtml='';
    $('#desafios-titulo').html(titulo);
    $.each(conteudo, function (key,value){
        var content = {
            "titulo":value['titulo'],
            "conteudo":value['conteudo'],
            "icone":value['icone']||'adb'
        }
        desafiosHtml +=challengeCard(content);
    });

    if(desafiosHtml)
        $('#desafios-conteudo').html(desafiosHtml);

    
});

$.getJSON('src/data/comoajudar.json',function(data){
    var dados = data[lang];
    var titulo = dados['titulo'],
    conteudo = dados['conteudo'],
    comoAjudarHtml='';//lista
    $('#ajuda-titulo').html(titulo);
    $.each(conteudo, function (k,v){
        var content = {
            "titulo":v['titulo'],
            "conteudo": v['conteudo'],
            "icone": v['icone']||'adb'
        }
        comoAjudarHtml+=ajudaConteudo(content);
    });
    if(comoAjudarHtml)
        $('#ajuda-conteudo').html(comoAjudarHtml);
    
});




function ajudaConteudo(content){
    var titulo=content['titulo'],conteudo=content['conteudo'],icone=content['icone'];
    function itemlista(conteudo){
                return '<li class="collection-item">'
                            +'<span>'+conteudo+'</span>'
                        +'</li>'
            };
    var lista = conteudo.map(itemlista).join('');
    var item = '<li>'
                    +'<div class="collapsible-header"><i class="material-icons">'+icone+'</i>'+titulo+'</div>'
                    +'<div class="collapsible-body white">'
                        +'<ul class="collection">'
                            +lista
                        +'</ul>'
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
                                +'<h2 class="center "><i class="material-icons">'+icone+'</i></h2>'
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