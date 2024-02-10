import { useState } from "react"


const useTrigger = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>();

    const trigger = (request: any) => {
        setLoading(true)
        return new Promise((resolve, reject) => {
            request.then((res: any) => {
                setData(res.data);
                setLoading(false);
                resolve(res.data);
            }).catch((err: any) => {
                setLoading(false);
                reject(err);
            })
        })
    }
    return {
        loading,
        data,
        trigger
    }
}

export default useTrigger