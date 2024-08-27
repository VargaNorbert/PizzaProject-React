import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FlatButton from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Container from "react-bootstrap/Container";
import "./LogReg.css";
import {toast} from "react-toastify";

/**
 *Egy React funkcionális komponens, amely egy regisztrációs űrlapot jelenít meg a felhasználó keresztnevét, vezetéknevét, e-mail címét, jelszavát és jelszó megerősítését tartalmazó beviteli mezőkkel.
 *Ellenőrzi a felhasználói bemenetet a regex minták szerint, és ha minden beviteli mező érvényes, akkor POST kérést küld a szervernek.
 *Sikeres regisztráció után átirányítja a felhasználót a bejelentkező oldalra.
 */
interface User {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

/**
 *Visszaad egy JSX elemet, ami egy regisztrációs űrlapot jelenít meg a felhasználó keresztnevét, vezetéknevét, email címét, jelszavát és jelszó megerősítését tartalmazó beviteli mezőkkel.
 *@returns {JSX.Element}
 */
export default function Register() {
    // Adatok
    const [last_name, setLastName] = React.useState("");
    const [first_name, setFirstName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");

    //Regex szabályok
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const nameRegex = /^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]{2,}$/;

    // Gomb megnyomása után POST és redirect
    let navigate = useNavigate();

    /**
     *Egy függvény, amely kezeli az űrlap beküldését, amikor a felhasználó az elküld gombot megnyomja.
     *Ellenőrzi a felhasználói bemenetet a regex minták alapján, hibaüzenetet jelenít meg, ha a bemenet érvénytelen, és POST-kérést küld a szervernek, ha minden bemeneti mező érvényes.
     *Sikeres regisztráció után átirányítja a felhasználót a bejelentkező oldalra.
     *@param {React.FormEvent<HTMLFormElement>} event - Az űrlap beküldési eseménye.
     */
    const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Bevitelimezők ellenőrzése
        if (!nameRegex.test(last_name)) {
            toast.error("Vezetéknév legalább 2 betű és csak betűket tartalmazhat")
        } else if (!nameRegex.test(first_name)) {
            toast.error("Keresztnév legalább 2 betű és csak betűket tartalmazhat")
        } else if (!emailRegex.test(email)) {
            toast.error("Nem megfelelő e-mail formátum")
        } else if (!passwordRegex.test(password)) {
            toast.error("A jelszó legalább 8 karakteres és tartalmaznia kell számot is")
        } else if (password !== password2) {
            toast.error("A két jelszó nem egyezik!")
        } else {
            // Vizsgált adatok küldése
            const data: User = {first_name, last_name, email, password};
            try {
                const res = await fetch("/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                if (res.ok) {
                    toast.success("Sikeres regisztráció!")
                    navigate("/login");
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="regBody">
            <Container className="regcontainer">
                <Box className="box"
                     sx={{
                         flexWrap: "wrap",
                         flexDirection: "column",
                         width: "35%",
                         "@media (max-width: 1200px)": {
                             width: "40%",
                         },
                         "@media (max-width: 1000px)": {
                             margin: "auto",
                             mt: 6
                         },
                         "@media (max-width: 991px)": {
                             width: "53%",
                         },
                         "@media (max-width: 767px)": {
                             width: "60%",
                         },
                         "@media (max-width: 600px)": {
                             width: "80%",
                         },
                         minwidth: "30%",
                         alignItems: "center",
                         borderRadius: 2,
                         minHeight: "60vh",
                         display: "flex",
                         justifyContent: "center",
                         alignContent: "space-around",
                         mt: 6,
                     }}
                >
                    <form onSubmit={handleClick}>
                        <h1>Regisztráció</h1>

                        {/* Vezetéknév */}

                        <FormControl fullWidth variant="standard" sx={{m: 1, width: "80%"}}>

                            <InputLabel style={{color: "white"}}><PersonIcon/> Vezetéknév</InputLabel>
                            <Input
                                value={last_name}
                                onChange={(e) => setLastName(e.target.value)}
                                aria-describedby="standard-weight-helper-text"
                                inputProps={{
                                    "aria-label": "Vezetéknév",
                                }}
                            />
                        </FormControl>

                        {/* Keresztnév */}

                        <FormControl fullWidth variant="standard" sx={{m: 1, width: "80%"}}>
                            <InputLabel style={{color: "white"}}><PersonIcon/> Keresztnév</InputLabel>
                            <Input
                                value={first_name}
                                onChange={(e) => setFirstName(e.target.value)}
                                aria-describedby="standard-weight-helper-text"
                                inputProps={{
                                    "aria-label": "Keresztnév",
                                }}
                            />
                        </FormControl>

                        {/* Email cím */}

                        <FormControl fullWidth variant="standard" sx={{m: 1, width: "80%"}}>
                            <InputLabel style={{color: "white"}}> <EmailIcon/> Email cím</InputLabel>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-describedby="standard-weight-helper-text"
                                inputProps={{
                                    "aria-label": "Emailcím",
                                }}
                            />
                        </FormControl>

                        {/* Jelszó */}

                        <FormControl fullWidth sx={{m: 1, width: "80%"}} variant="standard">
                            <InputLabel style={{color: "white"}} htmlFor="standard-adornment-password">
                                <LockIcon/> Jelszó</InputLabel>
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={"password"}
                            />
                        </FormControl>

                        {/* Jelszó mégegyszer */}

                        <FormControl fullWidth sx={{m: 1, width: "80%"}} variant="standard">
                            <InputLabel style={{color: "white"}}
                                        htmlFor="standard-adornment-password"><LockIcon/> Jelszó újra</InputLabel>
                            <Input
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                type={"password"}
                            />
                        </FormControl>

                        <FlatButton
                            type="submit"
                            variant="contained"
                            sx={{mt: 5, mb: 5}}
                            style={{
                                color: "white",
                                backgroundColor: "#dc6b29",
                                width: "80%",
                            }}
                        >
                            Regisztrálás
                        </FlatButton>
                        <p>
                            Van már fiókod? <Link to="/login">Bejelentkezés</Link>
                        </p>
                    </form>
                </Box>
            </Container>
        </div>
    );
}