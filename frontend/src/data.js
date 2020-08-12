import shoeImage from './Assets/nikeshoes1jpg.jpg';
import shirtImage from './Assets/shirt.jpg';
import pantsImage from './Assets/pants.jpg'

const data = {
  products: [
    {
      __id: 1,
      name: 'Shoes',
      image: shoeImage,
      price: 60,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10
    },
    {
      __id: 2,
      name: 'Shirt',
      image: shirtImage,
      price: 40,
      brand: 'Underarmor',
      rating: 4.2,
      numReviews: 6
    },
    {
      __id: 3,
      name: 'Pants',
      image: pantsImage,
      price: 50,
      brand: 'Nike',
      rating: 3.9,
      numReviews: 5
    }
  ]
}

export default data;