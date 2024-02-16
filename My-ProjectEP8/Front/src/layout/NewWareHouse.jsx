import axios from "axios";
import {useState} from "react";

export default function WareHouseForm() {
  const [input, setInput] = useState({
    name : '',
  })

  const hdlChange = e => {
    setInput( prv => ( {...prv, [e.target.name] : e.target.value} ))
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      const token = localStorage.getItem('token')
      const rs = await axios.post('http://localhost:8889/ware',input, {
        headers : { Authorization : `Bearer ${token}`}
      })
      alert('Create new OK')
    } catch(err) {
      alert(err.message)
    }
  }
  

  return (
    <form className="flex flex-col min-w-[600px] border rounded w-5/6 mx-auto p-4 gap-6"
        onSubmit={hdlSubmit}
    >
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">WareHouse</span>
        </div>
        <input
          type="text"
          placeholder="name"
          className="input input-bordered w-full "
          name="name"
          value={input.name}
          onChange={hdlChange}
        />
      </label>
      <button className="btn btn-primary">Add new</button>
    </form>
  );
}
