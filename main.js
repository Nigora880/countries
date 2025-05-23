let elCountryList = document.querySelector(".country-list")
let elSearchInput = document.querySelector(".search-input")
let elCountrySelect = document.querySelector(".country-select")
let elModalWrapper = document.querySelector(".modal-wrapper")
let elModalInner = document.querySelector(".modal-inner")

let elLikeCount = document.querySelector(".like-count")
let elSaveCount = document.querySelector(".save-count")
let elLikeBtn = document.querySelector(".like-btn")

let likeList =[]
let saveList =[]

function renderProduct (arr, list){
    list.innerHTML = null
    arr.forEach(item => {
        let elItem = document.createElement("li")
        elItem.className = "w-[264px] rounded-[5px] shadow-md shadow-gray-200 mx-auto sm:mx-0"

        elItem.innerHTML =`
            <img class="!h-[160px] !w-[260px] object-cover" src="${item.flag}" alt="photo" width="267"  height="160"/>
            <div class=" p-[24px] ">
                <strong class="font-extrabold inline-block text-[18px] text-[var(--color-text)] mb-[16px]">${item.name}</strong>
                <p class="text-[var(--color-text)]"> <span class="font-semibold text-[14px] leading-[16px] text-[var(--color-text)]">Population: </span> ${item.population.toLocaleString("ru-RU")}</p>
                <p class="text-[var(--color-text)]"> <span class="font-semibold text-[14px] leading-[16px] text-[var(--color-text)]">Region: </span> ${item.name}</p>
                <p class="text-[var(--color-text)]"> <span class="font-semibold text-[14px] leading-[16px] text-[var(--color-text)]">Capital: </span> ${item.capital}</p>
            </div>
            <div class="flex justify-between px-[24px] pb-[20px]">
                <button onclick= "handleLikeClick(${item.id})" class="${item.isLiked ? "bg-purple-500 text-white" : ""} text-[var(--color-text)] border-[1.5px] border-slate-500 rounded-md w-[30%] cursor-pointer hover:w-[31%]  hover:border-blue-500 hover:text-white-500 duration-300">Like</button>
                <button onclick= "handleSaveClick(${item.id})" class="${item.isSaved ? "bg-purple-500 text-white" : ""} text-[var(--color-text)] border-[1.5px] border-slate-500 rounded-md w-[30%] cursor-pointer hover:w-[31%]  hover:border-blue-500 hover:text-white-500 duration-300">Save</button>
                <button onclick= "handleMoreBtnClick(${item.id})" class=" text-[var(--color-text)] border-[1.5px] border-slate-500 rounded-md w-[30%] cursor-pointer hover:w-[31%]  hover:border-blue-500 hover:text-blue-500 duration-300">More</button>
            </div>
        `
        list.appendChild(elItem)
    })
}

renderProduct(countries, elCountryList)


function elCreateOptionToSelect(){
    countries.forEach(item => {
        let elOption = document.createElement("option")
        elOption.textContent = item.capital
        elOption.value = item.capital.toLowerCase()
        elCountrySelect.appendChild(elOption)
    })
}
elCreateOptionToSelect()

function SearchAndSelect(value, currentValue){
    if(value == "name"){
        let filteredArr = countries.filter(item => item[`${value}`].toLowerCase().includes(currentValue.toLowerCase()))
        renderProduct(filteredArr, elCountryList)
    }
    else{
        if(currentValue == "all"){
            renderProduct(countries, elCountryList)
        }
        else{
            let filteredArr = countries.filter(item => item[`${value}`].toLowerCase() == currentValue.toLowerCase())
            renderProduct(filteredArr, elCountryList)
        }
    }
}

elCountrySelect.addEventListener("change", (evt) => SearchAndSelect("capital", evt.target.value))

// Action like start
function handleLikeClick(id){
    let findedObj = countries.find(item => item.id == id)
    findedObj.isLiked = !findedObj.isLiked
    renderProduct(countries, elCountryList)
    elLikeCount.textContent = countries.filter(item => item.isLiked).length
}
function handleBtnlIKE(){
    let likeList = countries.filter(item => item.isLiked)
    renderProduct(likeList, elCountryList)
}

// Action save start
function handleSaveClick(id){
    let findedObj = countries.find(item => item.id == id)
    findedObj.isSaved = !findedObj.isSaved
    renderProduct(countries, elCountryList)
    elSaveCount.textContent = countries.filter(item => item.isSaved).length
}
function handleBtnSave(){
    let saveList = countries.filter(item => item.isSaved)
    renderProduct(saveList, elCountryList)
}


elSearchInput.addEventListener("input", (evt) => SearchAndSelect("name", evt.target.value))

function handleMoreBtnClick(id){
    elModalWrapper.classList.remove("scale-0")
    let findedObj = countries.find(item => item.id == id)
    console.log(findedObj);
     elModalInner.innerHTML = `
    <div class="flex justify-between items-center">
        <img class="w-[60%]" src="${findedObj.flag}" alt="Single Flag" width="400" height="300">
        <div class="w-[40%] text-end">
            <strong class="text-[18px] inline-block text-[#111517] font-extraBold mb-[16px]">${findedObj.name}</strong>
            <p> <span class="font-semibold" > Population:</span> ${findedObj.population}</p>
            <p> <span class="font-semibold" > Region:</span> ${findedObj.name}</p>
            <p> <span class="font-semibold"> Capital:</span> ${findedObj.capital}</p>
        </div>
    </div>
    `  
}



elModalWrapper.addEventListener("click", function(e){
    if(e.target.id){
        elModalWrapper.classList.add("scale-0")
    }
})

