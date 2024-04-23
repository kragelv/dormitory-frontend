import React, {FC} from "react";
import {useTitle} from "../../globals";
import Header from "../../components/Header/Header";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import "./Report.css"

const Report: FC = () => {
    useTitle("Докладная")
    return (
        <div className="container-nav">
            <Header/>
            <div className="report-container">
                <NavigationBar/>

                <div className="container-email">
                    <div className="leisure-form">
                        <div className="title-container">
                            <p className="leisure-item">Докладная № XXX</p>
                            <button className="decree-button">На приказ</button>
                        </div>
                        <p className="leisure-item">Дата: 15.03.2024</p>
                        <div className="report-with-decree-green">
                            <p className="leisure-item">Проживающий: Фамилия Имя Отчество</p>
                            <p className="leisure-item">Дата нарушения: 15.02.2024</p>
                            <p className="leisure-item">Правило внутреннего распорядка: Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit.
                                Etiam
                                lobortis et diam sit amet ornare. Curabitur eget elementum enim, gravida congue metus.
                                Nam
                                consequat
                                ultrices quam, et congue est volutpat ut. Curabitur aliquet ligula vel dui tempor, vitae
                                suscipit
                                urna lobortis. Praesent congue lacus ex, eu ornare sapien hendrerit vitae. Vestibulum
                                tincidunt
                                efficitur ornare. Sed placerat dolor ex, id vulputate felis ultricies vitae. Vestibulum
                                pretium non
                                mi at consequat. Proin ac suscipit massa. Duis eget dignissim tellus. Praesent augue
                                massa,
                                dictum
                                id purus ac, commodo tincidunt leo. Phasellus felis metus, ornare ut risus vitae,
                                interdum
                                hendrerit
                                mauris.</p>
                            <p className="leisure-item">Описание: Integer euismod fringilla odio, eu volutpat lacus
                                pharetra vel. Donec molestie
                                pellentesque
                                consequat. Sed congue mattis justo, at laoreet mi. Duis euismod, ex ac tempus cursus,
                                ipsum
                                neque
                                tincidunt massa, in pharetra erat sapien non eros. Integer iaculis felis ut turpis
                                egestas,
                                a auctor
                                nibh congue. Ut ultricies sem quam, et facilisis lectus ultricies elementum.
                                Pellentesque
                                aliquam
                                gravida sapien, rhoncus pretium quam rutrum ut.</p>
                            <p className="leisure-item">Объяснительная:</p>
                            <div className="decree">
                                <p className="leisure-item">Дата: 20.03.2024</p>
                                <p className="leisure-item">Кому: Фамилия Имя Отчество</p>
                                <p className="leisure-item">Текст: Quisque vehicula vitae metus non aliquam. Aliquam ac
                                    dapibus neque. Aliquam
                                    porttitor
                                    mauris vitae libero scelerisque, et finibus leo porttitor. Aliquam erat volutpat.
                                    Sed
                                    blandit
                                    sollicitudin felis eget hendrerit. Phasellus maximus turpis quis lectus interdum, id
                                    lacinia
                                    turpis luctus. Mauris ut mi ut justo efficitur malesuada. Praesent pellentesque est
                                    quis
                                    purus
                                    dignissim lacinia. Mauris pulvinar leo id turpis fringilla egestas in vitae
                                    eros.</p>
                            </div>
                        </div>
                        <div className="report-with-decree">
                            <p className="leisure-item">Проживающий: Фамилия Имя Отчество</p>
                            <p className="leisure-item">Дата нарушения: 15.02.2024</p>
                            <p className="leisure-item">Правило внутреннего распорядка: Suspendisse bibendum ipsum ac
                                orci sagittis, et elementum
                                ligula
                                mollis. Nulla quis diam nisl. Orci varius natoque penatibus et magnis dis parturient
                                montes,
                                nascetur ridiculus mus. Praesent imperdiet, urna in euismod mollis, augue justo blandit
                                quam, nec
                                tempus ante arcu molestie nibh.</p>
                            <p className="leisure-item">Описание: Nullam tempor varius sapien vel scelerisque. Nam
                                facilisis erat vitae nibh
                                consectetur
                                commodo quis ultricies tortor. Pellentesque ultrices lorem sit amet feugiat lobortis.
                                Suspendisse
                                eget odio tellus. Sed vehicula commodo facilisis. Nunc rhoncus, est eu malesuada
                                placerat,
                                leo mi
                                congue lacus, vel dapibus mi orci quis risus. Sed auctor consequat vehicula. Nullam
                                risus
                                elit,
                                iaculis vitae nunc quis, ornare vestibulum velit.</p>
                        </div>
                        <button className="delete">Удалить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Report
