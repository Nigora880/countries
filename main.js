// select part start
function createOptionToSelect(){
    countries.forEach(item => {
        let elOption = document.createElement("option")
        elOption.textContent = item.capital
        elOption.value = item.capital.toLowerCase()
        elCountrySelect.appenChild(elOption)
    })
}
createOptionToSelect()
// select part end


// render product start
function renderCountry(arr, list){
    list.innerHtml = null
    arr.forEach(item => {
        let elItem = document.createElement("li")
        elItem.className = "w-[264px] rounded-[5px] shadow-md shadow-blue-300"
        elItem.innerHTML = `
            <img class="!h-[160px] !w-[267px] object-cover" src="${item.flag}" alt="country flag" width="267" height="160">
    <div class="p-[24px]">
<strong class="text-[18px] inline-block text-[#111517] font-extraBold mb-[16px]">${item.name}</strong>
<p> <span class="font-semibold">Population:</span>${item.population}</p>
<p> <span class="font-semibold">Region:</span>${item.name}</p>
<p> <span class="font-semibold">Capital:</span>${item.capital}</p>
    </div>
    <div class="px-24px pb-[20px] flex justify-between">
        <button class="border-[1px] border-slate-500 rounded-md w-[30%] cursor-pointer">Like</button>
        <button class="border-[1px] border-slate-500 rounded-md w-[30%] cursor-pointer">Save</button>
        <button class="border-[1px] border-slate-500 rounded-md w-[30%] cursor-pointer">More</button>
    </div>
        `
        list.appenChild(elItem)
    })
}
renderCountry(countries, elCountryList)

// events start
function SearchAndSelect(value, currentValue){
    let filteredArr = countries.filter(item => item[`${value}`].toLowerCase().includes(currentValue.toLowerCase()))
    renderCountry(filteredArr, elCountryList)
}

// events end

// select part start
elCountrySelect.addEventListener("change",(evt) => SearchAndSelect("capital", evt.target.value))
elCountrySelect.addEventListener("input",(evt) => SearchAndSelect("name", evt.target.value))