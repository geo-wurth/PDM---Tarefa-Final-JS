(async() => {   
    buscarPessoas().then(json => {
        window.dados = json
        listarPessoas();
    }).catch(error => errorLoading(error));
})();

// Busca de pessoas através do link
async function buscarPessoas(link = 'http://swapi.dev/api/people/?page=1') {
    const response = await fetch(link);

    if (!response.ok) {
        throw new Error(response.status);
    }

    const json = await response.json();

    return json;
}

// Listagem dos itens na página
function listarPessoas() {
    editarTitulo("Lista de pessoas - Star Wars");

    const json = window.dados;

    for (var i = 0 ; i < json.results.length; i++) {
        const p = json.results[i];

        novoElemento(document.getElementById("pessoasLista"), "li", ["pessoas-lista-item"]);

        var pessoas = document.getElementsByTagName("li");

        var dadosPessoas = '';

        dadosPessoas += '<div class="container-fluid mx-0">' +
                            '<div class="row">' +
                                '<div class="col-md-2 d-flex align-content-center flex-wrap">' +
                                    '<span class="fw-bold">'+ p.name +'</span>' +
                                '</div>' +
                                '<div class="col-md-9">' +
                                    '<table class="table table-hover text-center">' +
                                        '<thead class="thead-dark">' +
                                            '<tr>' +
                                                '<th scope="col">Altura</th>' +
                                                '<th scope="col">Peso</th>' +
                                                '<th scope="col">Gênero</th>' +
                                                '<th scope="col">Cor do cabelo</th>' +
                                            '</tr>' +
                                        '</thead>' +
                                        '<tbody>' +
                                            '<tr>' +
                                                '<td>' + p.height + '</td>' +
                                                '<td>' + p.mass + '</td>' +
                                                '<td>' + p.gender + '</td>' +
                                                '<td>' + p.hair_color + '</td>' +
                                            '</tr>' +
                                        '</tbody>' +
                                    '</table>' +
                                '</div>' +
                                '<div class="col-md-1 d-flex align-content-center flex-wrap gap-2 justify-content-center">' +
                                    '<a class="btn btn-secondary pessoa-editar js-pessoa-editar" onclick="editarPessoa(' + i + ')">' +
                                        '<i class="bi bi-pencil-square"></i>' +
                                    '</a>' +
                                    '<a class="btn btn-secondary pessoa-remover js-pessoa-remover" onclick="apagarPessoa(this.parentElement)">' +
                                        '<i class="bi bi-x-square"></i>' +
                                    '</a>' +
                                '</div>'
                            '</div>'
                        '</div>';
        
        pessoas[pessoas.length - 1].innerHTML = dadosPessoas;
    }

    if (json.previous != null) {
        const anterior = document.getElementById("anterior");

        anterior.classList.remove("js-escondido");
        anterior.firstElementChild.dataset.page = new URL(json.previous).searchParams.get("page");
    }

    if (json.next != null) {
        const proximo = document.getElementById("proximo");

        proximo.classList.remove("js-escondido");
        proximo.firstElementChild.dataset.page = new URL(json.next).searchParams.get("page");
    }

    document.getElementById("loader").classList.add("js-escondido");
}

// Acesso a página
async function accessPage(element) {
    removeAll();

    buscarPessoas("http://swapi.dev/api/people/?page=" + element.dataset.page).then(json => {
            window.dados = json
            listarPessoas();
        }).catch(error => errorLoading(error));
}

// Mensagem de erro no carregamento
async function errorLoading(error) {

    erroElemento =  document.getElementById("loader").childNodes[0];
    
    erroElemento.textContent = "- Erro no carregamento -" + error;
}

// Adicionar novo elemento
function novoElemento(elem, type, newClass = null, newID = null) {
    var newElem = elem.appendChild(document.createElement(type));

    if (newClass != null) {
        for (let i = 0 ; i < newClass.length ; i++) {
            newElem.classList.add(newClass[i])
            newElem.classList.add('shadow');
        }
    }

    if (newID != null) {
        newElem.id = newID;
    }
}

// Remover todos os pessoas listados
function removeAll() {
    const node = document.getElementById("pessoasLista");

    while (node.lastElementChild) {
        node.removeChild(node.lastElementChild);
    }

    document.getElementById("loader").classList.remove("js-escondido");
    document.getElementById("anterior").classList.add("js-escondido");
    document.getElementById("proximo").classList.add("js-escondido");
}

// Editar pessoa
function editarPessoa(item) {
    editarTitulo("Editar pessoa - Star Wars");

    const json = window.dados.results[item];

    document.getElementById("lista").classList.add("js-escondido");
    document.getElementById("editar").classList.remove("js-escondido");

    var editar = document.getElementById("editar");

    var dadosPessoas = '';

dadosPessoas += '<div class="pessoas-editar shadow" id="pessoas-editar">' +
                    '<div class="container-fluid mx-0">' +
                        '<div class="row">' +
                            '<div class="colv-md">' + 
                                '<div class="form-floating mb-3">' +
                                    '<input type="text" class="form-control" id="nomePessoa">' +
                                    '<label for="nomePessoa">Nome da pessoa</label>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="row">' +
                            '<div class="col-md">' +
                                '<div class="form-floating mb-3">' +
                                    '<input type="text" class="form-control text-center" id="altura">' +
                                    '<label for="altura">Altura</label>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-md">' +
                                '<div class="form-floating mb-3">' +
                                    '<input type="text" class="form-control text-center" id="peso">' +
                                    '<label for="peso">Peso</label>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-md">' +
                                '<div class="form-floating mb-3">' +
                                    '<input type="text" class="form-control text-center" id="genero">' +
                                    '<label for="genero">Gênero</label>' +
                                '</div>' +
                            '</div>' +
                            '<div class="col-md">' +
                                '<div class="form-floating mb-3">' +
                                    '<input type="text" class="form-control text-center" id="corCabelo">' +
                                    '<label for="corCabelo">Cor do cabelo</label>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="row">' + 
                            '<div class="col-md-6 text-center">' +
                                '<button type="button" class="btn btn-secondary w-100 mt-3" onclick="cancelarEditar()">Cancelar</button>' +
                            '</div>' +
                            '<div class="col-md-6 text-center">' +
                                '<button type="button" class="btn btn-secondary w-100 mt-3" onclick="alterarPessoa(' + item + ')">Alterar</button>' +
                            '</div>' +
                    '</div>' +
                '</div>';

    editar.innerHTML = dadosPessoas;

    document.getElementById("nomePessoa").value = json.name;
    document.getElementById("altura").value = json.height;
    document.getElementById("peso").value = json.mass;
    document.getElementById("genero").value = json.gender;
    document.getElementById("corCabelo").value = json.hair_color;
}

function cancelarEditar() {
    removeAll();
    
    document.getElementById("editar").classList.add("js-escondido");
    document.getElementById("lista").classList.remove("js-escondido");
    
    listarPessoas();
}

function alterarPessoa(item){
    window.dados.results[item].name = document.getElementById("nomePessoa").value;
    window.dados.results[item].height = document.getElementById("altura").value;
    window.dados.results[item].mass = document.getElementById("peso").value;
    window.dados.results[item].gender = document.getElementById("genero").value;
    window.dados.results[item].hair_color = document.getElementById("corCabelo").value;

    cancelarEditar();
}

// Remover pessoa
function apagarPessoa(element)
{
    element.parentElement.parentElement.parentElement.remove();
}

function editarTitulo(titulo){
    document.getElementById("titulo").innerText = titulo;
}