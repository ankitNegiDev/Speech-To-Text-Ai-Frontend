
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Transcribe from './pages/Transcribe'
import History from './pages/History'
import Layout from './components/Layout'
import { Toaster } from 'react-hot-toast';


function App() {

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    {/* <Route path="dashboard" element={<Dashboard />} /> */}
                    <Route path="transcribe" element={<Transcribe />} />
                    <Route path="history" element={<History />} />
                </Route>
            </Routes>
        </>
    );

    // return (
    //     <>
    //         {/* <div className='bg-blue-300 text-3xl font-bold text-center'>Hello this is App comonent</div> */}
    //         <div>
    //             <Routes>
    //                 <Route path='/' element={<Home/>} />
    //                 <Route path='/dashboard' element={<Dashboard/>} />
    //                 <Route path='/transcribe' element={<Transcribe />} /> 
    //                 <Route path="/history" element={<History />} />
    //             </Routes>
    //         </div>
    //     </>

    // )
}

export default App
