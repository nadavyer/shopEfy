const shoeImage = 'http://localhost:5000/shoe.jpg';
const shirtImage = 'http://localhost:5000/shirt.jpg';
const pantsImage = 'http://localhost:5000/pants.jpg';

const data = {
  products: [
    {
      __id: 1,
      name: 'Shoes',
      image: shoeImage,
      price: 60,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: "Nice black Nikes's shoes.",
      countInStock: 6
    },
    {
      __id: 2,
      name: 'Shirt',
      image: shirtImage,
      price: 40,
      brand: 'Underarmor',
      rating: 4.2,
      numReviews: 6,
      description: "Fit slim anti sweat shirt.",
      countInStock: 0
    },
    {
      __id: 3,
      name: 'Pants',
      image: pantsImage,
      price: 50,
      brand: 'Nike',
      rating: 3.9,
      numReviews: 5,
      description: "Best seller sport's pants.",
      countInStock: 8
    }
  ]
}

module.exports = data;