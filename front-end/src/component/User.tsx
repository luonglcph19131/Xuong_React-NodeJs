
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { IUser } from "../interfaces/User";

const User = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["PRODUCT_KEY"],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:8080/api/auth`)
            console.log(data);
            return data
        }
    })
    const queryClient = useQueryClient();
    const { mutate: remove } = useMutation({
        mutationFn: async (id: number) => {
            const { data } = await axios.delete(`http://localhost:8080/api/auth/${id}`);
            return data;
        },
        onSuccess: () => {
            // refetching
            queryClient.invalidateQueries({
                queryKey: ["PRODUCT_KEY"],
            });
        },
    });

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Lỗi</div>
    
    return (
        <div>
            <h1 style={{ textAlign: "center", margin: "20px" }}>Danh sách User</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th >Username</th>
                        <th >Email</th>
                        <th >Password</th>
                        <th >Action</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((user: IUser, index: number) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td><button type="button" className="btn btn-danger" onClick={() => remove(user.id!)}>Xoa</button></td>
                            </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <h2>Thêm sản phẩm </h2>
                <Link to="/products/add" className="btn btn-primary">Thêm sản phẩm</Link>
            </div>
        </div>
    );
};

export default User;
