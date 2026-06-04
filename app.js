
/* ————————————————————————————— */
/* FETCH PLAYER DATA */
/* ————————————————————————————— */

async function fetchData(){
    const url = "https://api.vmp.ir/server/api.php?work=singleData2&id=sunset";
    const res = await fetch(url);
    const json = await res.json();
    return json.Data.players;
}

/* ————————————————————————————— */
/* LOAD PLAYERS */
/* ————————————————————————————— */

async function loadPlayers(){
    const players = await fetchData();
    const list = document.getElementById("playerList");

    players.forEach(p=>{
        const item = document.createElement("div");
        item.classList.add("player-item");

        item.innerHTML = `
            <div><b>#${p.id}</b> — ${p.name}</div>
            <i class="fa fa-user"></i>
        `;

        item.onclick = ()=>{
            document.querySelectorAll(".player-item").forEach(x=>x.classList.remove("active"));
            item.classList.add("active");

            showPlayer(p);
            list.scrollTo({ top:item.offsetTop - 150, behavior:"smooth" });
        };

        list.appendChild(item);
    });
}
loadPlayers();

/* ————————————————————————————— */
/* SIDEBAR LIVE SEARCH */
/* ————————————————————————————— */

document.getElementById("sidebarSearch").addEventListener("keyup", function(){
    const filter = this.value.toLowerCase();
    document.querySelectorAll(".player-item").forEach(item=>{
        item.style.display = item.innerText.toLowerCase().includes(filter) ? "flex" : "none";
    });
});

/* ————————————————————————————— */
/* DISPLAY PLAYER */
/* ————————————————————————————— */

function showPlayer(p){
    const hex = p.identifiers.find(x=>x.startsWith("steam:")) || "N/A";
    const license = p.identifiers.find(x=>x.startsWith("license:")) || "N/A";

    const box = document.getElementById("resultBox");

    box.innerHTML = `
        <h2 class="glow">Player Found</h2>
        <p class="typewriter"><b>ID:</b> ${p.id}</p>
        <p><b>Name:</b> ${p.name}</p>
        <p><b>Ping:</b> ${p.ping}</p>
        <p><b>Steam Hex:</b> ${hex}</p>
        <p><b>License:</b> ${license}</p>
    `;
}

/* ————————————————————————————— */
/* SEARCH BY ID */
/* ————————————————————————————— */

document.getElementById("searchBtn").onclick = findPlayer;

async function findPlayer(){
    const id = document.getElementById("playerIdInput").value.trim();
    if(!id) return;

    const players = await fetchData();
    const found = players.find(p=>p.id==id);

    if(!found){
        document.getElementById("resultBox").innerHTML =
            `<h2 class='glow' style='color:#ff0;'>Player Not Found</h2>`;
        return;
    }

    showPlayer(found);
}

/* ————————————————————————————— */
/* PARALLAX FX */
/* ————————————————————————————— */
document.addEventListener("mousemove", e=>{
    document.getElementById("parallax").style.transform =
        `translate(${e.clientX * -0.01}px, ${e.clientY * -0.01}px)`;
});

/* ————————————————————————————— */
/* MATRIX SPARKS */
/* ————————————————————————————— */

function spawnMatrix(){
    const container = document.getElementById("sparks");
    setInterval(()=>{
        const s = document.createElement("span");
        s.innerText = Math.random() > 0.5 ? "0" : "1";
        s.style.left = Math.random()*100 + "%";
        s.style.opacity = Math.random()*0.5 + 0.3;
        s.style.fontSize = (Math.random()*12 + 10) + "px";
        container.appendChild(s);

        setTimeout(()=>s.remove(), 2500);
    },70);
}
spawnMatrix();
