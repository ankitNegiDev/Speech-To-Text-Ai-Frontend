
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

function App() {

    return (
        <>
            {/* <div className='bg-blue-300 text-3xl font-bold text-center'>Hello this is App comonent</div> */}
            <div>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/dashboard' element={<Dashboard/>} />
                </Routes>
            </div>
        </>

    )
}

export default App
