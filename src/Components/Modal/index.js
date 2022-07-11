import React, { useContext } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { DataContext } from '../../Context/data-context';
import { formattedDate } from '../../utils';
import SpinnerComponent from '../Spinner';
import './modalStyles.css';

const ModalComponent = ({ isOpen, handleClick }) => {

    const context = useContext(DataContext) || {};
    const {
        userSelected = [],
        loadingUserSelected = false,
        currentWeatherData = null,
        loadingCurrentWeatherData = false,
        extendedWeatherData = null,
        loadingExtendedWeatherData = false,
    } = context;

    const loading = loadingUserSelected || loadingCurrentWeatherData || loadingExtendedWeatherData;

    if (!userSelected.length || !currentWeatherData || !extendedWeatherData) return null;

    const user = userSelected[0] || false;

    // CURRENT WEATHER

    const {
        name,
        sys: { country },
        weather,
        main
    } = currentWeatherData;

    let {
        humidity,
        pressure,
        temp,
        temp_max,
        temp_min
    } = main;

    temp = Math.round(temp);
    temp_max = Math.round(temp_max);
    temp_min = Math.round(temp_min);

    const [generalConditions] = weather;

    const imageSrcActualWeather = `http://openweathermap.org/img/wn/${generalConditions.icon}@2x.png`

    // WEATHER EXTENDED

    const { list } = extendedWeatherData

    const [futureConditions] = list;

    const {
        dt_txt,
        weather: futureWeather,
        main: futureMain
    } = futureConditions;

    let {
        humidity: futureHumidity,
        pressure: futurePressure,
        temp: futureTemp,
        temp_max: futureTempMax,
        temp_min: futureTempMin
    } = futureMain;

    futureTemp = Math.round(futureTemp);
    futureTempMax = Math.round(futureTempMax);
    futureTempMin = Math.round(futureTempMin);

    const { date, hour } = formattedDate(dt_txt);

    const { description: futureDescription, icon: futureIcon } = futureWeather[0];

    const imageSrcFutureWeather = `http://openweathermap.org/img/wn/${futureIcon}@2x.png`

    return (
        <Modal
            isOpen={isOpen}
            toggle={handleClick}
        >
            {
                loading ?
                    <SpinnerComponent color="light" /> :
                    <>
                        <ModalHeader toggle={handleClick}>
                            {
                                user && `${user.name} ${user.Apellido}`
                            }
                        </ModalHeader>
                        <ModalBody>
                            <div className="userInformation">
                                <p><span className='subtitle'>Telefono: </span><span className='values'>{user && user.Telefono}</span></p>
                                <p><span className='subtitle'>Ubicacion: </span><span className='values'> {`${name}, ${country}`}</span></p>
                            </div>
                        </ModalBody>
                        <ModalFooter><span></span>
                            <div className="currentWeatherData">
                                <p className='sectionTitle'>Condiciones actuales :</p>
                                <p><span className='subtitle'>Condiciones generales: </span><span className='values'> {`${generalConditions.description}`}</span></p>
                                <p><span className='subtitle'>Humedad: </span><span className='values'> {`${humidity}`}%</span></p>
                                <p><span className='subtitle'>Presion: </span><span className='values'> {`${pressure}`}</span></p>
                                <p><span className='subtitle'>Temperatura: </span><span className='values'> {`${temp}`}°</span></p>
                                <p><span className='subtitle'>Temp. Maxima: </span><span className='values'> {`${temp_max}`}°</span></p>
                                <p><span className='subtitle'>Temp. Minima: </span><span className='values'> {`${temp_min}`}°</span></p>
                                <img className='img-weather' src={imageSrcActualWeather} alt="img-weather" />
                            </div>
                        </ModalFooter>
                        <ModalFooter>
                            <div className="extendedWeatherData">
                                <p className='sectionTitle'>{`Condiciones para el dia ${date} a las ${hour} :`}</p>
                                <p><span className='subtitle'>Condiciones generales: </span><span className='values'> {`${futureDescription}`}</span></p>
                                <p><span className='subtitle'>Humedad: </span><span className='values'> {`${futureHumidity}`}%</span></p>
                                <p><span className='subtitle'>Presion: </span><span className='values'> {`${futurePressure}`}</span></p>
                                <p><span className='subtitle'>Temperatura: </span><span className='values'> {`${futureTemp}`}°</span></p>
                                <p><span className='subtitle'>Temp. Maxima: </span><span className='values'> {`${futureTempMax}`}°</span></p>
                                <p><span className='subtitle'>Temp. Minima: </span><span className='values'> {`${futureTempMin}`}°</span></p>
                                <img className='img-weather' src={imageSrcFutureWeather} alt="img-weather" />
                            </div>
                        </ModalFooter>
                    </>
            }
        </Modal>
    )
}

export default ModalComponent