package com.atlantbh.auctionappbackend.domain;

import com.atlantbh.auctionappbackend.constraint.EmailPreference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Past;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Entity(name = "User")
@Table(
        name = "app_user",
        uniqueConstraints = {
                @UniqueConstraint(name = "user_email_unique", columnNames = "email")
        }
)
public class User {
    @Id
    @SequenceGenerator(
            name = "app_user_sequence",
            sequenceName = "app_user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "app_user_sequence"
    )
    @Column(updatable = false)
    private Long id;

    @Column(nullable = false)
    @NotBlank(message = "First name is required")
    @Pattern(regexp = "^[\\p{L} .'-]+$", message = "First Name is invalid")
    private String firstName;

    @Column(nullable = false)
    @NotBlank(message = "Last name is required")
    @Pattern(regexp = "^[\\p{L} .'-]+$", message = "Last Name is invalid")
    private String lastName;

    @Column(nullable = false)
    @NotBlank(message = "Email is required")
    @EmailPreference
    private String email;

    @Column(nullable = false)
    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must contain at least 8 characters")
    private String password;

    @Column(nullable = false)
    private String role;

    @Past(message = "Date of birth is not valid")
    private LocalDate dateOfBirth;

    @Pattern(regexp = "^(\\+\\d+\\s)?(\\(\\d+\\))?[\\s\\d.-]*$")
    private String phoneNumber;

    private String photoUrl;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<ProductUserBid> userBids;

    @OneToMany(mappedBy = "seller", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<Product> products;

    @ManyToOne
    @JoinColumn(
            name = "street_id",
            foreignKey = @ForeignKey(name = "street_id")
    )
    private Street street;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "card_id")
    private Card card;

    @JsonIgnore
    private String stripeAccId;

    @JsonIgnore
    private String stripeCusId;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    @JsonIgnore
    private List<UserReview> userReviews;

    @Transient
    private Map<Byte, Long> ratingCounters;

    @ManyToMany(
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            }
    )
    @JoinTable(
            name = "wishlist",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    @JsonIgnore
    Set<Product> wishlistProducts;

    public User() {
        // No args constructor needed by **framework**
    }

    public User(Long id, String firstName, String lastName, String email, String password, String role) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public User(String firstName, String lastName, String email, String password, String role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public User(
                Long id,
                String firstName,
                String lastName,
                String email,
                String password,
                String role,
                LocalDate dateOfBirth,
                String phoneNumber,
                String photoUrl,
                List<ProductUserBid> userBids
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.dateOfBirth = dateOfBirth;
        this.phoneNumber = phoneNumber;
        this.photoUrl = photoUrl;
        this.userBids = userBids;
    }

    public User(
            String firstName,
            String lastName,
            String email,
            String password,
            String role,
            LocalDate dateOfBirth,
            String phoneNumber,
            String photoUrl,
            List<ProductUserBid> userBids
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.dateOfBirth = dateOfBirth;
        this.phoneNumber = phoneNumber;
        this.photoUrl = photoUrl;
        this.userBids = userBids;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public List<ProductUserBid> getUserBids() {
        return userBids;
    }

    public void setUserBids(List<ProductUserBid> userBids) {
        this.userBids = userBids;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public Street getStreet() {
        return street;
    }

    public void setStreet(Street street) {
        this.street = street;
    }

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public String getStripeAccId() {
        return stripeAccId;
    }

    public void setStripeAccId(String stripeAccId) {
        this.stripeAccId = stripeAccId;
    }

    public String getStripeCusId() {
        return stripeCusId;
    }

    public void setStripeCusId(String stripeCusId) {
        this.stripeCusId = stripeCusId;
    }

    public String getFullName() {
        return firstName + " " + lastName;
    }

    public List<UserReview> getUserReviews() {
        return userReviews;
    }

    public void setUserReviews(List<UserReview> userReviews) {
        this.userReviews = userReviews;
    }

    public Map<Byte, Long> getRatingCounters() {
        return ratingCounters;
    }

    public void setRatingCounters(Map<Byte, Long> ratingCounters) {
        this.ratingCounters = ratingCounters;
    }

    public void initReviewRatingData() {
        if (userReviews != null) {
            ratingCounters = new HashMap<>();
            ratingCounters.put((byte) 1, 0L);
            ratingCounters.put((byte) 2, 0L);
            ratingCounters.put((byte) 3, 0L);
            ratingCounters.put((byte) 4, 0L);
            ratingCounters.put((byte) 5, 0L);
            for (UserReview review : userReviews) {
                byte rating = review.getRating();
                ratingCounters.put(rating, ratingCounters.get(rating) + 1);
            }
        }
    }

    public Set<Product> getWishlistProducts() {
        return wishlistProducts;
    }

    public void setWishlistProducts(Set<Product> wishlistProducts) {
        this.wishlistProducts = wishlistProducts;
    }

    public void addWishlistProduct(Product product) {
        this.wishlistProducts.add(product);
        product.getWishlistUsers().add(this);
    }

    public void removeWishlistProduct(Long productId) {
        Product product =
                this.wishlistProducts.stream().filter(p -> p.getId().equals(productId)).findFirst().orElse(null);
        if (product != null) {
            this.wishlistProducts.remove(product);
            product.getWishlistUsers().remove(this);
        }
    }
}
