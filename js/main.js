//banner

//var lang = 'en';
var submitted = false;
$('#submit-btn').click(function (e) {
    e.preventDefault();
    if (validateForm())
        $('#contact').submit();
})


$('#contact').on('submit', function (e) {
    //$('#contact *').fadeOut(2000);
    M.toast({ html: 'Email sent' });
    $('#email').val("");
    $('#textarea1').val("");
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

$('#language').on('change', oncheckchange);

function start() {
    //$('#carregando').html(carregando);
    $.getJSON('src/data/site.json', function (data) {
        var dados = data[lang];
        var banner = dados['banner'], menu = dados['menu'],rodape=dados['rodape'];
        var titulo = banner['titulo'],
            resumo = banner['resumo'];
        var bio=rodape['bio'],form = rodape['form'], formTitulo=form['titulo'], formEmail=form['email'], formMessage=form['message'],formButton=form['button']
        $('#banner-titulo').html(titulo);
        $('#banner-resumo').html(resumo);
        //createMenu(menu);
        $('#company-bio').html(bio);
        $('#form-titulo').html(formTitulo);
        $('#form-email').html(formEmail);
        $('#form-message').html(formMessage);
        $('#form-button').html(formButton);
        menu.map(menuTeste);
        $('#language').on('change', oncheckchange);
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

    $.getJSON('src/data/solucao.json', function (data) {
        var dados = data[lang];
        var titulo = dados['titulo'],
            descricao = dados['descricao'],
            estacionamento = dados['estacionamento']['conteudo'],
            usuario = dados['usuario']['conteudo'];

        $('#solucao-titulo').html(titulo);
        $('#solucao-descricao').html(descricao);
        $('#solucao-estacionamento').html(estacionamento);
        $('#solucao-usuario').html(usuario);


    });

    $.getJSON('src/data/tecnica.json', function (data) {
        var dados = data[lang];
        var titulo = dados['titulo'],
            descricao = dados['descricao'],
            hardware = dados['conteudo']['hardware'],
            software = dados['conteudo']['software'];
        $('#tecnica-titulo').html(titulo);
        $('#tecnica-descricao').html(descricao);
        $('#hardware-titulo').html(hardware['titulo']);
        $('#hardware-descricao').html(hardware['descricao']);
        $('#software-titulo').html(software['titulo']);
        $('#software-descricao').html(software['descricao']);
    });

    $.getJSON('src/data/economica.json', function (data) {
        var dados = data[lang];
        var titulo = dados['titulo'], conteudo = dados['conteudo'],
            resumo = conteudo['resumo'], custos = conteudo['custos'];
        $('#economica-titulo').html(titulo);
        $('#economica-resumo').html(resumoEconomico(resumo));
        $('#economica-custos').html(custoEconomico(custos));
    })
    $('#carregando').html('');
}

function resumoEconomico(resumo) {
    function card(item) {
        var icone = item['icone'], desc = item['item']
        return '<div class="card green"><div class="content"><h5 class="white-text" style="padding: 20px 50px"><i class="fas fa-' + icone + ' left"></i><span>' + desc + '</span></h5></div></div>'
    }
    var cards = resumo.map(card).join('');
    return cards
}

function custoEconomico(custo) {
    var titulos = custo['titulos'], linhas = custo['linhas'];

    var tableTitulos = titulos.map(function (item) { return '<th>' + item + '</th>' }).join('');
    var tableContent = linhas.map(function (item) {
        var t1 = item['item'], t2 = item['cost'];
        return '<tr><td>' + t1 + '</td><td>' + t2 + '</td></tr>'
    }).join('');
    return '<table class="highlight white-text">'
        + '<thead><tr>'
        + tableTitulos
        + '</tr></thead>'
        + '<tbody>'
        + tableContent
        + '</tbody>'
        + '</table>';
}
function menuTeste(menu) {
    var titulo = menu['titulo'], link = menu['link'];
    $('a[href="' + link + '"]').html(titulo);
}

function cardImpactoSaude(content) {
    var titulo = content['titulo'], conteudo = content['conteudo'], collection = content['collection'];
    function itemlista(item) {
        return '<li class="collection-item transparent"><span>' + item + '</span></li>'
    };
    var header = collection['header'], items = collection['items']
    var lista = items.map(itemlista).join('');

    var card = '<div class="card transparent">'
        + '<div class="card-content" >'
        + '<div class="card-title">'
        + '<h4 class="green-text"><b>' + titulo + '</b></h4> '
        + '</div>'
        + '<p>' + conteudo + '</p>'
        + '<ul class="collection" id="lista-saude">'
        + '<li class="collection-header center green-text"><h4>' + header + '</h4></li>'
        + lista
        + '</ul>'
        + '</div>'
        + '</div>';
    return card;
}

function cardImpactoGases(content) {
    var titulo = content['titulo'], conteudo = content['conteudo'], table = content['table'];
    var head = table['head'], body = table['body'];

    var tableTitulo = head.map(tableHead).join('');
    var tableBody = body.map(tableBodyRow).join('');
    var card = '<div class="card transparent">'
        + '<div class="card-content">'
        + '<div class="card-title">'
        + '<h4 class="green-text"><b>' + titulo + '</b></h4> '
        + '</div>'
        + '<p>' + conteudo + '</p>'
        + '<table class="responsive-table highlight">'
        + '<thead>'
        + '<tr>'
        + tableTitulo
        + '</tr>'
        + '</thead>'
        + '<tbody>'
        + tableBody
        + '</tbody>'
        + '</table>'
        + '</div>'
        + '</div>'
    return card;
}

function ajudaConteudo(content) {
    var titulo = content['titulo'], conteudo = content['conteudo'], icone = content['icone'], subtitulo = conteudo['titulo'], descricao = conteudo['conteudo'];
    var item = '<li>'
        + '<div class="collapsible-header"><i class="material-icons">' + icone + '</i>' + titulo + '</div>'
        + '<div class="collapsible-body white">'
        + '<h5 class="green-text">' + subtitulo + '</h5>'
        + '<span>' + descricao + '</span>'
        + '</div>'
        + '</li>';
    return item;
}

function challengeCard(content) {
    var titulo = content['titulo'], conteudo = content['conteudo'], icone = content['icone']
    var card = '<div class="col s12 m6 l3">'
        + '<div class="card blue-grey darken-2">'
        + '<div class="card-content activator white-text">'
        + '<div class="icon-block">'
        + '<h2 class="center "><i class="material-icons">' + icone + '</i><br><br></h2>'
        + '<h5 class="center">' + titulo + '</h5>'
        + '</div>'
        + '</div>'
        + '<div class="card-reveal">'
        + '<span class="card-title grey-text text-darken-4">' + titulo + ''
        + '<i class="material-icons right">close</i></span>'
        + '<p>' + conteudo + '</p>'
        + '</div>'
        + '</div>'
        + '</div>';
    return card;
}

function tableHead(item) {
    return '<th><span>' + item + '</span></th>'
}

function tableBodyItem(item) {
    return '<td><span>' + item + '</span></td>'
}

function tableBodyRow(item) {
    return '<tr>' + item.map(tableBodyItem).join('') + '</tr>'
}


function mapMenu(item) {
    var titulo = item['titulo'], link = item['link'];
    return menuItem = '<li><a class="white-text text-darken-2" href="' + link + '">' + titulo + '</a></li>';
}

function createMenu(menu) {
    var checked = 'false';
    if (lang == 'pt') checked = false;
    var checkboxLang = '<li>'
        + '<a class="white-text text-darken-2">'
        + '<div class="switch">'
        + '<label>'
        + 'Pt<input type="checkbox" checked="' + checked + '" id="language"><span class="lever"></span>En'
        + '</label>'
        + '</div>'
        + '</a>'
        + '</li>';
    console.log(checkboxLang);
    var menuDesktop = menu.filter(function (item) { return item['desktop'] }).map(mapMenu).join('');
    var menuMobile = menu.map(mapMenu).join('');
    //$('#nav-desktop').append(menuDesktop);
    //$('#nav-mobile').append(menuMobile);
    $('#language').on('change', oncheckchange);
}


var loading = '<div class="row carregando">'
    + '<div class="center">'
    + '<div class="preloader-wrapper big active">'
    + '<div class="spinner-layer spinner-white-only">'
    + '<div class="circle-clipper left">'
    + '<div class="circle"></div>'
    + '</div><div class="gap-patch">'
    + '<div class="circle"></div>'
    + '</div><div class="circle-clipper right">'
    + '<div class="circle"></div>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '</div>'