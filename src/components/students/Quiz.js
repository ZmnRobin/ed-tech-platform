import React from 'react'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'

export default function Quiz() {
  const {quiz}=useSelector(state=>state.assignment)
  
  return (
    <>
      <Navbar/>
      <section class="py-6 bg-primary">
        <div class="mx-auto max-w-7xl px-5 lg:px-0">
          <div class="mb-8">
            <h1 class="text-2xl font-bold">Quizzes for "Debounce Function in JavaScript - JavaScript Job Interview question"
            </h1>
            <p class="text-sm text-slate-200">Each question contains 5 Mark</p>
          </div>
          <div class="space-y-8 ">
            {
              quiz?.map((q,index)=>{
                return (
                  <div class="quiz" key={index}>
                  <h4 class="question">Quiz {index+1} -{q.question}</h4>
                  <form class="quizOptions">
                    {
                      q.options?.map((op,index)=>{
                        return(
                        <label for={`option${op.id}_q${op.id}`}>
                          <input type="checkbox" id={`option${op.id}_q${op.id}`} />
                           {op.option}
                        </label>
                      )
                    })
                    }
                  </form>
                </div>
                )
              })
            }
          </div>

          <button
            class="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 ">Submit</button>
        </div>
      </section>
    </>
  )
}
