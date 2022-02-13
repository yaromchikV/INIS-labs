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
                    <a class="catalog-grid-btn" href="#">Quick View</a>
                    <a class="catalog-grid-btn" href="#">See Page</a>
                </div>
            </div>
        </div>`
    }

    document.getElementById('page-title').insertAdjacentHTML("afterend", code)
};

let initDetails = () => {
    // To see the shirts object, run:
    // console.log(shirts);

    // Your Code Here
};
