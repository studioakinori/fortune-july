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

let selectedRewards = [];

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

const reward = rewards[rewardIndex];

selectedRewards.push(reward);

card.innerHTML = reward;

rewardText.innerHTML = reward;

rewardIndex++;

remaining--;

counter.innerHTML=remaining;

popup.classList.remove("hidden");

};

cards.appendChild(card);

}

continueBtn.onclick = async () => {

popup.classList.add("hidden");

locked=false;

if (remaining === 0) {

    console.log(selectedRewards);

    const { error } = await db
        .from("fortune_results")
        .insert([
            {
                client_name: clientName,
                month: "July",
                reward1: selectedRewards[0],
                reward2: selectedRewards[1],
                reward3: selectedRewards[2],
                claimed: true
            }
        ]);

    if (error) {

        console.error(error);

        alert("Failed to save rewards.");

    } else {

        alert("Your rewards have been saved successfully!");

    }

}

}