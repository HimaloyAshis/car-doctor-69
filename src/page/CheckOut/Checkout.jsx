import React from 'react';
import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';

const Checkout = () => {

    const { user } = useContext(AuthContext)

    const service = useLoaderData()
    const { title, price, _id, img } = service
    // console.log(service)

    const handleSubmit = event => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value
        const name = form.name.value
        const date = form.date.value
        const amount = form.amount.value

        const order = {
            img,
            email, 
           customerName: name, 
            date, 
            amount,
            service_id:_id,
            price:price,
            service:title,

        }

        console.log(order)

        fetch('http://localhost:5000/bookings',{
            method:'POST',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(order)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.insertedId){
                alert('ok thik ache gb')
            }
        })

    }

    return (

        <div>
            <h2 className='text-3xl font-bold text-center'>Book services : {title}</h2>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name='name' defaultValue={user?.displayName} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name='date' placeholder="date" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" defaultValue={user?.email} name='email' placeholder="email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Dew amount</span>
                        </label>
                        <input type="number" name='amount' defaultValue={price} className="input input-bordered" />

                    </div>
                </div>
                <div className="form-control mt-6">

                    <input className="btn btn-primary btn-block" type="submit" value="Conform order" />
                </div>
            </form>
            <div className="card-body">

            </div>
        </div>

    );
};

export default Checkout;