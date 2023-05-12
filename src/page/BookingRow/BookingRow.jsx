import { data } from 'autoprefixer';
import React from 'react';
import Swal from 'sweetalert2'

const BookingRow = ({ booking, bookings, setBookings }) => {


    const { price, img, email, title, customerName,_id, date, amount, service, status } = booking

    const handleDelete = (_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/bookings/${_id}`,{
                    method:"DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deleteCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }

                        const remaining = bookings.filter(book=>book._id !== _id)
                        setBookings(remaining)
                    })

            }
        })

    }

    const handleConform = (_id)=>{
        fetch(`http://localhost:5000/bookings/${_id}`,{
            method:"PATCH",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({status:"confirm"})
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.modifiedCount>0){
                const remaining = bookings.filter(booking=>booking._id !== _id)
                const updated = bookings.find(book=>book._id === _id)
                updated.status = "confirm"
                const newBookings = [updated, ...remaining]
                setBookings(newBookings)

            }
        })

    }


    return (
        <tr>
            <th>
                <button onClick={() => handleDelete(_id)} className="btn btn-sm btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </th>
            <td>

                <div className="avatar">
                    <div className="rounded w-12 h-12">
                        <img src={img} alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
            </td>
            <td>
                {service}
            </td>
            <td>{date}</td>
            <td>{price}</td>
            <th>
                { status === "confirm" ? <span className='text-purple-400 font-bold'>Confirmed</span>:
                    <button onClick={()=>handleConform(_id)} className="btn btn-ghost btn-xs">Confirm</button>}
            </th>
        </tr>
    );
};

export default BookingRow;