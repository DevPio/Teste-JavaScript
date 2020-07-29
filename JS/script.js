function totalItems(){
   let card = document.querySelector('.card')
   let cardContainer = document.querySelector('.cards')

    fetch('/assets/potions.json')
    .then((results)=>{
        return results.json()
    })
    .then((json)=>{
        console.log(json)
        for(let item in json.potions){
           
            let cardClone = card.cloneNode(true)
                cardClone.style.display = "block"

                cardClone.setAttribute('data-position',item)

                let img = cardClone.querySelector('div img')
                    .src = `/assets/products/${json.potions[+item].image}`

                let descriCao = cardClone.querySelector('.descricao h4')
                    .innerText = json.potions[+item].name 

                let descriCaoO = cardClone.querySelector('.descricao h6')
                    .innerText = `R$${json.potions[+item].price }`

            
            cardContainer.append(cardClone)
            
        }
        modal()
    })


 

    
}

const modalOptions = {
    
    open(event){
        let {target} = event
        let atributo = target.parentElement.parentElement.dataset.position
        populaModal(+atributo)
        
        document.querySelector('.modal-overlay').style.display = "block"
    },
    close(){
        document.querySelector('.modal-overlay').style.display = "none"
       


        
    }
}


function modal(){

   let {open} = modalOptions 

    let cards = document.querySelectorAll('.card')

    console.log(cards)

    cards.forEach((item)=> {
        item.addEventListener('click',modalOptions["open"])
    })



   


}

function populaModal(indexModal){
    let modalContainer = document.querySelector('.container')
    let containerImg = document.querySelector('.containerImg img')
    let lists = document.querySelector('.item ul')
    let price = document.querySelector('.item p')
    let Ess = document.querySelector('.item h4')

    console.log(lists)

    console.log(containerImg)

    fetch('/assets/potions.json')
    .then((results)=>{
        return results.json()
    })
    .then((json)=>{
        
        containerImg.src =  `/assets/products/${json.potions[indexModal].image}`
        price.innerText = json.potions[indexModal].price
        Ess.innerText = json.potions[indexModal].effect




        lists.innerHTML = ''
        for(let li of json.potions[indexModal].ingredients){
            let liColne = document.createElement('li')
               liColne.innerText = li

          
                lists.append(liColne)

        }

      
    })
}



let a = document.querySelectorAll('.menuInterno a')
console.log(a)
a.forEach((item)=>{
    item.addEventListener(('click'),handClick)
})



function handClick(event){
    let {target} = event

    a.forEach((item)=>{
        if(target.innerText==item.innerText){
            item.classList.add('ativo')
        }else{
            item.classList.remove('ativo')

        }
    })
}

totalItems()