const scholarships = [

{title:"Global Scholars Program",country:"USA",amount:50000,deadline:"July",stream:"Business"},
{title:"UK Excellence Award",country:"UK",amount:0,deadline:"August",stream:"Law"},
{title:"Canadian Merit Scholarship",country:"Canada",amount:30000,deadline:"June",stream:"Business"},
{title:"Germany Research Grant",country:"Germany",amount:0,deadline:"May",stream:"STEM"},
{title:"France Academic Award",country:"France",amount:20000,deadline:"April",stream:"Law"},
{title:"STEM Innovators Grant",country:"USA",amount:40000,deadline:"September",stream:"STEM"},
{title:"Australia Future Leaders",country:"Australia",amount:25000,deadline:"October",stream:"Business"},
{title:"Japan Global Fellowship",country:"Japan",amount:35000,deadline:"December",stream:"STEM"},
{title:"Singapore Excellence Award",country:"Singapore",amount:45000,deadline:"November",stream:"Law"},
{title:"Netherlands Innovation Grant",country:"Netherlands",amount:28000,deadline:"March",stream:"STEM"}

]

localStorage.setItem("scholarships",JSON.stringify(scholarships))

const storedData=JSON.parse(localStorage.getItem("scholarships"))

let currentData=[...storedData]

let visibleCount=3

const scholarshipList=document.getElementById("scholarshipList")



function getFlagCode(country){

switch(country){

case "USA": return "us"
case "UK": return "gb"
case "Canada": return "ca"
case "Germany": return "de"
case "France": return "fr"
case "Australia": return "au"
case "Japan": return "jp"
case "Singapore": return "sg"
case "Netherlands": return "nl"

}

}



function displayScholarships(data){

scholarshipList.innerHTML=""

data.slice(0,visibleCount).forEach(s=>{

const card=document.createElement("div")

card.className="card"

card.innerHTML = `

<div class="cart" onclick="saveScholarship('${s.title}')">🛒</div>

<h3 class="title">${s.title}</h3>

<div class="country">
<img class="flag" src="https://flagcdn.com/24x18/${getFlagCode(s.country)}.png">
<span>${s.country}</span>
</div>

<div class="amount-badge">
${s.amount===0 ? "✔ Full Funding" : "$"+s.amount}
</div>

<div class="deadline">
📅 Deadline: ${s.deadline}
</div>

<button class="view-btn" onclick="showDetails('${s.title}','${s.country}','${s.amount}','${s.deadline}')">
View Details →
</button>

`

scholarshipList.appendChild(card)

})

}

displayScholarships(currentData)



// Load More

document.getElementById("loadMore").onclick=()=>{

visibleCount+=3

displayScholarships(currentData)

}



// Search

document.getElementById("searchInput").addEventListener("keyup",function(){

let value=this.value.toLowerCase()

currentData=storedData.filter(s=>s.title.toLowerCase().includes(value))

visibleCount=3

displayScholarships(currentData)

})



// Apply Filters
document.querySelector(".apply").onclick = () => {

let checked = [...document.querySelectorAll(".country-filter:checked")].map(e => e.value)

if(checked.length === 0){

currentData = [...storedData]

}else{

currentData = storedData.filter(s => checked.includes(s.country))

}

visibleCount = currentData.length   // important fix

displayScholarships(currentData)

}



// Reset Filters

document.querySelector(".reset").onclick=()=>{

document.querySelectorAll(".country-filter").forEach(cb=>cb.checked=false)

currentData=[...storedData]

visibleCount=3

displayScholarships(currentData)

}



// Wishlist Save

function saveScholarship(title){

let saved=JSON.parse(localStorage.getItem("saved"))||[]

saved.push(title)

localStorage.setItem("saved",JSON.stringify(saved))

alert("Scholarship saved!")

}



// Modal

function showDetails(title,country,amount,deadline){

document.getElementById("modalTitle").innerText=title

document.getElementById("modalCountry").innerText="Country: "+country

document.getElementById("modalAmount").innerText="Amount: "+(amount===0?"Full Funding":"$"+amount)

document.getElementById("modalDeadline").innerText="Deadline: "+deadline

document.getElementById("detailsModal").style.display="block"

}



document.getElementById("closeModal").onclick=()=>{

document.getElementById("detailsModal").style.display="none"

}



// Dark Mode

document.getElementById("darkToggle").onclick=()=>{

document.body.classList.toggle("dark")

}



// Stats

document.getElementById("totalScholarships").innerText=storedData.length

document.getElementById("fullFunding").innerText=storedData.filter(s=>s.amount===0).length