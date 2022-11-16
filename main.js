let limit=10;
let offset=0;
function start(){
	fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
		.then((response)=> response.json())
		.then((data)=>{return data.results})
		.then((pokeLista)=>pokeLista.map((pokemon)=>fetch(pokemon.url).then((response)=>response.json())))
		.then((pokemonDetalhes)=>Promise.all(pokemonDetalhes))
		.then((listaDetalhada)=>{
	  	console.log(listaDetalhada)
			let pokeBox=document.getElementById("pokeBox")
			listaDetalhada.forEach((item, index)=>{
	   			pokeBox.innerHTML+= pokeInfo(item)
	   		})
	   	})
	   	offset = offset +10
}
   
function pokeInfo(poke){
	return `<div class="pokeCard  ${poke.types[0].type.name}">
		<div class="pokeValores">
    		<h3 class="nome">${poke.name} <sub class="numero">#${zeros(poke.id)}</sub></h3>
    		<div class="tipoBox">
    			${tipos(poke.types)}	
    		</div>
    		<button id="cardBtn" onclick="mostrarDetalhes('${poke.name}')">Detalhes</button>
    	</div>
    	<div class="pokeImagem">
    		<img alt=${poke.name} src="${poke.sprites.other.dream_world.front_default}"/>
    	</div>
    </div>`
}

function zeros(valor){
//	alert(typeof valor)
	if(valor<10)return `00${valor}`
	if(valor>=10 && valor<100)return `0${valor}`
	return valor
}

function tipos(tipo){
	let tipos = tipo.map((item)=>{
		return `<p class="tipo ${item.type.name}">${item.type.name}</p>`
	})
	return tipos.join("")	
}

function status(valor){
console.log(valor)
		let status = valor.map((item)=>{
			return `<tr>
				<td>${item.stat.name}:</td>
				<td>${item.base_stat}</td>	
			</tr>`;
			})
		console.log("items"+status)	
		return status.join("")
	
	
}

function mostrarDetalhes(detalhes){
	console.log(detalhes)
	let cardModal = document.getElementById("cardModal")
	fetch(`https://pokeapi.co/api/v2/pokemon/${detalhes}`)
	.then((response)=> response.json())
	.then((pokemon)=>{
		console.log(pokemon)
		cardModal.innerHTML = `
			<section class="modal id="cardModal>
				<div class="modal-content">
					<div class="pokeImagem ${pokemon.types[0].type.name}">
						<img alt=${pokemon.name} src="${pokemon.sprites.other.dream_world.front_default}"/>
					</div>
					<h3 class="nome">Nome: ${pokemon.name}</h3>
					<p class="numero">Numero: #${zeros(pokemon.id)}</p>
					<div class="tipoBox">
						${tipos(pokemon.types)}	
					</div>
					<div class="biometria">
						<p class="peso">Peso: ${pokemon.weight}</p>
						<p class="altura">Altura: ${pokemon.height}</p>	
					</div>
					<section class="">
						<table>
							${status(pokemon.stats)}
						</table>
					</section>
					<span onclick="fechar()" class="close">&times;</span>
				</div>
			</section>`
	})

}

function fechar(){
	document.getElementById("cardModal").innerHTML=""
}


start()