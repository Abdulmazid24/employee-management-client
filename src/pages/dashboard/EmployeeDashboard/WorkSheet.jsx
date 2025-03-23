import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';

import { MdDelete } from 'react-icons/md';
import useWorks from '../../../hooks/useWorks';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const WorkSheet = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [workData, refetch] = useWorks();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  console.log(workData);
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
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 2500,
        });
        form.reset();
        refetch();
      }
    });
  };
  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/work-sheet/${id}`).then(res => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          }
        });
      }
    });
  };

  return (
    <div className="container mx-auto p-4 my-10">
      <h2 className="text-4xl font-bold bg-gradient-to-tr from-green-400 to-amber-600 text-transparent bg-clip-text mb-4">
        My Work Sheet
      </h2>
      {/* Form Section (in one horizontal row) */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 items-center mb-6"
      >
        {/* Task Dropdown */}
        <select name="task" className="p-2 border rounded">
          <option value="Sales">Sales</option>
          <option value="Support">Support</option>
          <option value="Content">Content</option>
          <option value="Paper-work">Paper-work</option>
          {/* You may add more options here */}
        </select>

        {/* Hours Worked Input */}
        <input
          type="number"
          name="hours"
          placeholder="Hours Worked"
          className="p-2 border rounded "
          required
        />

        {/* Date Picker */}
        <DatePicker
          name="date"
          className="p-2 border rounded"
          dateFormat="dd/MM/yyyy"
          selected={selectedDate} // Bind state
          onChange={date => setSelectedDate(date)}
        />

        {/* Add / Submit Button */}
        <button
          type="submit"
          className="bg-amber-950 text-white px-4 py-2 rounded font-semibold"
        >
          Add
        </button>
      </form>

      {/* Table Section */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-center">
            <th className="border p-2">Task</th>
            <th className="border p-2">Hours Worked</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {workData.map(item => (
            <tr className="text-center" key={item.id}>
              <td className="border p-2">{item.task}</td>
              <td className="border p-2">{item.hours}</td>
              <td className="border p-2">
                {new Date(item.selectedDate).toLocaleDateString()}
              </td>
              <td className="border p-2 flex justify-evenly">
                <button className="text-blue-600 hover:text-blue-800 mr-2">
                  🖊 Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer"
                >
                  <MdDelete /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkSheet;
