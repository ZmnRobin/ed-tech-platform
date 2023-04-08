import { apiSlice } from "../apiSlice";

export const AssignmentApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllAssignment: builder.query({
            query: () => "/assignments",
        }),
        addAssignment: builder.mutation({
            query: (data) => ({
                url: "/assignments",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(args,{ dispatch, queryFulfilled }) {
                try {
                  const { data: addNewAssignments } = await queryFulfilled;
                  dispatch(
                    apiSlice.util.updateQueryData('getAllAssignment', undefined, (draft) => {
                        draft?.push(addNewAssignments)
                    })
                  )
                } catch (err){
                    console.log(err)
                }
            },
        }),
        editAssignment: builder.mutation({
            query: ({ id, data }) => ({
                url: `/assignments/${id}`,
                method: "PATCH",
                body: data,
            }),
            async onQueryStarted(args,{ dispatch, queryFulfilled }) {
                try {
                  const { data: updatedAssignments } = await queryFulfilled;
                  dispatch(
                    apiSlice.util.updateQueryData('getAllAssignment', undefined, (draft) => {
                        let singleAssignment=draft?.find((item)=>item.id===args?.id)
                        singleAssignment.title=updatedAssignments?.title;
                        singleAssignment.video_id=updatedAssignments?.video_id;
                        singleAssignment.video_title=updatedAssignments?.video_title;
                        singleAssignment.totalMark=updatedAssignments?.totalMark;
                    })
                  )
                } catch (err){
                    console.log(err)
                }
            },
        }),
        deleteAssignment: builder.mutation({
            query: (id) => ({
                url: `/assignments/${id}`,
                method: "DELETE",
            }),
            async onQueryStarted(args,{ dispatch, queryFulfilled }) {
                try {
                  await queryFulfilled;
                  dispatch(
                    apiSlice.util.updateQueryData('getAllAssignment', undefined, (draft) => {
                        return draft?.filter((assigment)=>assigment?.id!==args)
                    })
                  )
                } catch (err){
                    console.log(err)
                }
            },
        }),


    })
})

export const {useGetAllAssignmentQuery,useDeleteAssignmentMutation,useAddAssignmentMutation,useEditAssignmentMutation}=AssignmentApiSlice;