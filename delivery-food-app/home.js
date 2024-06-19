/* import { createClient } from '@supabase/supabase-js' */

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sYnh2dG9zemZrampzZ2p1bmJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc4OTUwMjcsImV4cCI6MjAzMzQ3MTAyN30.k7AXh6OBtYhWhAXX4EkhxACiFe9-xTn9UFKzdOCfSZA"

const url = "https://olbxvtoszfkjjsgjunbf.supabase.co"

const database = supabase.createClient(url,key,{
    db:{
        schema:"public"
    }
})

let nearby_vendors = document.getElementsByClassName("nearby-vendors")
let nearby_moving_carousel = document.querySelector(".nearby-moving-carousel")
let cardTest =""


/*Loads Kitchens Near You*/
document.addEventListener("DOMContentLoaded",async () => {
    const res = await database.from("vendors").select("*")
    let vendorsArray = res.data
    for(let i=0;i<vendorsArray.length;i++){
        let card_data = vendorsArray[i]
        console.log(card_data.cardBackground)
        const cTest = updateNearbyVendors(card_data)
        nearby_moving_carousel.innerHTML+=cTest 
    }
    //OnClick event for carousel cards to go to kitchen
    nearby_moving_carousel.querySelectorAll('.nearby-container').forEach((card,index)=> {
        card.addEventListener('click',() => selectVendor(vendorsArray[index].vendorName,vendorsArray[index].menu,vendorsArray[index].cuisine,vendorsArray[index].cardBackground,vendorsArray[index].customize,vendorsArray[index].vendorSections))
        console.log(index)
    })
    
})

function selectVendor(vendorName,menu,cuisine,imgLink,customizeTheme,vendorSections){
    localStorage.setItem('selectedVendorName',vendorName)
    localStorage.setItem('selectedMenu', menu)
    localStorage.setItem('selectedCuisine',cuisine)
    localStorage.setItem('selectedCardBackground',imgLink)
    localStorage.setItem('selectedCustomize', customizeTheme)
    localStorage.setItem('selectedVendorSections', JSON.stringify(vendorSections))


    window.location.href = 'kitchen-open-template/kitchen.html'
}

function updateNearbyVendors(cards){
let cardSetup =""

cardSetup = `
<div class="nearby-container">
    <div class="nearby-carousel-card" style="background-image:linear-gradient(to bottom,#0000008b,#2725253b),url(${cards.cardBackground});">
        <div class="card-header">
            <span class="ratings">
                <div class="ratings-align-center">
                    <svg class="star" width="10" height="20">
                        <polygon points="5,0.5 2,10 9,4 0.5,4 8,10"/>
                    </svg>
                    <p id="avg-rating">${cards.avgRating}</p>
                    <span id="total-ratings">${cards.totalRatings}</span>
                </div>
            </span>
            <button class="save-vendor"><img src="assets/icon-heart.svg" alt="Heart"></button>
        </div>
    </div>
    <div class="vendor-details">
        <div class="vendor-img-and-details">
            <img src="${cards.profileBackground}" alt="${cards.profileBackground}" width="30" height="30">
            <div class="vendor-name-and-cuisine">
                <h5>${cards.vendorName}</h5>
                <p>${cards.cuisine}</p>
            </div>
        </div>
        <h6 class="time">${cards.orderTime}</h6>
    </div> 
</div> `
return cardSetup
/* document.getElementsByClassName("nearby-moving-carousel").innerHTML+= cardSetup */

}









            