import React, {useEffect, useState} from "react";
import {MyOrdersProp} from "../../pages/myorderspage/MyOrdersPage";
import "./MyOrderCard.css";

/**
 *A felhasználó korábbi rendeléseit tartalmazó kártyák megjelenítése.
 *@param {OrderCardProps} props - Az objektum tartalmazza azokat a részleteket, amelyek a megjelenítendő rendeléssel kapcsolatosak.
 *@returns {JSX.Element} A rendelést tartalmazó kártya komponensét adja vissza.
 */

interface OrderCardProps {
    order: MyOrdersProp;
}

interface PizzaCount {
    name: string;
    count: number;
}

const OrderCard: React.FC<OrderCardProps> = ({order}) => {
    const {location, orderDate, phoneNumber, price, ready, pizzas} = order;
    const [pizzaList, setPizzaList] = useState<PizzaCount[]>([]);

    /**
     * Kiszámolja az egyedi pizzák számát a rendelésben és beállítja a pizza lista állapotát.
     *@param {MyOrdersProp["pizzas"]} pizzas - A rendelésben található pizzák listája.
     */
    useEffect(() => {
        const pizzaMap = new Map<string, number>();
        pizzas.forEach((pizza) => {
            const name = pizza.name;
            const count = pizzaMap.get(name) || 0;
            pizzaMap.set(name, count + 1);
        });
        const newPizzaList = Array.from(pizzaMap.entries()).map(([name, count]) => ({
            name,
            count,
        }));
        setPizzaList(newPizzaList);
    }, [pizzas]);

    return (  /* Kártyák megjelenítése */
        <div
            className={`myOrderCard ${ready ? "orderIsReady" : "orderIsNotReady"}`}> {/* Ha a rendelés státuszától függő design */}
            <div className="myOrderCardHeader">
                <p>{orderDate.toLocaleString()}</p>
                <p>{location}</p>
            </div>
            <hr/>

            <p><b>Tel.:</b>{phoneNumber}</p>
            <p><b>Ár:</b> {price} Ft</p>
            <p><b>Státusz:</b> <i>{ready ? "Elkészült" : "Készítés alatt"}</i></p>
            <h5>Rendelés tartalma:</h5>

            <div className="myOrderCardPizzas">{pizzaList.map((pizza) => (
                <p key={pizza.name}>
                    {pizza.name} x{pizza.count}
                </p>
            ))}</div>
        </div>
    );
};

export default OrderCard;