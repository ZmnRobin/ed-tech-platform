import { apiSlice } from "../apiSlice";

export const userApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getVideos: builder.query({
            query: () => "/videos",
        }),
        getAssignments: builder.query({
            query: () => "/assignments",
        }),
        getQuizzes: builder.query({
            query: () => "/quizzes",
        }),
        getAssignmentMarks: builder.query({
            query: () => "/assignmentMark",
        }),
        addAssignmentMark: builder.mutation({
            query: (data) => ({
                url: "/assignmentMark",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(args,{ dispatch, queryFulfilled }) {
                try {
                  const { data: addNewAssignmentMark } = await queryFulfilled;
                  dispatch(
                    apiSlice.util.updateQueryData('getAssignmentMarks', undefined, (draft) => {
                        draft?.push(addNewAssignmentMark)
                    })
                  )
                } catch (err){
                    console.log(err)
                }
            },
        }),
        getQuizMarks: builder.query({
            query: () => "/quizMark",
        }),
    })
})

export const {useGetVideosQuery,useGetAssignmentsQuery,useGetQuizzesQuery,useGetAssignmentMarksQuery,useGetQuizMarksQuery,useAddAssignmentMarkMutation}=userApiSlice;