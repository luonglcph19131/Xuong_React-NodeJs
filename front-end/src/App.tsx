
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Content from './component/Content'
// import Footer from './component/Footer'
// import Header from './component/Header'
import Layout from './component/Layout'
import Products from './component/Products'
import ProductEdit from './component/ProductEdit'
import ProductAdd from './component/ProductAdd'
import SignUp from './component/SignUp'
import SignIn from './component/SignIn'
 import User from './component/User'

function App() {


  return (
    <>
      {
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<Content/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/products/add" element={<ProductAdd/>}/>
            <Route path="/products/edit/:id" element={<ProductEdit/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/login" element={<SignIn/>}/>
            <Route path='/users' element={<User/>}/>
          </Route>
        </Routes>
      }
    </>
  )
}

export default App
