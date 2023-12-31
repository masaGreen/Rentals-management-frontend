import { useForm } from "react-hook-form";
import { CommonResponseMsg, RegisterUtilityFormData } from "../../types/TypesDefinitions";
import { useQueryClient, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import apis from "../ApiService";
import { useAppContext } from "../../contextApi/AppContext";
import { AxiosError } from "axios";
import { useState } from "react";
import { UtilityValidationErrors } from "../../types/ValidationErrorsTypes";
import SpinningCircles from "react-loading-icons/dist/esm/components/spinning-circles";



export default function RegisterUtlitity() {
    const { register, handleSubmit, reset } = useForm<RegisterUtilityFormData>();
    const [errors, setErrors] = useState<string | null>(null)

    const [unitError, setUnitError] = useState<string | undefined>(undefined)
    const [loadingCircle, setLoadingCircle] = useState(false)
    const navigate = useNavigate()
    const { colorMode } = useAppContext()
    const client = useQueryClient()
    const { mutate } = useMutation<boolean, Error, RegisterUtilityFormData>(
        "registerUtilities",
        (data) => apis.registerUtility(data),
        {
            onSuccess: () => {
                client.invalidateQueries("fetchedUtilities")
                navigate("/utilities")
                reset();
                setLoadingCircle(false)
            },
            onError: (error) => {
                setLoadingCircle(false)
                if ((error as AxiosError).response?.status === 400) {
                    const validityerrors = (error as AxiosError).response?.data as UtilityValidationErrors

                    setUnitError(validityerrors.unitNumber);
                }
                setErrors((((error as AxiosError).response?.data) as CommonResponseMsg).errorsMessages.message)
            }

        }

    )

    async function onSubmit(data: RegisterUtilityFormData) {

        mutate(data)

    }
    function handleLoading():void {
        setLoadingCircle(true)
    }

    return (

        <div className="flex flex-col  gap-1 items-center ">
            <div>
                <h2 className={`text-indigo-900 text-2xl underline font-semiibold ${colorMode ? "text-slate-300" : ""}`}>Add UtilityPayment</h2>
            </div>
            <div className={`${colorMode ? "bg-slate-500 shadow-neutral-500 shadow-md" : ""} w-full p-2 md:w-2/5 rounded-lg  border-indigo-200 shadow-sm md:p-2 `}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="formdiv">
                            <label className={`${colorMode ? "text-slate-300" : ""} text-lg font-bold`}>Waterbill</label>
                            <input className='p-2 rounded outline-indigo-200' type="text" {...register("waterBill")} />
                        </div>
                        <div className="formdiv">
                            <label className={`${colorMode ? "text-slate-300" : ""} text-lg font-bold`}>Garbage</label>
                            <input className='p-2 rounded outline-indigo-200' type="text" {...register("garbage")} />
                        </div>
                        <div className="formdiv">
                            <label className={`${colorMode ? "text-slate-300" : ""} text-lg font-bold`}>Amount-Paid</label>
                            <input className='p-2 rounded outline-indigo-200' type="text" {...register("amountPaid")} />
                        </div>
                        <div className="formdiv">
                            <label className={`${colorMode ? "text-slate-300" : ""} text-lg font-bold`}>Unit-Number</label>
                            <input className='p-2 rounded outline-indigo-200' type="text" {...register("unitNumber")} />
                            {unitError &&
                                <div>
                                    <strong className="text-red-400">{unitError}</strong>
                                </div>
                            }
                        </div>


                        
                        {errors &&
                            <div>
                                <strong className="text-red-400">{errors}</strong>
                            </div>
                        }
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