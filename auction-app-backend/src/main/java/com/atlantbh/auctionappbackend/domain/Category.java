package com.atlantbh.auctionappbackend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

@Entity(name = "Category")
@Table(name = "category")
public class Category {
    @Id
    @SequenceGenerator(
            name = "category_sequence",
            sequenceName = "category_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "category_sequence"
    )
    @Column(updatable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(
            name = "super_category_id",
            foreignKey = @ForeignKey(name = "super_category_id")
    )
    @JsonIgnore
    private Category superCategory;

    @OneToMany(mappedBy = "superCategory")
    @JsonIgnore
    private List<Category> subCategories;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<Product> products;

    public Category() {
        // No args constructor needed by **framework**
    }

    public Category(Long id, Category superCategory, List<Category> subCategories, String name, List<Product> products) {
        this.id = id;
        this.superCategory = superCategory;
        this.subCategories = subCategories;
        this.name = name;
        this.products = products;
    }

    public Category(Category superCategory, List<Category> subCategories, String name, List<Product> products) {
        this.superCategory = superCategory;
        this.subCategories = subCategories;
        this.name = name;
        this.products = products;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Category getSuperCategory() {
        return superCategory;
    }

    public void setSuperCategory(Category superCategory) {
        this.superCategory = superCategory;
    }

    public List<Category> getSubCategories() {
        return subCategories;
    }

    public void setSubCategories(List<Category> subCategories) {
        this.subCategories = subCategories;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
