/*
<div class="container-card">
  <div class="container-image">
    <img class="first" src="/img/camiseta_branca.svg" alt="camiseta_branca">
  </div>
  <div class="container-informacoes">
    <span>Camisetas</span>
    <h4>White T-shirt</h4>
    <small>Agora você encontrou a camiseta básica do seu guarda-roupa. É feito de um mais grosso...</small>
    <p>R$ 100,00</p>
  </div>
</div>
*/

let container = document.querySelector('.container-left');

for(let i = 0; i < data.length; i++){
    container.insertAdjacentHTML('beforeend',`<div class="container-card"><div class="container-image"><img src = ${data[i].img} alt = ${data[i].nameItem}></div><div class="container-informacoes"><span>${data[i].tag}</span><h4>${data[i].nameItem}</h4>
    <small>${data[i].description}</small><p>R$ ${data[i].value}</p><button id = "${data[i].id}" class="button-left">${data[i].addCart}</button></div>`)    
}

let botoes = document.querySelectorAll('.button-left');

let tituloH4 = document.querySelector('.empty-cart');
let paragrafo = document.querySelector('.add-item');

let divSummary = document.querySelector('.not-yet');

let cartCount = 0;

let soma = 0;
for (let i = 0; i < botoes.length; i++) {
  let botao = botoes[i];

  botao.addEventListener('click', function(e){
    tituloH4.setAttribute('class','carrinho-vazio');
    paragrafo.setAttribute('class','adicionar-item');

    divSummary.setAttribute('class','summary');
    
    let idElement = e.target.id;
    let id = parseInt(idElement);

    if(document.querySelector('#p_'+id) == null){
      let produto = procuraProduto(id);
      
      soma = soma + produto.value;
      document.querySelector('.Two').innerHTML = `${soma}`;
      
      let card = criarProdutoCarrinho(produto);

      let ul = document.querySelector('.carrinho-inside ul');
      ul.appendChild(card);

      cartCount++
      document.querySelector('.One').innerHTML = `${cartCount}`;
    } else{
      alert('Produto já foi adicionado');
    }
  })
}


function procuraProduto(id){
  for (let i = 0; i < data.length; i++) {
    let produto = data[i];
    if(id == produto.id){
      return produto;
    }
  }
  return "Erro";
}

function criarProdutoCarrinho(produto){
    let li = document.createElement('li');
    li.id = 'p_'+produto.id;
    console.log(li)
  
      let divOne = document.createElement('div');
      divOne.classList.add('container-image-two');
  
        let img = document.createElement('img');
        img.src = produto.img;

        divOne.appendChild(img);
  
      let divTwo = document.createElement('div');
      divTwo.classList.add('container-info');

        let h4 = document.createElement('h4');
        h4.innerHTML = `${produto.nameItem}`;

        let p = document.createElement('p');
        p.innerHTML = `R$ ${produto.value}`;

        let button = document.createElement('button');
        button.classList.add('btn-cart');
        button.innerHTML = 'Remover produto';
        button.id = 'prod_'+produto.id;

        button.addEventListener('click', function (e){
          li.remove();

          cartCount--

          document.querySelector('.One').innerHTML = `${cartCount}`;

          soma = soma - produto.value;
          document.querySelector('.Two').innerHTML = `${soma}`;

          if(cartCount == 0){
            divSummary.setAttribute('class','not-yet');
            tituloH4.setAttribute('class','empty-cart');
            paragrafo.setAttribute('class','add-item');
          }
        })

        divTwo.appendChild(h4);
        divTwo.appendChild(p);
        divTwo.appendChild(button);
    
    li.appendChild(divOne);
    li.appendChild(divTwo);

    return li;
}

/*
<div class="summary">
  <p class="pOne">Quantidade:<span class="One">3</span></p>
  <p class="pTwo">Total:<span class="Two">R$ 200,00</span></p>
</div>
*/


/*
<li>
  <div class="container-image-two">
    <img src="/img/camiseta_branca.svg">
  </div>
  <div class="container-info">
    <h4>Camisa Branca</h4>
    <p>R$ 100</p>
    <button class="btn-cart">Remover produto</button>
  </div>
</li>
*/