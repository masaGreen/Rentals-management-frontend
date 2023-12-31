
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import apis from "../ApiService";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../contextApi/AppContext";
import { AxiosError } from "axios";
import { useState } from "react";
import { CommonResponseMsg } from "../../types/TypesDefinitions";
import SpinningCircles from "react-loading-icons/dist/esm/components/spinning-circles";


export type UpdateResponse = {
    message: string
}


export default function UpdateStatus() {
    const { register, handleSubmit, reset } = useForm<UpdateResponse>();
    const [errors, setErrors] = useState<string | null>(null)
    const [loadingCircle, setLoadingCircle] = useState(false)
    const navigate = useNavigate();
    const client = useQueryClient()
    const { colorMode } = useAppContext()

    const mutation = useMutation<boolean, Error, UpdateResponse>("updateUnitStatus", (data) => apis.updateUnitStatus(data), {
        onSuccess: () => {
            client.invalidateQueries("fetchedUnits")
            navigate("/units")
            setLoadingCircle(false)
         
        },
        onError: (error) => {
            setLoadingCircle(false)
            setErrors((((error as AxiosError).response?.data) as CommonResponseMsg).errorsMessages.message)
        }
    })
    async function onSubmit(data: UpdateResponse) {

        mutation.mutate(data)
        reset()
    }

    function handleLoading():void {
        setLoadingCircle(true)
    }

    return (

        <div className="flex flex-col  gap-1 items-center ">
            <div className={`mt-2 font-semibold ${colorMode ? "text-slate-300" : ""}`}>
                <h2>1. To update Unit Availabillty</h2>
                <h4>2. Enter  unitNumber for the unit to be updated and  click update </h4>
            </div>
            <div className={`${colorMode ? "bg-slate-500 shadow-neutral-500 shadow-md" : ""} w-full p-2 md:w-2/5 rounded-lg  border-indigo-200 shadow-sm md:p-2 `}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="formdiv">
                            <label className={`${colorMode ? "text-slate-300" : ""}`}>unitNumber</label>
                            <input className='p-2 text-lg font-semibold rounded outline-indigo-200' placeholder="unitNumber" type="text" {...register("message")} />
                        </div>
                        {errors &&
                            <div>
                                <strong className="text-red-400">{errors}</strong>
                            </div>
                        }
                    </div>
                    <div className="flex flex-col items-center">
                        <button type="submit" onClick={handleLoading}
                                className={`${!loadingCircle ? "p-1 bg-indigo-400 text-slate-800 font-semibold text-lg rounded hover:bg-indigo-500 transition ease-in-out 300" : "hidden"}`
                                }>register</button>
                                
                            {loadingCircle && <div className="flex  p-1 gap-1 rounded bg-indigo-500 text-red-500 items-center justify-center font-semibold ">
                                <SpinningCircles />

                            </div>}
                            </div>
                </form>
            </div>



        </div>

    )
}