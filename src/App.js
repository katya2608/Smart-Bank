// ІМПОРТУЄМО БІБЛІОТЕКИ БЕЗ ЯКИХ НЕ МОЖЕМО ПИСАТИ КОД
import React from "react";
import styled from "styled-components";
// ІМПОРТУЄМО ПОТРІБНІ КОМПОНЕНТИ
import Page from "./component/Page";
import Header from "./component/Header";
import Balance from "./component/Balance";
import Menu from "./component/Menu";
import Payment from "./component/Payment";

// КОНФІГУРАЦІЯ ========================================
const START_BALANCE = 1000;
const LIMIT_BALANCE = 25000;
const GET_MONEY = 3000;
const TAKE_MONEY = 1000;
const GET_SALLARY = 1.001;
const BUY = 300;
export default function App() {
  // ФУНКЦІОНАЛ БАЛАНСУ ========================

  // Ось тут тримаємо актуальне значення балансу

  const [balance, setBalance] = React.useState(START_BALANCE);

  // Функція для прямого поповнення балансу
  const getMoney = () => {
    setBalance(balance + GET_MONEY);
    setpeyment([
      {
        name: "Вам нараховано:",
        amount: GET_MONEY,
        type: "+",
        ...payment
      }
    ]);
  };
  const takeMoney = () => {
    setBalance(balance - TAKE_MONEY);
    setpeyment([
      {
        name: "Знято готівки:",
        amount: TAKE_MONEY,
        type: "-",
        ...payment
      }
    ]);
  };
  const getSallary = () => {
    setBalance(balance * GET_SALLARY);
    setpeyment([
      {
        name: "Щорічний відсоток:",
        amount: GET_SALLARY,
        type: "*",
        ...payment
      }
    ]);
  };
  const buy = () => {
    setBalance(balance - BUY);
    setpeyment([
      {
        name: "Допомога армії",
        amount: BUY,
        type: "-",
        ...payment
      }
    ]);
  };
  // Функція яка виконується кожен раз коли наш баланс змінився
  React.useEffect(() => {
    // Перевірка на ліміт балансу
    if (balance > LIMIT_BALANCE) {
      alert(`Ваш ліміт балансу: ${LIMIT_BALANCE}`);
      setBalance(START_BALANCE);
    }

    // Перевірка на мінусовий баланс
    if (balance < 0) {
      alert(`Ви використали усі свої гроші. Поповніть картку`);
      // setBalance(0);
    }
    // Сюди записуються змінні при оновленні яких буде виконуватися функція
  }, [balance]);

  const [payment, setpeyment] = React.useState([]);
  // ВЕРСТКА ІНТЕРФЕЙСУ ==========================================

  const LOGIN = "0";
  const PASSWORD = "0";
  const [islogged, setlogged] = React.useState(false);
  const doLogin = () => {
    const login = prompt("Ваш логін");
    const password = prompt("Ваш пароль");
    if (login === LOGIN && password === PASSWORD) {
      alert("Ви увійшли");
      setlogged(true);
    } else {
      if (login != LOGIN) {
        return alert("Помилка в логіні");
      }
      if (password != PASSWORD) {
        return alert("Помилка в паролі");
      }
    }
  };
  return (
    <Page>
      {/* компонент шапки з нашою назвою
          також при кліку мишкою на шапку
          в нас визивається функція HelloWorld
      */}

      <Header name="Smart Bank" onClick={doLogin} />

      {/* Компонент баланса в який передається
          Актуальне значення балансу  */}
      {islogged && <Balance balance={balance} />}

      {/* Компонент меню з кнопками */}
      {islogged && (
        <Menu
          // ось сюди ми передаємо конфігурацію кнопок
          config={[
            {
              name: "Отримати зарплату",
              onClick: getMoney,
              img: "/icon/get.svg"
            },
            {
              name: "Зняти кошти",
              onClick: takeMoney,
              img: "/icon/payment.svg"
            },
            {
              name: "Отримати річний відсоток",
              onClick: getSallary,
              img: "/icon/another.svg"
            },
            {
              name: "Допомога армії",
              onClick: buy,
              img: "/icon/send.svg"
            }
          ]}
        />
      )}
      {/* компонент списка наших транзакцій
          цей функціонал ми будемо робити на 3 уроці
      */}
      {islogged && <Payment payment={payment} />}
      {islogged === false && (
        <Notlogged>Вам потрібно увійти в акаунт</Notlogged>
      )}
    </Page>
  );
}
const Notlogged = styled.div`
  padding: 100px 50px;
  background: linear-gradient(
    0deg,
    rgba(70, 90, 15) 10%,
    rgba(60, 144, 50) 70%
  );
  color: #ffff;
  text-align: center;
  margin-top: 350px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;
