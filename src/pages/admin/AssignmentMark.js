import React, { useState } from 'react'
import Navbar from '../../components/students/Navbar'
import { useGetAllAssignmentMarkQuery, useUpdateAssignmentMarkMutation } from '../../features/admin/AssignmentMarkApiSlice'

export default function AssignmentMark() {
  const {data:assignmentMark}=useGetAllAssignmentMarkQuery()
  const [updateAssignmentMark]=useUpdateAssignmentMarkMutation()

  const [inputValues, setInputValues] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  let assignmentCount=0;
  let pendingCount=0;
  let publishedCount=0;

  for (let index = 0; index < assignmentMark?.length; index++) {
    assignmentCount=assignmentCount+1;
    if (assignmentMark[index].status==='pending') {
        pendingCount=pendingCount+1;
    }else{
        publishedCount=publishedCount+1
    }
  }

  const formatedDate=(d)=>{
    const date = new Date(d);
    const options = { day: 'numeric', month: 'long' ,year: 'numeric'};
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }

  const handleUpdateMark=(id)=>{
    if (activeIndex!==null) {
        const newValues = [...inputValues];
        const newValue=newValues[activeIndex];
        updateAssignmentMark({id,mark:newValue})
        setActiveIndex(null)
    }
  }

  return (
    <>
    <Navbar/>
    <section class="py-6 bg-primary">
        <div class="mx-auto max-w-full px-5 lg:px-20">
            <div class="px-3 py-20 bg-opacity-10">
                <ul class="assignment-status">
                    <li>Total <span>{assignmentCount}</span></li>
                    <li>Pending <span>{pendingCount}</span></li>
                    <li>Mark Sent <span>{publishedCount}</span></li>
                </ul>
                <div class="overflow-x-auto mt-4">
                    <table class="divide-y-1 text-base divide-gray-600 w-full">
                        <thead>
                            <tr>
                                <th class="table-th">Assignment</th>
                                <th class="table-th">Date</th>
                                <th class="table-th">Student Name</th>
                                <th class="table-th">Repo Link</th>
                                <th class="table-th">Mark</th>
                            </tr>
                        </thead>

                        <tbody class="divide-y divide-slate-600/50">
                           {assignmentMark?.map((assignment,index)=>
                           <tr key={index}>
                                <td class="table-td">{assignment.title}</td>
                                <td class="table-td">{formatedDate(assignment.createdAt)}</td>
                                <td class="table-td">{assignment.student_name}</td>
                                <td class="table-td">{assignment.repo_link}</td>
                                {assignment.status==='pending' ? <td class="table-td input-mark">
                                    <input max="100"   value={inputValues[index] || ""}   
                                    onChange={(e) => {
                                        const newValues = [...inputValues];
                                        newValues[index] = e.target.value;
                                        setInputValues(newValues);
                                        setActiveIndex(index)
                                    }}/>
                                    <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                        class="w-6 h-6 text-green-500 cursor-pointer hover:text-green-400" onClick={()=>{
                                                handleUpdateMark(assignment.id)
                                                setActiveIndex(index);
                                            }}> 
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"/>
                                    </svg>

                                </td> : <td class="table-td">{assignment.mark}</td>}
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}
