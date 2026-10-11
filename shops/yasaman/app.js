const carousel = document.querySelector("#dairy-carousel");
const statusMessage = document.querySelector("#dairy-status");
const priceFormat = new Intl.NumberFormat("fa-IR");

function createProductCard(product, index) {
    const card = document.createElement("article");
    card.className = "product";
    card.id = "dairy-" + (index + 1);

    const icon = document.createElement("span");
    icon.className = "product-icon";
    icon.textContent = product.emoji;
    icon.setAttribute("role", "img");
    icon.setAttribute("aria-label", product.name);

    const name = document.createElement("h3");
    name.textContent = product.name;

    const unit = document.createElement("p");
    unit.textContent = product.unit;

    const price = document.createElement("div");
    price.className = "price";
    const amount = document.createElement("strong");
    amount.textContent = priceFormat.format(product.price) + " تومان";
    price.append(amount);

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "افزودن +";
    button.setAttribute("aria-label", "افزودن " + product.name + " به سبد خرید");

    card.append(icon, name, unit, price, button);
    return card;
}

async function loadDairyProducts() {
    statusMessage.textContent = "در حال بارگذاری محصولات لبنیات…";

    try {
        const response = await fetch("../../api/products.json");
        if (!response.ok) {
            throw new Error("Products request failed");
        }

        const products = await response.json();
        const dairyProducts = products.filter(function (product) {
            return product.categoryId === 2;
        });

        if (dairyProducts.length === 0) {
            statusMessage.textContent = "در حال حاضر محصولی در دستهٔ لبنیات وجود ندارد.";
            return;
        }

        dairyProducts.forEach(function (product, index) {
            carousel.append(createProductCard(product, index));
        });

        const end = document.createElement("span");
        end.id = "dairy-end";
        end.className = "carousel-end";
        end.setAttribute("aria-hidden", "true");
        carousel.append(end);
        statusMessage.textContent = "";
        document.querySelector("#dairy .carousel-controls").hidden = false;

        if (location.hash.startsWith("#dairy-")) {
            const target = document.getElementById(location.hash.slice(1));
            if (target) {
                target.scrollIntoView();
            }
        }
    } catch (error) {
        carousel.replaceChildren();
        statusMessage.textContent = "دریافت محصولات انجام نشد. اتصال اینترنت را بررسی کنید و صفحه را دوباره بارگذاری کنید.";
    } finally {
        carousel.setAttribute("aria-busy", "false");
    }
}

loadDairyProducts();
