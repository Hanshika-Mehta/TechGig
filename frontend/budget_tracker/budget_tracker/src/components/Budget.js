import React , {useEffect, useState}from 'react';


const Budget = () => {

    const [budget , setBudget] = useState();
    const [remaining , setRemaining] = useState();
    const [spent , setSpent] = useState();
    
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/user/5`,{
            headers:{"Content-Type" : "application/json"},
            method:"GET"
          }).then(response=>response.json())
          .then(result=>{
            console.log(result);
            setBudget(parseInt(result.budget));
            setRemaining(parseInt(result.remaining));
            setSpent(parseInt(result.spent));
            
        })
        
    },[]);

    const alertType = spent > budget ? 'alert-danger' : 'alert-success';
    // const {budget} = useContext(AppContext);
        return(
           
            <div className="row mt-3">
            <div className="col-sm">

                <div className='alert alert-secondary'>
                <span>Budget: Rs {budget}</span>
                </div>
            </div>
            <div className="col-sm">

                <div className={`alert p-4 ${alertType}`}>
                <span>Remaining: Rs{remaining}</span>
                </div>
            </div>
            <div className="col-sm">
                <div className="alert alert-primary">
                <span>Spent so far : Rs {spent}</span>
                </div>
            </div>
            </div>
            
        );
};

export default Budget;