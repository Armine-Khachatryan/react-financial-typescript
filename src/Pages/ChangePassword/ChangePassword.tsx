import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import classes from './ChangePassword.module.css';
import { UserHeader } from '../../Components/Layouts/UserHeader/UserHeader';
import { Footer } from '../../Components/Layouts/Footer/Footer';

interface ValidationData {
    type: string | number;
    name: string;
}

const ChangePassword: React.FC = () => {
    const validationData: ValidationData[] = [
        {
            type: 'a',
            name: 'lowercase'
        },
        {
            type: 'A',
            name: 'uppercase'
        },
        {
            type: 123,
            name: 'digit'
        },
        {
            type: '#&?',
            name: 'symbol'
        },
        {
            type: '8+',
            name: 'characters'
        },
    ];

    const [currentPasswordVisible, setCurrentPasswordVisible] = useState<boolean>(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState<boolean>(false);
    const [validationStatus, setValidationStatus] = useState<boolean[]>(new Array(validationData.length).fill(false));

    const { register, handleSubmit, reset, formState: { errors, isValid }, getValues } = useForm<{
        currentPassword: string;
        newPassword: string;
    }>({
        defaultValues: {
            currentPassword: '',
            newPassword: '',
        },
        mode: "onSubmit",
    });

    const saveData = (data: { currentPassword: string; newPassword: string; }) => {
        console.log(data, "data");
        setValidationStatus(new Array(validationData.length).fill(false));
        setCurrentPasswordVisible(false)
        setNewPasswordVisible(false);
        reset();
    };

    const toggleCurrentPasswordVisibility = () => {
        const currentPassword = getValues("currentPassword");
        if(currentPassword){
            setCurrentPasswordVisible(!currentPasswordVisible);
        }
    };

    const toggleNewPasswordVisibility = () => {
        const newPassword = getValues("newPassword");
        if(newPassword) {
            setNewPasswordVisible(!newPasswordVisible);
        }
    };
    const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPasswordValue = event.target.value;
        const currentPasswordValue = getValues("currentPassword");
        const validationStatusUpdate = validationData.map(item => {
            switch (item.name) {
                case "lowercase":
                    return newPasswordValue.match(/[a-z]/);
                case "uppercase":
                    return newPasswordValue.match(/[A-Z]/);
                case "digit":
                    return newPasswordValue.match(/\d/);
                case "symbol":
                    return newPasswordValue.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/);
                case "characters":
                    return newPasswordValue.length >= 8;
                default:
                    return false;
            }
        });
        const isNewPasswordDifferent = newPasswordValue !== currentPasswordValue;
        setValidationStatus(validationStatusUpdate as boolean[]);
        if (isNewPasswordDifferent) {
            if (errors.newPassword) {
                delete errors.newPassword;
            }
        }
    };
    console.log(validationStatus, "val st")

    return (
        <div>
            <UserHeader />
            <div className="user-home-main">
                <div className={"main-container"}>
                    <div className={classes.title}>Personal Info</div>
                    <form onSubmit={handleSubmit(saveData)} className={classes.form}>
                        <div className={classes.inputLabelDiv}>
                            <label htmlFor="currentPassword" className={classes.label}>Enter current password</label>
                            <div className={`${classes.inputDiv} ${errors.currentPassword && classes.invalid}`}>
                                <input
                                    type={currentPasswordVisible ? "text" : "password"}
                                    className={classes.inputStyle}
                                    {...register("currentPassword", {
                                        required: 'CurrentPassword is required'
                                    })}
                                    placeholder="********"
                                />
                                <FontAwesomeIcon icon={currentPasswordVisible ? faEyeSlash : faEye}
                                                 style={{ cursor: "pointer" }}
                                                 onClick={toggleCurrentPasswordVisibility} />

                            </div>
                            {errors.currentPassword && <span className={classes.error}>{errors.currentPassword.message}</span>}
                        </div>
                        <div className={classes.inputLabelDiv}>
                            <label htmlFor="newPassword" className={classes.label}>Create new password</label>
                            <div className={`${classes.inputDiv} ${errors.newPassword && classes.invalid}`}>
                                <input
                                    type={newPasswordVisible ? "text" : "password"}
                                    className={classes.inputStyle}
                                    {...register("newPassword", {
                                        required: 'New Password is required',
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                            message: 'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit and one special character'
                                        },
                                        validate: (value) =>
                                            value !== getValues('currentPassword') ||
                                            'New password must be different from current password',
                                    })}
                                    onChange={handleNewPasswordChange}
                                    placeholder="********"
                                />
                                <FontAwesomeIcon icon={newPasswordVisible ? faEyeSlash : faEye}
                                                 style={{ cursor: "pointer" }}
                                                 onClick={toggleNewPasswordVisibility} />
                            </div>
                            {errors.newPassword && <span className={classes.error}>{errors.newPassword.message}</span>}
                        </div>
                        <div className={classes.validationDiv}>
                            <div className={classes.validationDiv}>
                                {validationData.map((item, index) => (
                                    <div className={classes.singleValidationDiv} key={index}>
                                        <div className={`${classes.validationType} ${validationStatus[index] && classes.valid}`}>{item.type}</div>
                                        <div className={`${classes.validationName} ${validationStatus[index] && classes.valid}`}>{item.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className={`${classes.submitBtn} ${!isValid && classes.notAllowed}`} type="submit">
                            Change password</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ChangePassword;



