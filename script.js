let moeda1
let moeda2

let preco_atual

async function api() {
    try {
        const response = await fetch(`https://economia.awesomeapi.com.br/last/${moeda1}-${moeda2}`)
        
        const cotacoes = await response.json()

        if (cotacoes.status === 404) {            
            throw new Error(cotacoes.message)
        }

        const par_moeda = `${moeda1}${moeda2}`
        
        preco_atual = cotacoes[par_moeda].bid
        preco_atual = parseFloat(preco_atual)
        
    } catch (error) {
        window.alert(`Ocorreu um erro na converção. \n\n${error}`)
    }
}

function converter() {
    const input1 = document.querySelector("input[name=input1]")
    const input2 = document.querySelector("input[name=input2]")
    
    const valor_convertido = input1.value
    
    const input1_value = parseFloat(valor_convertido)
    
    const convertido = input1_value * preco_atual
    
    input2.value = convertido.toFixed(2)
}


const form = document.querySelector("form")

form.addEventListener("submit", async function(event) {
    event.preventDefault()
    
    const formdata = new FormData(this)

    moeda1 = formdata.get("select1")
    moeda2 = formdata.get("select2")
    
    await api()
    converter()
})


const btn_alternado = document.querySelector("#alternar")

btn_alternado.onclick = function() {
    const moeda_convertida = document.querySelector("select[name=select1]")
    const moeda_referencia = document.querySelector("select[name=select2]")
    
    const valor_intermediario = moeda_convertida.value

    moeda_convertida.value = moeda_referencia.value
    moeda_referencia.value = valor_intermediario
}