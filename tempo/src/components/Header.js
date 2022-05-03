function Header() {
    return (
        <ul className="flex -ml-2 w-full font-bold">
            <li className="text-xs text-gray-800 ml-auto mr-6 border-b-2 border-teal-400 cursor-pointer">Clima</li>
            <li className="text-xs text-gray-800 mr-6 alert-notice cursor-pointer border-b-2 hover:border-teal-400">Alertas</li>
           
        </ul>
    )
}

export default Header