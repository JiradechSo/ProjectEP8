import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductEdit from "../components/ProductEdit";

export default function ProductHome(props) {
  const [product, setProduct] = useState([]);
  const [editIdx, setEditIdx] = useState(-1);
  const [trigger, setTrigger] = useState(false);
  const [el, setEl] = useState(null);

  useEffect(() => {
    const elString = localStorage.getItem('el');
    if (elString) {
      const el = JSON.parse(elString);
      setEl(el); 
    }
  }, []);

  useEffect(() => {
    if (el) { 
      const run = async () => {
        try {
          let token = localStorage.getItem("token");
          const rs = await axios.get(`http://localhost:8889/product/?WarehouseId=${el.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setProduct(rs.data.products);
        } catch (error) {
          console.error(error);
        }
      };
      run();
    }
  }, [trigger, el]);

  const openModal = (id) => {
    let idx = product.findIndex(el => el.id === id);
    setEditIdx(idx);
    document.getElementById("my_modal_2").showModal();
  };
  const closeModal = () => {
    document.getElementById("my_modal_2").close();
  };

  const AddProductClick = () => {
    return (
      <Link
        to={{
          pathname: "/addproduct",
          search: `?warehouseId=${el ? el.id : ''}`
        }}
        className="card-name bg-blue-600 pr-10 pl-10 rounded-xl text-white items-center flex text-3xl font-bold"
      >
        +Product
      </Link>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {AddProductClick()}
      <ProductEdit el={product[editIdx]} closeModal={closeModal} setTrigger={setTrigger}/>
      <div className="grid grid-cols-3 gap-3">
        {product && product.map((el) => (
          <ProductCard key={el.id} el={el} openModal={openModal} setTrigger={setTrigger}/>
        ))}
      </div>
    </div>
  );
}
