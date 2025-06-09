import React, { useState } from 'react';
import { createPosition } from '../api/positionApi';

const PositionFormDrawer = ({ onClose }) => {
  const [form, setForm] = useState({
    code: '', name: '', description: '', status: 'Hoạt động'
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await createPosition(form);
    onClose();
  };

  return (
    <div className="drawer">
      <h3>Vị trí công tác</h3>
      <input name="code" placeholder="Mã" onChange={handleChange} />
      <input name="name" placeholder="Tên" onChange={handleChange} />
      <input name="description" placeholder="Mô tả" onChange={handleChange} />
      <select name="status" onChange={handleChange}>
        <option>Hoạt động</option>
        <option>Ngưng</option>
      </select>
      <button onClick={handleSubmit}>Lưu</button>
      <button onClick={onClose}>Đóng</button>
    </div>
  );
};

export default PositionFormDrawer;
