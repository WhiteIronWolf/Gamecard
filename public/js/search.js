const form = document.querySelector('#searchForm');
const currentDiv = document.querySelector('.data');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const res = await axios.get(`https://api.rawg.io/api/games?key=05d8fd67c4be4a8487be0fdadcec9020&search=${searchTerm}`)

    currentDiv.innerHTML = "";

    function addElement() {
        for (let i = 0; i < 3; i++) {
            
            // create a new div element 
            const newDiv = document.createElement("div");

            // and give it some content 
            const img = document.createElement('IMG');
            const title = document.createElement('h2');
            const form = document.createElement('form');
            const button = document.createElement('button');

            button.innerText = "Visit game"
            const att = document.createAttribute("action");
            att.value = `/search/${res.data.results[i].id}`
            form.setAttributeNode(att);
    

            title.textContent = res.data.results[i].name;
            img.src = res.data.results[i].background_image;

            // add the text node to the newly created div
            newDiv.appendChild(form);
            form.appendChild(button);
            newDiv.appendChild(img);
            newDiv.appendChild(title);

            // add the newly created element and its content into the DOM 
            currentDiv.appendChild(newDiv);
        }
    }
    addElement()
})