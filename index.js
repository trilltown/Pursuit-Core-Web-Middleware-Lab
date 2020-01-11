document.addEventListener("DOMContentLoaded", async () => {
    let input = document.querySelector("input");
    let btn = document.querySelector("button");
    let div = document.querySelector("div");

    btn.addEventListener("click", async (e) => {
        let ul = document.querySelector("ul");
        ul.innerHTML = "";
        let results = await axios.get(`http://localhost:3000/animal/${input.value}`);
        let li = document.createElement("li");
        li.innerText = results.data.status;
        ul.appendChild(li);
    })
})