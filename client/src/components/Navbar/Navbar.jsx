import logo from "../../images/banana.png"
import { Nav, Logo, ProfileIcon, SignoutIcon } from "./NavbarStyled"
import { Outlet, Link, useNavigate} from "react-router-dom"
import { userLogged } from '../../services/userServices'
import { useContext, useEffect } from "react"
import Cookies from 'js-cookie'
import { UserContext } from "../../Context/UserContext"

export default function Navbar() {

    const {user, setUser} = useContext(UserContext)
    
    async function findUserLogged() {
        try {
            const response = await userLogged()
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (Cookies.get("token")) findUserLogged()
    }, [])

    const navigate = useNavigate()

    function signout() {
        Cookies.remove('token')
        setUser({})
        navigate("/")
    }

    return (
        <>
            <Nav>
                <Link to="/home">
                    <Logo src={logo} alt="Logo Kanbanana" />
                </Link>
                <h2>Olá, {user.name}!</h2>
                <section>
                    <Link to="/home/profile" style={{textDecoration: 'none'}}>
                        <ProfileIcon className="bi bi-person"></ProfileIcon>
                    </Link>
                    <SignoutIcon className="bi bi-box-arrow-right" onClick={signout}></SignoutIcon>
                </section>
            </Nav>
            <Outlet />
        </>
    )
}
