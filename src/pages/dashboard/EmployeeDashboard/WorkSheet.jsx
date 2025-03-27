import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import { MdDelete, MdEdit, MdAddTask } from 'react-icons/md';
import { FiClock, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import useWorks from '../../../hooks/useWorks';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';

const WorkSheet = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [workData, refetch] = useWorks();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // Handle Add Task
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const task = form.task.value;
    const hours = form.hours.value;

    const workInfo = {
      name: user.displayName,
      task,
      hours,
      selectedDate,
      email: user.email,
    };

    axiosSecure.post('/work-sheet', workInfo).then(res => {
      if (res.data.insertedId) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Task Added Successfully',
          showConfirmButton: false,
          timer: 1500,
          background: '#4ade80',
          color: 'white',
        });
        form.reset();
        refetch();
      }
    });
  };

  // Handle Delete Task
  const handleDelete = id => {
    Swal.fire({
      title: 'Delete Task?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      background: '#1e293b',
      color: 'white',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/work-sheet/${id}`).then(res => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: 'Deleted!',
              text: 'Task has been deleted.',
              icon: 'success',
              background: '#1e293b',
              color: 'white',
            });
          }
        });
      }
    });
  };

  // Handle Edit Button Click
  const handleEditClick = item => {
    setEditData(item);
    setSelectedDate(new Date(item.selectedDate));
    setIsModalOpen(true);
  };

  // Handle Update Task
  const handleUpdate = e => {
    e.preventDefault();
    const form = e.target;
    const updatedTask = form.task.value;
    const updatedHours = form.hours.value;

    const updatedWorkInfo = {
      task: updatedTask,
      hours: updatedHours,
      selectedDate,
    };

    axiosSecure
      .put(`/work-sheet/${editData._id}`, updatedWorkInfo)
      .then(res => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: 'Updated!',
            text: 'Task has been updated.',
            icon: 'success',
            background: '#1e293b',
            color: 'white',
          });
          refetch();
          setIsModalOpen(false);
        }
      })
      .catch(error => {
        console.error('Error updating task:', error);
        Swal.fire('Error', 'Failed to update task.', 'error');
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            My Work Sheet
          </h2>
          <p className="text-slate-300">
            Track and manage your daily work activities
          </p>
        </div>

        {/* Add Work Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-slate-700 p-4 md:p-6 rounded-xl shadow-lg mb-8"
          whileHover={{ scale: 1.01 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <FiCheckCircle />
              </div>
              <select
                name="task"
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              >
                <option value="Sales">Sales</option>
                <option value="Support">Support</option>
                <option value="Content">Content</option>
                <option value="Paper-work">Paper-work</option>
              </select>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <FiClock />
              </div>
              <input
                type="number"
                name="hours"
                placeholder="Hours Worked"
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <FiCalendar />
              </div>
              <DatePicker
                name="date"
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                dateFormat="dd/MM/yyyy"
                selected={selectedDate}
                onChange={date => setSelectedDate(date)}
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-md"
            >
              <MdAddTask size={20} /> Add Task
            </button>
          </div>
        </motion.form>

        {/* Work Table */}
        <div className="bg-slate-700 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800 text-slate-300">
                <tr>
                  <th className="py-4 px-6 text-left">Task</th>
                  <th className="py-4 px-6 text-center">Hours</th>
                  <th className="py-4 px-6 text-center">Date</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-600">
                {workData.map((item, index) => (
                  <motion.tr
                    key={item._id}
                    className="hover:bg-slate-600/50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="py-4 px-6 text-white">{item.task}</td>
                    <td className="py-4 px-6 text-center text-amber-400 font-medium">
                      {item.hours}
                    </td>
                    <td className="py-4 px-6 text-center text-slate-300">
                      {new Date(item.selectedDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                        >
                          <MdEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                        >
                          <MdDelete /> Delete
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-md"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Edit Task</h3>
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <FiCheckCircle />
                    </div>
                    <select
                      name="task"
                      defaultValue={editData.task}
                      className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    >
                      <option value="Sales">Sales</option>
                      <option value="Support">Support</option>
                      <option value="Content">Content</option>
                      <option value="Paper-work">Paper-work</option>
                    </select>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <FiClock />
                    </div>
                    <input
                      type="number"
                      name="hours"
                      defaultValue={editData.hours}
                      className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      required
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <FiCalendar />
                    </div>
                    <DatePicker
                      name="date"
                      className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      dateFormat="dd/MM/yyyy"
                      selected={selectedDate}
                      onChange={date => setSelectedDate(date)}
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded-lg bg-slate-600 text-white hover:bg-slate-500 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transition-colors"
                    >
                      Update Task
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default WorkSheet;
