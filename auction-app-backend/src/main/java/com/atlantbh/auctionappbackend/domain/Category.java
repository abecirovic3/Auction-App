package com.atlantbh.auctionappbackend.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.Column;
import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedNativeQuery;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.List;

@Entity(name = "Category")
@Table(name = "category")
@SqlResultSetMapping(
        name = "categoryProductCountMapping",
        classes = @ConstructorResult(
                targetClass = Category.class,
                columns = {
                        @ColumnResult(name = "id", type = Long.class),
                        @ColumnResult(name = "name", type = String.class),
                        @ColumnResult(name = "count", type = Long.class)
                }
        )
)
@NamedNativeQuery(
        name = "Category.countProductsByCategory",
        resultClass = Category.class,
        resultSetMapping = "categoryProductCountMapping",
        query = "SELECT c.id, c.name, COUNT(c.id) FROM category c, product p WHERE c.id = p.category_id and c.super_category_id = ?1 group by c.id, c.name"
)
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
    @JsonManagedReference
    private List<Category> subCategories;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<Product> products;

    @Transient
    private Long numberOfProducts;

    public Category() {
        // No args constructor needed by **framework**
    }

    // Constructor needed for Result Set Mapping
    public Category(Long id, String name, Long count) {
        this.id = id;
        this.name = name;
        this.numberOfProducts = count;
        // Set subCategories to null so Hibernate doesn't try to fetch them for the response
        this.subCategories = null;
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

    public Long getNumberOfProducts() {
        return numberOfProducts;
    }

    public void setNumberOfProducts(Long numberOfProducts) {
        this.numberOfProducts = numberOfProducts;
    }
}
