import React, { useContext, useEffect, useRef, useState } from 'react';
import Spinner from '../components/Spinner';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Home = () => {
    const { user, loader, userSignOUt } = useContext(AuthContext)
    const [notes, setNotes] = useState([])
    const [data, setData] = useState([])
    const [edit, setEdit] = useState(null)
    const [chnage, setChange] = useState(false)

    const refValu = useRef()


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
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(noteDetails)
        })
            .then(res => res.json())
            .then(d => {
                console.log(d)
                if (d.insertedId) {
                    toast.success('Note added ')
                    form.reset()
                    setChange(!chnage)
                }
            })
            .catch(e => console.log(e))

    }

    const handleEdit = id => {
        console.log(id)
        setEdit(id)

    }

    const handleDelete = id => {
        fetch(`http://localhost:3000/notes?email=${user?.email}&id=${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(res => res.json())
            .then(d => {
                console.log(d)
                if (d.deletedCount) {
                    setChange(!chnage)
                }
            })
            .catch(e => console.log(e))
    }


    const handleSearch = () => {
        const query = refValu.current.value
        const remaining = data.filter(n =>  n.title.toLowerCase().includes(query.toLowerCase()))
        // console.log(remaining)
        setNotes(remaining)
    }
    const localToken = localStorage.getItem('token')
    useEffect(() => {

        user && fetch(`https://notes-server-pied.vercel.app/notes?email=${user?.email}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(d => {
              
                if(user && localToken && d.error){
                    userSignOUt()
                    console.log('all finded')
                    console.log('error found')
                }
                console.log(d)
                setData(d)
                setNotes(d)

            })
            .catch(e => console.log(e))
    }, [user, chnage])
    if (loader) {
        return <Spinner></Spinner>
    }
    return (
        <div className=''>
            <h2 className='text-2xl font-bold text-center my-5'>Your all notes</h2>


            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div>

                    <div className='flex justify-center'>

                        <form onSubmit={addNoteHandle} className='w-full md:w-[600px] '>

                            <input required type="text" placeholder="Title  " name='title' className="input input-bordered w-full mt-3" />
                            <input type="date" name='date' defaultValue={new Date().toISOString().substr(0, 10)} className="input input-bordered w-full mt-3" />
                            <textarea name="details" id="" cols="30" rows="10" className="p-5 input input-bordered w-full mt-3 min-h-[300px]" placeholder='Your note details '></textarea>
                            <button type='submit' className='btn w-full mt-3'>Add note</button>


                        </form>
                    </div>
                </div>
                <div className=' '>
                    <input onChange={handleSearch}  type="text" ref={refValu}  placeholder="Search ..  " name='title' className="input input-bordered w-full mt-3" />
                    <div className='h-3/4  overflow-y-scroll '>


                        {
                            notes.length && notes?.map(note => <div className='p-3 my-2 rounded-lg bg-white flex justify-between flex-wrap' key={note._id}>
                                <div>
                                    <h2 className='text-xl font-bold '>{note.title}</h2>
                                    <h3 className='text-gray-400'>{note.date}</h3>
                                </div>

                                <div className='flex justify-between gap-2'>
                                    <button onClick={() => handleEdit(note._id)} className='btn'>Edit </button>
                                    <button onClick={() => handleDelete(note._id)} className='btn'>Delete </button>

                                </div>

                            </div>)
                        }
                    </div>

                </div>


            </div>
        </div>
    );
};

export default Home;