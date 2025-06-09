import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema({
  code: String,
  isDeleted: Boolean,
  isActive: Boolean,
  startDate: Date,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  teacherPositionsId: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Position'   // <- Thêm dòng này để populate hoạt động
}],
  degrees: [String],
  createdAt: Date,
  updatedAt: Date
}, {
  collection: 'teachers',
  strict: false // 👉 Quan trọng: Cho phép dữ liệu không định nghĩa sẵn
});

export default mongoose.model('Teacher', TeacherSchema);
