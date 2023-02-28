interface OrderRequest {
    table: number;
    name: string;
}


interface OrderRemove {
    order_id: string;
}

export { OrderRequest, OrderRemove };