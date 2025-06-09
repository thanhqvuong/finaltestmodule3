import React, { useEffect, useState } from 'react';
import { getPositions } from '../api/positionApi';
import PositionFormDrawer from './PositionFormDrawer';

const PositionList = () => {
  const [positions, setPositions] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);

  const fetchData = async () => {
    const res = await getPositions();
    setPositions(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <button onClick={() => setOpenDrawer(true)}>Tạo</button>
      <table>
        <thead>
          <tr><th>Mã</th><th>Tên</th><th>Trạng thái</th><th>Mô tả</th></tr>
        </thead>
        <tbody>
          {positions.map(pos => (
            <tr key={pos._id}>
              <td>{pos.code}</td>
              <td>{pos.name}</td>
              <td>{pos.status}</td>
              <td>{pos.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {openDrawer && <PositionFormDrawer onClose={() => {
        setOpenDrawer(false);
        fetchData();
      }} />}
    </>
  );
};

export default PositionList;
