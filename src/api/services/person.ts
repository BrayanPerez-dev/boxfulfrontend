import { IPersonDetails } from "@/interfaces/person"
import dataFetcher from "../dataFetcher"
import { IBulk } from "@/interfaces/bulk"
import { AxiosError } from "axios"

interface IRequestData extends IPersonDetails {
    bulks:IBulk[]
}
export const createPersonWithBulks = async (data:IRequestData) => {
    try {
      const response = await dataFetcher.post("persons",data)
      return {
        success:true,
        data: response.data
    }
    } catch (error) {
        const err = error as AxiosError
        return {
            success:false,
            error: err.response?.data
        }
    }
}