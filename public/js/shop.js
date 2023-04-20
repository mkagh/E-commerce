const clothes = [
    {
        brand: 'Adidas',
        type: 'Sneakers',
        price: 120
    },
    {
        brand: 'Rolex',
        type: 'Watch',
        price: 5000
    },
    {
        brand: 'Gucci',
        type: 'Ring',
        price: 400
    },
    {
        brand: 'Zara',
        type: 'Jeans',
        price: 50
    },
    {
        brand: 'H&M',
        type: 'T-Shirt',
        price: 10
    },
    {
        brand: 'Puma',
        type: 'Sneakers',
        price: 80
    },
    {
        brand: 'Swatch',
        type: 'Watch',
        price: 60
    },
    {
        brand: 'Cartier',
        type: 'Ring',
        price: 1000
    },
    {
        brand: 'Levi\'s',
        type: 'Jeans',
        price: 80
    },
    {
        brand: 'Calvin-Klein',
        type: 'T-Shirt',
        price: 30
    }
];

const search = document.querySelector(".search")
const filters = document.querySelector(".filters")
const send = document.querySelector(".send")
const searchInput = document.querySelector(".search input")
const orders = document.querySelector(".orders")
let ordered;

var uniqueProducts = new Set(clothes.map((product) => {
    return ` ${product.type}`
}));

const arrayOfUniqueProducts = [...uniqueProducts]

const productsToInsert = arrayOfUniqueProducts.map((unique) => {
    return ` <input type="checkbox"  name="${unique}" >
<label for="${unique}">${unique}</label><br></br>`
}).join(" ")

filters.innerHTML = productsToInsert
const filteriInputs = document.querySelectorAll(".filters input")

filteriInputs.forEach((input) => {
    input.addEventListener("click", filterFunction)
})

function filterFunction() {
    checkedArray = []
    filteriInputs.forEach((input) => {
        if (input.checked) {
            checkedArray.push(input.name.substring(1))
        }
    })
    const newclothes = clothes.filter(product => checkedArray.includes(product.type)//!!!! OVAKO SE

    )

    const checkedThings = newclothes.map((product, index) => {
        const { brand, type, price } = product
        return `
   <div class="elementWrapper">
   <p>${brand}</p>
   <p class="price">${price}</p>
   <p>${type}</p>
   <button onclick=add(this) class="add">add</button>
   <button onclick=remove(this) class="remove">remove</button>
   <input min=0 class="counter" data-id=${brand} type="number">
   <div class="total">price for this is:<span>0</span></div>
   </div>
   `}).join(" ")
    container.innerHTML = checkedThings
}

search.addEventListener("input", () => {
    const searchedChlotes = clothes.filter((br) => {
        return br.brand.includes(searchInput.value)
    })

    const insertSearchedClothes = searchedChlotes.map((product, index) => {
        const { brand, type, price } = product
        return `
<div class="elementWrapper">
<p>${brand}</p>
<p class="price">${price}</p>
<p>${type}</p>
<button onclick=add(this) class="add">add</button>
<button onclick=remove(this) class="remove">remove</button>
<input min=0 class="counter" data-id=${brand} type="number">
<div class="total">price for this is:<span>0</span></div>
</div>
` }).join(" ")

    container.innerHTML = insertSearchedClothes
})

const container = document.querySelector(".container")
const all = document.querySelector(".all")

const clothesHtml = clothes.map((product, index) => {
    const { brand, type, price } = product
    return `
<div class="elementWrapper">
<p>${brand}</p>
<p class="price">${price}</p>
<p>${type}</p>
<button onclick=add(this) class="add">add</button>
<button onclick=remove(this) class="remove">remove</button>
<input style="width:30px" min=0 class="counter" data-id=${brand} type="number">
<div class="total">price for this is:<span>0</span></div>
</div>
`
}).join(" ")
container.innerHTML = clothesHtml

const counter = document.querySelectorAll(".counter")

let inputs = {}

const add = (element) => {
    const mainEl = element.closest(".elementWrapper")
    const price = mainEl.querySelector(".price").innerText
    const inputValue = mainEl.querySelector("input").value
    const inputClass = mainEl.querySelector("input").dataset.id
    const totalForOne = parseInt(price) * parseInt(inputValue)
    const total = mainEl.querySelector(".total span")
    if (parseInt(inputValue) === 0 || inputValue === "") {
        alert("Please, enter some value...")
    }
    else {
        total.innerHTML = totalForOne
        element.setAttribute("disabled", true)
        mainEl.querySelector("input").setAttribute("disabled", true)
    }
    const sumOfAllPrices = document.querySelectorAll(".total span")
    let sumOfEverything = null
    sumOfAllPrices.forEach((price) => {
        sumOfEverything += parseInt(price.innerText)
    })
    inputs[inputClass] = inputValue
    all.innerHTML = `<span>${sumOfEverything}</span> dinara`
    orders.innerHTML = `<span>${JSON.stringify(inputs)}</span> `
}


const remove = async (element) => {
    const allspan = document.querySelector(".all span")//ovo je moralo biti u okviru remove fje to nije bas jasno
    const mainEl = element.closest(".elementWrapper")
    const inputClass = mainEl.querySelector("input").dataset.id
    delete inputs[inputClass];
    const total = mainEl.querySelector(".total span")
    const ukinertext = parseInt(total.innerText)
    total.innerHTML = 0
    element.previousElementSibling.removeAttribute("disabled")
    mainEl.querySelector("input").removeAttribute("disabled")
    mainEl.querySelector("input").value = 0
    const vrednost = parseInt(allspan.innerText) - ukinertext
    all.innerHTML = `<span>${vrednost}</span> dinara`
    orders.innerHTML = `<span>${JSON.stringify(inputs)}</span> `
}

send.addEventListener('click', async (e) => {
    e.preventDefault()
    const allspanValue = document.querySelector(".all span").innerText
    let totalPrice = allspanValue
    let ordered = inputs
    try {
        const nesto = await axios.patch('/api/v1/order', { totalPrice, ordered })
        console.log(nesto)
    } catch (error) {
        console.log(error)
    }
})