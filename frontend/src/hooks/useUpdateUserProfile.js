import { useQueryClient ,useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { baseUrl } from "../constant/url";

const useUpdateUserProfile = ()=>{
    const queryClient = useQueryClient();
    const {mutateAsync :updateProfile , isPending :isUpdatingProfile} = useMutation({
        mutationFn : async (formData)=>{
            try {
                const res = await fetch(`${baseUrl}/api/users/update`,{
                    method :"POST",
                    credentials : "include",
                    headers : {
                        "Content-Type" : "application/json"
                    },
                    body :JSON.stringify(formData)
                })
                const data = await res.json();
                if(!res.ok){
                    throw new Error(data.error || "Something went wrong")
                }
                return data;
            } catch (error) {
                throw error;
            }
        },
        onSuccess : ()=>{
            toast.success("Profile Updated Successfully")
            Promise.all([
                queryClient.invalidateQueries({queryKey:["authUser"]}),
                queryClient.invalidateQueries({queryKey:["userProfile"]}),
            ])
        },
        onError : (error)=>{
            toast.error(error.message)
        }
       })
    return {updateProfile , isUpdatingProfile}
}
export default useUpdateUserProfile;