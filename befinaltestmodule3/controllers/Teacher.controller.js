import Teacher from '../models/Teacher.js';

export const getAllTeachers = async (req, res) => {
  try {
    console.log('Received request getAllTeachers');
    const teachers = await Teacher.find({});
    console.log('Teachers data:', teachers);
    res.json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const createTeacher = async (req, res) => {
  try {
    const { name, email, phone, status, address, position, education } = req.body;

    // Tạo mã ngẫu nhiên không trùng
    let code;
    let isUnique = false;
    while (!isUnique) {
      code = Math.floor(100000000 + Math.random() * 900000000).toString();
      const exists = await Teacher.findOne({ code });
      if (!exists) isUnique = true;
    }

    const existingEmail = await Teacher.findOne({ email });
    if (existingEmail) return res.status(400).json({ message: 'Email đã tồn tại' });

    const newTeacher = new Teacher({
      code,
      name,
      email,
      phone,
      status,
      address,
      position,
      education,
    });

    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo giáo viên' });
  }
};
