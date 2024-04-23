import './Leisure.css';
import Header from "../../components/Header/Header";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { FC } from "react";
import { useAppSelector } from "../../store/hook/redux";

const Leisure: FC = () => {
    const { } = useAppSelector;
    return (
        <div className="container-nav">
            <Header />
            <div className=" leisure-container">
                <NavigationBar />

                <div className="container-email">
                    <div className="leisure-form">
                        <div className="leisure-items">
                            <p className="leisure-item"><b>Название:</b> Основы бизнеса</p>
                            <p className="leisure-item"><b>День недели:</b> пятница</p>
                            <p className="leisure-item"><b>Время:</b> 14:00</p>
                            <p className="leisure-item"><b>Руководитель:</b> Орлова Людмила Геннадьевна</p>
                        </div>
                        <button className="edit">Редактировать</button>
                        <button className="delete">Удалить</button>

                        <p className="leisure-title">Участники</p>

                        <table>
                            <thead>
                                <tr>
                                    <th>ФИО</th>
                                    <th>Группа</th>
                                    <th>Комната</th>
                                    <th>Телефон</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td data-label="ФИО">Завалюк Дарья Николаевна</td>
                                    <td data-label="Группа">151002</td>
                                    <td data-label="Комната">100</td>
                                    <td data-label="Телефон">375 (33) 349 94 09</td>
                                </tr>
                                <tr>
                                    <td data-label="ФИО">Завалюк Дарья Николаевна</td>
                                    <td data-label="Группа">151002</td>
                                    <td data-label="Комната">100</td>
                                    <td data-label="Телефон">375 (33) 349 94 09</td>
                                </tr>
                                <tr>
                                    <td data-label="ФИО">Завалюк Дарья Николаевна</td>
                                    <td data-label="Группа">151002</td>
                                    <td data-label="Комната">100</td>
                                    <td data-label="Телефон">375 (33) 349 94 09</td>
                                </tr>
                                <tr>
                                    <td data-label="ФИО">Завалюк Дарья Николаевна</td>
                                    <td data-label="Группа">151002</td>
                                    <td data-label="Комната">100</td>
                                    <td data-label="Телефон">375 (33) 349 94 09</td>
                                </tr>
                                <tr>
                                    <td data-label="ФИО">Завалюк Дарья Николаевна</td>
                                    <td data-label="Группа">151002</td>
                                    <td data-label="Комната">100</td>
                                    <td data-label="Телефон">375 (33) 349 94 09</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leisure;
