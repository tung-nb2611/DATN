package com.sapo.dao.jpa;


import com.sapo.services.impl.CustomerServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;


public class BaseDao<T>{

    @Autowired
    protected JdbcTemplate jdbc;
    @Autowired
    protected NamedParameterJdbcTemplate namedParameterJdbcTemplate;
    private final Class<T> typeParameterClass;


    public BaseDao(Class<T> typeParameterClass) {
        this.typeParameterClass = typeParameterClass;
    }


    public List<T> query(String query, Object[] args) {
        return this.jdbc.query(query, args, new BeanPropertyRowMapper<T>(this.typeParameterClass));
    }



}
