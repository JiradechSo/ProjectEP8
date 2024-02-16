import axios from "axios";
import React from "react";

export default function ProductCard(props) {
  const { el, openModal, setTrigger } = props;

  const hdlDelete = async (e) => {
    try {
      e.stopPropagation();
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8889/product/${el.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrigger(prev => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditClick = () => {
    openModal(el.id);
  };

  const handleCardClick = () => {
    console.log(el.id);
  };
  console.log(el.imageUrl)

  return (
    <div className="bg-white shadow-xl mx-auto cursor-pointer rounded-lg p-4 hover:shadow-md transition duration-300" onClick={handleCardClick}>
      {el.imageUrl != null && (
        <img src={el.imageUrl} alt={el.name} className="w-full h-56 mb-4 rounded-lg" />
      )}
      <h2 className="bg-blue-600 pr-10 pl-10 rounded-xl text-white flex text-3xl font-bold items-center mb-4">{el.name}</h2>
      <div className="flex justify-end">
        <button onClick={hdlDelete} className="bg-red-600 text-white font-bold px-4 py-2 rounded-lg mr-2">ลบ</button>
        <button onClick={handleEditClick} className="bg-yellow-400 text-white font-bold px-4 py-2 rounded-lg">แก้ไข</button>
      </div>
    </div>
  );
}
