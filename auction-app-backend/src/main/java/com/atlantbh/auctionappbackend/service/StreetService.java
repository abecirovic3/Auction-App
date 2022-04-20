package com.atlantbh.auctionappbackend.service;

import com.atlantbh.auctionappbackend.domain.City;
import com.atlantbh.auctionappbackend.domain.Country;
import com.atlantbh.auctionappbackend.domain.State;
import com.atlantbh.auctionappbackend.domain.Street;
import com.atlantbh.auctionappbackend.repository.CityRepository;
import com.atlantbh.auctionappbackend.repository.CountryRepository;
import com.atlantbh.auctionappbackend.repository.StateRepository;
import com.atlantbh.auctionappbackend.repository.StreetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class StreetService {
    private final StreetRepository streetRepository;
    private final CityRepository cityRepository;
    private final CountryRepository countryRepository;
    private final StateRepository stateRepository;

    @Autowired
    public StreetService(
                            StreetRepository streetRepository,
                            CityRepository cityRepository,
                            CountryRepository countryRepository,
                            StateRepository stateRepository
    ) {
        this.streetRepository = streetRepository;
        this.cityRepository = cityRepository;
        this.countryRepository = countryRepository;
        this.stateRepository = stateRepository;
    }

    public Street findOrCreateLocation(Street street) {
        Optional<Street> streetOptional
                = streetRepository.findFirstByNameAndZipcode(
                street.getName(),
                street.getZipcode()
        );

        if (streetOptional.isPresent()) {
            return streetOptional.get();
        } else {
            City streetCity = street.getCity();
            Country cityCountry = streetCity.getCountry();
            State cityState = streetCity.getState();

            Optional<Country> countryOptional = countryRepository.findFirstByName(cityCountry.getName());

            if (countryOptional.isEmpty()) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Country with name " + cityCountry.getName() + " doesn't exist"
                );
            }

            if (cityState != null) {
                Optional<State> stateOptional = stateRepository.findFirstByName(cityState.getName());
                if (stateOptional.isPresent()) {
                    cityState = stateOptional.get();
                } else {
                    cityState = stateRepository.save(cityState);
                }
            }

            Optional<City> cityOptional
                    = cityRepository.findFirstByNameAndCountry(streetCity.getName(), countryOptional.get());
            if (cityOptional.isPresent()) {
                street.setCity(cityOptional.get());
            } else {
                streetCity.setCountry(countryOptional.get());
                streetCity.setState(cityState);
                street.setCity(cityRepository.save(streetCity));
            }

            return streetRepository.save(street);
        }
    }
}
