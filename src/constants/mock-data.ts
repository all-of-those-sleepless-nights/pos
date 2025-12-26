import {
  CakeSlice,
  Coffee,
  CupSoda,
  IceCream,
  Pizza,
  Salad,
  Sandwich,
  Soup,
} from "lucide-react";

import type { Category, Product } from "./types";

export const categories: Category[] = [
  { id: "coffee", label: "Coffee", icon: Coffee },
  { id: "tea", label: "Tea & Infusions", icon: CupSoda },
  { id: "bakes", label: "Baked Goods", icon: CakeSlice },
  { id: "meals", label: "Hot Meals", icon: Soup },
  { id: "fresh", label: "Fresh Bites", icon: Salad },
  { id: "sandwiches", label: "Sandwiches", icon: Sandwich },
  { id: "treats", label: "Treats", icon: IceCream },
  { id: "pizza", label: "Flatbreads", icon: Pizza },
];

export const products: Product[] = [
  {
    id: "americano",
    name: "Americano",
    price: 3.5,
    categoryId: "coffee",
  },
  {
    id: "latte",
    name: "Vanilla Latte",
    price: 5.0,
    categoryId: "coffee",
  },
  {
    id: "flat-white",
    name: "Flat White",
    price: 4.75,
    categoryId: "coffee",
  },
  {
    id: "mocha",
    name: "Dark Mocha",
    price: 5.25,
    categoryId: "coffee",
  },
  {
    id: "chai",
    name: "Masala Chai",
    price: 4.25,
    categoryId: "tea",
  },
  {
    id: "matcha",
    name: "Iced Matcha",
    price: 4.9,
    categoryId: "tea",
  },
  {
    id: "hibiscus",
    name: "Hibiscus Cooler",
    price: 4.5,
    categoryId: "tea",
  },
  {
    id: "peppermint",
    name: "Peppermint Tea",
    price: 3.75,
    categoryId: "tea",
  },
  {
    id: "croissant",
    name: "Butter Croissant",
    price: 3.25,
    categoryId: "bakes",
  },
  {
    id: "muffin",
    name: "Blueberry Muffin",
    price: 3.5,
    categoryId: "bakes",
  },
  {
    id: "bagel",
    name: "Everything Bagel",
    price: 2.75,
    categoryId: "bakes",
  },
  {
    id: "quiche",
    name: "Spinach Quiche",
    price: 6.0,
    categoryId: "meals",
  },
  {
    id: "soup",
    name: "Tomato Basil Soup",
    price: 5.75,
    categoryId: "meals",
  },
  {
    id: "pasta",
    name: "Pesto Pasta",
    price: 8.5,
    categoryId: "meals",
  },
  {
    id: "salad-bowl",
    name: "Harvest Salad",
    price: 9.0,
    categoryId: "fresh",
  },
  {
    id: "parfait",
    name: "Granola Parfait",
    price: 4.95,
    categoryId: "fresh",
  },
  {
    id: "veggie-sandwich",
    name: "Veggie Sandwich",
    price: 8.0,
    categoryId: "sandwiches",
  },
  {
    id: "club-sandwich",
    name: "Smoky Club",
    price: 9.5,
    categoryId: "sandwiches",
  },
  {
    id: "gelato",
    name: "Sea Salt Gelato",
    price: 4.4,
    categoryId: "treats",
  },
  {
    id: "cookie",
    name: "Chocolate Chunk Cookie",
    price: 2.95,
    categoryId: "treats",
  },
  {
    id: "margherita",
    name: "Margherita Flatbread",
    price: 10.0,
    categoryId: "pizza",
  },
  {
    id: "truffle",
    name: "Truffle Mushroom Flatbread",
    price: 11.5,
    categoryId: "pizza",
  },
];
