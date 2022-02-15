package com.atlantbh.auctionappbackend.SampleEntity;

// This is just a simple entity to start things off
// Use Structure by Feature

public class SampleEntity {
    private Long id;
    private String name;
    private Integer number;

    public SampleEntity() {
    }

    public SampleEntity(Long id, String name, Integer number) {
        this.id = id;
        this.name = name;
        this.number = number;
    }

    public SampleEntity(String name, Integer number) {
        this.name = name;
        this.number = number;
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

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    @Override
    public String toString() {
        return "SampleFeature{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", number=" + number +
                '}';
    }
}
