import { createContext, useState } from "react";
import PetApi from "../api/petAPI";

const Context = createContext();

function Provider({ children }) {
    const [userInfo, setUserInfo] = useState(null);
    const [pets, setPets] = useState([]);
    const [hideAlertOrder, setHideAlertOrder] = useState(true);
    const [alertOrderSuccess, setAlertOrderSuccess] = useState(false);
    const [alertOrderError, setAlertOrderError] = useState(false);
    const login = (user, userInfo) => {
        let userOverview = {
            ...user,
            username: userInfo.username
        }
        setUserInfo(userOverview);
    }
    const getPets = (pets) => {
        setPets(pets);
    }
    const orderPet = async (idPet) => {
        setHideAlertOrder(false);
        const data = {
            petId: idPet,
            quantity: 1,
            shipDate: new Date().toISOString().slice(0, 10),
            status: "placed",
            complete: true
        }
        const result = await PetApi.orderPet(data);
        if (result.status === 200) {
            setAlertOrderSuccess(true);
            setHideAlertOrder(true);
        }
        else {
            setAlertOrderError(true);
        }
    }
    const value = {
        userInfo,
        pets,
        hideAlertOrder,
        alertOrderSuccess,
        alertOrderError,
        login,
        getPets,
        orderPet
    }
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export { Context, Provider }