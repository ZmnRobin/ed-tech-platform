import React, { useState } from 'react'
import Navbar from '../../components/students/Navbar'
import { useAddAssignmentMutation, useDeleteAssignmentMutation, useEditAssignmentMutation, useGetAllAssignmentQuery } from '../../features/admin/AssignmentApiSlice'
import { useGetAllVideosQuery } from '../../features/admin/VideosApiSlice'

export default function Assignments() {
  const {data:assignments}=useGetAllAssignmentQuery()
  const {data:videos}=useGetAllVideosQuery()
  const [deleteAssignment]=useDeleteAssignmentMutation()
  const [addAssignment]=useAddAssignmentMutation()
  const [editAssignment]=useEditAssignmentMutation()
  const [isOpen, setIsOpen] = useState(false);
  const [update,setUpdate]=useState(false)
  const [editId,setEditId]=useState(null)

  const [formData, setFormData] = useState({
    title: "",
    video_title: "",
    totalMark: "",
  });

  const openModal = () => {
    setFormData({
        title: "",
        video_title: "",
        totalMark: "",
    })
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setUpdate(false)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const video=videos?.filter(v=>v.title===formData.video_title)
    const video_id=video[0].id;
    const data={
        title: formData.title,
        video_title: formData.video_title,
        totalMark: formData.totalMark,
        video_id:video_id,
    }
    if (update) {
      editAssignment({id:editId,data:data})
      setUpdate(false)
    }else{
      addAssignment(data)
    }

    setFormData({
        title: "",
        video_title: "",
        totalMark: "",
    })
    closeModal();
  };

  const handleUpdate=(id)=>{
    const toUpdateData=assignments?.filter(a=>a.id===id)
    setFormData(toUpdateData[0])
    setEditId(id)
    setUpdate(true)
    setIsOpen(true)
  }


  const handleDelete=(id)=>{
    deleteAssignment(id)
  }

  return (
    <>
    <Navbar/>
    <section class="py-6 bg-primary">
        <div class="mx-auto max-w-full px-5 lg:px-20">
            <div class="px-3 py-20 bg-opacity-10">
                <div class="w-full flex">
                    <button class="btn ml-auto" onClick={openModal}>Add Assignment</button>
                </div>
                <div class="overflow-x-auto mt-4">
                    <table class="divide-y-1 text-base divide-gray-600 w-full">
                        <thead>
                            <tr>
                                <th class="table-th">Title</th>
                                <th class="table-th">Video Title</th>
                                <th class="table-th">Mark</th>
                                <th class="table-th">Action</th>
                            </tr>
                        </thead>

                        <tbody class="divide-y divide-slate-600/50">
                           {assignments?.map(assignment=><tr>
                                <td class="table-td">{assignment.title}</td>
                                <td class="table-td">{assignment.video_title}</td>
                                <td class="table-td">{assignment.totalMark}</td>
                                <td class="table-td flex gap-x-2">
                                    <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                        class="w-6 h-6 hover:text-red-500 cursor-pointer transition-all" onClick={()=>handleDelete(assignment.id)}>
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                    <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                        class="w-6 h-6 hover:text-blue-500 cursor-pointer transition-all" onClick={()=>handleUpdate(assignment.id)}>
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>

                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
    <div>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <label htmlFor="title">Assignment Title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder='assignment title...'
                value={formData.title}
                onChange={handleChange}
                required
              />
              <label htmlFor="video_title">Video Title</label>
              <select name="video_title" id="video_title" required onChange={handleChange}>
                  <option value="" hidden selected>Select Video</option>
                  {videos?.map(v=> <option value={v.title} key={v.id}>{v.title}</option>)}
              </select>
              <label htmlFor="totalMark">Total Mark</label>
              <input
                type="number"
                id="totalMark"
                name="totalMark"
                placeholder='totalMark...'
                value={formData.totalMark}
                onChange={handleChange}
                required
              />

              <input type="submit" value="Submit" />
            </form>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
    </>
  )
}
