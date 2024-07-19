import React, {useState } from 'react';
import { useForm } from 'react-hook-form';
import classes from '../SignUp/SignUp.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {LoginPin} from "../../Components/LoginPin/LoginPin";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


interface FormData {
    phone_number: string;
    password: string;
}

interface LoginProps {
    setToken: React.Dispatch<React.SetStateAction<string>>;
}

function Login (props: LoginProps){

    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const { register, handleSubmit, reset, formState: { errors, isValid }, getValues } = useForm<{
        countryCode: string;
        mobileNumber: string;
        password: string;
    }>({
        defaultValues: {
            countryCode: '',
            mobileNumber: '',
            password: ""
        },
        mode: "onSubmit",
    });

    const saveData = async(data: { countryCode: string; mobileNumber: string; password: string }) => {
        const { countryCode, mobileNumber, password } = data;
        setPasswordVisible(false);
        reset();
        let formData = new FormData();
        formData.append('phone_number', countryCode + mobileNumber);
        formData.append('password', password);
            try {
                let response = await axios.post("https://7369.freelancedeveloper.site/api/v1/login/password", formData
                );
                localStorage.setItem("token", response.data.access_token);
                props.setToken(response.data.access_token);
                navigate('/steps-form');
                console.log(response.data, 11111111111)
            } catch (error:any) {
                console.log(error)
                toast.error(
                    error.response.data.message || "Something went wrong!"
                )
            }
    };
    const togglePasswordVisibility = () => {
        const password = getValues("password");
        if (password) {
            setPasswordVisible(!passwordVisible);
        }
    };


    return(
        <div className={classes.loginContent}>
            <div className={classes.imageSide}>
                <div className={classes.imageText}>
                    <h1 className={classes.logo}>Logo</h1>
                    <span>Make all calculations without leaving home</span>
                </div>
            </div>
            <div className={classes.formPart}>
                <ul className={classes.navLanguages}>
                    <li><button>English</button></li>
                    <li><button>Spanish</button></li>
                </ul>
                <div className={classes.loginForm}>
                    <div className={classes.title}>Login</div>
                    {!localStorage.getItem('phone_number') ?
                    <form
                        onSubmit={handleSubmit(saveData)}
                        className={classes.formFirst}>

                            <div className={classes.formGroupItem}>
                                <div className={classes.countryCode}>
                                    <label htmlFor="">Code/ID</label>
                                    <select className={`${errors.countryCode && classes.invalid}`}
                                            {...register("countryCode", {
                                                required: 'Code is required'
                                            })}
                                    >
                                        <option value="" disabled selected hidden></option>
                                        <option value="+1">(+1)</option>
                                        <option value="+44">(+44)</option>
                                        <option value="+91 India">(+91)</option>
                                    </select>
                                    {errors.countryCode && <span className={classes.error}>{errors.countryCode.message}</span>}
                                </div>
                                <div className={classes.phoneNumber}>
                                    <label htmlFor="mobileNumber">Mobile number</label>
                                    <input
                                        className={`${errors.mobileNumber && classes.invalid}`}
                                        type={"number"}
                                        {...register("mobileNumber",{
                                            required: 'Mobile number is required'}
                                        )}
                                        placeholder=""
                                    />
                                    {errors.mobileNumber && <span className={classes.error}>{errors.mobileNumber.message}</span>}
                                </div>
                            </div>
                            <div className={classes.inputLabelDiv}>
                                <label htmlFor="password">Create a password</label>
                                <div  className={`${classes.inputDiv} ${errors.password && classes.invalid}`}>
                                    <input
                                        {...register("password",{
                                            required: 'Password is required',
                                        })}
                                        type={passwordVisible ? "text" : "password"}
                                        className={classes.inputStyle}
                                        placeholder=""
                                    />
                                    <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye}
                                                     style={{ cursor: "pointer" }}
                                                     onClick={togglePasswordVisibility}
                                    />
                                </div>
                                {errors.password && <span className={classes.error}>{errors.password.message}</span>}
                            </div>
                        <button className={`${classes.submitNext1} 
                            ${!isValid && classes.disabled}`}
                                type={"submit"}>Login</button>
                    </form>
                            :<LoginPin setToken={props.setToken}/>}
                </div>
            </div>

        </div>
    )
}

export default Login;