import fetch from 'node-fetch';

const productDiscountClientData = [
    {
        product_id: 1,
        client_id: 1,
        discount_percentage: "10",
    },
    {
        product_id: 2,
        client_id: 2,
        discount_percentage: "7",
    },
    {
        product_id: 1,
        client_id: 3,
        discount_percentage: "5",
    },
];

const sendProductDiscountClient = async (data) => {
    try {
        const response = await fetch('http://localhost:3003/product-discount-client', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
        } else {
            console.error('Error al registrar el descuento de producto por cliente:', response.status);
            const errorMessage = await response.text();
            console.error('Mensaje de error del servidor:', errorMessage);
        }
    } catch (error) {
        console.error('Error al registrar el descuento de producto por cliente:', error);
    }
};

const sendMultipleProductDiscountClient = async () => {
    for (let i = 0; i < productDiscountClientData.length; i++) {
        await sendProductDiscountClient(productDiscountClientData[i]);
    }
};


export { sendMultipleProductDiscountClient };
