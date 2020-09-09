import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {listProducts, saveProduct, deleteProduct} from '../actions/productActions'

const ProductsPage = (props) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const productList = useSelector(state => state.productList)
  const productSave = useSelector(state => state.productSave);
  const productDelete = useSelector(state => state.productDelete);
  const {loading, products, error} = productList;
  const {loading: loadingSave, success: successSave, error: errorSave} = productSave;
  const {loading: loadingDelete, success: successDelete, error: errorDelete} = productDelete;
  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(saveProduct({id, name, price, image, brand, category, countInStock, description}))
  }

  const deleteHandler = product => {
    dispatch(deleteProduct(product.id));
  }

  const openModal = product => {
    setModalVisible(true);
    setId(product.id);
    setName(product.name);
    setPrice(product.price)
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setDescription(product.description);
  }

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts())
  }, [dispatch, successSave, successDelete])


  return (
    <div>
      <div className="content content-margined">
        <div className="product-header">
          <h3>
            Products
          </h3>
          {!modalVisible &&
          <button className="button primary" onClick={() => openModal({})}>
            Create product
          </button>}
        </div>
      </div>
      {
        modalVisible &&
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Create Products</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave.message}</div>}
              </li>
              <li>
                <label htmlFor="name">
                  Name
                </label>
                <input type="text" name="name" id="name" value={name || ''} onChange={(e) => setName(e.target.value)}>
                </input>
              </li>
              <li>
                <label htmlFor="price">
                  Price
                </label>
                <input type="text" name="price" id="price" value={price || ''} onChange={(e) => setPrice(e.target.value)}>
                </input>
              </li>
              <li>
                <label htmlFor="image">
                  Image
                </label>
                <input type="text" name="image" id="image" value={image || ''} onChange={(e) => setImage(e.target.value)}>
                </input>
              </li>
              <li>
                <label htmlFor="brand">
                  Brand
                </label>
                <input type="text" name="brand" id="brand" value={brand || ''} onChange={(e) => setBrand(e.target.value)}>
                </input>
              </li>
              <li>
                <label htmlFor="category">
                  Category
                </label>
                <input type="text" name="category" id="category" value={category || ''} onChange={(e) => setCategory(e.target.value)}>
                </input>
              </li>
              <li>
                <label htmlFor="description">
                  Description
                </label>
                <input type="text" name="description" id="description" value={description || ''} onChange={(e) => setDescription(e.target.value)}>
                </input>
              </li>
              <li>
                <label htmlFor="countInStock">
                  Items in Stock
                </label>
                <input type="text" name="countInStock" id="countInStock" value={countInStock || ''}
                       onChange={(e) => setCountInStock(e.target.value)}>
                </input>
              </li>
              <li>
                <button type="submit" className="action-button" onSubmit={submitHandler}>
                  {id ? 'Update' : 'Create'}
                </button>
              </li>
              <li>
                <button className="button" onClick={() => setModalVisible(false)}>
                  Cancel
                </button>
              </li>
            </ul>
          </form>
        </div>
      }
      <div className="product-list">
        <table className="table">
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {products.map(product =>
            <tr key={product.id}>
              <th>{product.id}</th>
              <th>{product.name}</th>
              <th>{product.price}</th>
              <th>{product.category}</th>
              <th>{product.brand}</th>
              <th>
                <button className="button" onClick={() => openModal(product)}>
                  Edit
                </button>
                {' '}
                <button className="button" onClick={() => deleteHandler(product)}>
                  Delete
                </button>
              </th>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductsPage;