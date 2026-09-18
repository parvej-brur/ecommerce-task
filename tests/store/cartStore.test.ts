import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import { useCartStore } from "../../src/store/cartStore.ts";
import type { CartItem } from "../../src/store/cartStore.ts";

function createItem(overrides: Partial<CartItem> = {}): CartItem {
  return {
    productId: "p1",
    quantity: 1,
    price: 10,
    name: "Product",
    image: "/p.png",
    ...overrides,
  };
}

afterEach(() => {
  useCartStore.setState({ items: [], isOpen: false });
});

describe("useCartStore", () => {
  it("adds a new item to the cart", () => {
    useCartStore.getState().addItem(createItem());
    assert.deepEqual(useCartStore.getState().items, [createItem()]);
  });

  it("increments quantity when adding an item already in the cart", () => {
    useCartStore.getState().addItem(createItem({ quantity: 1 }));
    useCartStore.getState().addItem(createItem({ quantity: 2 }));
    const { items } = useCartStore.getState();
    assert.equal(items.length, 1);
    assert.equal(items[0].quantity, 3);
  });

  it("removes an item from the cart", () => {
    useCartStore.getState().addItem(createItem({ productId: "p1" }));
    useCartStore.getState().addItem(createItem({ productId: "p2" }));
    useCartStore.getState().removeItem("p1");
    assert.deepEqual(
      useCartStore.getState().items.map((i) => i.productId),
      ["p2"],
    );
  });

  it("updates the quantity of an existing item", () => {
    useCartStore.getState().addItem(createItem({ quantity: 1 }));
    useCartStore.getState().updateQty("p1", 5);
    assert.equal(useCartStore.getState().items[0].quantity, 5);
  });

  it("removes the item when quantity is updated to zero or less", () => {
    useCartStore.getState().addItem(createItem());
    useCartStore.getState().updateQty("p1", 0);
    assert.deepEqual(useCartStore.getState().items, []);
  });

  it("clears all items from the cart", () => {
    useCartStore.getState().addItem(createItem({ productId: "p1" }));
    useCartStore.getState().addItem(createItem({ productId: "p2" }));
    useCartStore.getState().clearCart();
    assert.deepEqual(useCartStore.getState().items, []);
  });

  it("toggles cart visibility", () => {
    assert.equal(useCartStore.getState().isOpen, false);
    useCartStore.getState().openCart();
    assert.equal(useCartStore.getState().isOpen, true);
    useCartStore.getState().closeCart();
    assert.equal(useCartStore.getState().isOpen, false);
    useCartStore.getState().toggleCart();
    assert.equal(useCartStore.getState().isOpen, true);
  });
});
