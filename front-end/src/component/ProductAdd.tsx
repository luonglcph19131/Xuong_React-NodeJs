import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IProduct } from "../interfaces/Product";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import  { ProductContext } from "../context/ProductContextProvider";
// import { useMutation, useQueryClient } from "@tanstack/react-query";



const ProductAdd = () => {
    const [, dispatch ] = useContext(ProductContext)
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IProduct>();

    const onSubmit: SubmitHandler<IProduct> = async (product) => {
        try {
            const { data } = await axios.post(`http://localhost:8080/api/products/add`, product)
            dispatch({type : "ADD_PRODUCT", payload: data}) 
        
        } catch (error) {
            console.log(error);
        }
        navigate('/products')
    };


    // const queryClient = useQueryClient()
    // const { mutate : addProduct } = useMutation({
    //     mutationFn: async (product: IProduct) => {
    //         const { data } = await axios.post(`http://localhost:3000/products`, product)
    //         return data
            
    //     },
    //     onSuccess: () => {
    //         // refetching
    //         queryClient.invalidateQueries({
    //             queryKey: ["PRODUCT_KEY"],
    //         });
    //     },

    // })
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3" >
                    <label htmlFor="exampleInputEmail1" className="form-label">
                    Name
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    {...register("name", { required: true })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                    Price
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    {...register("price", { required: true })}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                    Image
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    {...register("image", { required: true })}
                    />
                </div>
                <div className="mb-3" >
                    <label htmlFor="exampleInputEmail1" className="form-label">
                    Desc
                    </label>
                    <input
                    type="text"
                    className="form-control"
                    {...register("desc", { required: true })}
                    />
                </div>
                <button type="submit" className="btn btn-primary" >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ProductAdd;
