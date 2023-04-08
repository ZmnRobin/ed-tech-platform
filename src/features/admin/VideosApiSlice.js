import { apiSlice } from "../apiSlice";

export const VideosApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllVideos: builder.query({
            query: () => "/videos",
        }),
        deleteVideos: builder.mutation({
            query: (id) => ({
                url: `/videos/${id}`,
                method: "DELETE",
            }),
            async onQueryStarted(args,{ dispatch, queryFulfilled }) {
                try {
                  await queryFulfilled;
                  dispatch(
                    apiSlice.util.updateQueryData('getAllVideos', undefined, (draft) => {
                        return draft?.filter((videos)=>videos?.id!==args)
                    })
                  )
                } catch (err){
                    console.log(err)
                }
            },
        }),
        addVideos: builder.mutation({
            query: (data) => ({
                url: "/videos",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(args,{ dispatch, queryFulfilled }) {
                try {
                  const { data: addNewVideos } = await queryFulfilled;
                  dispatch(
                    apiSlice.util.updateQueryData('getAllVideos', undefined, (draft) => {
                        draft?.push(addNewVideos)
                    })
                  )
                } catch (err){
                    console.log(err)
                }
            },
        }),

        editVideos: builder.mutation({
            query: ({ id, data }) => ({
                url: `/videos/${id}`,
                method: "PATCH",
                body: data,
            }),
            async onQueryStarted(args,{ dispatch, queryFulfilled }) {
                try {
                  const { data: updatedVideos } = await queryFulfilled;
                  dispatch(
                    apiSlice.util.updateQueryData('getAllVideos', undefined, (draft) => {
                        let singleVideo=draft?.find((item)=>item.id.toString()===args?.id.toString())
                        singleVideo.title=updatedVideos?.title;
                        singleVideo.description=updatedVideos?.description;
                        singleVideo.url=updatedVideos?.url;
                        singleVideo.views=updatedVideos?.views;
                        singleVideo.duration=updatedVideos?.duration;
                        singleVideo.createdAt=updatedVideos?.createdAt;
                    })
                  )
                } catch (err){
                    console.log(err)
                }
            },
        }),

    })
})

export const {useGetAllVideosQuery,useDeleteVideosMutation,useAddVideosMutation,useEditVideosMutation}=VideosApiSlice;