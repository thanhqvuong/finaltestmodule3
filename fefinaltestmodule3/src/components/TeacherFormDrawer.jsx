import React, { useEffect, useState } from "react";
import { createTeacher } from "../api/teacherApi";
import { getPositions } from "../api/positionApi";

const TeacherFormDrawer = ({ onClose }) => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "",
    status: "Đang công tác", position: "", education: []
  });
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    getPositions().then(res => setPositions(res.data));
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await createTeacher(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-end z-50">
      <div className="w-full max-w-md bg-white p-6 shadow-lg rounded-l-xl">
        <h2 className="text-lg font-bold mb-4">Tạo giáo viên</h2>
        <div className="space-y-4">
          <input className="input" name="name" placeholder="Họ tên" onChange={handleChange} />
          <input className="input" name="email" placeholder="Email" onChange={handleChange} />
          <input className="input" name="phone" placeholder="SĐT" onChange={handleChange} />
          <input className="input" name="address" placeholder="Địa chỉ" onChange={handleChange} />
          <select name="position" className="input" onChange={handleChange}>
            <option>-- Vị trí công tác --</option>
            {positions.map(pos => (
              <option value={pos._id} key={pos._id}>{pos.name}</option>
            ))}
          </select>
        </div>

        <div className="mt-6 flex justify-between">
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Hủy</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default TeacherFormDrawer;
