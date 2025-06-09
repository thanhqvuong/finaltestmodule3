import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema({
  code: String,
  name: String,
  email: String,
  phone: String,
  isActive: Boolean,
  address: String,
  teacherPosition: { type: mongoose.Schema.Types.ObjectId, ref: 'Position' },
  education: {
    level: String,
    university: String
  }
}, { collection: 'teachers' });

export default mongoose.model('Teacher', TeacherSchema);
