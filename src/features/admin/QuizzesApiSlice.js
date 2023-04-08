import { apiSlice } from "../apiSlice";


export const QuizzesApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllQuizzes: builder.query({
            query: () => "/quizzes",
        }),
        deleteQuizzes: builder.mutation({
            query: (id) => ({
                url: `/quizzes/${id}`,
                method: "DELETE",
            }),
            async onQueryStarted(args,{ dispatch, queryFulfilled }) {
                try {
                  await queryFulfilled;
                  dispatch(
                    apiSlice.util.updateQueryData('getAllQuizzes', undefined, (draft) => {
                        return draft?.filter((quizz)=>quizz?.id!==args)
                    })
                  )
                } catch (err){
                    console.log(err)
                }
            },
        }),

    })
})

export const {useGetAllQuizzesQuery,useDeleteQuizzesMutation}=QuizzesApiSlice;