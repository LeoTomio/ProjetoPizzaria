interface ItemAdd {
    amount: number;
    order_id: string;
    product_id: string;
}

interface ItemRemove {
    item_id: string;
}

export { ItemAdd, ItemRemove};