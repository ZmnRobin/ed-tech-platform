import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Navbar from '../../components/students/Navbar'
import Video from '../../components/students/Video';
import {  useAddAssignmentMarkMutation, useGetAssignmentMarksQuery, useGetAssignmentsQuery, useGetQuizzesQuery, useGetVideosQuery } from '../../features/user/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addAssignment, addQuiz } from '../../features/user/userSlice';

export default function CoursePlayer() {
  const dispatch=useDispatch()
  const {user}=useSelector(state=>state.auth)
  const {data:videos}=useGetVideosQuery();
  const {data:assignmentData}=useGetAssignmentsQuery()
  const {data:quizData}=useGetQuizzesQuery()
  const [addAssignmentMark]=useAddAssignmentMarkMutation()

  const [video,setVideo]=useState(false)
  const [assignment , setAssignment] = useState(false)
  const [quiz , setQuiz] = useState(false)
  const {id}=useParams()
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    repo_link: "",
  });

  const formatedDate=(d)=>{
    const date = new Date(d);
    const options = { day: 'numeric', month: 'long' ,year: 'numeric'};
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }

  useEffect(() => {
    if (id) {
      const vd=videos?.filter(v=>v.id.toString()===id.toString())
      const isAssignment=assignmentData?.filter(a=>a.video_id.toString()===id.toString())
      const isQuiz=quizData?.filter(q=>q.video_id.toString()===id.toString())
      setVideo(vd)
      setAssignment(isAssignment)
      setQuiz(isQuiz)
      dispatch(addAssignment(isAssignment))
      dispatch(addQuiz(isQuiz))
    }
  }, [assignmentData, dispatch, id, quizData, videos])

  
  const handleSubmit = (e) => {
    e.preventDefault();

    setFormData({
        repo_link: "",
    })
    const data={
      student_id:user?.id,
      student_name:user?.name,
      assignment_id:assignment[0]?.id,
      title:assignment[0]?.title,
      createdAt:new Date().toJSON(),
      totalMark:assignment[0]?.totalMark,
      mark:"",
      repo_link:formData?.repo_link,
      status:"pending",
    }
    addAssignmentMark(data)
    closeModal();
  };

  const openModal = () => {
    setFormData({
        repo_link: "",
    })
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <>
      <Navbar/>
      <section class="py-6 bg-primary">
        <div class="mx-auto max-w-7xl px-5 lg:px-0">
            <div class="grid grid-cols-3 gap-2 lg:gap-8">
                <div class="col-span-full w-full space-y-8 lg:col-span-2">
                    
                   { video ? <iframe width="100%" class="aspect-video" src={video[0]?.url}
                        repo_link={video[0]?.repo_link}
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>

                    </iframe>: <h1>No video selected. Please select a video from the right side to watch.</h1>}
                   {video?
                    <div>
                        <h1 class="text-lg font-semibold tracking-tight text-slate-100">
                            {video[0]?.repo_link}
                        </h1>
                        <h2 class=" pb-4 text-sm leading-[1.7142857] text-slate-400">
                            Uploaded on {formatedDate(video[0]?.createdAt)}</h2>
                        <div class="flex gap-4">
                            {assignment?.length!==0 && <Link href="#" onClick={openModal}
                                class="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">
                                এসাইনমেন্ট
                            </Link>}

                            {quiz?.length!==0 && <Link to="/quiz"
                                class="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary">কুইজে
                                অংশগ্রহণ
                                করুন
                            </Link>}
                        </div>
                        <p class="mt-4 text-sm text-slate-400 leading-6">
                           {video[0]?.description}
                        </p>
                    </div> : null}
                </div>
                <div
                    class="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
                      {
                        videos?.map(video=> <Video key={video.id} video={video}/>)
                      }
                </div>
            </div>
        </div>
    </section>
    <div>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <label htmlFor="repo_link">Assignment Repo Link</label>
              <input
                type="text"
                id="repo_link"
                name="repo_link"
                placeholder="give us the repo_link..."
                value={formData.repo_link}
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
