import User from "../models/User";
import { signInValid, signUpValid } from "../validations/userValid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const {SECRIT_CODE} = process.env;

export const signUp = async (req, res) => {
  try {
    /**
     * Bước 1: Validate value đầu vào
     * Bước 2: Kiểm tra email đã tồn tại hay chưa?
     * Bước 3: Mã hoá mật khẩu
     * Bước 4: Tạo user mới
     * Bước 5: Trả về kết quả
     *
     */

    // Buowc 1:
    const body = req.body;
    const { error } = signUpValid.validate(body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((item) => item.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const { userName, email, password, role } = body;

    // Buoc 2:
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({
        message: "Email already exists!",
      });
    }

    // Buoc 3:
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        res.status(500).json({
          message: "Hash password failed!",
        });
        return;
      }

      // Buoc 4:
      const user = await User.create({
        userName,
        email,
        password: hash,
        role,
      });

      user.password = undefined;

      // Buoc 5:
      return res.status(200).json({
        message: "Successfully!",
        user,
      });
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name || "Error",
      message: error.message || "Server error!",
    });
  }
};

export const signIn = async (req,res) => {
  try {
    /**
     * Buoc 1: Validate du lieu dau vao
     * Buoc 2: Kiem tra Email co trong he thong hay khong?
     * Buoc 3: Kiem tra mat khau co dung khong?
     * Buoc 4: Tao token
     * Buoc 5: Tra ve ket qua
     */

    //Buoc 1
    const {error} = signInValid.validate(req.body, {abortEarly: false});
    if(error){
      const errors = error.details.map((item) => item.message);
      return res.status(400).json({
        message : errors,
      });
    }

    //Buoc 2

    const {email, password} = req.body;

    const checkUser = await User.findOne({email});
    if(!checkUser){
      return res.status(400).json({
        message : "Email does not exist !",
      });
    }

    //Buoc 3 

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if(!checkPassword){
      return res.status(400).json({
        message : "Password is incorrect!",
      });
    }

    //Buoc 4

    const accessToken = jwt.sign({id: checkUser._id}, SECRIT_CODE, {expiresIn: "10d",});
    if(!accessToken){
      return res.status(400).json({
        message : "Access token is not created",
      });
    }

    
    //Buoc 5

    checkUser.password = undefined;
    return res.status(200).json({
      message : "Successfully!",
      accessToken,
      user: checkUser,
    })

  } catch (error) {
    return res.status(500).json({
      name: error.name || "Error",
      message : error.message || "Server error",
    })
  }
}
export const getAllUser = async (req, res) => {
  try {
    const data = await User.find();
    if (!data || !data.length) {
      return res.status(404).json({
        message: "Khong co user nao!",
        data: [],
      });
    }
    return res.status(200).json(

      data
    );
  } catch (error) {
    return res.status(500).json({
      name: error.name || "Error",
      message: error.message || "Server error!",
    });
  }
};