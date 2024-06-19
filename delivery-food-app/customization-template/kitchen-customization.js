const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sYnh2dG9zemZrampzZ2p1bmJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc4OTUwMjcsImV4cCI6MjAzMzQ3MTAyN30.k7AXh6OBtYhWhAXX4EkhxACiFe9-xTn9UFKzdOCfSZA"

const url = "https://olbxvtoszfkjjsgjunbf.supabase.co"

const database = supabase.createClient(url,key,{
    db:{
        schema:"public"
    }
})

const header_top = document.querySelector('.header-top')

const back_arrow = header_top.querySelector('span')
back_arrow.addEventListener('click',()=>{
    window.history.go(-1)
})


document.addEventListener("DOMContentLoaded",async ()=>{

await loadCustomize()

})

async function loadCustomize (){
   const itemName =  localStorage.getItem('selectedItemName')
   const itemDesc = localStorage.getItem('selectedDescription')
   const price = localStorage.getItem('selectedItemPrice')
   const itemImage = localStorage.getItem('selectedItemImage')
   const itemKcal = localStorage.getItem('selectedItemKcal') 
   const customize = localStorage.getItem('selectedCustomize') 
   const itemSection = JSON.parse(localStorage.getItem('selectedItemSection'))
   console.log(itemSection)

   await updateTop(itemName,itemDesc,price,itemImage,itemKcal)

 // await updateCustomizationList(itemName,itemDesc,price,itemImage,itemKcal)

  const {data:customizeTable,error} = await database.from(customize).select("*")

  if (error) {
    console.error('Error fetching customize theme:', error)
    return
}
    updateCustomize(customizeTable,itemSection)

//You need to get the category from the itemSection and use it to present all the customize options for the section

}

async function updateTop(itemName,itemDesc,price,itemImage,itemKcal){
    const header = document.querySelector('header')
    header.style.backgroundImage += `linear-gradient(to bottom,#0000008b,#2725253b),url(${itemImage})`

    const customizeTitle = document.querySelector('section.showItem h2')
    customizeTitle.textContent = `${itemName}`
    
    const priceandCals = document.getElementsByClassName('p.priceAndCalories')
    priceandCals.textContent =`${price} || ${itemKcal}`

    const customizeDesc = document.querySelector('section.showItem span')
    customizeDesc.textContent = `${itemDesc}`
}

function updateCustomize(table,itemSection){
    const customizeForm  = document.querySelector('div.generalCustomize form')

    
        Object.values(table).forEach((item,index)=>{
            console.log(item)
            if(itemSection == item.Category){
        
            console.log(item.Category)
            const option = document.createElement('div')
            option.className="option-item"

            const checkbox = document.createElement('input')
            checkbox.id = `a${index}`
            checkbox.setAttribute('type','checkbox')
            const label = document.createElement('label')
            label.setAttribute('for','`a${index}`')

                const labelTitle = document.createElement('h4')
                labelTitle.textContent=`${item.Name}`
                const labelSubtitle = document.createElement('p')
                labelSubtitle.textContent=`${item.Price} | Adds ${item.Kcal} kcals`
            label.appendChild(labelTitle)
            label.appendChild(labelSubtitle)
            
            option.appendChild(checkbox)
            option.appendChild(label)

            customizeForm.appendChild(option)
            
        }
        
       })
}