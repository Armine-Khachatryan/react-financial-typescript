import React, {useState, useEffect } from 'react';
import classes from './Calculator.module.css';
import Chart from "../../Components/Chart/Chart";
import axios from "axios";
import {useForm} from "react-hook-form";
import {UserHeader} from "../../Components/Layouts/UserHeader/UserHeader";
import {Footer} from "../../Components/Layouts/Footer/Footer";


interface CalculatorProps {
    token: string;
}

interface CalculatorData {
    retire_in?: string;
    savings_rate?: string;
    annual_expenses?: string;
    annual_savings?: string;
    annual_income?: string;
    monthly_expenses?: string;
    monthly_savings?: string;
}
const Calculator: React.FC<CalculatorProps> = ({ token }) => {

    const [body, setBody] = useState({
        annual_income: "",
        annual_savings: "",
        annual_expenses: ""
    });


    const [data, setData] = useState<CalculatorData | null>(null);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBody(prev => ({
            ...prev,
            [name]: value
        }));
    };
    console.log(token, "calculator token")

    const calculateSavingsRate = async () => {
        if (body?.annual_income && body?.annual_savings && body?.annual_expenses) {
            let formData = new FormData();
            formData.append('annual_income', body.annual_income);
            formData.append('annual_expenses', body.annual_expenses);
            formData.append('annual_savings', body.annual_savings);
            try {
                let response = await axios.post("https://7369.freelancedeveloper.site/api/v1/user/calculator", formData, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setData(response.data)
                console.log(response.data, "response")
            }
            catch (error) {
                console.log(error, "error")
            }
        }
    };

    const calculateAnnualSavings = () => {
        if (body?.annual_income && body?.annual_expenses) {
            const annualSavings = Number(body?.annual_income) - Number(body?.annual_expenses);
            setBody(prev => ({
                ...prev,
                annual_savings: annualSavings.toString()
            }));
        }
        else {
            setBody(prev => ({
                ...prev,
                annual_savings: ""
            }));
        }
        setData(null);
    };

    const calculateAnnualExpenses = () => {
        if (body?.annual_income && body?.annual_savings) {
            const annualExpenses = Number(body.annual_income) - Number(body.annual_savings);
            setBody(prev => ({
                ...prev,
                annual_expenses: annualExpenses.toString()
            }))
        }
        else {
            setBody(prev => ({
                ...prev,
                annual_expenses: ""
            }));
        }
        setData(null);
    }
    useEffect(() => {
        calculateAnnualExpenses();
    }, [body?.annual_savings]);

    useEffect(() => {
        calculateAnnualSavings();
    }, [body?.annual_expenses]);

    // useEffect(() => {
    //     calculateAnnualExpenses();
    // }, [body?.annual_savings, body?.annual_income]);
    //
    // useEffect(() => {
    //     calculateAnnualSavings();
    // }, [body?.annual_income, body?.annual_expenses]);

    useEffect(() => {
        if (!body?.annual_income) {
            setBody(prevState => ({
                // ...prevState,
                annual_expenses: "",
                annual_income: "",
                annual_savings: ""
            }));
            setData(null);
        }
        else if(body?.annual_income  && data?.annual_income && body?.annual_income!==data?.annual_income){
            setBody(prevState => ({
                // ...prevState,
                annual_expenses: "",
                annual_income: "",
                annual_savings: ""
            }));
            setData(null);
        }
    }, [body?.annual_income]);

    return (
        <div>
            <UserHeader />
            <div className="user-home-main">
                <div className="personal-info-content">
                    <div className='main-container'>
                        <h1 className="title">Calculator</h1>
                        <form>
                            <div className={classes.inputDiv}>
                                <label className={classes.labelStyle}>Current annual income</label>
                                <input className={classes.inputStyle} name="annual_income" type="number" placeholder="60000"
                                       value={body?.annual_income} onChange={handleInputChange} />
                            </div>
                            <div className={classes.inputDiv}>
                                <label className={classes.labelStyle}>Current annual savings</label>
                                <input className={classes.inputStyle} name="annual_savings" type="number" placeholder="40000"
                                       value={body?.annual_savings} onChange={handleInputChange} />
                            </div>
                            <div className={classes.inputDiv}>
                                <label className={classes.labelStyle}>Current annual expenses</label>
                                <input className={classes.inputStyle} name="annual_expenses" type="number" placeholder="20000"
                                       value={body?.annual_expenses} onChange={handleInputChange} />
                            </div>
                        </form>
                        <div className={classes.inputDiv}>
                            <label className={classes.labelStyle}>Current savings rate</label>
                            <div className={classes.buttonAndInput}>
                                <button className={classes.btnStyle} onClick={calculateSavingsRate}>Calculate</button>
                                <div style={{ display: "flex" }}>
                                    <input className={classes.inputStyle} value={data?.savings_rate || ""} readOnly />
                                    {/*<span className={classes.spanStyle}>%</span>*/}
                                </div>
                            </div>
                        </div>
                        <Chart savingsRate={data?.savings_rate}/>
                        <div className={classes.singleDiv}>
                            <div className={classes.singleName}>You can retire in</div>
                            <div className={classes.singleData}>{data?.retire_in}</div>
                        </div>
                        <div className={classes.singleDiv}>
                            <div className={classes.singleName}>With a savings rate of</div>
                            <div className={classes.singleData}>{data?.savings_rate}</div>
                        </div>
                        <div className={classes.singleDiv}>
                            <div className={classes.singleName}>Annual expenses</div>
                            <div className={classes.singleData}>{data?.annual_expenses}</div>
                        </div>
                        <div className={classes.singleDiv}>
                            <div className={classes.singleName}>Annual savings</div>
                            <div className={classes.singleData}>{data?.annual_savings}</div>
                        </div>
                        <div className={classes.singleDiv}>
                            <div className={classes.singleName}>Monthly expenses</div>
                            <div className={classes.singleData}>{data?.monthly_expenses}</div>
                        </div>
                        <div className={classes.singleDiv}>
                            <div className={classes.singleName}>Monthly savings</div>
                            <div className={classes.singleData}>{data?.monthly_savings}</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Calculator;
// function Calculator (){
//
//
//     const [body, setBody]=useState({
//         annual_income:"",
//         annual_savings:"",
//         annual_expenses:""
//     })
//     const [savingsRate, setSavingsRate] = useState('');
//
//
//
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setBody((prev)=>({
//             ...prev,
//                 [name]:value
//             })
//         )
//     };
//
//     const calculateSavingsRate = async() => {
//         if(body?.annual_income && body?.annual_savings && body?.annual_expenses){
//             let formData = new FormData();
//             formData.append('annual_income', body.annual_income);
//             formData.append('annual_expenses', body.annual_expenses);
//             formData.append('annual_savings', body.annual_savings);
//             try {
//                 let response=await axios.post("https://7369.freelancedeveloper.site/api/v1/user/calculator",formData,{
//                         headers:{
//                             "Authorization":`Bearer: ${localStorage.getItem("token")}`
//                         }
//                 });
//                 console.log(response.data, "response")
//             }
//             catch(error){
//                 console.log(error,"error")
//             }
//
//             // const savingsRateValue = ((Number(body?.annual_income) - Number(body?.annual_expenses)) / Number(body?.annual_income)) * 100;
//             // setSavingsRate(savingsRateValue.toFixed(2));
//         }
//     };
//
//
//
//     const calculateAnnualSavings = () => {
//         if (body?.annual_income && body?.annual_expenses) {
//             const annualSavings = Number(body?.annual_income) - Number(body?.annual_expenses);
//             setBody(prev => ({
//                 ...prev,
//                 annual_savings: annualSavings
//             }));
//         }
//         else{
//             setBody(prev => ({
//                 ...prev,
//                 annual_savings: ""
//             }));
//         }
//     };
//
//     const calculateAnnualExpenses =()=>{
//         if(body?.annual_income  && body?.annual_savings){
//             const annualExpenses = body.annual_expenses =(Number(body?.annual_income) - Number(body?.annual_savings));
//             setBody(prev=>({
//                 ...prev,
//                 annual_expenses: annualExpenses
//             }))
//         }
//         else{
//             setBody(prev => ({
//                 ...prev,
//                 annual_expenses: ""
//             }));
//         }
//     }
//
//     useEffect(() => {
//         calculateAnnualExpenses();
//     }, [body?.annual_savings, body?.annual_income]);
//
//
//     useEffect(() => {
//         calculateAnnualSavings();
//     }, [body?.annual_income, body?.annual_expenses]);
//
//     // useEffect(() => {
//     //     calculateSavingsRate();
//     // }, [body?.annual_expenses]);
//
//     const calculatorData=[
//         {
//             name:"You canretire in",
//             data:"10.2 years"
//         },
//         {
//             name:"With a savings rate of",
//             data:"66%"
//         },
//         {
//             name:"Annual expenses",
//             data:"20000"
//         },
//         {
//             name:"Annual savings",
//             data:"40000"
//         },
//         {
//             name:"Monthly expenses",
//             data:"1.667"
//         },
//         {
//             name:"Monthly savings",
//             data:"3.333"
//         },
//     ]
//
// const renderCalculatorData=calculatorData?.map((item, index)=>(
//     <div className={classes.singleDiv} key={index}>
//         <div className={classes.singleName}>{item.name}</div>
//         <div className={classes.singleData}>{item.data}</div>
//     </div>
// ))
//
//
//     return (
//         <div>
//             <UserHeader />
//             <div className="user-home-main">
//                 <div className="personal-info-content">
//                     <div className='main-container'>
//                         <h1 className="title">Calculator</h1>
//                         <form>
//                             <div className={classes.inputDiv}>
//                                 <label className={classes.labelStyle}>Current annual income</label>
//                                 <input className={classes.inputStyle} name="annual_income" type="number" placeholder="60000"
//                                        value={body?.annual_income} onChange={handleInputChange} />
//                             </div>
//                             <div className={classes.inputDiv}>
//                                 <label className={classes.labelStyle}>Current annual savings</label>
//                                 <input className={classes.inputStyle} name="annual_savings" type="number" placeholder="40000"
//                                        value={body?.annual_savings} onChange={handleInputChange} />
//                             </div>
//                             <div className={classes.inputDiv}>
//                                 <label className={classes.labelStyle}>Current annual expenses</label>
//                                 <input className={classes.inputStyle} name="annual_expenses" type="number" placeholder="20000"
//                                        value={body?.annual_expenses} onChange={handleInputChange} />
//                             </div>
//                         </form>
//                         <div className={classes.inputDiv}>
//                             <label className={classes.labelStyle}>Current savings rate</label>
//                             <div className={classes.buttonAndInput}>
//                                 <button className={classes.btnStyle} onClick={()=>calculateSavingsRate()}>Calculate</button>
//                                 <div style={{display:"flex"}}>
//                                     <input className={classes.inputStyle} value={savingsRate} readOnly />
//                                     <span className={classes.spanStyle}>%</span>
//                                 </div>
//                             </div>
//                         </div>
//                         <Chart />
//                         {renderCalculatorData}
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// }
//
// export default Calculator;
