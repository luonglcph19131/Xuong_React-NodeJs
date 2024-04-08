import  { useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IProduct } from "../interfaces/Product";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ProductContext } from "../context/ProductContextProvider";

const ProductEdit = () => {
    const [, dispatch ] = useContext(ProductContext)
    
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IProduct>();

    useEffect(() => {
        (async () => {
            const {data} = await axios.get(`http://localhost:8080/api/products/${id}`);
            // fill dữ liệu vào form
            console.log(data.data);
            reset(data.data);
        })();
    }, [id, reset]);

    const onSubmit: SubmitHandler<IProduct> = async (product) => {
        try {
            const { data } = await axios.put(`http://localhost:8080/api/products/${product._id}`, product)
            dispatch({type : "UPDATE_PRODUCT", payload: data})
        } catch (error) {
            console.log(error);
        }
        navigate("/products");       
    };
    // const queryClient = useQueryClient()
    // const { mutate: update } = useMutation({
    //     mutationFn: async (product: IProduct) => {
    //         const { data } = await axios.put(
    //             `http://localhost:3000/products/${product.id}`,
    //             product
    //         );
    //         return data;
            
    //     },
    //     onSuccess: () => {
    //         // refetching
    //         queryClient.invalidateQueries({
    //             queryKey: ["PRODUCT_KEY"],
    //         });
    //     }

    // });
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit )}>
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
                <button type="submit" className="btn btn-primary" >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ProductEdit;
