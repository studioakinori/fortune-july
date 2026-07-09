const params = new URLSearchParams(window.location.search);
const clientName = params.get("name") || "Guest";

document.getElementById("welcome").innerText = `Welcome, ${clientName}!`;

const SUPABASE_URL = "https://gghtuuwfvvrrzkcqvwxr.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnaHR1dXdmdnZycnprY3F2d3hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0OTEzMjMsImV4cCI6MjA5OTA2NzMyM30.nlq4fNa_yiXk4R586vZNNcEPEMJvWl2MjcpUqoJPHuY";

const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const rewards = [

{
title:"Full Body SKEB",
bonus:"+ Background\n+ 5 Static Emotes",
price:"Only $150"
},

{
title:"Pet Toggle",
bonus:"+ Controller Toggle (inc. rigging)",
price:"Only $175"
},

{
title:"Additional Outfit",
bonus:"+ Hairstyle (inc. rigging)",
price:"Only $199"
},

{
title:"PFP SKEB",
bonus:"+ Background\n+ 5 Static Emotes",
price:"Only $99"
},

{
title:"Detailed Stream Background",
bonus:"+ YCH Summer",
price:"Only $120"
},

{
title:"5 Animated Emotes",
bonus:"+ YCH Idol",
price:"Only $99"
},

{
title:"50% OFF",
bonus:"Chibi Transform Toggle",
price:""
}

];

rewards.sort(() => Math.random() - 0.5);

const cards = document.getElementById("cards");
const popup = document.getElementById("popup");
const rewardText = document.getElementById("rewardText");
const continueBtn = document.getElementById("continueBtn");
const counter = document.getElementById("counter");

let remaining = 3;
let rewardIndex = 0;
let locked = false;
let selectedRewards = [];

function createCards() {

    cards.innerHTML = "";

    for (let i = 0; i < 7; i++) {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = "🂠";

        card.onclick = () => {

            if (locked) return;
            if (card.classList.contains("open")) return;
            if (remaining <= 0) return;

            locked = true;

            card.classList.add("open");

            const reward = rewards[rewardIndex];

selectedRewards.push(reward);

card.innerHTML = `
<div class="reward-title">
✨ ${reward.title}
</div>
`;

rewardText.innerHTML = `
<div class="popup-title">
✨ ${reward.title}
</div>

<div class="popup-bonus">
${reward.bonus.replace(/\n/g,"<br>")}
</div>

<div class="popup-price">
${reward.price}
</div>
`;

            rewardIndex++;

            remaining--;

            counter.innerHTML = remaining;

            popup.classList.remove("hidden");

        };

cards.appendChild(card);

    }

}

continueBtn.onclick = async () => {

    popup.classList.add("hidden");

    locked = false;

    if (remaining !== 0) return;

    const { error } = await db
        .from("fortune_results")
        .insert([
            {
                client_name: clientName,
                month: "July",
                reward1: selectedRewards[0].title,
                reward2: selectedRewards[1].title,
                reward3: selectedRewards[2].title,
                claimed: true
            }
        ]);

    if (error) {

        console.error(error);

        alert("Failed to save rewards.");

        return;

    }

    alert("Your rewards have been saved successfully!");

};

async function checkClaim() {

    const { data, error } = await db
        .from("fortune_results")
        .select("*")
        .eq("client_name", clientName)
        .eq("month", "July")
        .maybeSingle();

    console.log("client:", clientName);
    console.log("data:", data);
    console.log("error:", error);

    if (error) {
        console.error(error);
        createCards();
        return;
    }

    if (data) {

        document.querySelector(".pickText").innerHTML =
            "You have already claimed your July Fortune.";

        cards.style.display = "none";

        return;
    }

    createCards();
}

checkClaim();