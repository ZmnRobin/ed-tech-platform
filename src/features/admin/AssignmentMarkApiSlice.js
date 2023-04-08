import { apiSlice } from "../apiSlice";

export const AssignmentMarkApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllAssignmentMark: builder.query({
            query: () => "/assignmentMark",
        }),
        updateAssignmentMark: builder.mutation({
            query: ({ id, mark }) => ({
                url: `/assignmentMark/${id}`,
                method: "PATCH",
                body: {
                    mark:mark,
                    status:"published"
                },
            }),
            async onQueryStarted(args,{ dispatch, queryFulfilled }) {
                try {
                  const { data: updatedMark } = await queryFulfilled;
                  dispatch(
                    apiSlice.util.updateQueryData('getAllAssignmentMark', undefined, (draft) => {
                        let singleAssignment=draft?.find((item)=>item.id.toString()===args?.id.toString())
                        singleAssignment.mark=updatedMark?.mark;
                        singleAssignment.status=updatedMark?.status;
                    })
                  )
                } catch (err){
                    console.log(err)
                }
            },
        }),
    })
})

export const {useGetAllAssignmentMarkQuery,useUpdateAssignmentMarkMutation}=AssignmentMarkApiSlice;