package com.sapo.dao.jpa;


import com.sapo.entities.Areas;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@Repository(value = "AreaDAO")
@Transactional(rollbackOn = Exception.class)
public class AreaDao {
    @PersistenceContext
    private EntityManager entityManager;
    public List<Areas> findAllArea(int store_id){
        String sql  = "select * from tbl_areas where store_id=  " + store_id;
        Query query = entityManager.createNativeQuery(sql, Areas.class);
        return query.getResultList();
    }
    public List<Areas> findAllAreaByStatus(int store_id,List<Integer> status){
            String sql  = "select * from tbl_areas where store_id=  " + store_id ;
            if(status.size() > 0){
                String statusSql = " AND (";
                String statusSql1 = " ";

                for(int  i =0; i < status.size() ; i++ ){
                    statusSql1 = statusSql1 + " status = " +status.get(i) + " OR ";
                }
                sql = sql + statusSql + statusSql1 + " 1 = 2 )";
                System.out.println(sql);
            }
            Query query = entityManager.createNativeQuery(sql, Areas.class);
        return query.getResultList();
    }
    // Tìm service bằng id
    public Areas findAreaById(int id) {
        String sql = "select * from tbl_areas where id = " + id ;
        Query query = entityManager.createNativeQuery(sql, Areas.class);
        return (Areas) query.getSingleResult();
    }
}
