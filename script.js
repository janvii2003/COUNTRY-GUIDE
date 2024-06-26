// const allSkeleton=document.querySelectorAll(".skeleton")

// function skeletonEffect(){
//     allSkeleton.forEach(item => {
//         item.classList.remove("skeleton")
//     })
// }


const countryContainer= document.querySelector(".countries-container")
const filterByRegion=document.querySelector(".filter-container")
let allCountriesData
const searchInput=document.querySelector(".search-container input")
const toggleButton=document.querySelector(".checkbox")
const hiddenText=document.querySelector(".hidden")


fetch(`https://restcountries.com/v3.1/all`)
.then((res)=> res.json())
.then((data)=>{
    renderCountries(data)
    allCountriesData=data
});

    filterByRegion.addEventListener("change",()=>{
        fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
        .then((res)=> res.json())
        .then((data)=>{
            renderCountries(data)
        });
    })


function renderCountries(data){
    countryContainer.innerHTML=""
    data.forEach((country)=>{
        // console.log(country.flags.svg)

        const countryCard= document.createElement("a");
        countryCard.classList.add("country-card");
        // countryCard.classList.add("skeleton");

        countryCard.href=`/country.html?name=${country.name.common}`

const cardHTML= `<img src="${country.flags.svg}" alt="${country.name.common}">
                <div class="card-text">
                 <h3 class="card-title">${country.name.common}</h3>
                <p><b>Population: </b>${country.population.toLocaleString("en-IN")}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital?.[0]}</p>
                </div> `;

countryCard.innerHTML= cardHTML;
countryContainer.append(countryCard);

    });
        
}

searchInput.addEventListener("input",(e)=>{
    // console.log(e.target.value)
    // console.log(allCountriesData)
    const searchedcountry=allCountriesData.filter((country)=>country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCountries(searchedcountry)

})



toggleButton.addEventListener("change",()=>{
    console.log(toggleButton)
    if(toggleButton.checked){
        localStorage.setItem("darkmode",true)
        document.body.classList.add("dark")
    }
    else{
        document.body.classList.remove("dark")
        hiddenText.innerText="light mode";
        localStorage.setItem("darkmode",false)
        }
    })


function themeCheck(){
    if(localStorage.getItem("darkmode")=="true"){
        document.body.classList.add("dark")
        toggleButton.checked=true
    }
    else{
        document.body.classList.remove("dark")
        toggleButton.checked=false

    }
} 

