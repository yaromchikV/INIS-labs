let initProducts = () => {
    const json = JSON.stringify(shirts)
    const obj = JSON.parse(json)
    const entries = Object.values(obj)

    let code = ""
    for (i = 0; i < entries.length; i++) {
        const name = entries[i]['name']
        const price = entries[i]['price']

        const colors = Object.values(entries[i]['colors'])
        const image = colors[0]['front']
        const colorNumber = colors.length

        code +=
            `<div class="catalog-grid-item">
            <div class="catalog-background">
                <img src=`+ image + `>
                <p class="catalog-grid-title">`+ name + `</p>
                <p class="catalog-grid-description">Available in `+ colorNumber + ` colors</p>
                <p class="catalog-grid-price">`+ price + `</p>
                <div class="buttons">
                    <a class="quick-view" id=`+ i + ` href="#">Quick View</a>
                    <a class="see-page" id=`+ i + ` href="details.html">See Page</a>
                </div>
            </div>
        </div>`
    }

    document.getElementById('page-title').insertAdjacentHTML("afterend", code)

    document.addEventListener('click', function (e) {
        if (e.target.className == 'see-page') {
            localStorage.setItem('selected-item', e.target.id)
        }
    }, false);
};





let selectedSide = ""
let selectedColor = ""
let colorItems = ""

let initDetails = () => {
    let id = localStorage.getItem('selected-item')
    selectedSide = "front"
    selectedColor = "white"

    const json = JSON.stringify(shirts)
    const obj = JSON.parse(json)
    const entry = Object.values(obj)[id]

    colorItems = new Map(Object.entries(entry['colors']))

    const code = `<h2 id="details-title">` + entry['name'] + `</h2>
                <div class="details-grid-item">
                    <div class="details-background">
                        <img id="image" src=`+ colorItems.get(selectedColor)[selectedSide] + `>
                    </div>
                </div>
                <div class="details-grid-info">
                    <div class="details-background">
                        <p class="details-grid-price">`+ entry['price'] + `</p>
                        <p class="details-grid-description">`+ entry['description'] + `</p>
                        <div class="items">
                            <p class="items-title">Side:</p>
                            <a id="front">Front</a>
                            <a id="back">Back</a>
                        </div>
                        <div class="items">
                            <p class="items-title">Color:</p>
                        </div>
                    </div>
                </div>`

    document.getElementsByClassName('details-grid')[0].insertAdjacentHTML("afterbegin", code)

    const colors = Object.keys(entry['colors'])
    setupColorButtons(colors)

    document.getElementById('front').addEventListener('click', function (e) {
        selectedSide = 'front'
        document.getElementById('image').src = colorItems.get(selectedColor)[selectedSide]
    });

    document.getElementById('back').addEventListener('click', function (e) {
        selectedSide = 'back'
        document.getElementById('image').src = colorItems.get(selectedColor)[selectedSide]
    });
};

const setupColorButtons = (colors) => {
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)

    }
    const setupColors = (elem, backgroundColor, color) => {
        elem.style.color = color
        elem.style.backgroundColor = backgroundColor
        elem.addEventListener("mouseover", function (e) {
            e.target.style.color = backgroundColor
            e.target.style.backgroundColor = color
        })
        elem.addEventListener("mouseout", function (e) {
            e.target.style.color = color
            e.target.style.backgroundColor = backgroundColor
        })
    }
    const setupClickListener = (elem, color) => {
        elem.addEventListener('click', function (e) {
            selectedColor = color
            document.getElementById('image').src = colorItems.get(selectedColor)[selectedSide]
        });
    }

    const mapOfColors = new Map();
    mapOfColors.set('white', ["#efefef", "#0d193f"]);
    mapOfColors.set('blue', ["#1976d2", "#fff"]);
    mapOfColors.set('pink', ["#d81b60", "#fff"]);
    mapOfColors.set('red', ["#d32f2f", "#fff"]);
    mapOfColors.set('green', ["#2e7d32", "#fff"]);
    mapOfColors.set('yellow', ["#ffeb3b", "#fff"]);

    for (i = 0; i < colors.length; i++) {
        let elem = document.createElement('a')
        elem.text = capitalizeFirstLetter(colors[i])
        elem.id = colors[i]

        setupColors(elem, mapOfColors.get(colors[i])[0], mapOfColors.get(colors[i])[1])
        setupClickListener(elem, colors[i])

        document.getElementsByClassName('items')[1].appendChild(elem)
    }
}
