import React from 'react'
import data from '../data'

const ProductPage = (props) => {
  const product = data.products.find(p=> p.__id === Number(props.match.params.id))
  return (
    <div>
      <h1>
        {product.name}
      </h1>
    </div>
  )
}

export default ProductPage;