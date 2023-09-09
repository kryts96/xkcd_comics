import axios from "axios";
import { IComic } from "./ComicType";
import { config } from "../../config";

interface IComicResponse<T> {
    Success: boolean
    Response: T
}

export const getComic = async (comicNumber?: number): Promise<{ data: IComicResponse<IComic> }> => {
    const response = await axios.get(`${config.API_URL}/comic/get` + (comicNumber ? `/${comicNumber}` : ""));
    return response
}