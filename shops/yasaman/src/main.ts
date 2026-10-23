import type { Product, Offer, Stock, CartLine, LoadState } from './types';
import { loadCatalog } from './api/catalog';
import { renderStatus } from './ui/status';
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import confetti from "canvas-confetti";

const cartCount = document.querySelector<HTMLSpanElement>(".cart span");
const cartButton = document.querySelector<HTMLButtonElement>(".cart");
const dairyCarousel = document.querySelector<HTMLElement>("#dairy-carousel");
const offersCarousel = document.querySelector<HTMLElement>("#offers-carousel");

if (!cartCount || !cartButton || !dairyCarousel || !offersCarousel) {
    throw new Error("A required page element is missing");
}

const cart: CartLine[] = [];
const notyf = new Notyf({
    duration: 3000,
    ripple: false,
    position: { x: "center", y: "bottom" },
    types: [{ type: "success", background: "#24583e", icon: false }]
});

const priceFormat = new Intl.NumberFormat("fa-IR");

const createProductCard = (product: Product, index: number, section: string, stock: Stock, offers: Offer[]): HTMLElement => {
    const card: HTMLElement = document.createElement("article");
    card.className = "product";
    card.id = section + "-" + (index + 1);

    const offer = offers.find(function (item) {
        return item.productId === product.id;
    });

    if (offer) {
        const badge: HTMLSpanElement = document.createElement("span");
        badge.className = "discount";
        badge.textContent = priceFormat.format(offer.percent) + "٪ تخفیف";
        badge.title = offer.label;
        card.append(badge);
    }

    const icon: HTMLSpanElement = document.createElement("span");
    icon.className = "product-icon";
    icon.textContent = product.emoji;
    icon.setAttribute("role", "img");
    icon.setAttribute("aria-label", product.name);

    const name: HTMLHeadingElement = document.createElement("h3");
    name.textContent = product.name;

    const unit: HTMLParagraphElement = document.createElement("p");
    unit.textContent = product.unit;

    const price: HTMLDivElement = document.createElement("div");
    price.className = "price";
    let finalPrice = product.price;
    if (offer) {
        const oldPrice: HTMLModElement = document.createElement("del");
        oldPrice.textContent = priceFormat.format(product.price) + " تومان";
        price.append(oldPrice);
        finalPrice = Math.round(product.price * (100 - offer.percent) / 100);
    }
    const amount: HTMLElement = document.createElement("strong");
    amount.textContent = priceFormat.format(finalPrice) + " تومان";
    price.append(amount);

    const button: HTMLButtonElement = document.createElement("button");
    button.type = "button";
    button.textContent = "افزودن +";
    button.setAttribute("aria-label", "افزودن " + product.name + " به سبد خرید");

    button.addEventListener("click", (event: MouseEvent) => {
        if (!(event.currentTarget instanceof HTMLButtonElement)) {
            return;
        }
        const line = cart.find(item => item.id === product.id);
        if (line) line.quantity += 1;
        else cart.push({ id: product.id, quantity: 1 });
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = priceFormat.format(count);
        cartButton.setAttribute("aria-label", "سبد خرید، " + priceFormat.format(count) + " کالا");
        notyf.success("کالا به سبد خرید اضافه شد");
        confetti({ particleCount: 60, spread: 70, disableForReducedMotion: true });
    });

    card.append(icon, name, unit);
    if (stock.items[product.id] === 0) {
        card.classList.add("unavailable");
        const label: HTMLParagraphElement = document.createElement("p");
        label.className = "stock-label";
        label.textContent = "ناموجود";
        card.append(label);
        button.disabled = true;
        button.textContent = "ناموجود";
    }
    card.append(price, button);
    return card;
};

const renderCarousel = (section: string, products: Product[], stock: Stock, offers: Offer[]): void => {
    const carousel = document.querySelector<HTMLElement>("#" + section + "-carousel");
    const statusMessage = document.querySelector<HTMLParagraphElement>("#" + section + "-status");
    const controls = document.querySelector<HTMLDivElement>("#" + section + " .carousel-controls");
    if (!carousel || !statusMessage || !controls) {
        throw new Error("A carousel element is missing");
    }
    carousel.replaceChildren();

    if (products.length === 0) {
        statusMessage.textContent = "در حال حاضر محصولی برای نمایش وجود ندارد.";
        return;
    }

    products.forEach(function (product, index) {
        carousel.append(createProductCard(product, index, section, stock, offers));
    });
    const end: HTMLSpanElement = document.createElement("span");
    end.id = section + "-end";
    end.className = "carousel-end";
    end.setAttribute("aria-hidden", "true");
    carousel.append(end);
    statusMessage.textContent = "";
    controls.hidden = false;
};

let state: LoadState = { status: 'loading' };

const start = async (): Promise<void> => {
    renderStatus(state);
    try {
        const { products, stock, offers } = await loadCatalog();
        state = products.length > 0 ? { status: 'success', products } : { status: 'empty' };
        renderStatus(state);
        if (state.status !== 'success') return;

        const dairyProducts = products.filter(function (product) {
            return product.categoryId === 2;
        });
        const specialProducts = products.filter(function (product) {
            return offers.find(function (offer) {
                return offer.productId === product.id;
            });
        });

        renderCarousel("dairy", dairyProducts, stock, offers);
        renderCarousel("offers", specialProducts, stock, offers);

        const target: HTMLElement | null = document.getElementById(location.hash.slice(1));
        if (target) {
            target.scrollIntoView();
        }
    } catch (error: unknown) {
        state = { status: 'error', message: 'دریافت اطلاعات انجام نشد. اتصال را بررسی کنید و دوباره تلاش کنید.' };
        renderStatus(state);
    }
};

start();
