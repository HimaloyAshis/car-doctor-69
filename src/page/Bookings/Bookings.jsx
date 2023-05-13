import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

import BookingRow from '../BookingRow/BookingRow';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
    const { user } = useContext(AuthContext)
    const [bookings, setBookings] = useState([])
    const navigate = useNavigate()

    const url = `https://car-doctor-server-ecru.vercel.app/bookings?email=${user.email}`

    useEffect(() => {
        fetch(url,{
            method:'GET',
            headers:{
                authorization: `Barer ${localStorage.getItem('user-token')}`
            },
        
        })
            .then(res => res.json())
            .then(data => {
                if(!data.error){
                    setBookings(data)
                }
                else{
                    navigate('/')
                }
            })
    }, [url, navigate])

    return (
        <div>
            <h2>bookings : {bookings.length}</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>blabla</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                        {
                            bookings.map(booking=><BookingRow key={booking._id} 
                            booking={booking}
                            bookings={bookings}
                            setBookings={setBookings}
                            ></BookingRow> )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Bookings;