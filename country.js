// const allSkeleton=document.querySelectorAll(".skeleton")

// function skeletonEffect(){
//     allSkeleton.forEach(item => {
//         item.classList.remove("skeleton")
//     })
// }

const countryName=new URLSearchParams(location.search).get("name")
const flagImage=document.querySelector(".country-details img")
const countryNameH1=document.querySelector(".country-details h1")
const nativeName=document.querySelector(".native-name")
const population=document.querySelector(".population")
const region=document.querySelector(".region")
const subRegion=document.querySelector(".sub-region")
const capital=document.querySelector(".capital")
const topLevelDomain=document.querySelector(".top-level-domain")
const currencies=document.querySelector(".currencies")
const language=document.querySelector(".language")
const borderCountries=document.querySelector(".border-countries")
const toggleButton=document.querySelector(".checkbox")
const hiddenText=document.querySelector(".hidden")


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res)=> res.json())
.then((data)=>{
    console.log(data[0])
    flagImage.src=data[0].flags.svg
    countryNameH1.innerText=data[0].name.common

    if(data[0].name.nativeName){
        nativeName.innerText=Object.values(data[0].name.nativeName)[0].common
    }
    else{
        nativeName.innerText=data[0].name.common
    }

    population.innerText=data[0].population.toLocaleString("en-IN")
    region.innerText=data[0].region
    
    if(data[0].subregion){
        subRegion.innerText=data[0].subregion
    }

    if(data[0].capital){
    capital.innerText=data[0].capital?.[0]
    }

    topLevelDomain.innerText=data[0].tld.join(", ")

    if(data[0].currencies){
    currencies.innerText=Object.values(data[0].currencies).map((currency)=>currency.name).join(", ")
    }

    if(data[0].languages){
        language.innerText=Object.values(data[0].languages).join(", ")
    }

    if(data[0].borders){
        data[0].borders.forEach((border) => {
            console.log(border)
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res)=> res.json())
            .then((bordercountry)=> {console.log(bordercountry[0])
                const bordercountrytag=document.createElement("a")
                bordercountrytag.innerText=bordercountry[0].name.common
                borderCountries.append(bordercountrytag)
                bordercountrytag.href=`country.html?name=${bordercountry[0].name.common}`
            })
    
        });
    }

    }) 


function themeCheck(){
        if(localStorage.getItem("darkmode")=="true"){
            document.body.classList.add("dark")
        }
        else{
            document.body.classList.remove("dark")
        }
    } 
    