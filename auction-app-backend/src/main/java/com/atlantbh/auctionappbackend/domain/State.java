package com.atlantbh.auctionappbackend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity(name = "State")
@Table(
        name = "state",
        uniqueConstraints = {
                @UniqueConstraint(name = "state_name_unique", columnNames = "name")
        }
)
public class State {
    @Id
    @SequenceGenerator(
            name = "state_sequence",
            sequenceName = "state_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "state_sequence"
    )
    @Column(updatable = false)
    private Long id;

    @Column(nullable = false)
    @NotBlank(message = "State name is required")
    private String name;

    @OneToMany(mappedBy = "state")
    @JsonIgnore
    private List<City> cities;

    public State() {
        // No args constructor needed by **framework**
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<City> getCities() {
        return cities;
    }

    public void setCities(List<City> cities) {
        this.cities = cities;
    }
}
