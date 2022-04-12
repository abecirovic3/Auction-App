package com.atlantbh.auctionappbackend.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity(name = "ProductImage")
@Table(name = "product_image")
public class ProductImage {
    @Id
    @SequenceGenerator(
            name = "product_image_sequence",
            sequenceName = "product_image_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "product_image_sequence"
    )
    @Column(updatable = false)
    private Long id;

    @Column(nullable = false)
    @NotBlank(message = "Image URL is required")
    private String imageUrl;

    @NotBlank(message = "Image delete hash is required")
    private String deleteHash;

    @ManyToOne
    @JoinColumn(
            name = "product_id",
            foreignKey = @ForeignKey(name = "product_id"),
            nullable = false
    )
    @JsonBackReference(value = "product-image-reference")
    private Product product;

    public ProductImage() {
        // No args constructor needed by **framework**
    }

    public ProductImage(Long id, String imageUrl, Product product) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.product = product;
    }

    public ProductImage(String imageUrl, Product product) {
        this.imageUrl = imageUrl;
        this.product = product;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public String getDeleteHash() {
        return deleteHash;
    }

    public void setDeleteHash(String deleteHash) {
        this.deleteHash = deleteHash;
    }
}
