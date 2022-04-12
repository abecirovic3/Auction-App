package com.atlantbh.auctionappbackend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity(name = "Street")
@Table(
        name = "street",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "street_name_zipcode_unique",
                        columnNames = {
                                "name",
                                "zipcode"
                        }
                )
        }
)
public class Street {
    @Id
    @SequenceGenerator(
            name = "street_sequence",
            sequenceName = "street_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "street_sequence"
    )
    @Column(updatable = false)
    private Long id;

    @Column(nullable = false)
    @NotBlank(message = "Street name/address is required")
    private String name;

    @Column(nullable = false)
    @NotBlank(message = "Zipcode is required")
    private String zipcode;

    @ManyToOne
    @JoinColumn(
            name = "city_id",
            foreignKey = @ForeignKey(name = "city_id"),
            nullable = false
    )
    @NotNull(message = "City is required")
    private City city;

    @OneToMany(mappedBy = "street")
    @JsonIgnore
    private List<User> users;

    @OneToMany(mappedBy = "street")
    @JsonIgnore
    private List<Product> products;

    public Street() {
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

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
