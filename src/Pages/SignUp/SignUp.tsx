import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import classes from './SignUp.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { SignUpPin } from "../../Components/SignUpPin/SignUpPin";


interface ValidationItem {
    type: string | number;
    name: string;
}
interface FormData {
    phone_number: string;
    password: string;
}
function SignUp(){


    const validationData: ValidationItem[] = [
        {
            type: "a",
            name: "lowercase"
        },
        {
            type: "A",
            name: "uppercase"
        },
        {
            type: 123,
            name: "digit"
        },
        {
            type: "#&?",
            name: "symbol"
        },
        {
            type: "8+",
            name: "characters"
        },
    ];

    const [validationStatus, setValidationStatus] = useState<boolean[]>(new Array(validationData.length).fill(false));
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [showPasswordInput, setShowPasswordInput] = useState<boolean>(false);
    const [showLogin, setShowLogin] = useState<boolean>(false);
    const [data, setData] = useState<FormData>({
        phone_number: "",
        password: ""
    });



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

    const saveData = (formData: { countryCode: string; mobileNumber: string; password: string }) => {
        const { countryCode, mobileNumber, password } = formData;
        console.log(formData, "data");
        setData({ phone_number: countryCode + mobileNumber, password: password });
        setValidationStatus(new Array(validationData.length).fill(false));
        setPasswordVisible(false);
        setShowPasswordInput(false);
        reset();
        setShowLogin(true);
    };
    const togglePasswordVisibility = () => {
        const password = getValues("password");
        if (password) {
            setPasswordVisible(!passwordVisible);
        }
    };

    const togglePasswordInput = () => {
        const code = getValues("countryCode");
        const mobileNumber = getValues("mobileNumber");
        console.log(code, mobileNumber);
        if (code && mobileNumber) {
            setShowPasswordInput(true);
        }
    };


    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = event.target.value;
        const validationStatusUpdate = validationData.map(item => {
            switch (item.name) {
                case "lowercase":
                    return !!passwordValue.match(/[a-z]/);
                case "uppercase":
                    return !!passwordValue.match(/[A-Z]/);
                case "digit":
                    return !!passwordValue.match(/\d/);
                case "symbol":
                    return !!passwordValue.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/);
                case "characters":
                    return passwordValue.length >= 8;
                default:
                    return false;
            }
        });
        delete errors.password;
        setValidationStatus(validationStatusUpdate);
    };

    return (
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
                    <div className={classes.title}>Signup</div>
                    {showLogin ? <SignUpPin data={data}/> :
                        <form
                            onSubmit={handleSubmit(saveData)}
                            className={classes.formFirst}>
                            <div className={classes.formGroupItem}>
                                <div className={classes.countryCode}>
                                    <label htmlFor="">Code/ID</label>
                                    <select className={`${errors.countryCode && classes.invalid}`}
                                            {...register("countryCode", {
                                                required: 'Code is required'
                                            })}>
                                        <option value="" disabled selected hidden></option>
                                        <option value="+1">(+1)</option>
                                        <option value="+44">(+44)</option>
                                        <option value="+91 India">(+91)</option>
                                    </select>
                                    {errors.countryCode && <span className={classes.error}>{errors.countryCode.message}</span>}
                                </div>
                                <div className={classes.phoneNumber}>
                                    <label htmlFor="mobileNumber">Mobile number</label>
                                    <input className={`${errors.mobileNumber && classes.invalid}`}
                                           type={"number"}
                                           {...register("mobileNumber", {
                                               required: 'Mobile number is required',
                                               // minLength: {
                                               //     value: 5,
                                               //     message: 'Insert more digits'
                                               // }
                                           })}
                                           placeholder=""
                                    />
                                    {errors.mobileNumber && <span className={classes.error}>{errors.mobileNumber.message}</span>}
                                </div>
                            </div>
                            {showPasswordInput &&
                                <>
                                    <div className={classes.inputLabelDiv}>
                                        <label htmlFor="password">Create a password</label>
                                        <div className={`${classes.inputDiv} ${errors.password && classes.invalid}`}>
                                            <input
                                                type={passwordVisible ? "text" : "password"}
                                                className={classes.inputStyle}
                                                {...register("password", {
                                                    required: 'Password is required',
                                                    // minLength: {
                                                    //     value: 8,
                                                    // },
                                                    pattern: {
                                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+-])[A-Za-z\d@$!%*+?&-]{8,}$/,
                                                        message: 'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit and one special character'
                                                    },
                                                })}
                                                onChange={handlePasswordChange}
                                                placeholder=""
                                            />
                                            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye}
                                                             style={{ cursor: "pointer" }}
                                                             onClick={togglePasswordVisibility} />
                                        </div>
                                        {errors.password && <span className={classes.error}>{errors.password.message}</span>}
                                    </div>
                                    <div className={classes.validationDiv}>
                                        {validationData.map((item, index) => (
                                            <div className={classes.singleValidationDiv} key={index}>
                                                <div className={`${classes.validationType} ${validationStatus[index] && classes.valid}`}>{item.type}</div>
                                                <div className={`${classes.validationName} ${validationStatus[index] && classes.valid}`}>{item.name}</div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            }
                            {!showPasswordInput &&
                                <button className={`${classes.submitNext1}
                             ${(getValues("countryCode") === "" || getValues("mobileNumber") === "") && classes.disabled}`}
                                        onClick={togglePasswordInput}
                                >Next</button>}
                            {showPasswordInput &&
                                <button className={`${classes.submitNext1} 
                      
                            ${!isValid && classes.disabled}`}
                                        type={"submit"}>Next</button>}
                        </form>
                    }
                </div>
            </div>
        </div>
    );
}

export default SignUp;



