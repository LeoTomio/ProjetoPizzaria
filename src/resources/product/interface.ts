interface ProductRequest {
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
}

interface ProductList {
    category_id: string;
}


export { ProductRequest, ProductList }