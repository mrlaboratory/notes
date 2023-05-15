import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';

const Add = () => {

    const { user } = useContext(AuthContext)

    const addNoteHandle = e => {
        e.preventDefault()
        const form = e.target
        const title = form.title.value
        const date = form.date.value
        const details = form.details.value
        const noteDetails = {
            title, date, details, email: user.email, userName: user.name
        }
        console.log(noteDetails)
        fetch('http://localhost:3000', {
            method: "POST",
            headers : {
                'content-type': 'application/json', 
                authorization: `Bearer ${localStorage.getItem('token')}`
            }, 
            body : JSON.stringify(noteDetails)
        })
        .then(res => res.json())
        .then(d => {
            console.log(d)
            if(d.insertedId){
                toast.success('Note added ')
                form.reset()
            }
        })
        .catch(e => console.log(e))

    }


    return (
        <div>
            <h2 className='text-center font-bold text-3xl'>Add new note</h2>


            <div className='flex justify-center'>
                <form onSubmit={addNoteHandle} className='w-full md:w-[600px] p-10'>
                    <input type="text" placeholder="Title  " name='title' className="input input-bordered w-full mt-3" />
                    <input type="date" name='date' defaultValue={new Date().toISOString().substr(0, 10)} className="input input-bordered w-full mt-3" />
                    <textarea name="details" id="" cols="30" rows="10" className="p-5 input input-bordered w-full mt-3 min-h-[300px]" placeholder='Your note details '></textarea>
                    <button type='submit' className='btn w-full mt-3'>Add note</button>


                </form>
            </div>
        </div>
    );
};

export default Add;