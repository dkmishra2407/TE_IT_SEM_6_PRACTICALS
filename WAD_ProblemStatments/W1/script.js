const products = [
    { image: 'wireless_headphones.jpg', name: 'Wireless Headphones', price: '₹7,999', description: 'Noise-cancelling over-ear headphones.' },
    { image: 'smartwatch.jpg', name: 'Smartwatch', price: '₹12,999', description: 'Fitness tracking smartwatch.' },
    { image: 'gaming_mouse.jpg', name: 'Gaming Mouse', price: '₹2,499', description: 'Ergonomic gaming mouse.' },
    { image: 'laptop_stand.jpg', name: 'Laptop Stand', price: '₹1,999', description: 'Adjustable aluminium stand.' },
    { image: 'laptop_stand.jpg', name: 'Laptop Stand', price: '₹1,999', description: 'Adjustable aluminium stand.' },
    { image: 'laptop_stand.jpg', name: 'Laptop Stand', price: '₹1,999', description: 'Adjustable aluminium stand.' },
    { image: 'laptop_stand.jpg', name: 'Laptop Stand', price: '₹1,999', description: 'Adjustable aluminium stand.' },
    { image: 'laptop_stand.jpg', name: 'Laptop Stand', price: '₹1,999', description: 'Adjustable aluminium stand.' },
    { image: 'laptop_stand.jpg', name: 'Laptop Stand', price: '₹1,999', description: 'Adjustable aluminium stand.' },
    { image: 'laptop_stand.jpg', name: 'Laptop Stand', price: '₹1,999', description: 'Adjustable aluminium stand.' },
];

const productperpage = 5;
let currpage = 0;

function rendercontent() {
    const tablebody = document.getElementById('productBody');
    tablebody.innerHTML = '';

    let start = currpage * productperpage;
    let end = Math.min(start + productperpage, products.length); // ✅ Change 1: `min` → `Math.min`

    for (let i = start; i < end; i++) {
        let product = products[i];
        let row = document.createElement('tr');

        row.innerHTML =
            `<td><img src="${product.image}" /></td>  <!-- ✅ Change 2: Wrapped ${product.image} in quotes -->
             <td>${product.name}</td>
             <td>${product.price}</td>
             <td>${product.description}</td>`;

        tablebody.appendChild(row);
    }

    updatepagination();
}

function changepage(page) {
    if (currpage + page < 0 || currpage + page >= Math.ceil(products.length / productperpage)) {
        alert("No more pages available.");
        return;
    }
    currpage += page;
    rendercontent();
}

function updatepagination() {
    const totalpage = Math.ceil(products.length / productperpage);
    const pagination = document.getElementById('paginationControls');

    pagination.innerHTML = `
        <button onclick="changepage(-1)">Previous</button>
        <span>Page ${currpage + 1} of ${totalpage}</span>
        <button onclick="changepage(1)">Next</button>`;
}

window.onload = rendercontent;
