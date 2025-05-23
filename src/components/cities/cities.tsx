import { Link } from 'react-router-dom';
import { CITIES } from '../../const';
import { Page } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import { selectCity } from '../../store/app-params/app-params';
import { getCityName } from '../../store/app-params/selectors';

type citiesProps = {
  cities: typeof CITIES;
}

export default function Cities ({cities}: citiesProps) {
  const dispatch = useAppDispatch();
  const selectedCityName = useAppSelector(getCityName);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">

          {cities.map((cityName) => (
            <li key={cityName} className="locations__item" >
              <Link
                className={`locations__item-link tabs__item ${cityName === selectedCityName ? 'tabs__item--active' : ''}`}
                to={Page.Main}
                onClick={
                  (evt) => {
                    evt.preventDefault();
                    dispatch(selectCity(cityName));
                  }
                }
              >
                <span>{cityName}</span>
              </Link>
            </li>
          )
          )}

        </ul>
      </section>
    </div>
  );
}
