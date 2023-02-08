package com.sapo.dao.jpa;


import com.sapo.entities.Store;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@Repository(value = "StoreDAO")
@Transactional(rollbackOn = Exception.class)
public class StoreDao {
    @PersistenceContext
    private EntityManager entityManager;
    public List<Store> findAllStore(){
        String sql  = "select * from tbl_stores ";
        Query query = entityManager.createNativeQuery(sql, Store.class);
        return query.getResultList();
    }
    // Tìm service bằng id
    public Store findStoreById(int id) {
        String sql = "select * from tbl_stores where id = " + id ;
        Query query = entityManager.createNativeQuery(sql, Store.class);
        return (Store) query.getSingleResult();
    }
}
