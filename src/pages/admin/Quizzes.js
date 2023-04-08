import React from 'react'
import Navbar from '../../components/students/Navbar'
import { useDeleteQuizzesMutation, useGetAllQuizzesQuery } from '../../features/admin/QuizzesApiSlice'

export default function Quizzes() {
  const {data:quizzes}=useGetAllQuizzesQuery()
  const [deleteQuizzes]=useDeleteQuizzesMutation()

  const handleDelete=(id)=>{
    deleteQuizzes(id)
  }
  return (
    <>
    <Navbar/>
    <section class="py-6 bg-primary">
        <div class="mx-auto max-w-full px-5 lg:px-20">
            <div class="px-3 py-20 bg-opacity-10">
                <div class="w-full flex">
                    <button class="btn ml-auto">Add Quiz</button>
                </div>
                <div class="overflow-x-auto mt-4">
                    <table class="divide-y-1 text-base divide-gray-600 w-full">
                        <thead>
                            <tr>
                                <th class="table-th">Question</th>
                                <th class="table-th">Video</th>
                                <th class="table-th justify-center">Action</th>
                            </tr>
                        </thead>

                        <tbody class="divide-y divide-slate-600/50">
                          {quizzes?.map((quizz,index)=>{
                           return (<tr>
                                <td class="table-td">Quiz {index+1} - {quizz.question}</td>
                                <td class="table-td">{quizz.video_title}</td>
                                <td class="table-td flex gap-x-2 justify-center">
                                    <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                        class="w-6 h-6 hover:text-red-500 cursor-pointer transition-all" onClick={()=>handleDelete(quizz.id)}>
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                    <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                        class="w-6 h-6 hover:text-blue-500 cursor-pointer transition-all">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>

                                </td>
                            </tr>)})}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}
