package com.atlantbh.auctionappbackend.repository;

import com.atlantbh.auctionappbackend.domain.PriceRange;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional(readOnly = true)
public class PriceRangeRepositoryImplementation implements PriceRangeRepository {
    @PersistenceContext
    EntityManager entityManager;

    @Override
    public PriceRange getProductPriceRange() {
        Query query = entityManager.createNativeQuery(
                "SELECT min(p.start_price) AS min_start_price, max(p.start_price) AS max_start_price, " +
                        "max(p.highest_bid) AS max_highest_bid FROM product p WHERE p.end_date > current_timestamp"
        );
        List<Object[]> resultList = query.getResultList();
        Double min = (Double) resultList.get(0)[0];
        Double max = (Double) resultList.get(0)[1];
        if (resultList.get(0)[2] != null && (Double) resultList.get(0)[2] > max) {
            max = (Double) resultList.get(0)[2];
        }
        return new PriceRange(min, max);
    }
}
