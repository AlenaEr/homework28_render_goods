let kitchenProducts = [
    {
        type: 'grater',
        price: 10
    },
    {
        type: 'pastry-bag',
        price: 25
    },
    {
        type: 'scale',
        price: 5
    },
    {
        type: 'whisk',
        price: 15
    }
];

let devicesProducts = [
    {
        type: 'desktop',
        price: [100, 1000]
    },
    {
        type: 'laptop',
        price: [50, 1500]
    },
    {
        type: 'smartphone',
        price: [80, 2000]
    },
    {
        type: 'tablet',
        price: [20, 1300]
    }
];

let cosmeticsProducts = [
    {
        type: 'blush',
        price: 100
    },
    {
        type: 'eyeshadow',
        price: 50
    },
    {
        type: 'lipstick',
        price: 80
    },
    {
        type: 'nail-polish',
        price: 200
    },
    {
        type: 'perfume',
        price: 300,
    }
];

let Kitchen = { category: 'kitchen' }
let Devices = { category: 'devices' }
let Cosmetics = { category: 'cosmetics' }

function addProductsToCategory(category, products) {
    products.forEach(product => {
        let newProduct = Object.create(category);
        newProduct.type = product.type;
        newProduct.price = product.price;
        category[product.type] = newProduct;
    })
}

addProductsToCategory(Kitchen, kitchenProducts);
addProductsToCategory(Devices, devicesProducts);
addProductsToCategory(Cosmetics, cosmeticsProducts);

console.log(Kitchen);
console.log(Devices);
console.log(Cosmetics);

const maxContainerWidthPercentage = 80;
const maxContainerWidth = (maxContainerWidthPercentage / 100) * window.innerWidth;

// Метод для розрахунку ширини product-container-inner
const calculateProductContainerInnerWidth = (containerWidth, productsCount) => {
    return containerWidth / productsCount;
};

// Метод для рендерингу продуктів для кожної категорії
const renderCategoryProducts = (category, containerWidth) => {
    let result = `<div class="category">
    <h2 class="category-title">Category: ${category.category}</h2>
    <div class="product-container">`;

    let productsCount = Object.keys(category).length - 1; // Кількість товарів
    let maxProductsInRow = productsCount > 6 ? 6 : productsCount;

    let itemsCount = 0;

    for (let key in category) {
        if (category.hasOwnProperty(key) && key !== 'category') {
            let product = category[key];
            let productContainerInnerWidth = calculateProductContainerInnerWidth(containerWidth, productsCount);

            result += `<div class="product-container-inner" style="width: ${productContainerInnerWidth}px;">
        <div class="product">
          <img src="./images/${category.category}/${product.type}.svg" alt="${product.type}">
          <p class="product-info">Name: <span class="product-name">${product.type}</span></p>
          <p class="product-info">Price: <span class="product-price">${Array.isArray(product.price) ? `$${product.price[0]} - $${product.price[1]}` : `$${product.price}`}</span></p>
        </div>
      </div>`;

            itemsCount++;
            if (itemsCount === maxProductsInRow) {
                if (itemsCount !== productsCount) {
                    result += '</div><div class="product-container">';
                }
                itemsCount = 0;
            }
        }
    }

    result += `</div>
    <div class="line"></div>
    </div>`;
    return result;
};

// Виведення кожної категорії окремо
document.write(renderCategoryProducts(Kitchen, maxContainerWidth));
document.write(renderCategoryProducts(Devices, maxContainerWidth));
document.write(renderCategoryProducts(Cosmetics, maxContainerWidth));

