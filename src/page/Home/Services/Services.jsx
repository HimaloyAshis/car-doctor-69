import { data } from 'autoprefixer';
import React, { useEffect, useState } from 'react';
import ServiceCard from '../ServiceCard/ServiceCard';

const Services = () => {

    const [services, setServices] = useState([])

    useEffect(()=>{
        fetch('https://car-doctor-server-ecru.vercel.app/services')
        .then(res=>res.json())
        .then(data=>{
            // console.log(data)
            setServices(data)
        })
    },[])


    return (
        <div className='mt-4'>
            <div className='text-center space-y-2'>
                <h2 className='text-orange-600'>Service</h2>
                <h2 className='text-4xl font-bold'>Our Service Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    services.map(service=> <ServiceCard key={service._id} service={service}></ServiceCard> )
                }
            </div>
        </div>
    );
};

export default Services;