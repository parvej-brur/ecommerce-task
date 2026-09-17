// Generates the static product catalog consumed by `src/features/products`.
// Run with: node scripts/generate-products.mjs

import { faker } from "@faker-js/faker";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PRODUCT_COUNT = 550;
const RELATED_COUNT = 3;

const SEED = 20260917;

const OUTPUT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "src",
  "features",
  "products",
  "api",
  "products.mock.json",
);

const CATEGORY_IMAGES = {
  Electronics: [
    "1517336714731-489689fd1ca8",
    "1526170375885-4d8ecf77b99f",
    "1511707171634-5f897ff02aa9",
    "1498049794561-7780e7231661",
    "1550009158-9ebf69173e03",
    "1546868871-7041f2a55e12",
    "1587202372775-e229f172b9d7",
    "1580910051074-3eb694886505",
    "1587825140708-dfaf72ae4b04",
    "1484788984921-03950022c9ef",
  ],
  Clothing: [
    "1445205170230-053b83016050",
    "1521572163474-6864f9cf17ab",
    "1489987707025-afc232f7ea0f",
    "1503341504253-dff4815485f1",
    "1490114538077-0a7f8cb49891",
    "1516762689617-e1cffcef479d",
    "1552374196-c4e7ffc6e126",
    "1562157873-818bc0726f68",
    "1441984904996-e0b6ba687e04",
    "1523381210434-271e8be1f52b",
  ],
  "Home & Kitchen": [
    "1556911220-e15b29be8c8f",
    "1584622650111-993a426fbf0a",
    "1556909212-d5b604d0c90d",
    "1571175443880-49e1d25b2bc5",
    "1583847268964-b28dc8f51f92",
    "1495546968767-f0573cca821e",
    "1493663284031-b7e3aefcae8e",
    "1484154218962-a197022b5858",
    "1567538096630-e0c55bd6374c",
    "1556909114-44e3e70034e2",
  ],
  Books: [
    "1481627834876-b7833e8f5570",
    "1512820790803-83ca734da794",
    "1495446815901-a7297e633e8d",
    "1524578271613-d550eacf6090",
    "1544716278-ca5e3f4abd8c",
    "1476275466078-4007374efbbe",
    "1507842217343-583bb7270b66",
    "1516979187457-637abb4f9353",
  ],
  Beauty: [
    "1522335789203-aabd1fc54bc9",
    "1596462502278-27bfdc403348",
    "1571781926291-c477ebfd024b",
    "1512496015851-a90fb38ba796",
    "1580870069867-74c57ee1bb07",
    "1571875257727-256c39da42af",
  ],
  Sports: [
    "1517649763962-0c623066013b",
    "1461896836934-ffe607ba8211",
    "1517836357463-d25dfeac3438",
    "1571019613454-1cb2f99b2d8b",
    "1487412947147-5cebf100ffc2",
    "1552674605-db6ffd4facb5",
    "1530549387789-4c1017266635",
    "1571008887538-b36bb32f4571",
  ],
};

const CATEGORIES = Object.keys(CATEGORY_IMAGES);

const CATEGORY_CODES = {
  Electronics: "ELE",
  Clothing: "CLO",
  "Home & Kitchen": "HNK",
  Books: "BOK",
  Beauty: "BEA",
  Sports: "SPO",
};

const TAG_POOL = [
  "bestseller",
  "new-arrival",
  "limited-stock",
  "premium",
  "eco-friendly",
  "trending",
  "top-rated",
  "editor-pick",
  "budget-friendly",
  "gift-idea",
];

// `faker.commerce.productName()`/`productDescription()` are category-blind —
// they'd happily title an "Electronics" row "Generic Granite Table".
const CATEGORY_PRODUCT_NOUNS = {
  Electronics: [
    "Headphones",
    "Bluetooth Speaker",
    "Smartwatch",
    "Laptop",
    "Wireless Mouse",
    "Mechanical Keyboard",
    "4K Monitor",
    "Action Camera",
    "Wi-Fi Router",
    "Tablet",
    "Power Bank",
    "Wireless Earbuds",
  ],
  Clothing: [
    "T-Shirt",
    "Denim Jacket",
    "Running Shoes",
    "Hoodie",
    "Chino Pants",
    "Sundress",
    "Wool Sweater",
    "Leather Belt",
    "Baseball Cap",
    "Sneakers",
  ],
  "Home & Kitchen": [
    "Coffee Maker",
    "Cutting Board",
    "Blender",
    "Bookshelf",
    "Throw Pillow",
    "Cookware Set",
    "Table Lamp",
    "Storage Bin",
    "Dinnerware Set",
    "Air Fryer",
  ],
  Books: [
    "Novel",
    "Cookbook",
    "Biography",
    "Field Guide",
    "Poetry Collection",
    "Graphic Novel",
    "Journal",
    "Textbook",
    "Short Story Collection",
    "Travel Guide",
  ],
  Beauty: [
    "Lipstick",
    "Face Serum",
    "Moisturizer",
    "Shampoo",
    "Perfume",
    "Eyeshadow Palette",
    "Sunscreen",
    "Hair Dryer",
    "Nail Polish Set",
    "Facial Cleanser",
  ],
  Sports: [
    "Yoga Mat",
    "Running Shoes",
    "Dumbbell Set",
    "Water Bottle",
    "Tennis Racket",
    "Cycling Helmet",
    "Resistance Bands",
    "Basketball",
    "Camping Tent",
    "Fitness Tracker",
  ],
};

const DESCRIPTION_TEMPLATES = [
  (title, category) =>
    `Discover the ${title} — a top pick in our ${category} collection, designed for everyday reliability.`,
  (title, category) =>
    `The ${title} combines quality and style, making it a standout choice in ${category}.`,
  (title, category) =>
    `Upgrade your routine with the ${title}, thoughtfully crafted for ${category} shoppers.`,
  (title, category) =>
    `Meet the ${title} — built to last and loved by customers shopping ${category}.`,
];

function buildTitle(category) {
  const noun = faker.helpers.arrayElement(CATEGORY_PRODUCT_NOUNS[category]);
  const adjective = faker.commerce.productAdjective();
  return `${adjective} ${noun}`;
}

function buildDescription(title, category) {
  const template = faker.helpers.arrayElement(DESCRIPTION_TEMPLATES);
  return template(title, category);
}

function categoryImageUrl(category, index) {
  const ids = CATEGORY_IMAGES[category];
  const photoId = ids[index % ids.length];
  return `https://images.unsplash.com/photo-${photoId}?w=800&h=800&q=80&auto=format&fit=crop`;
}

function buildSku(category, sequence) {
  const code = CATEGORY_CODES[category];
  const suffix = faker.string.alphanumeric({ length: 4, casing: "upper" });
  return `${code}-${String(sequence).padStart(5, "0")}-${suffix}`;
}

// Opaque, non-sequential string id (Stripe/Shopify-style), not a parseable
// sequence — `usedIds` guards against the astronomically unlikely collision.
function buildProductId(usedIds) {
  let id;
  do {
    id = `sikdar_${faker.string.alphanumeric({ length: 12, casing: "lower" })}`;
  } while (usedIds.has(id));
  usedIds.add(id);
  return id;
}

function buildTags() {
  return faker.helpers.arrayElements(TAG_POOL, { min: 2, max: 3 });
}

function roundTo(value, decimals) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function buildProduct(sequence, categoryIndexById, usedIds) {
  const category = faker.helpers.arrayElement(CATEGORIES);
  const categoryIndex = categoryIndexById.get(category) ?? 0;
  categoryIndexById.set(category, categoryIndex + 1);

  // `price` is the canonical, always-in-range sale price. `originalPrice` (when
  // a discount applies) is derived above it, matching a real markdown display.
  const price = roundTo(faker.number.float({ min: 10, max: 1000 }), 2);
  const hasDiscount = faker.number.int({ min: 1, max: 100 }) <= 40;
  const discount = hasDiscount ? faker.number.int({ min: 5, max: 50 }) : null;
  const originalPrice = hasDiscount
    ? roundTo(price / (1 - discount / 100), 2)
    : null;
  const stock = faker.number.int({ min: 0, max: 150 });
  const title = buildTitle(category);

  return {
    id: buildProductId(usedIds),
    title,
    description: buildDescription(title, category),
    price,
    ...(hasDiscount ? { originalPrice, discount } : {}),
    rating: roundTo(faker.number.float({ min: 3, max: 5 }), 1),
    reviewsCount: faker.number.int({ min: 5, max: 300 }),
    stock,
    inStock: stock > 0,
    category,
    image: categoryImageUrl(category, categoryIndex),
    sku: buildSku(category, sequence),
    tags: buildTags(),
    relatedIds: [],
    createdAt: faker.date.past({ years: 1 }).toISOString(),
  };
}

function assignRelatedIds(products) {
  const byCategory = new Map();
  for (const product of products) {
    const list = byCategory.get(product.category) ?? [];
    list.push(product.id);
    byCategory.set(product.category, list);
  }

  for (const product of products) {
    const peers = byCategory
      .get(product.category)
      .filter((id) => id !== product.id);
    product.relatedIds = faker.helpers.arrayElements(peers, {
      min: Math.min(RELATED_COUNT, peers.length),
      max: Math.min(RELATED_COUNT, peers.length),
    });
  }
}

function main() {
  faker.seed(SEED);

  const categoryIndexById = new Map();
  const usedIds = new Set();
  const products = Array.from({ length: PRODUCT_COUNT }, (_, index) =>
    buildProduct(index + 1, categoryIndexById, usedIds),
  );
  assignRelatedIds(products);

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, `${JSON.stringify(products, null, 2)}\n`, "utf-8");

  console.log(`Generated ${products.length} products -> ${OUTPUT_PATH}`);
}

main();
