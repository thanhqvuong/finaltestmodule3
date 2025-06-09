import Position from '../models/Position.js';

export const getAllPositions = async (req, res) => {
  try {
    const positions = await Position.find(); // FIXED
    res.json(positions);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server' });
  }
};

export const createPosition = async (req, res) => {
  try {
    const { code, name, description, isActive } = req.body;

    const exists = await Position.findOne({ code });
    if (exists) return res.status(400).json({ message: 'Mã vị trí đã tồn tại' });

    const newPosition = new Position({
      code,
      name,
      description,
      isActive: isActive === true || isActive === 'true', // ✅ phải dùng đúng key
    });

    await newPosition.save();
    res.status(201).json(newPosition);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo vị trí công tác' });
  }
};
