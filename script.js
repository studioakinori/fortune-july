const params = new URLSearchParams(window.location.search);

const clientName = params.get("name") || "Guest";

document.getElementById("welcome").innerText =
`Welcome, ${clientName}!`;

const SUPABASE_URL = "https://gghtuuwfvvrrzkcqvwxr.supabase.co";

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnaHR1dXdmdnZycnprY3F2d3hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0OTEzMjMsImV4cCI6MjA5OTA2NzMyM30.nlq4fNa_yiXk4R586vZNNcEPEMJvWl2MjcpUqoJPHuY";

const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const rewards = [

"50% Chibi Transform",
"Free Expression",
"Pet Toggle",
"Controller Toggle",
"20% OFF",
"Additional Outfit",
"Mystery Gift"

];

rewards.sort(()=>Math.random()-0.5);

const cards=document.getElementById("cards");

const popup=document.getElementById("popup");

const rewardText=document.getElementById("rewardText");

const continueBtn=document.getElementById("continueBtn");

const counter=document.getElementById("counter");

let remaining=3;

let rewardIndex=0;

let locked=false;

for(let i=0;i<7;i++){

const card=document.createElement("div");

card.className="card";

card.innerHTML="🂠";

card.onclick=()=>{

if(locked) return;

if(card.classList.contains("open")) return;

if(remaining<=0) return;

locked=true;

card.classList.add("open");

card.innerHTML=rewards[rewardIndex];

rewardText.innerHTML=rewards[rewardIndex];

rewardIndex++;

remaining--;

counter.innerHTML=remaining;

popup.classList.remove("hidden");

};

cards.appendChild(card);

}

continueBtn.onclick=()=>{

popup.classList.add("hidden");

locked=false;

if(remaining===0){

setTimeout(()=>{

alert("Thank you for joining Akinori Studio's Fortune Event!");

},200);

}

}