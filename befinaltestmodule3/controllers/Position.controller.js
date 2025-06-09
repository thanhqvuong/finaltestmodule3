import Position from '../models/Position.js';

export const getAllPositions = async (req, res) => {
  try {
    const positions = await Position.find({ isDeleted: false });
    res.status(200).json({ data: positions });
  } catch (error) {
    console.error('Error fetching positions:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createPosition = async (req, res) => {
  try {
    const { name, code, description, isActive } = req.body;
    // Kiểm tra mã vị trí công tác trùng
    const existing = await Position.findOne({ code });
    if (existing) {
      return res.status(400).json({ message: 'Code already exists' });
    }

    const newPosition = new Position({
      name,
      code,
      description,
      isActive
    });

    await newPosition.save();
    res.status(201).json({ message: 'Position created successfully', position: newPosition });
  } catch (error) {
    console.error('Error creating position:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
