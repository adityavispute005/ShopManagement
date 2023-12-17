const itemForm = document.getElementById('addItemForm');
const itemListContainer = document.getElementById('itemList');

function addItem() {
  const itemName = document.getElementById('itemName').value;
  const itemDescription = document.getElementById('itemDescription').value;
  const itemPrice = document.getElementById('itemPrice').value;
  const itemQuantity = document.getElementById('itemQuantity').value;

  // Calculate the updated price based on quantity
  const updatedPrice = calculateUpdatedPrice(itemPrice, itemQuantity);

  const newItem = {
    name: itemName,
    description: itemDescription,
    price: updatedPrice,
    quantity: itemQuantity
  };

  // Simulating a POST request using Axios (in a real application, you would send this data to a server)
  axios.post('https://crudcrud.com/api/f15d46c24ce14f4ebfa72e4e92feef85/shopmanagement', newItem)
    .then(response => {
      // Simulating a GET request to fetch the updated item list after adding an item
      axios.get('https://crudcrud.com/api/f15d46c24ce14f4ebfa72e4e92feef85/shopmanagement')
        .then(response => {
          displayItemList(response.data);
        })
        .catch(error => {
          console.error('Error fetching items:', error);
        });
    })
    .catch(error => {
      console.error('Error adding item:', error);
    });
}

function calculateUpdatedPrice(basePrice, quantity) {
  // You can customize the logic for price calculation based on your requirements
  const basePriceNumeric = parseFloat(basePrice);
  const quantityNumeric = parseInt(quantity, 10);

  if (!isNaN(basePriceNumeric) && !isNaN(quantityNumeric)) {
    // For simplicity, let's assume a simple linear relationship between quantity and price
    const updatedPrice = basePriceNumeric * quantityNumeric;
    return updatedPrice.toFixed(2); // Adjust to the required precision
  } else {
    return basePrice;
  }
}

function displayItemList(items) {
  itemListContainer.innerHTML = '';
  items.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.innerHTML = `
      <div>
        <strong>${item.name}</strong><br>
        Description: ${item.description}<br>
        Price: ${item.price}<br>
        Quantity: ${item.quantity}
      </div>
    `;
    itemListContainer.appendChild(itemElement);
  });
}

// Simulating a GET request to fetch the initial item list
axios.get('https://crudcrud.com/api/f15d46c24ce14f4ebfa72e4e92feef85/shopmanagement')
  .then(response => {
    displayItemList(response.data);
  })
  .catch(error => {
    console.error('Error fetching items:', error);
  });


  