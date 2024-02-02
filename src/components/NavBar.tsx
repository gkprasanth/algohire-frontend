import { Link } from "react-router-dom"


const NavBar = () => {
    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                <h1 className="text-xl font-bold">My Blog</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="#" className="text-gray-600 hover:text-gray-900">Home</a></li>
                        <li><a href="#" className="text-gray-600 hover:text-gray-900">Create</a></li>
                        <Link to={'/write'} ><li><a href="#" className="text-gray-600 hover:text-gray-900">Create</a></li></Link>
                        <li><a href="#" className="text-gray-600 hover:text-gray-900">Profile</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default NavBar
