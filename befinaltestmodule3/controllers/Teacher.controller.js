import Teacher from '../models/Teacher.js';
import User from '../models/User.js';
import Position from '../models/Position.js';

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .populate('userId') // Lấy thông tin user
      .populate('teacherPositionsId'); // Lấy danh sách vị trí

    res.json({ data: teachers });
  } catch (error) {
    console.error("❌ Lỗi lấy danh sách giáo viên:", error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

export const createTeacher = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      isActive,
      address,
      teacherPositionsId
    } = req.body;

    // Kiểm tra email trùng
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }

    // Tạo user
    const user = new User({ name, email, phone, address });
    await user.save();

    // Tạo mã code không trùng
    let code;
    let isUnique = false;
    while (!isUnique) {
      code = Math.floor(100000000 + Math.random() * 900000000).toString();
      const exists = await Teacher.findOne({ code });
      if (!exists) isUnique = true;
    }

    // Tạo teacher
    const newTeacher = new Teacher({
      code,
      isActive,
      isDeleted: false,
      userId: user._id,
      teacherPositionsId
    });

    await newTeacher.save();

    res.status(201).json({ message: 'Tạo giáo viên thành công', data: newTeacher });
  } catch (error) {
    console.error("❌ Lỗi khi tạo giáo viên:", error);
    res.status(500).json({ message: 'Lỗi server khi tạo giáo viên' });
  }
};
