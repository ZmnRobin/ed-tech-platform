import React, { useEffect, useState } from 'react'
import Navbar from '../../components/students/Navbar'
import { useGetAssignmentMarksQuery, useGetQuizMarksQuery } from '../../features/user/userApiSlice';
import { calculateMarks } from '../../utils/calculateMarks';
import { useSelector } from 'react-redux';

export default function Leaderboard() {
  const {data:assignmentMark}=useGetAssignmentMarksQuery();
  const {user}=useSelector(state=>state.auth)
  const [rank,setRank]=useState([])
  const [ownRank,setOwnRank]=useState([])
  const {data:quizMark}=useGetQuizMarksQuery();


  useEffect(() => {
    if (assignmentMark) {
        const studentList=calculateMarks(assignmentMark)
        setRank(studentList)
        setOwnRank(studentList.filter(s=>s.name===user.name))
    }
  }, [assignmentMark, user.name])

  
  return (
    <>
      <Navbar/>
      <section class="py-6 bg-primary">
        <div class="mx-auto max-w-7xl px-5 lg:px-0">
            <div>
                <h3 class="text-lg font-bold">Your Position in Leaderboard</h3>
                <table class="text-base w-full border border-slate-600/50 rounded-md my-4">
                    <thead>
                        <tr>
                            <th class="table-th !text-center">Rank</th>
                            <th class="table-th !text-center">Name</th>
                            <th class="table-th !text-center">Quiz Mark</th>
                            <th class="table-th !text-center">Assignment Mark</th>
                            <th class="table-th !text-center">Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr class="border-2 border-cyan">
                            <td class="table-td text-center font-bold">{ownRank[0]?.rank}</td>
                            <td class="table-td text-center font-bold">{ownRank[0]?.name}</td>
                            <td class="table-td text-center font-bold">00</td>
                            <td class="table-td text-center font-bold">{ownRank[0]?.totalMark}</td>
                            <td class="table-td text-center font-bold">{ownRank[0]?.totalMark}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="my-8">
                <h3 class="text-lg font-bold">Top 20 Result</h3>
                <table class="text-base w-full border border-slate-600/50 rounded-md my-4">
                    <thead>
                        <tr class="border-b border-slate-600/50">
                            <th class="table-th !text-center">Rank</th>
                            <th class="table-th !text-center">Name</th>
                            <th class="table-th !text-center">Quiz Mark</th>
                            <th class="table-th !text-center">Assignment Mark</th>
                            <th class="table-th !text-center">Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            rank?.map(r=>(
                            <tr class="border-b border-slate-600/50" key={r.index}>
                                <td class="table-td text-center">{r.rank}</td>
                                <td class="table-td text-center">{r.name}</td>
                                <td class="table-td text-center">00</td>
                                <td class="table-td text-center">{r.totalMark}</td>
                                <td class="table-td text-center">{r.totalMark}</td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </section>
    </>
  )
}
